import { View, Text, Pressable } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";

export default function EditButton({ onPress }: { onPress?: any }) {
  return (
    <Pressable
      style={{
        backgroundColor: "#171717",
        padding: 15,
        justifyContent: "center",
        borderRadius: 15,
        height: 65,
        width: 65,
        marginLeft: 15,
      }}
      onPress={onPress}
    >
      <Icon name={"create-outline"} type="ionicon" color={"#eee"} />
    </Pressable>
  );
}
