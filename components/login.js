import axios from "axios";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "./utils/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { jwt_decode } from "jwt-decode-es";
const LoginScreen = () => {
  const navigation = useNavigation();
  const dispach = useDispatch();
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
        const decodedToken = jwt_decode(response.data.token);
        console.log(decodedToken); // Log the decoded token to see its structure

        const user = {
          id: decodedToken._id, // Update this if the field name is different
          token: response.data.token,
          email,
        };

        dispach(login(user))
        Alert.alert("Success", `Logged in as ${email}`);
        console.log(user.id)
        navigation.navigate("Home");
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
        onPress={() => console.log("Forgot Password")}
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
