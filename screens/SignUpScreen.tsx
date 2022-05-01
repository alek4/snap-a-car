import { Button } from "@rneui/themed";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import InputField from "../components/InputField";
import { auth } from "../services/firebase";
import styles from "../styles/SignUpScreen/styles";
import handleErrorMessage from "../utils/handleErrorMessage";

export default function SignUp({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errMess, setErrMess] = useState("");
  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.title}>Sign up</Text>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <InputField
          value={fullName}
          type={"off"}
          placeholder={"Full name"}
          onChangeText={setFullName}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <InputField
          value={email}
          type={"email"}
          placeholder={"Email"}
          onChangeText={setEmail}
          errorMessage={errMess.includes("Email") || errMess.includes("User") ? errMess : ""}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <InputField
          value={password}
          type={"password"}
          placeholder={"Password"}
          onChangeText={setPassword}
          errorMessage={errMess.includes("Password") ? errMess : ""}
        />
      </View>

      <Button
        title="Sign up"
        onPress={() =>
          createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
              // Signed in
              const user = userCredential.user;
              await updateProfile(user, {
                displayName: fullName,
              });
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = handleErrorMessage(error.message);

              setErrMess(errorMessage);
              console.log(errorCode, errorMessage);
            })
        }
        titleStyle={{
          fontFamily: "Poppins_500Medium",
          fontSize: 16,
          marginTop: 3,
        }}
        buttonStyle={{
          paddingVertical: 10,
          backgroundColor: "#171717",
        }}
        containerStyle={{
          borderRadius: 10,
          marginTop: 15,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 15,
        }}
      >
        <Text
          style={{
            color: "#7A869A",
            fontFamily: "Poppins_400Regular",
          }}
        >
          Already have an account?{" "}
        </Text>
        <Text
          style={{
            color: "#171717",
            fontFamily: "Poppins_500Medium",
          }}
          onPress={() => navigation.navigate("Sign in")}
        >
          Sign in
        </Text>
      </View>
    </SafeAreaView>
  );
}
