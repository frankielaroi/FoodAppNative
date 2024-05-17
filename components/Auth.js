import React, { useState } from "react";
import { Tab } from "react-native-elements";
import { View, Text, Image } from "react-native";
import LoginScreen from "./login";
import SignUp from "./signup";

export default function Authentication() {
  const [index, setIndex] = useState(0);

  return (
    <View
      style={{
        marginTop: 20,
        display: "flex",
        alignContent: "center",
      }}
    >
      <View
        style={{
          borderRadius: 20,
          marginBottom: 5,
          backgroundColor: "white",
        }}
      >
        <Image
          source={require("../assets/Group 3.png")}
          style={{ alignSelf: "center" }}
        />
        <Tab value={index} onChange={setIndex} textColor="#fffff">
          <Tab.Item
            title="Login"
            titleStyle={{
              color: "#FA4A0C",
              borderRadius: 3,
            }}
          />
          <Tab.Item
            title="Sign Up"
            titleStyle={{
              color: "#FA4A0C",
              borderRadius: 3,
            }}
          />
        </Tab>
      </View>
      {index === 0 && <LoginScreen />}
      {index === 1 && (<SignUp/> )}
    </View>
  );
}
