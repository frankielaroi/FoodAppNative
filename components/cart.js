import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { CartContext } from "./utils/cartContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import Swipeable from "react-native-gesture-handler/Swipeable";

const CartScreen = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={(progress, dragX) => (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeFromCart(item.id)}
        >
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      )}
    >
      <View style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{`#${item.price}`}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() =>
                updateQuantity(item.id, Math.max(item.quantity - 1, 1))
              }
            >
              <Ionicons
                name="remove-circle-outline"
                size={24}
                color="#FF460A"
              />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Ionicons name="add-circle-outline" size={24} color="#FF460A" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart</Text>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.cartList}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.completeOrderButton}>
          <Text style={styles.completeOrderText}>Complete order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  cartList: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemDetails: {
    marginLeft: 10,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    color: "#FF460A",
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  favoriteButton: {
    backgroundColor: "#FF460A",
    borderRadius: 50,
    padding: 10,
  },
  deleteButton: {
    backgroundColor: "#FF460A",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginTop: 10,
  },
  completeOrderButton: {
    backgroundColor: "#FF460A",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  completeOrderText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CartScreen;
