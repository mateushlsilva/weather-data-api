import CityService  from "./city.service";
import { AppDataSource, redis } from "../config";
import { Climate } from "../entities";
import { getClimateCity } from "../external";
import { IClimate } from "../interfaces";
import { ClimateType, ClimateTypePagination } from "../types";
import { normalizeCityName } from "../utils";

class ClimateService implements IClimate {
    async getClimateHistory(cityName: string, page: number = 1, limit: number = 10): Promise<ClimateTypePagination> {
        try {
            const start = (page - 1) * limit;
            const cityNameNormalize = normalizeCityName(cityName)

            const repository = AppDataSource.getRepository(Climate)
            const [climate, total] = await repository
                .createQueryBuilder('climate')
                .innerJoin('climate.city', 'city')
                .where('city.name = :cityNameNormalize', { cityNameNormalize })
                .orderBy('climate.last_updated', 'DESC')
                .skip(start)
                .take(limit)
                .getManyAndCount();
                

            return { climate, total, page, limit }
        }   
        catch (err) {
            console.error("ClimateService error:", err);
            throw err;
        } 
    }

    async getCurrentClimate(cityName: string): Promise<ClimateType> {
        try {
            const repository = AppDataSource.getRepository(Climate)
            const cacheKey = `city:${cityName}`
            const cached = await redis.get(cacheKey);
            const TEN_MINUTES = 600

            if (cached) {
                return JSON.parse(cached)
            }

            //buscando na api
            const externalApi = await getClimateCity(cityName)

            const newCity = await CityService.create(externalApi.location) 

            const { cloud, feelslike_c, humidity, last_updated, precip_mm, pressure_mb, temp_c, uv, wind_degree, wind_kph } = externalApi.current
            const newClimate = repository.create({
                cloud, 
                feelslike_c, 
                humidity, 
                last_updated, 
                precip_mm, 
                pressure_mb, 
                temp_c, 
                uv, 
                wind_degree, 
                wind_kph, 
                condition_code: externalApi.current.condition.code, 
                condition_text: externalApi.current.condition.text,
                city: newCity
            })

            const save = await repository.save(newClimate)

            await redis.set(cacheKey, JSON.stringify(save), "EX", TEN_MINUTES);

            return save
        }   
        catch (err) {
            console.error("ClimateService error:", err);
            throw err;
        } 
    }
}

export default new ClimateService()