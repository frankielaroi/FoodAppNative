import React from "react";
import {  Button} from "react-native-elements";
import { Text, Image, ScrollView } from "react-native";

export default function Intro({ navigation }) {
  return (
    <ScrollView
      style={{
        display: "flex",
        flex: 1,
        backgroundColor: "#FA4A0C",
        width: 375,
        paddingTop: 50,
      }}
    >
      <Text
        style={{
          fontSize: 50,
          color: "#FFFFFF",
          marginLeft: 20,
        }}
      >
        Food For Everyone
      </Text>
      <Image
        source={require("../assets/Screenshot 2024-05-03 125000.png")}
        style={{
          resizeMode: "cover",
          width: 380,
          height: 400,
        }}
      />
      <Button
        title="Get Started"
        color={"#FFFFFF"}
        buttonStyle={{
          borderRadius: 20,
          width: 300,
          height: 50,
          backgroundColor: "#FFFFFF",
          alignSelf: "center",
        }}
        titleStyle={{
          color: "#FA4A0C",
        }}
        onPress={() => navigation.navigate("Authentication")}
      />
    </ScrollView>
  );
}
