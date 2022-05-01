import { View, Text, Modal } from "react-native";
import React from "react";
import { MaterialIndicator } from "react-native-indicators";

export default function LoadingIndicator({
  isLoading,
}: {
  isLoading: boolean;
}) {
  return (
    <Modal visible={isLoading} transparent={true}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000de",
        }}
      >
        <MaterialIndicator size={60} color="#eeeeee90" />
      </View>
    </Modal>
  );
}
