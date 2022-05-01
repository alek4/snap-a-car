import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Car from "../components/Car";
import CarDetails from "../components/CarDetails";
import CarOptions from "../components/CarOptions";
import ImageViewer from "../components/ImageViewer";
import MenuButton from "../components/MenuButton";
import styles from "../styles/YourCarsScreen/styles";
import context from "../utils/context";

export default function YourCarsScreen({ navigation }: any) {
  const renderItem = ({ item, index }: any) => (
    <Car
      car={item}
      id={index}
      setOpenDetails={setOpenDetails}
      setIsVisibleBottomSheet={setIsVisibleBottomSheet}
    />
  );

  const { cars } = React.useContext(context);

  const [openDetails, setOpenDetails] = useState<{
    isVisible: boolean;
    car: { carData: any; image: string } | undefined;
  }>({
    isVisible: false,
    car: undefined,
  });

  const [openPhoto, setOpenPhoto] = useState<{
    isVisible: boolean;
    image: string | undefined;
  }>({ isVisible: false, image: undefined });

  const [isVisibleBottomSheet, setIsVisibleBottomSheet] = useState<{
    isVisible: boolean;
    carName: string | undefined;
    carId: number | undefined;
  }>({ isVisible: false, carName: undefined, carId: undefined });

  return (
    <SafeAreaView style={styles.background}>
      <ImageViewer
        isVisible={openPhoto.isVisible}
        imageURI={openPhoto.image}
        setOpenPhoto={setOpenPhoto}
      />

      {openDetails.car ? (
        <CarDetails
          openDetails={openDetails}
          setOpenDetails={setOpenDetails}
          setImageViewer={setOpenPhoto}
        />
      ) : undefined}

      <MenuButton navigation={navigation} variant="white" />

      <Text style={styles.title}>Your Cars</Text>

      {cars.length > 0 ? (
        <View
          style={{
            paddingBottom: 50,
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={cars}
            renderItem={renderItem}
            keyExtractor={(_, i) => i.toString()}
          ></FlatList>
        </View>
      ) : (
        <View>
          <Text
            style={styles.noCarsText}
          >
            No cars to display
          </Text>
        </View>
      )}

      <CarOptions
        setIsVisibleBottomSheet={setIsVisibleBottomSheet}
        isVisibleBottomSheet={isVisibleBottomSheet}
      />
    </SafeAreaView>
  );
}
