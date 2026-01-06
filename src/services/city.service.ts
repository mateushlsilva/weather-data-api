import { ICity } from "../interfaces";
import { CityType } from "../types";
import { AppDataSource } from "../config";
import { City } from "../entities";
import { normalizeCityName } from "../utils";

class CityService implements ICity{
    async create(city: CityType): Promise<CityType> {
        try{
            const repository = AppDataSource.getRepository(City)
            const cityName = normalizeCityName(city.name)
            const find = await repository.findOneBy({ name: cityName })
            if (!find) {
                const newCity = repository.create({
                    name: cityName,
                    country: city.country,
                    lat: city.lat,
                    lon: city.lon,
                    region: city.region,
                    tz_id: city.tz_id
                })
                const save = await repository.save(newCity)
                return save
            }
            return find
        }
        catch(err) {
            throw new Error(`Error: ${err}`)
        }
    }
}

export default new CityService()