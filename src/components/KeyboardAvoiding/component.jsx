import React ,{ useEffect,useState }from "react";
import { KeyboardAvoidingView, NativeModules, Platform,TouchableWithoutFeedback,TextInput } from "react-native";
import styled from "styled-components";

import MinusIcon from '../../assets/icons/MealDetail/minus.svg';
import PlusIcon from '../../assets/icons/MealDetail/plus.svg';

const { StatusBarManager } = NativeModules;

const Component = ({
    blurPress,
    focus,
    decreasePress,
    increasePress,
    bodyRef,
    changeText,
    count
}) =>{

    const [statusBarHeight, setStatusBarHeight] = useState(0);

    useEffect(() => {
        Platform.OS === 'ios'
          ? StatusBarManager.getHeight(statusBarFrameData => {
              setStatusBarHeight(statusBarFrameData.height);
            })
          : null;
      }, []);

    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' && statusBarHeight+44 }
        >
            <TouchableWithoutFeedback onBlur={blurPress}>
                <KeypadInput focus={focus}>
                    <MinusIcon onPress={decreasePress}/>
                    <TextInput
                        keyboardType="number-pad"
                        //onPress={focusPress}
                        ref={bodyRef}
                        onChangeText={changeText}
                        value={count.toString()}
                        />
                    <PlusIcon onPress={increasePress}/>
                </KeypadInput>
            </TouchableWithoutFeedback>


        </KeyboardAvoidingView>
    )
}

export default Component;

const KeypadInput= styled.View`
  height:50px;
  flex-direction:row;
  background-color:${props => props.theme.colors.grey[0]};
  justify-content:space-between;
  align-items:center;
  opacity: ${props => props.focus ? 1: 0 };
  
`;