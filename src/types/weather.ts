export type ForecastItem = {
  dt: number;
  dt_txt: string;
  main: { temp: number };
  weather: { main: string; description: string; icon: string }[];
};

export type DailySummary = {
  date: string;
  avgTemp: number;
  weatherMain: string;
  weatherDescription: string;
  weatherIcon: string;
};

export type CurrentWeather = {
  main: { temp: number };
  weather: { description: string; icon: string; main: string }[];
  name?: string;
};

export type WeatherData = {
  current?: CurrentWeather;
  forecast?: {
    list: ForecastItem[];
    city: { name: string };
  };
  error?: any;
  details?: any;
};
