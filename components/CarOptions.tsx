import { View, Text, Pressable } from "react-native";
import React from "react";
import { BottomSheet, Icon } from "@rneui/themed";
import context from "../utils/context";

export default function CarOptions({
  isVisibleBottomSheet,
  setIsVisibleBottomSheet,
}: {
  isVisibleBottomSheet: {
    isVisible: boolean;
    carName: string | undefined;
    carId: number | undefined;
  };
  setIsVisibleBottomSheet: React.Dispatch<
    React.SetStateAction<{
      isVisible: boolean;
      carName: string | undefined;
      carId: number | undefined;
    }>
  >;
}) {
  const { deleteCar } = React.useContext(context);

  return (
    <BottomSheet
      isVisible={isVisibleBottomSheet.isVisible}
      onBackdropPress={() =>
        setIsVisibleBottomSheet({
          isVisible: false,
          carName: undefined,
          carId: undefined,
        })
      }
    >
      <View
        style={{
          backgroundColor: "#171717",
        }}
      >
        <Pressable
          onPress={() => {
            if (isVisibleBottomSheet.carId !== undefined) {
              deleteCar(isVisibleBottomSheet.carId);
              setIsVisibleBottomSheet({
                isVisible: false,
                carName: undefined,
                carId: undefined,
              });
            }
          }}
        >
          <View
            style={{
              backgroundColor: "#FF4246",
              paddingVertical: 15,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "baseline",
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}
          >
            <Icon
              size={28}
              color={"#eee"}
              name={"trash-outline"}
              type={"ionicon"}
            ></Icon>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  color: "#eee",
                  fontFamily: "Poppins_700Bold",
                  marginRight: 5,
                }}
              >
                Delete
              </Text>
              <Text
                style={{
                  color: "#eee",
                  fontFamily: "Poppins_400Regular",
                }}
              >
                {isVisibleBottomSheet.carName}?
              </Text>
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            setIsVisibleBottomSheet({
              isVisible: false,
              carName: undefined,
              carId: undefined,
            });
          }}
        >
          <View style={{ paddingVertical: 15 }}>
            <Icon
              size={32}
              name="close-circle-outline"
              type="ionicon"
              color={"#ADADAD"}
              style={{ textAlign: "center" }}
            />
          </View>
        </Pressable>
      </View>
    </BottomSheet>
  );
}
