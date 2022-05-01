import { Image, Modal } from "react-native";
import React from "react";
import CloseImageButton from "./CloseImageButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Zoom } from "react-native-reanimated-zoom";
import styles from "../styles/ImageViewer/styles";

export default function ImageViewer({
  isVisible,
  imageURI,
  setOpenPhoto,
}: {
  isVisible: boolean;
  imageURI: string | undefined;
  setOpenPhoto: any;
}) {  
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
    >
      <CloseImageButton setOpenPhoto={setOpenPhoto} />
      <GestureHandlerRootView
        style={styles.background}
      >
        <Zoom maximumZoomScale={2}>
          <Image
            source={{ uri: imageURI }}
            style={styles.image}
          />
        </Zoom>
      </GestureHandlerRootView>
    </Modal>
  );
}
