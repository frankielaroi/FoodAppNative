/**
 * The SearchPage component is responsible for handling the search functionality in the application.
 * It allows the user to search for items, displays the search results, and provides search suggestions.
 *
 * @param {Object} route - The route object containing the search text parameter.
 * @param {string} route.searchText - The initial search text passed from the previous screen.
 * @returns {JSX.Element} - The SearchPage component.
 */
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Image } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

// SearchPage component
const SearchPage = ({ route }) => {
  // Get the navigation object from the useNavigation hook
  const navigation = useNavigation();
  // Get the searchText parameter from the route
  const { searchText } = route.params;
  // State variables
  const [searchTerm, setSearchTerm] = useState(searchText); // Search term
  const [results, setResults] = useState([]); // Search results
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message
  const [suggestions, setSuggestions] = useState([]); // Search suggestions

  // Perform search when searchText changes
  useEffect(() => {
    handleSearch();
  }, [searchText]);

  // Function to handle search
  const handleSearch = async () => {
    setLoading(true); // Set loading state to true
    setError(""); // Clear error message

    try {
      // Make a GET request to the search API
      const response = await axios.get(
        "https://backendnode-skls.onrender.com/search",
        {
          params: { query: searchTerm },
        }
      );

      setResults(response.data); // Update search results
    } catch (err) {
      // Handle errors
      if (err.response && err.response.status === 500) {
        console.error("Error searching for food: Internal Server Error");
        setError("Error searching for food. Please try again later.");
      } else {
        console.error("Error searching for food:", err);
        setError("Error searching for food.");
      }
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // Function to handle search suggestions
  const handleSuggestions = async (text) => {
    setSearchTerm(text); // Update search term

    if (text.trim() === "") {
      setSuggestions([]); // Clear suggestions if search term is empty
    } else {
      try {
        // Make a GET request to the search API for suggestions
        const response = await axios.get(
          "https://backendnode-skls.onrender.com/search",
          {
            params: { query: text },
          }
        );

        setSuggestions(response.data); // Update search suggestions
      } catch (err) {
        // Handle errors
        if (err.response && err.response.status === 500) {
          console.error("Error fetching suggestions: Internal Server Error");
          setError("Error fetching suggestions. Please try again later.");
        } else {
          console.error("Error fetching suggestions:", err);
          setError("Error fetching suggestions.");
        }
      }
    }

    handleSearch(); // Perform search after updating suggestions
  };

  return (
    <View style={styles.container}>
      {/* Search bar container */}
      <View style={styles.searchBarContainer}>
        {/* Back button */}
        <Ionicons
          name="chevron-back-outline"
          size={24}
          style={styles.searchIcon}
          onPress={() => navigation.navigate("LandingPage", { searchText })}
        />
        {/* Search input */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchTerm}
          onChangeText={handleSuggestions}
        />
      </View>

      {/* Render search suggestions */}
      {suggestions.length > 0 && (
        <FlatList
          scrollEnabled={true}
          data={suggestions}
          keyExtractor={(item) => (item.id ? item.id.toString() : "")}
          renderItem={({ item }) => (
            <Text
              style={styles.suggestion}
              onPress={() => {
                setSearchTerm(item.name);
                setSuggestions([]);
              }}
            >
              {item.name}
            </Text>
          )}
        />
      )}

      {/* Render loading indicator */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {/* Render error message */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Render search results */}
      <FlatList
        data={results}
        keyExtractor={(item) => (item.id ? item.id.toString() : "")}
        renderItem={({ item }) => (
          <View style={styles.resultContainer}>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.resultImage}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <Text style={styles.resultText}>{item.name}</Text>
            <Text style={styles.price}>GH₵{item.price}</Text>
          </View>
        )}
        contentContainerStyle={styles.resultsList}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 16,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
  },
  suggestion: {
    padding: 8,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  price: {
    color: "#FA4A0C",
    fontSize: 16,
  },
  resultsList: {
    paddingBottom: 20,
  },
});

export default SearchPage;
