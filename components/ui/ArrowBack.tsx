import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import ArrowLeft from "@/assets/icons/ArrowLeft";
import { router } from "expo-router";

const ArrowBack = () => {
  return (
      <Pressable onPress={() => router.back()} style={styles.button}>
        <ArrowLeft />
      </Pressable>
  );
};

export default ArrowBack;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#D1D5DB", // Equivalent to Tailwind's bg-gray-300
    padding: 8, // Equivalent to Tailwind's p-2
    borderRadius: 8, // Equivalent to Tailwind's rounded-lg
    width: 40, // Equivalent to Tailwind's w-10
    alignItems: "center",
    justifyContent: "center",
  },
});