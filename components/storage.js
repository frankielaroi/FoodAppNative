import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.error(e);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log(value)
        return value;
    }
  } catch (e) {
    // reading error
    console.error(e);
  }
  return null;
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
    console.error(e);
  }
};

export { storeData, getData, removeData };
