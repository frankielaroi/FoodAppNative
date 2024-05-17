import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Drawer from "react-native-drawer";
import {
    Text,SearchBar} from "react-native-elements";

const LandingPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const toggleDrawerClose = () => {
    setDrawerOpen(!drawerOpen);
  };
  const SideDrawer = () => {
    return (
      <View style={{ backgroundColor: "#fff", paddingTop: 100 }}>
        <TouchableOpacity onPress={toggleDrawerClose}>
          <Ionicons name="close-outline" size={40} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Drawer
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
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
                 <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
        />
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
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

export default LandingPage;
