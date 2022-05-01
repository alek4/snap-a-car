import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import styles from "../styles/CustomDrawer/styles";
import { Icon } from "@rneui/themed";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import context from "../utils/context";

export default function CustomDrawer(props: any) {
  const { deleteContext } = React.useContext(context);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: "#171717",
        }}
      >
        <View
          style={{
            padding: 20,
          }}
        >
          <Image
            source={require("../assets/images/photo-profile.png")}
            style={styles.profile}
          />
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              color: "#eee",
              fontSize: 18,
            }}
          >
            {auth.currentUser?.displayName}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: "Poppins_400Regular",
              color: "#bbb",
            }}
          >
            {auth.currentUser?.email}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            paddingTop: 10,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: "#ccc",
        }}
      >
        <TouchableOpacity
          style={{ paddingVertical: 15 }}
          onPress={() => {
            props.navigation.closeDrawer();
            signOut(auth)
              .then(() => {
                deleteContext();
                console.log("logout");
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Icon
              name="log-out-outline"
              type="ionicon"
              size={32}
            ></Icon>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Poppins_400Regular",
                marginLeft: 8,
                marginTop: 3,
              }}
            >
              Log out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
