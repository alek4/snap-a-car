import { Dialog, Icon } from "@rneui/themed";
import React from "react";
import { Text } from "react-native";
import styles from "../styles/ErrorMessage/styles";

export default function ErrorMessage({
  isVisible,
  setVisible,
}: {
  isVisible: boolean;
  setVisible: any;
}) {
  return (
    <Dialog
      animationType="fade"
      isVisible={isVisible}
      onBackdropPress={() => {
        setVisible(false);
      }}
      overlayStyle={{
        borderRadius: 15,
      }}
    >
      <Icon
        name="alert-circle-outline"
        type="ionicon"
        color="#ff4246"
        size={90}
      />
      <Dialog.Title
        title="Vehicle Not Found"
        titleStyle={{
          color: "black",
        }}
        titleProps={{
          style: styles.title,
        }}
      />
      <Text style={styles.text}>
        We are sorry, try to take another photo with the car in frame.
      </Text>
      <Dialog.Button
        title={"OK"}
        titleStyle={{
          color: "#eee",
        }}
        buttonStyle={styles.button}
        onPress={() => {
          setVisible(false);
        }}
      />
    </Dialog>
  );
}
