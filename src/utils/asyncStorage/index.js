import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorage = async (
  key,
  value,
  callback = () => console.log('저장'),
) => {
  await AsyncStorage.setItem(key, value, callback);
};

export const getStorage = async (key, callback = () => {}) => {
  const result = await AsyncStorage.getItem(key, callback);
  // console.log(result)
  return result;
};
