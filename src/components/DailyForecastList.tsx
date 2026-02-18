import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { DailySummary } from "../types/weather";

interface Props {
  forecasts: DailySummary[];
}

export const DailyForecastList = ({ forecasts }: Props) => {
  if (!forecasts?.length) return null;

  const formatDayLabel = (dayKey: string) => {
    const [year, month, day] = dayKey.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <View className="mt-4">
      <Text className="text-xl font-bold text-indigo-950 mb-4 px-2">
        Pronóstico diario (promedio)
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {forecasts.map((day) => (
          <View
            key={day.date}
            className="flex-row items-center justify-between bg-white mb-3 p-4 rounded-2xl shadow-sm"
          >
            <View className="flex-1">
              <Text className="text-lg font-bold text-indigo-950">
                {formatDayLabel(day.date)}
              </Text>
              <Text className="text-indigo-700 capitalize">
                {day.weatherDescription}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Text className="text-xl font-semibold text-indigo-950 mr-2">
                {day.avgTemp.toFixed(1)}°C
              </Text>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${day.weatherIcon}@2x.png`,
                }}
                style={{ width: 50, height: 50 }}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
