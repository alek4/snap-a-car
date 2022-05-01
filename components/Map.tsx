import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import mapStyle from "../utils/mapStyle";
import context from "../utils/context";
import timestampToDate from "../utils/timestampToDate";

export default function Map({ coords }: { coords: any }) {
  const { cars } = React.useContext(context);

  return (
    <View>
      <MapView
        customMapStyle={mapStyle}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
          zIndex: -1,
        }}
        initialRegion={{
          latitude: coords.latitude ? coords.latitude : 37.774929,
          longitude: coords.longitude
            ? coords.longitude
            : -122.419416,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {cars.map((car, index) => {
          if (car.latlng) {
            return (
              <Marker
                key={index}
                coordinate={car.latlng}
                // title={car.carData.model_name}
                // description={timestampToDate(car.timestamp)}
              >
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
                    {car.carData.model_name}
                  </Text>
                  <Image
                    resizeMode="cover"
                    source={{ uri: car.image }}
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
            );
          }
        })}
      </MapView>
    </View>
  );
}
