import { View, Text } from "react-native";
import React from "react";
import { FAB } from "@rneui/themed";

export default function MenuButton({
  navigation,
  variant,
}: {
  navigation: any;
  variant: "black" | "white";
}) {
  return (
    <FAB
      color={variant === "black" ? "#171717" : "#eee"}
      onPress={() => {        
        navigation.toggleDrawer();
      }}
      icon={{
        name: "menu",
        color: variant === "black" ? "#eee" : "#171717",
      }}
      style={{
        position: "absolute",
        top: 50,
        left: 25,
        zIndex: 1000
      }}
    />
  );
}
