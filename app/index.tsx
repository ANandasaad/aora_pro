import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Aora!</Text>
      <StatusBar style="auto" />
      <Link href="/home" className="color-blue-200">
        Home
      </Link>
    </View>
  );
}
