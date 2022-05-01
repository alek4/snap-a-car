import { View, Text, Dimensions } from "react-native";
import React from "react";
import { FAB, Icon } from "@rneui/themed";
import styles from "../styles/ActionBar/styles";

export default function ActionBar({
  pickImage,
  openCamera,
}: {
  pickImage: any;
  openCamera: any;
}) {
  return (
    <View style={styles.bar}>
      <View
        style={{
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            left: 80,
          }}
        >
          <Icon
            color="#eee"
            onPress={pickImage}
            type="ionicon"
            name="image"
            size={32}
          />
        </View>

        <FAB
          color="#3a3a3a"
          onPress={openCamera}
          icon={{ type: "ionicon", name: "camera", color: "#eee" }}
          size="large"
          style={{
            transform: [{ scale: 1.2 }],
          }}
        />
      </View>
    </View>
  );
}
