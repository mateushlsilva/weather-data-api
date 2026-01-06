import { WeatherCurrent, WeatherLocation } from "./index";

export type WeatherApiResponse = {
  location: WeatherLocation;
  current: WeatherCurrent;
}
