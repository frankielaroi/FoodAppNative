import "react-native-gesture-handler"; // Import this at the top of your entry file
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, TouchableOpacity, Text, Platform, StyleSheet } from "react-native";
import { store,persistor } from "./components/utils/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { CartProvider } from "./components/utils/cartContext";
import { PersistGate } from "redux-persist/integration/react";
// Import your screens
import HomeScreen from "./components/home";
import Authentication from "./components/Auth";
import LandingPage from "./components/landing";
import SearchPage from "./components/search";
import PurchaseHistory from "./components/purschaseHistory";
import CartScreen from "./components/cart";
import FoodItemScreen from "./components/foodItem";
import Profile from "./components/userDetails";

// Create the stack navigator
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack navigator for the main content
const MainStack = () => (
  <Stack.Navigator initialRouteName="Start">
    <Stack.Screen
      name="Start"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Home"
      component={LandingPage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Authentication"
      component={Authentication}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Search"
      component={SearchPage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="History"
      component={PurchaseHistory}
      options={{ headerShown: true}}
    />
    <Stack.Screen
      name="FoodItem"
      component={FoodItemScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Cart"
      component={CartScreen}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
    />
  </Stack.Navigator>
);

// Drawer navigator wrapping the main stack
const App = () => {
  const [showImage, setShowImage] = useState(true);

  return (
    <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <CartProvider>
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="LandingPage"
        drawerContent={(props) => <CustomDrawerContent {...props} showImage={showImage} />}
      >
        <Drawer.Screen
          name="MainStack"
          component={MainStack}
          options={{ headerShown: false }}
        />
        {/* Add other screens here if needed */}
      </Drawer.Navigator>
        </NavigationContainer>
    </CartProvider>
      </PersistGate>
    </Provider>
  );
};

// Custom drawer content component
const CustomDrawerContent = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.drawerContainer}>
      <TouchableOpacity
        onPress={() => navigation.closeDrawer()}
        style={styles.closeIconContainer}
      >
        <Ionicons name="close-outline" size={40} color={"white"} />
      </TouchableOpacity>
      <View style={styles.menuContainer}>
        <View style={styles.menuItems}>
          <Text style={styles.menuItem}>
            <Ionicons name="person-circle-outline" size={20} /> Profile{" "}
          </Text>
      <TouchableOpacity onPress={() => navigation.navigate("History")}>
          <Text style={styles.menuItem}>
            <Ionicons name="cart-outline" size={20} /> Orders
          </Text>
          </TouchableOpacity>
          <Text style={styles.menuItem}>
            <Ionicons name="pricetag-outline" size={20} /> Offer and Promo
          </Text>
          <Text style={styles.menuItem}>
            <Ionicons name="receipt-outline" size={20} /> Privacy Policy
          </Text>
          <Text style={styles.menuItem}>
            <Ionicons name="shield-half-outline" size={20} /> Security
          </Text>
        </View>
      </View>
      <Text style={styles.signOutText}>
        Sign-out <Ionicons name="arrow-forward-outline" size={15} />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: "#FA4A0C",
    paddingTop: 50,
    flex: 1,
  },
  closeIconContainer: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
  menuContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 1,
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    padding: 20,
    paddingRight: 0,
    color: "white",
    fontSize: 15,
    fontFamily: Platform.OS === "android" ? "serif" : undefined,
  },
  drawerImage: {
    resizeMode: "contain",
    height: 300,
    width: 200,
    position: 'relative',
    left:30
  },
  signOutText: {
    padding: 20,
    color: "white",
    fontSize: 15,
    fontFamily: Platform.OS === "android" ? "serif" : undefined,
  },
});

export default App;
