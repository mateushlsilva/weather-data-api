import { CityType } from "./city";

export type ClimateType = {
    last_updated: Date;
    temp_c: number;
    feelslike_c: number;
    condition_text: string;
    condition_code: number;
    humidity: number;
    pressure_mb: number;
    precip_mm: number;
    wind_kph: number;
    wind_degree: number;
    cloud: number;
    uv: number;
    city: CityType; 
}

export type ClimateTypePagination = {
    climate: ClimateType[];
    total: number;
    page: number;
    limit: number;
}