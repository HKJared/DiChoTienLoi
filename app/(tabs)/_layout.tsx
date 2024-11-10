import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
          title: "Shopping",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/images/tabBar/cartactive.png") // Hình ảnh khi nhấn
                  : require("@/assets/images/tabBar/cart-large-minimalistic_svgrepo.com.png") // Hình ảnh khi chưa nhấn
              }
              style={{ width: 30, height: 30 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
