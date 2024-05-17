import React, { useState } from "react";
import axios from "axios";
import { ScrollView, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeData } from "./storage";
import { Button, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
    const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!firstName) {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (!lastName) {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://backendnode-skls.onrender.com/users",
          {
            firstName,
            lastName,
            email,
            password,
            role,
          }
        );

        if (response.status === 201) {
          Alert.alert("Success", `Logged in as ${email}`);
        await storeData("userToken", response.data.token);
            navigation.navigate("LandingPage");
        } else {
          Alert.alert("Error", response.data.message || "An error occurred");
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input
        placeholder="First Name"
        name="firstName"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        errorMessage={errors.firstName}
        required
      />
      <Input
        placeholder="Last Name"
        name="lastName"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        errorMessage={errors.lastName}
        required
      />
      <Input
        placeholder="Email"
        name="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        errorMessage={errors.email}
        required
      />
      <Input
        placeholder="Password"
        name="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        errorMessage={errors.password}
        required
      />
      <Button
        title="Sign Up"
        buttonStyle={styles.button}
        onPress={handleSubmit}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    width: 300,
    height: 50,
    backgroundColor: "#FA4A0C",
    alignSelf: "center",
  },
});
