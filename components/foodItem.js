// FoodItemScreen.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const FoodItemScreen = ({ route }) => {
  const { foodId, foodName, foodDescription, foodImage,foodPrice } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{foodName}</Text>
      <Image source={{ uri: foodImage }} style={styles.image} />
          <Text style={styles.description}>{foodDescription}</Text>
          <Text>{foodPrice}</Text>
          <Text>All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    height: 300,
    marginBottom: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 24,
    color: "#666",
  },
});

export default FoodItemScreen;
