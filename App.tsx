import {
  Poppins_400Regular, Poppins_500Medium, Poppins_700Bold,
  Poppins_900Black, useFonts
} from "@expo-google-fonts/poppins";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import AppLoading from "expo-app-loading";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { LogBox, StatusBar } from "react-native";
import "react-native-gesture-handler";
import CustomDrawer from "./components/CustomDrawer";
import AddCarScreen from "./screens/AddCarScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SignIn from "./screens/SignInScreen";
import SignUp from "./screens/SignUpScreen";
import YourCarsScreen from "./screens/YourCarsScreen";
import { auth } from "./services/firebase";
import { GlobalState } from "./utils/GlobalState";

const Drawer = createDrawerNavigator();

export default function App() {

  LogBox.ignoreLogs(['Warning: AsyncStorage has been extracted from react-native core']);
  LogBox.ignoreLogs(['Setting a timer']);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // storeHighScore()
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_900Black,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <StatusBar
          backgroundColor="#171717"
          barStyle="light-content"
        />
        <GlobalState>
          <NavigationContainer>
            <Drawer.Navigator
              drawerContent={(props) => <CustomDrawer {...props} />}
              screenOptions={{
                headerShown: false,
                drawerLabelStyle: { marginLeft: -25 },
                drawerActiveBackgroundColor: "#171717",
                drawerActiveTintColor: "#eee",
                drawerInactiveTintColor: "#333",
                swipeEnabled: false,
              }}
              // initialRouteName="Home"
            >
              {currentUser ? (
                <>
                  <Drawer.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                      drawerIcon: ({ color }) => (
                        <Icon
                          name="home-outline"
                          type="ionicon"
                          color={color}
                        />
                      ),
                    }}
                  />
                  <Drawer.Screen
                    name="Your Cars"
                    component={YourCarsScreen}
                    options={{
                      drawerIcon: ({ color }) => (
                        <Icon
                          name="car-outline"
                          type="ionicon"
                          color={color}
                        />
                      ),
                    }}
                  />
                  <Drawer.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                      drawerIcon: ({ color }) => (
                        <Icon
                          name="settings-outline"
                          type="ionicon"
                          color={color}
                        />
                      ),
                    }}
                  />

                  <Drawer.Screen
                    name="AddCarScreen"
                    component={AddCarScreen}
                    options={{
                      drawerItemStyle: { display: "none" },
                      headerShown: false,
                    }}
                  />
                </>
              ) : (
                <>
                  <Drawer.Screen
                    name="Sign up"
                    component={SignUp}
                    options={{
                      drawerIcon: ({ color }) => (
                        <Icon
                          name="settings-outline"
                          type="ionicon"
                          color={color}
                        />
                      ),
                    }}
                  />
                  <Drawer.Screen
                    name="Sign in"
                    component={SignIn}
                    options={{
                      drawerIcon: ({ color }) => (
                        <Icon
                          name="settings-outline"
                          type="ionicon"
                          color={color}
                        />
                      ),
                    }}
                  />
                </>
              )}
            </Drawer.Navigator>
          </NavigationContainer>
        </GlobalState>
      </>
    );
  }
}
