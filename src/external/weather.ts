import axios from "axios";
import { WeatherApiResponse } from "../types";
import * as dotenv from "dotenv";
dotenv.config();


export async function getClimateCity(city:string): Promise<WeatherApiResponse> {
    try {
        const API = process.env.API
        const API_KEY = process.env.API_KEY
        if (!API || !API_KEY) throw new Error('API or API_KEY not configured');
    
        const { data } = await axios.get<WeatherApiResponse>(API, {
            params: {
                key: API_KEY,
                q: city,
            },
        });
        return data
    }
    catch (err) {
       throw new Error(
            `Error fetching weather data for city "${city}": ${err.message}`,
        );
    }
}