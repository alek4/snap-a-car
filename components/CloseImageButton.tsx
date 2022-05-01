import { View, Text } from "react-native";
import React from "react";
import { FAB } from "@rneui/themed";

export default function CloseImageButton({setOpenPhoto}: any) {
  return (
    <FAB
      color="#bebebe50"
      size="small"
      icon={{ name: "close", color: "#171717" }}
      onPress={() => {
        setOpenPhoto({isVisible: false, image: undefined})
      }}
      style={{
        position: "absolute",
        top: 25,
        right: 25,
        zIndex: 10,
      }}
    />
  );
}
