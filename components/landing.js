import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import FoodTabView from "./categories";

const LandingPage = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
          <Ionicons name="cart-outline" size={30} />
        </TouchableOpacity>
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
        <Ionicons
          name="search-outline"
          size={20}
          style={styles.searchIcon}
          onPress={() => navigation.navigate("Search", { searchText })}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={() => navigation.navigate("Search", { searchText })}
        />
      </View>
      <FoodTabView />
      <View style={styles.footerContainer}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>navigation.navigate("History")}>
          <Ionicons name="refresh-outline" size={30}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 59,
    backgroundColor: '#F2F2F2',
    height: '100%',
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
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
});

export default LandingPage;
