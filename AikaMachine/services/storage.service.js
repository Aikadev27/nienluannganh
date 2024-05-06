import AsyncStorage from "@react-native-async-storage/async-storage";

export const storageData = async (key, value) => {
  try {
    const toJson = JSON.stringify(value);
    const key2String = key.toString();
    await AsyncStorage.setItem(key2String, toJson);
    // console.log("lưu thông tin vào store thành công", toJson);
  } catch (error) {
    console.log("lỗi từ hàm storagedata", error);
  }
};

export const getData = async (key) => {
  try {
    const key2String = key.toString();
    const jsonValue = await AsyncStorage.getItem(key2String);
    // console.log("get thông tin vào store thành công:", jsonValue);
    if (jsonValue == null) {
      return null;
    }
    return JSON.parse(jsonValue);
  } catch (error) {
    console.log("lỗi từ hàm getData", error);
  }
};

export const clearStoreData = async (key) => {
  try {
    const key2String = key.toString();
    await AsyncStorage.removeItem(key2String);
    return true;
  } catch (error) {
    return false;
  }
};
