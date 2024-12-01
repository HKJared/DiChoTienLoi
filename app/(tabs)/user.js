import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function TabUserScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Log In" onPress={() => router.push("login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
