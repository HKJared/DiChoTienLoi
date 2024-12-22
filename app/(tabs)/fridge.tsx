import React, { useState } from "react";
import { View, StatusBar, StyleSheet, Text } from "react-native";
import Header from "@/components/Header";
import HeaderScheduleShopping from "@/components/shopping/HeaderScheduleShopping";
import ShoppingCalender from "@/components/shopping/ShoppingCalender";
import ShoppingScheduleCalender from "@/components/shopping/ShoppingScheduleCalender";

export default function ShoppingScreen() {
  return (
    <View>
      <StatusBar hidden={true} />
      <Text>Hi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerShoppingCalender: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
});
