import axios from "axios";
import { CurrentWeather, DailySummary, ForecastItem } from "../types/weather";

// In Expo, you can use EXPO_PUBLIC_ prefix for env variables
const OPENWEATHER_API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY || "";

const baseUrl = "https://api.openweathermap.org/data/2.5";

export const fetchWeather = async (lat: number, lon: number) => {
  if (!OPENWEATHER_API_KEY) {
    throw new Error("Missing OpenWeather API key");
  }

  const commonParams = `lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=es`;

  const [currentRes, forecastRes] = await Promise.all([
    axios.get(`${baseUrl}/weather?${commonParams}`),
    axios.get(`${baseUrl}/forecast?${commonParams}`),
  ]);

  return {
    current: currentRes.data as CurrentWeather,
    forecast: forecastRes.data as {
      list: ForecastItem[];
      city: { name: string };
    },
  };
};

export function summarizeForecast(
  list: ForecastItem[] | undefined,
): DailySummary[] {
  if (!list) return [];

  const groups = new Map<
    string,
    {
      temps: number[];
      weatherCounts: Record<
        string,
        { count: number; description: string; icon: string }
      >;
    }
  >();

  for (const item of list) {
    const dayKey = item.dt_txt.slice(0, 10); // "YYYY-MM-DD"

    if (!groups.has(dayKey)) {
      groups.set(dayKey, { temps: [], weatherCounts: {} });
    }

    const group = groups.get(dayKey)!;

    group.temps.push(item.main.temp);

    const w = item.weather[0];
    const key = w.main;

    if (!group.weatherCounts[key]) {
      group.weatherCounts[key] = {
        count: 0,
        description: w.description,
        icon: w.icon,
      };
    }

    group.weatherCounts[key].count += 1;
  }

  const summaries = Array.from(groups.entries())
    .map(([date, { temps, weatherCounts }]) => {
      const avgTemp =
        temps.reduce((sum, t) => sum + t, 0) / (temps.length || 1);

      const [weatherKey, weatherInfo] = Object.entries(weatherCounts).sort(
        (a, b) => b[1].count - a[1].count,
      )[0];

      return {
        date,
        avgTemp,
        weatherMain: weatherKey,
        weatherDescription: weatherInfo.description,
        weatherIcon: weatherInfo.icon,
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return summaries;
}
