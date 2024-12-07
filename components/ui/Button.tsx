import React from "react";
import className from "twrnc";
import { Link, LinkProps } from "expo-router";

interface ButtonProps extends Pick<LinkProps, "href"> {
  title: string;
  OnPress?: () => void;
}

const ButtonPost: React.FC<ButtonProps> = ({ title, href, OnPress }) => {
  return (
    <Link
      href={href}
      onPress={OnPress}
      style={className`bg-green-500 text-white text-2xl font-semibold p-4 w-86 text-center rounded-2xl`}
    >
      {title}
    </Link>
  );
};

export default ButtonPost;
