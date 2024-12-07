import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import className from "twrnc";
import ArrowLeft from "@/assets/icons/ArrowLeft";
import { router, useRouter } from "expo-router";
const ArrowBack = () => {
  return (
    <Pressable
      onPress={() => router.back()}
      style={className`bg-gray-300 p-2 rounded-lg w-10`}
    >
      <ArrowLeft />
    </Pressable>
  );
};

export default ArrowBack;
