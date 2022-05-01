import { View, Text } from "react-native";
import React from "react";
import { Icon, Input } from "@rneui/themed";

type AutoCompleteType =
  | "cc-csc"
  | "cc-exp"
  | "cc-exp-month"
  | "cc-exp-year"
  | "cc-number"
  | "email"
  | "name"
  | "password"
  | "postal-code"
  | "street-address"
  | "tel"
  | "username"
  | "off"
  | undefined;

export default function InputField({
  placeholder,
  type,
  value,
  onChangeText,
  errorMessage,
  disabled = false,
  reference,
}: {
  placeholder: string;
  type: AutoCompleteType;
  value: string;
  onChangeText: any;
  errorMessage?: string;
  disabled?: boolean;
  reference?: any;
}) {
  let icon_name = "";
  switch (type) {
    case "password":
      icon_name = "lock-closed-outline";
      break;
    case "email":
      icon_name = "at-outline";
      break;
    case "off":
      if (placeholder === "Full name") {
        icon_name = "person-outline";
      }
    default:
      break;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          // flex: 1,
          backgroundColor: "#ddd",
          borderRadius: 15,
          paddingHorizontal: 20,
          paddingTop: 13,
          paddingBottom: 13,
          flexDirection: "row",
          alignItems: "center",
          marginBottom: errorMessage ? 5 : 20,
          borderColor: errorMessage ? "#ff4246" : undefined,
          borderWidth: errorMessage ? 3 : 0,
        }}
      >
        <Icon
          name={icon_name}
          type="ionicon"
          color={"#7A869A"}
          style={{
            marginRight: 15,
          }}
        />
        <Input
          ref={reference}
          disabled={disabled}
          secureTextEntry={type === "password"}
          placeholder={placeholder}
          autoCompleteType={type}
          autoCapitalize={type === "off" ? "words" : "none"}
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={"#7A869A"}
          style={{
            flex: 1,
            color: "#171717",
            fontSize: 16,
            padding: 0,
            margin: 0,
            paddingTop: 3,
            fontFamily: "Poppins_400Regular",
          }}
          inputStyle={{}}
          containerStyle={{
            paddingHorizontal: 0,
            flexShrink: 1,
          }}
          inputContainerStyle={{
            padding: 0,
            borderBottomWidth: 0,
          }}
          errorStyle={{ display: "none" }}
        />
      </View>
      <Text
        style={{
          marginBottom: 15,
          display: errorMessage ? "flex" : "none",
          color: "#ff4246",
          marginLeft: 25,
        }}
      >
        {errorMessage}
      </Text>
    </View>
  );
}
