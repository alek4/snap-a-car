import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'

export default function Car({ car, id, setOpenDetails, setIsVisibleBottomSheet }: { car: any, id: any, setOpenDetails: any, setIsVisibleBottomSheet: any}) {

  return (
    <Pressable
      onPress={() => {
        setOpenDetails({ isVisible: true, car: car });
      }}
      onLongPress={() => {
        setIsVisibleBottomSheet({
          isVisible: true,
          carName: car.carData.model_name,
          carId: id,
        })
      }}
    >
      <View
        style={{
          backgroundColor: "#242424",
          borderRadius: 15,
          paddingHorizontal: 20,
          paddingVertical: 25,
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Image
          source={{ uri: car.image }}
          style={{
            width: 150,
            height: 110,
            resizeMode: "cover",
            borderRadius: 15,
          }}
        />
        <View
          style={{
            marginLeft: 35,
          }}
        >
          {/* <Image
            source={{ uri: getCarLogo(car.carData.make_name) }}
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
            }}
          /> */}
          <Text style={{
              width: 135,
              color: "white",
              flexShrink: 1,
              flexWrap: "wrap",
              fontFamily: "Poppins_700Bold",
              fontSize: 18,
            }}>{car.carData.make_name}</Text>
          <Text
            style={{
              width: 135,
              color: "white",
              flexShrink: 1,
              flexWrap: "wrap",
              fontFamily: "Poppins_400Regular",
              fontSize: 14,
            }}
          >
            {car.carData.model_name}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}