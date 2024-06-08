import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";

const PurchaseHistory = ({}) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const userId = useSelector((state)=> state.user.user.id)
  useEffect(() => {
    fetchPurchaseHistory();
  }, []);

  const fetchPurchaseHistory = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://backendnode-skls.onrender.com/orders/user/${userId}`
      );

      setHistory(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No orders found for this user.");
      } else {
        setError("Error fetching purchase history.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    // Parse the createdAt string into a JavaScript Date object
    const createdAtDate = new Date(item.createdAt);
    // Format the date to display in a standard format
    const formattedDate = createdAtDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    return (
      <View style={styles.item}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: item.items[0].imageUrl }}
            style={styles.resultImage}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <Text style={styles.itemText}>{item.items[0].foodName}</Text>
        <Text style={styles.dateText}>Purchased on: {formattedDate}</Text>
        <Text style={styles.quantityText}>
          Quantity: {item.items[0].quantity}
        </Text>
        <Text style={styles.priceText}>Total: GH₵{item.totalAmount}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F2F2F2",
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  imageWrapper: {
    backgroundColor: "#F2F2F2",
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  resultImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  dateText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 2,
  },
  quantityText: {
    fontSize: 16,
    marginVertical: 2,
  },
  priceText: {
    color: "#FA4A0C",
    fontSize: 16,
    marginVertical: 2,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default PurchaseHistory;
