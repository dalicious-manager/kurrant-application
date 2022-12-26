import { arMA } from "date-fns/locale";
import React ,{ useEffect,useState }from "react";
import { KeyboardAvoidingView, NativeModules, Platform,TouchableWithoutFeedback,TextInput, Pressable } from "react-native";
import styled from "styled-components";

import Minus from '../../assets/icons/MealDetail/minus.svg';
import PlusIcon from '../../assets/icons/MealDetail/plus.svg';
import useShoppingBasket from "../../biz/useShoppingBasket/hook";
import { PressableView } from "../Count/component";

const { StatusBarManager } = NativeModules;

const Component = ({
    blurPress,
    focus,
    decreasePress,
    increasePress,
    bodyRef,
    changeText,
    count,
    mealCart,
    mealDetail,
    addHandle,
    substractHandle,
    aa,
    id
    
}) =>{
  
    useEffect(()=>{
        console.log(count)
    },[count])
    const {isLoadMeal} = useShoppingBasket();
    
    const [statusBarHeight, setStatusBarHeight] = useState(0);
    
    useEffect(() => {
        Platform.OS === 'ios'
          ? StatusBarManager.getHeight(statusBarFrameData => {
              setStatusBarHeight(statusBarFrameData.height);
            })
          : null;
      }, []);

    return (
        <Wrap
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' && statusBarHeight+44 }
        >
            <TouchableWithoutFeedback onBlur={blurPress}>
                <React.Fragment>
                {mealCart && <KeypadInput focus={focus}>
                    <PressableView onPress={()=>{substractHandle(id)}}>
                        <MinusIcon />
                    </PressableView>
                    <TextInput
                        keyboardType="number-pad"
                        //onPress={focusPress}
                        ref={bodyRef}
                        onChangeText={(text)=>{changeText(text,id)}}
                        value={count.toString()}
                        />
                       
                    <PressableView onPress={()=>{addHandle(id)}}>
                        <PlusIcon />
                    </PressableView>
                </KeypadInput>}
                {mealDetail && <KeypadInput focus={focus}>
                    <PressableView onPress={decreasePress}>
                        <MinusIcon />
                    </PressableView>
                    <TextInput
                        keyboardType="number-pad"
                        //onPress={focusPress}
                        ref={bodyRef}
                        onChangeText={changeText}
                        value={count.toString()}
                        />
                    <PressableView onPress={increasePress}>
                        <PlusIcon />
                    </PressableView>
                </KeypadInput>}
                </React.Fragment>
            </TouchableWithoutFeedback>
        </Wrap>
    )
}

export default Component;

const KeypadInput= styled.View`
  height:56px;
  flex-direction:row;
  background-color:${props => props.theme.colors.grey[0]};
  justify-content:space-between;
  align-items:center;
  opacity: ${props => props.focus ? 1: 0 };
  padding:0px 24px;
  border-top-color:${props => props.theme.colors.grey[8]};
  border-top-width:1px;

`;

const Wrap = styled.KeyboardAvoidingView`

`;

const MinusIcon = styled(Minus)`
color:${({disabled,theme}) => disabled === 1 ? theme.colors.grey[6]: theme.colors.grey[2]}
`;