import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { CloudRain } from "lucide-react-native";
import { cssInterop } from "nativewind";
import { summarizeForecast } from "./src/services/weather";
import { useWeather } from "./src/hooks/useWeather";
import { CurrentWeather } from "./src/components/CurrentWeather";
import { DailyForecastList } from "./src/components/DailyForecastList";
import { WeatherError } from "./src/components/WeatherError";
import { QueryProvider } from "./src/providers/QueryProvider";

import "./global.css";

cssInterop(CloudRain, {
  className: {
    target: "style",
  },
});

function MainContent() {
  const { data, isLoading, isRefetching, error, refetch } = useWeather();

  const onRefresh = () => {
    refetch();
  };

  const cityName =
    data?.current?.name ??
    data?.forecast?.city?.name ??
    "Ubicación desconocida";
  const dailyForecast = summarizeForecast(data?.forecast?.list);

  const weatherError = error
    ? { error: true, details: error.message }
    : data?.error
      ? data
      : null;

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="light-content" />
      <View className="mb-4 flex-row items-center justify-between p-4">
        <View>
          <Text className="text-3xl font-black text-indigo-950">JustNow</Text>
          <Text className="text-slate-500">Tu clima, al instante</Text>
        </View>
        <TouchableOpacity
          onPress={() => refetch()}
          disabled={isLoading || isRefetching}
          className={`rounded-full p-3 shadow-md ${isLoading || isRefetching ? "bg-indigo-300" : "bg-indigo-600 active:bg-indigo-700"}`}
        >
          <CloudRain size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        className="flex-1 px-4"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
      >
        <WeatherError
          error={weatherError?.error}
          details={weatherError?.details}
        />

        {isLoading && !isRefetching ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#4f46e5" />
            <Text className="mt-4 text-slate-500">Obteniendo clima...</Text>
          </View>
        ) : (
          <>
            <CurrentWeather current={data?.current} cityName={cityName} />
            <DailyForecastList forecasts={dailyForecast} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <QueryProvider>
      <SafeAreaProvider>
        <MainContent />
      </SafeAreaProvider>
    </QueryProvider>
  );
}
