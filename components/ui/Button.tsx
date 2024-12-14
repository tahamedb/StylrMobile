import React from "react";
import { Link, LinkProps } from "expo-router";
import { StyleSheet, Text, Pressable } from "react-native";

interface ButtonProps extends Pick<LinkProps, "href"> {
  title: string;
  OnPress?: () => void;
}

const ButtonPost: React.FC<ButtonProps> = ({ title, href, OnPress }) => {
  return (
      <Link
          href={href}
          onPress={OnPress}
          style={styles.button}
      >
        <Text style={styles.text}>{title}</Text>
      </Link>
  );
};

export default ButtonPost;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#22C55E", // Equivalent to Tailwind's bg-green-500
    padding: 16, // Equivalent to Tailwind's p-4
    borderRadius: 16, // Equivalent to Tailwind's rounded-2xl
    width: "100%", // Equivalent to Tailwind's w-86
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF", // Equivalent to Tailwind's text-white
    fontSize: 20, // Equivalent to Tailwind's text-2xl
    fontWeight: "600", // Equivalent to Tailwind's font-semibold
    textAlign: "center",
  },
});