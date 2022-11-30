import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

export default function useKeyboardEvent() {
  const [isKeyboardActivate, setIsKeyboardActivate] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardWillShow = (e) => {
      setIsKeyboardActivate(true);
      if (Platform.OS === "ios") {
        setKeyboardHeight(e.endCoordinates.height);
      }
    };
    const keyboardWillHide = () => {
      setIsKeyboardActivate(false);
      if (Platform.OS === "ios") {
        setKeyboardHeight(0);
      }
    };

    if (Platform.OS === "android") {
      Keyboard.addListener("keyboardDidShow", keyboardWillShow);
      Keyboard.addListener("keyboardDidHide", keyboardWillHide);
    } else if (Platform.OS === "ios") {
      Keyboard.addListener("keyboardWillShow", keyboardWillShow);
      Keyboard.addListener("keyboardWillHide", keyboardWillHide);
    }

    return () => {
      if (Platform.OS === "android") {
        Keyboard.removeListener("keyboardDidShow", keyboardWillShow);
        Keyboard.removeListener("keyboardDidHide", keyboardWillHide);
      } else if (Platform.OS === "ios") {
        Keyboard.removeListener("keyboardWillShow", keyboardWillShow);
        Keyboard.removeListener("keyboardWillHide", keyboardWillHide);
      }
    };
  }, []);

  return { isKeyboardActivate, keyboardHeight };
}