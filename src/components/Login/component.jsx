import {useNavigation} from '@react-navigation/native';
import React,{useState} from 'react';
import {StyleSheet,  TouchableOpacity,Platform,Keyboard} from 'react-native';
import { useRef } from 'react/cjs/react.development';
import styled, { useTheme } from 'styled-components/native';

import useKeyboardEvent from '../../hook/useKeyboardEvent';
import Button from '../Button';
import KeyboardButton from '../KeyboardButton';
import RefTextInput from '../RefTextInput';
import Typography from '../Typography';

const Component = () => {
  const navigation = useNavigation();
  const labelItems = [
    {label: '아이디', route: null},
    {label: '/', route: null},
    {label: '비밀번호 찾기', route: null},
  ];
  const emailRef = useRef(null);
  const [isEmailFocused, setEmailFocused] = useState(emailRef.current?.isFocused());
  const passwordRef = useRef(null);
  const [isPasswordFocused, setPasswordFocused] = useState(passwordRef.current?.isFocused());
  const themeApp= useTheme();
  const keyboardStatus = useKeyboardEvent();
  const renderLabels = labelItems.map((labelItem, index) => {
    const handleRoutePress = () => {
      navigation.navigate(labelItem.route ?? '');
    };
    return (
      <TouchableOpacity key={index} onPress={handleRoutePress}>
        <Typography 
        text={'CaptionR'}
        textColor={themeApp.colors.grey[4]}
        >{labelItem.label}</Typography>
      </TouchableOpacity>
    );
  });
 
  return (
    <KeyDismiss onPress={()=>Keyboard.dismiss()}>
    <KeyContainer behavior={Platform.OS === "ios" ? "padding" : "height"} >
      <Container>
        <RefTextInput
          name="email" 
          ref={emailRef} 
          label="가입한 이메일 주소" 
          returnKeyType="next"
          autoCapitalize = 'none'
          focus={isEmailFocused}
          onFocus={()=>setEmailFocused(true)}
          setFocused={setEmailFocused}
          onSubmitEditing={() => passwordRef.current.focus()}
          blurOnSubmit={false}
          placeholder="가입한 이메일 주소" 
          rules={
            {
              required: '필수 입력 항목 입니다.',
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: '이메일 형식에 맞지 않습니다.',
              }
            }
          }
          style={styles.input} 
        />
        <RefTextInput 
          name="password" 
          ref={passwordRef} 
          label="비밀번호"
          autoCapitalize = 'none'
          focus={isPasswordFocused}
          onFocus={()=>setPasswordFocused(true)}
          setFocused={setPasswordFocused}
          secureTextEntry={true}
          placeholder="비밀번호"
          rules={
            {
              required: '필수 입력 항목 입니다.',
              minLength:{
                value: 8,
                message: '8글자 이상 입력'
              },
              maxLength:{
                value: 31,
                message: '32글자 이하 입력'
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,32}$/,
                message: '비밀번호 형식에 맞지 않습니다.',
              }
            }
          }
          style={styles.input} 
        />
        {!keyboardStatus.isKeyboardActivate &&<ButtonContainer>
          <Button type='yellow' label="로그인" />
        </ButtonContainer> }
       
        <LableContainer>
          {renderLabels}
        </LableContainer>
        
      </Container>
      {keyboardStatus.isKeyboardActivate && <SubmitContainer>
          <KeyboardButton type='login' label="로그인" disabled={true} />
        </SubmitContainer>}
    </KeyContainer>
    </KeyDismiss>
  );
};
const KeyDismiss = styled.Pressable`
  flex: 1;
`
const KeyContainer = styled.KeyboardAvoidingView`
  flex: 1;
  position: relative;
`

const Container = styled.View`
  flex: 1;
  position: relative;
  align-items: center;
  background-color: white;
  padding :0px 24px;
  margin-top: 40px;
`;
const LableContainer = styled.View`
    flex-direction: row;
    justify-self: center;
    align-self: center;
    margin-bottom: 64px;
    border-bottom-width:1px;
    border-bottom-color: ${({theme})=> theme.colors.grey[4]};
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 22px;
  margin-bottom: 24px;
`
const SubmitContainer = styled.View`

`

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 24,
  },
  
  buttonContainer: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#424242',
  },
});

export default Component;
