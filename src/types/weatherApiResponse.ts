import { WeatherCurrent, WeatherLocation } from "./index";

export interface WeatherApiResponse {
  location: WeatherLocation;
  current: WeatherCurrent;
}
