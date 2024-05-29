import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Image } from "react-native-elements";
import axios from "axios";

const initialLayout = { width: Dimensions.get('window').width };

const FoodTabView = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "breakfast", title: "breakfast" },
    { key: "lunch", title: "Lunch" },
    { key: "dinner", title: "Dinner" },
    { key: "dessert", title: "Dessert" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'breakfast':
        return <FoodList category="breakfast" key={route.key} />;
      case 'lunch':
        return <FoodList category="lunch" key={route.key} />;
      case 'dinner':
        return <FoodList category="dinner" key={route.key} />;
      case 'dessert':
        return <FoodList category="dessert" key={route.key} />;
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          labelStyle={styles.tabLabel}
        />
      )}
    />
  );
};

const FoodList = ({ category }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://backendnode-skls.onrender.com/foods?category=${category}`
        );
        setFoodItems(response.data);
      } catch (err) {
        setError("Error fetching food items");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [category]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <FlatList
      data={foodItems}
      numColumns={2}
      keyExtractor={(item, index) => `${category}-${index}`}
      renderItem={({ item }) => (
        <View style={styles.resultContainer}>
            <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
              <View style={{backgroundColor:'#F2F2F2',borderRadius:100, bottom: 30,top:-20,  shadowColor: '#000',shadowOffset: { width: -0.1, height: -0.1 },shadowOpacity:0.3,shadowRadius: -2,elevation: -19,}}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.resultImage}
                PlaceholderContent={<ActivityIndicator />}
                />
              </View>
              <Text style={styles.resultText}>{item.name}</Text>
              <Text style={styles.price}>GH₵{item.price}</Text>
            </View>
          </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
  },
  indicator: {
    backgroundColor: "#FA4A0C",
  },
  tabLabel: {
    color: "#000000",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    margin: 16,
  },
  foodItem: {
    marginVertical: 150,
    padding: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  foodPrice: {
    color: "#FA4A0C",
    fontSize: 16,
  },
  resultContainer: {
    marginVertical: 10,
    height:200,
    display: 'flex',
    flexDirection: 'column',
    width: 150,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  resultImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",    
    
  },
  resultText: {
    fontSize: 20,
    fontWeight:'bold'
  },
  price: {
    color: '#FA4A0C',
    fontSize:15
  },
});

export default FoodTabView;
