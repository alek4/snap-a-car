import { Button, FAB } from "@rneui/themed";
import { LocationObject } from "expo-location";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import styles from "../styles/AddCarScreen/styles";
import context from "../utils/context";
import * as Location from "expo-location";
import getLocation from "../utils/getLocation";

export default function AddCarScreen({ route, navigation }: any) {
  const { image, carData }: { image: string; carData: any } =
    route.params;

  const { addNewCar } = React.useContext(context);

  return (
    <SafeAreaView style={styles.background}>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          paddingHorizontal: 30,
          marginBottom: 25,
        }}
      >
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: 450, borderRadius: 15 }}
          resizeMode="center"
        />
      </View>
      <Text style={{ fontSize: 20, color: "#eee" }}>
        {carData.make_name}
      </Text>
      <Text style={{ fontSize: 32, color: "#eee" }}>
        {carData.model_name}
      </Text>

      <View
        style={{
          flexDirection: "row",
          marginTop: 40,
        }}
      >
        <Button
          title="Add"
          buttonStyle={{ backgroundColor: "#36AB49" }}
          containerStyle={{
            marginRight: 25,
          }}
          titleStyle={{ color: "#eee", marginHorizontal: 20 }}
          onPress={async () => {
            const location = await getLocation();
            const latlng = location
              ? {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }
              : undefined;
            const timestamp = location
              ? location.timestamp
              : undefined;
            const car_obj = {
              carData,
              image,
              latlng,
              timestamp,
            };
            addNewCar(car_obj);
            navigation.goBack();
          }}
        />
        <Button
          title="Cancel"
          buttonStyle={{ backgroundColor: "#FF4246" }}
          containerStyle={{
            marginLeft: 25,
          }}
          titleStyle={{ color: "#eee", marginHorizontal: 20 }}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </SafeAreaView>
  );
}
