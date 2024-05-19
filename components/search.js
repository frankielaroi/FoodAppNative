import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Image, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import {useNavigation} from '@react-navigation/native'

const SearchPage = ({ route }) => {
  const navigation = useNavigation()
  const { searchText } = route.params;
  const [searchTerm, setSearchTerm] = useState(searchText);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "https://backendnode-skls.onrender.com/search",
        {
          params: { query: searchTerm },
        }
      );
      setResults(response.data);
    } catch (err) {
      if (err.response && err.response.status === 500) {
        console.error("Error searching for food: Internal Server Error");
        setError("Error searching for food. Please try again later.");
      } else {
        console.error("Error searching for food:", err);
        setError("Error searching for food.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestions = async (text) => {
    setSearchTerm(text);
    if (text.trim() === "") {
      setSuggestions([]);
    } else {
      try {
        const response = await axios.get(
          "https://backendnode-skls.onrender.com/search",
          {
            params: { query: text },
          }
        );
        setSuggestions(response.data);
      } catch (err) {
        if (err.response && err.response.status === 500) {
          console.error("Error fetching suggestions: Internal Server Error");
          setError("Error fetching suggestions. Please try again later.");
        } else {
          console.error("Error fetching suggestions:", err);
          setError("Error fetching suggestions.");
        }
      }
    }
    handleSearch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
          <Ionicons name="chevron-back-outline" size={20} style={styles.searchIcon} onPress={() => navigation.navigate("LandingPage", { searchText })} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            value={searchText}
        onChangeText={handleSuggestions}
          />
        </View>
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => (item.id ? item.id.toString() : "")}
          renderItem={({ item }) => (
            <Text
              style={styles.suggestion}
              onPress={() => {
                setSearchTerm(item.title);
                setSuggestions([]);
              }}
            >
              {item.name}
            </Text>
          )}
        />
      )}
      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={results}
        keyExtractor={(item) => (item.id ? item.id.toString() : "")}
        renderItem={({ item }) => (
          <View style={styles.resultContainer}>
            <View style={{ alignItems: 'center' }}>
              <View style={{backgroundColor:'#F9F9F9',borderRadius:100, bottom: 30,top:-20,  shadowColor: '#000',shadowOffset: { width: -0.1, height: -0.1 },shadowOpacity:0.3,shadowRadius: -2,elevation: -19,}}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#F9F9F9",
    height: "200",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  item: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  errorText: {
    color: "red",
  },
  suggestion: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  resultContainer: {
    marginVertical: 30,
    height:'80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    flex: 1,
    fontSize: 22,
    fontWeight:'bold'
  },
  price: {
    flex: 1,
    color: '#FA4A0C',
    fontSize:'17%'
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
});

export default SearchPage;
