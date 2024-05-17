import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const Preloader = ({ isLoading }) => {
  return (
    <View style={styles.container}>
      {isLoading && (
        <LottieView
          source={require('../assets/Animation.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
});

export default Preloader;
