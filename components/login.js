import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-native-elements";
import { Input } from "react-native-elements";
import { View, Text, StyleSheet, Alert } from "react-native";
import { storeData } from "./storage";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      const response = await axios.post(
        "https://backendnode-skls.onrender.com/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        await storeData("userToken", response.data.token);
        Alert.alert("Success", `Logged in as ${email}`);
        navigation.navigate("LandingPage");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="johndoe@google.com"
        value={email}
        label="Email"
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        style={styles.input}
        placeholder="****|***"
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        buttonStyle={{
          backgroundColor: "#FA4A0C",
          borderRadius: 3,
        }}
        title="Login"
        onPress={handleLogin}
      />
      <Text
        onPress={() => console.log("fuck")}
        style={{
          alignSelf: "center",
          paddingTop: 20,
          color: "#FA4A0C",
        }}
      >
        Forgot Password
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default LoginScreen;
