import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Preloader from "./preloader";
import Intro from "./intro";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const App = (navigation) => {
  const navigatio = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const isLoggedIn = user ? user.isLoggedIn : false;
  console.log(isLoggedIn);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigatio.navigate("Home");
    }
  }, [isLoading, isLoggedIn, navigation]);

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Preloader isLoading={isLoading} />
      {!isLoading && <Intro {...navigation} />}
    </View>
  );
};

export default App;
