import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { UserCircle, Home, BarChart } from "lucide-react-native"; // Use lucide-react-native for React Native

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <UserCircle size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="game-stats"
        options={{
          title: "Game Stats",
          tabBarIcon: ({ color }) => <BarChart size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
