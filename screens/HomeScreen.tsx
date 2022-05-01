import { Icon } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { LocationObject } from "expo-location";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionBar from "../components/ActionBar";
import ErrorMessage from "../components/ErrorMessage";
import LoadingIndicator from "../components/LoadingIndicator";
import Map from "../components/Map";
import MenuButton from "../components/MenuButton";
import getLocation from "../utils/getLocation";
import { API_KEY,API_ENDPOINT } from "@env";

export default function HomeScreen({ navigation }: any) {
  const url =
    "https://api.carnet.ai/v2/mmg/detect?box_offset=0&box_min_width=180&box_min_height=180&box_min_ratio=1&box_max_ratio=3.15&box_select=center&region=DEF";
  const [image, setImage] = useState<any>(null);
  const [carData, setCarData] = useState<any>();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!result.cancelled) {
      const imageURI = result.uri;
      setImage(result.uri);
      postData(url, result.uri).then((data) => {
        handleResult(data, imageURI);
      });
    }
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });

    // console.log(result);

    if (!result.cancelled) {
      const imageURI = result.uri;
      setImage(result.uri);
      postData(url, result.uri).then((data) => {
        handleResult(data, imageURI);
      });
    }
  };

  function handleResult(data: any, imageURI: string) {
    // console.log(data);

    if (data.detections[0].status.code === 0) {
      setCarData(data.detections[0].mmg[0]);
      navigation.navigate("AddCarScreen", {
        image: imageURI,
        carData: data.detections[0].mmg[0],
        location: location,
      });
    } else {
      // console.log("====================================");
      // console.log("car not found");
      // console.log("====================================");
      setVisible(true);
    }
  }

  const postData = async (url = "", data: any) => {
    setIsLoading(true);
    let localUri = data;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append("photo", { uri: localUri, name: filename, type });

    var requestOptions: RequestInit = {
      method: "POST",
      body: formData,
      headers: {
        "content-type": "multipart/form-data",
        "api-key": API_KEY,
      },
    };

    const response = await fetch(
      API_ENDPOINT,
      requestOptions
    );

    setIsLoading(false);
    return response.json(); // parses JSON response into native JavaScript objects
  };

  const [location, setLocation] = useState<
    LocationObject | undefined
  >();

  useEffect(() => {
    (async () => {
      setLocation(await getLocation());
    })();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
        width: "100%",
        padding: 0,
      }}
    >
      <LoadingIndicator isLoading={isLoading} />

      <MenuButton navigation={navigation} variant={"black"} />

      <ErrorMessage isVisible={visible} setVisible={setVisible} />

      {location ? (
        <Map coords={location?.coords} />
      ) : (
        <View
          style={{
            height: "100%",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            name="map-outline"
            type="ionicon"
            size={75}
            color={"#ADADAD"}
          />
        </View>
      )}

      <ActionBar
        pickImage={pickImage}
        openCamera={openCamera}
      ></ActionBar>
    </SafeAreaView>
  );
}
