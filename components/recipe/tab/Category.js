import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";


export default function Category({ text, imageSource, active }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source= {imageSource}
        style={styles.background}
      >
        {!active && <View style={styles.overlay} />}
        <Text style={styles.text}>{text}</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 116,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500', // medium
  },
});
