import * as Location from "expo-location";

export default async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return undefined;
  }

  let location = await Location.getCurrentPositionAsync({});
  // console.log("====================================");
  // console.log(location);
  // console.log("====================================");
  return location;
};
