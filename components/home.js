import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Preloader from "./preloader";
import Intro from "./intro";

const App = (navigation) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulating asynchronous operation (e.g., fetching data)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after some delay (simulating data fetching)
    }, 2000); // Simulate a 2-second loading delay
  }, []);

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <Preloader isLoading={isLoading} />
      ) : (
        <Intro {...navigation} />
      )}
    </View>
  );
};

export default App;
