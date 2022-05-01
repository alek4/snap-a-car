import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { BottomSheet, Dialog } from "@rneui/themed";
import { getCarLogo } from "../utils/getCarLogo";
import styles from "../styles/CarDetails/styles";
import timestampToDate from "../utils/timestampToDate";
import MapView, { Marker } from "react-native-maps";
import mapStyle from "../utils/mapStyle";
import { ScrollView } from "react-native-gesture-handler";

export default function CarDetails({
  openDetails,
  setOpenDetails,
  setImageViewer,
}: {
  openDetails: any;
  setOpenDetails: any;
  setImageViewer: any;
}) {
  return (
    <BottomSheet
      isVisible={openDetails.isVisible}
      onBackdropPress={() => {
        setOpenDetails({ isVisible: false, car: undefined });
      }}
    >
      <ScrollView
        style={{
          borderRadius: 15,
          padding: 25,
          backgroundColor: "white",
          maxHeight: 600,
        }}
      >
        <Pressable
          onPress={() => {
            setImageViewer({
              isVisible: true,
              image: openDetails.car?.image,
            });
          }}
        >
          <Image
            source={{ uri: openDetails.car.image }}
            style={styles.image}
          ></Image>
        </Pressable>

        <Image
          source={{
            uri: getCarLogo(openDetails.car.carData.make_name),
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>
          {openDetails.car.carData.model_name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 25,
          }}
        >
          <Text style={styles.text}>Generation:</Text>
          <Text style={styles.text}>
            {openDetails.car.carData.generation_name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 25,
          }}
        >
          <Text style={styles.text}>Years:</Text>
          <Text style={styles.text}>
            {openDetails.car.carData.years[
              openDetails.car.carData.years.length - 1
            ] === "-"
              ? openDetails.car.carData.years.replace("-", "")
              : openDetails.car.carData.years}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 25,
          }}
        >
          <Text style={styles.text}>Seen:</Text>
          <Text style={styles.text}>
            {timestampToDate(openDetails.car.timestamp)}
          </Text>
        </View>
        <Text
          style={{
            ...styles.title,
            marginTop: 40,
            marginBottom: 13,
            fontSize: 28,
            textAlign: "left",
          }}
        >
          Map
        </Text>
        <MapView
          customMapStyle={mapStyle}
          style={{
            width: "100%",
            height: 300,
            borderRadius: 15,
            marginBottom: 50,
          }}
          initialRegion={{
            latitude: openDetails.car.latlng.latitude
              ? openDetails.car.latlng.latitude
              : 37.774929,
            longitude: openDetails.car.latlng.longitude
              ? openDetails.car.latlng.longitude
              : -122.419416,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
          }}
          scrollEnabled={false}
        >
          <Marker key={1} coordinate={openDetails.car.latlng}>
            <View
              style={{
                alignItems: "center",
                borderRadius: 15,
                // padding: 10
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins_700Bold",
                }}
              >
                {openDetails.car.carData.model_name}
              </Text>
              <Image
                resizeMode="cover"
                source={{ uri: openDetails.car.image }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 15,
                  borderWidth: 3,
                  borderColor: "#171717",
                }}
              />
              <View
                style={{
                  width: 0,
                  height: 0,
                  backgroundColor: "transparent",
                  borderStyle: "solid",
                  borderLeftWidth: 10,
                  borderRightWidth: 10,
                  borderBottomWidth: 10,
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderBottomColor: "#171717",
                  transform: [{ rotate: "180deg" }],
                }}
              ></View>
            </View>
          </Marker>
        </MapView>
      </ScrollView>
    </BottomSheet>
  );
}
