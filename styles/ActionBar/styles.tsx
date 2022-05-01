import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  bar: {
    backgroundColor: "#171717",
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 100,
    width: Dimensions.get("window").width - 50,
    borderRadius: 15,
    margin: 25,
  },
});
