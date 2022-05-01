import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MenuButton from "../components/MenuButton";
import InputField from "../components/InputField";
import { auth } from "../services/firebase";
import { Button, Icon, Input } from "@rneui/themed";
import EditButton from "../components/EditButton";
import {
  sendPasswordResetEmail,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import handleErrorMessage from "../utils/handleErrorMessage";

export default function SettingsScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [errMess, setErrMess] = useState("");

  const [editFullName, setEditFullName] = useState(false);
  const editName = useRef();

  const [editEmail, setEditEmail] = useState(false);
  const editMail = useRef();

  useEffect(() => {
    setFullName(auth.currentUser!.displayName as string);
    setEmail(auth.currentUser!.email as string);
  }, []);

  useEffect(() => {
    editName!.current.focus();
  }, [editFullName]);

  useEffect(() => {
    editMail!.current.focus();
  }, [editEmail]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#eee",
        paddingHorizontal: 25,
        paddingTop: 50,
      }}
    >
      <MenuButton navigation={navigation} variant={"black"} />
      <Text
        style={{
          textAlign: "right",
          color: "#171717",
          textTransform: "capitalize",
          fontFamily: "Poppins_700Bold",
          fontSize: 42,
          marginBottom: 25,
        }}
      >
        Settings
      </Text>
      <ScrollView>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Profile
        </Text>

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
            disabled={!editFullName}
            reference={editName}
          />
          <EditButton
            onPress={() => {
              setEditFullName(!editFullName);
            }}
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
            errorMessage={errMess.includes("Email") ? errMess : ""}
            disabled={!editEmail}
            reference={editMail}
          />
          <EditButton
            onPress={() => {
              setEditEmail(!editEmail);
            }}
          />
        </View>

        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Change password
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <InputField
            value={"xxxxxxxxx"}
            type={"password"}
            placeholder={"Password"}
            onChangeText={setEmail}
            errorMessage={errMess.includes("Password") ? errMess : ""}
            disabled={true}
          />
          <EditButton
            onPress={() => {
              sendPasswordResetEmail(auth, email)
                .then(() => {
                  console.log("password reset");
                })
                .catch((error) => {
                  const errorCode = error.code;

                  const errorMessage = handleErrorMessage(
                    error.message
                  );

                  setErrMess(errorMessage);
                });
            }}
          />
        </View>
        <Button
          title={"Save"}
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
          onPress={() => {
            if (auth.currentUser) {
              if (editEmail) {
                updateEmail(auth.currentUser, email)
                  .then(() => {
                    console.log("mail updated");
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    console.log(error);
                    const errorMessage = handleErrorMessage(
                      error.message
                    );

                    setErrMess(errorMessage);
                    setEmail(auth.currentUser!.email as string);
                  });
              }

              if (editFullName) {
                updateProfile(auth.currentUser, {
                  displayName: fullName,
                })
                  .then(() => {
                    console.log("fullName updated");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }

              setEditEmail(false);
              setEditFullName(false);
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
