import {useEffect, useState} from 'react';
import {Keyboard, Platform, Dimensions} from 'react-native';

export default function useKeyboardEvent(inputRef = null) {
  const [isKeyboardActivate, setIsKeyboardActivate] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardWillShow = e => {
      setIsKeyboardActivate(true);
      if (Platform.OS === 'ios') {
        setKeyboardHeight(
          Dimensions.get('window').height - e.endCoordinates.height,
        );
      }
    };
    const keyboardWillHide = () => {
      setIsKeyboardActivate(false);
      if (Platform.OS === 'ios') {
        setKeyboardHeight(0);
      }

      if (inputRef?.current) {
        inputRef.current.blur();
        // console.log(inputRef.current.isFocused());
      }
    };

    if (Platform.OS === 'android') {
      Keyboard.addListener('keyboardDidShow', keyboardWillShow);
      Keyboard.addListener('keyboardDidHide', keyboardWillHide);
    } else if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillShow', keyboardWillShow);
      Keyboard.addListener('keyboardWillHide', keyboardWillHide);
    }
  }, []);

  return {isKeyboardActivate, keyboardHeight};
}
