import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import { fetchWeather } from "../services/weather";
import { WeatherData } from "../types/weather";

export const useWeather = () => {
  return useQuery<WeatherData>({
    queryKey: ["weather"],
    queryFn: async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permiso de ubicación denegado");
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      return await fetchWeather(
        location.coords.latitude,
        location.coords.longitude,
      );
    },
  });
};
