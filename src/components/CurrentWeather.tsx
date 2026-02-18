import React from "react";
import { View, Text } from "react-native";
import { MapPin } from "lucide-react-native";
import { cssInterop } from "nativewind";
import { CurrentWeather as CurrentWeatherType } from "../types/weather";

cssInterop(MapPin, {
  className: {
    target: "style",
  },
});

interface Props {
  current?: CurrentWeatherType;
  cityName: string;
}

export const CurrentWeather = ({ current, cityName }: Props) => {
  if (!current) return null;

  return (
    <View className="mb-8 items-center rounded-3xl bg-white p-6 shadow-sm">
      <View className="flex-row items-center mb-4">
        <MapPin size={24} color="#1e1b4b" className="mr-2" />
        <Text className="text-2xl text-indigo-950 font-raleway-semibold">
          {cityName}
        </Text>
      </View>

      <View className="items-center">
        <Text className="text-xl capitalize text-indigo-900 mb-2 font-raleway-medium">
          {current.weather[0].description}
        </Text>
        <Text className="text-6xl text-indigo-950 font-raleway-bold">
          {Math.round(current.main.temp)}°C
        </Text>
      </View>
    </View>
  );
};
