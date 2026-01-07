import { ClimateType, ClimateTypePagination } from "../types"

export interface IClimate {
    getCurrentClimate(cityName: string): Promise<ClimateType>
    getClimateHistory(cityName: string, page: number, limit: number): Promise<ClimateTypePagination>
}