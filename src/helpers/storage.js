import * as SecureStorage from 'expo-secure-store';

export const setItem = async (key, value) => {
  await SecureStorage.setItemAsync(key, value);
};

export const getItem = async (key) => {
  let item = await SecureStorage.getItemAsync(key);
  if (item) {
    return item;
  } else {
    return null;
  }
};

export const getItemAsJson = async key => {
  let item = await SecureStorage.getItemAsync(key);
  if (item) {
    try {
      return JSON.parse(item);
    } catch (error) {
      console.log("GET_ITEM_AS_JSON[error]", error.message);
      return null;
    }
  } else {
    return null;
  }
};

export const removeItem = async key => {
  try {
    await SecureStorage.deleteItemAsync(key);
    return { success: true };
  } catch (error) {
    console.log("REMOVE_ITEM[error]", error.message);
    return { success: false, message: error.message };
  }
};