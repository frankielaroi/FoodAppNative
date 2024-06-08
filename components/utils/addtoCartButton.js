// AddToCartButton.js
import React, { useContext } from "react";
import { Button } from "react-native-elements";
import { CartContext } from "./cartContext";

const AddToCartButton = ({ item }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Button
      title="Add to Cart"
      onPress={() => addToCart(item)}
      buttonStyle={{ backgroundColor: "#FA4A0C", borderRadius: 10 }}
    />
  );
};

export default AddToCartButton;