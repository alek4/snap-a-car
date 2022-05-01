import { StyleSheet } from "react-native";

export default StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderRadius: 15,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "center",
    alignSelf: "center",
    marginVertical: 15,
    transform: [{ scale: 1.4 }],
  },
  text: {
    fontFamily: "Poppins_400Regular",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  }
});
