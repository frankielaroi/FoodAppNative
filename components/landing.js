import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Platform
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Drawer from "react-native-drawer";
import { Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const LandingPage = () => {
  const navigation = useNavigation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const SideDrawer = () => (
    <View
      style={{
        backgroundColor: "#FA4A0C",
        paddingTop: 50,
        height: 700,
        width: "500",
      }}
    >
      <TouchableOpacity
        onPress={closeDrawer}
        style={{
          alignSelf: "flex-end",
          marginRight: 20,
        }}
      >
        <Ionicons name="close-outline" size={40} color={"white"} />
      </TouchableOpacity>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View>
          <Text
            style={{
              padding: 20,
              color: "white",
              fontSize: 15,
              fontFamily: Platform.OS === 'android' ? 'serif' : undefined,
            }}
          >
            <Ionicons name="person-circle-outline" size={20} /> Profile{" "}
          </Text>
          <Text
            style={{
              padding: 20,
              color: "white",
              fontSize: 15,
              fontFamily: Platform.OS === 'android' ? 'serif' : undefined,
            }}
          >
            <Ionicons name="cart-outline" size={20} /> Orders
          </Text>
          <Text
            style={{
              padding: 20,
              color: "white",
              fontSize: 15,
              fontFamily: Platform.OS === 'android' ? 'serif' : undefined,
            }}
          >
            <Ionicons name="pricetag-outline" size={20} /> offer and promo
          </Text>
          <Text
            style={{
              padding: 20,
              color: "white",
              fontSize: 15,
              fontFamily: Platform.OS === 'android' ? 'serif' : undefined,
            }}
          >
            <Ionicons name="receipt-outline" size={20} /> Privacy policy
          </Text>
          <Text
            style={{
              padding: 20,
              color: "white",
              fontSize: 15,
              fontFamily: Platform.OS === 'android' ? 'serif' : undefined,
            }}
          >
            <Ionicons name="shield-half-outline" size={20} /> Security
          </Text>
        </View>
        <Image
          source={require("../assets/image 10.png")}
          style={{
            resizeMode: "contain",
            alignSelf: "flex-start",
            height: 500,
            width: 185,
          }}
        />
      </View>
      <Text
        style={{
          padding: 20,
          color: "white",
          fontSize: 15,
          fontFamily: Platform.OS === 'android' ? 'serif' : undefined,
        }}
      >
        {" "}
        Sign-out <Ionicons name="arrow-forward-outline" size={15} />
      </Text>
    </View>
  );

  return (
    <Drawer
      open={drawerOpen}
      onClose={closeDrawer}
      type="overlay"
      content={<SideDrawer />}
    >
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Ionicons name="menu-outline" size={30} />
          </TouchableOpacity>
          <Ionicons name="cart-outline" size={30} />
        </View>
        <Text
          h2
          style={{
            textAlign: "left",
            padding: 20,
            width: 250,
          }}
        >
          Delicious Food For You
        </Text>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search-outline" size={20} style={styles.searchIcon} onPress={() => navigation.navigate("Search", { searchText })} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => navigation.navigate("Search", { searchText })}
          />
        </View>
      </View>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 59,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  searchBar: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
});

export default LandingPage;
