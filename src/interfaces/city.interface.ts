import { CityType } from "../types";

export interface ICity {
    create(city: CityType): Promise<CityType>
}