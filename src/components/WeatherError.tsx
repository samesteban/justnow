import React from "react";
import { View, Text } from "react-native";
import { AlertCircle } from "lucide-react-native";
import { cssInterop } from "nativewind";

cssInterop(AlertCircle, {
  className: {
    target: "style",
  },
});

interface Props {
  error: any;
  details?: any;
}

export const WeatherError = ({ error, details }: Props) => {
  if (!error) return null;

  return (
    <View className="bg-red-50 p-4 rounded-2xl border border-red-200 mb-6 flex-row items-start">
      <AlertCircle size={24} color="#ef4444" className="mr-3 mt-1" />
      <View className="flex-1">
        <Text className="text-red-800 font-bold mb-1">
          Error al obtener el clima
        </Text>
        <Text className="text-red-600">
          {typeof details === "string"
            ? details
            : JSON.stringify(details ?? error)}
        </Text>
      </View>
    </View>
  );
};
