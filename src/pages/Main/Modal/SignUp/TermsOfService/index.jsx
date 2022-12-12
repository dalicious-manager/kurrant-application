import React,{useState,useEffect} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {Platform,Keyboard,NativeModules,View} from 'react-native';
import { useRef } from 'react/cjs/react.development';
import styled from 'styled-components/native';

import ProgressBar from '../../../../../components/ ProgressBar';
import Button from '../../../../../components/Button';
import KeyboardButton from '../../../../../components/KeyboardButton';
import RefTextInput from '../../../../../components/RefTextInput';
import Typography from '../../../../../components/Typography';
import Wrapper from '../../../../../components/Wrapper';
import useKeyboardEvent from '../../../../../hook/useKeyboardEvent';

export const PAGE_NAME = 'P_SIGN_UP__MODAL__TERMS_OF_SERVICE';
const { StatusBarManager } = NativeModules;

const Pages = () => {

  const emailRef = useRef(null);
  const [isEmailFocused, setEmailFocused] = useState(false);

  const authlRef = useRef(null);
  const [isEAuthFocused, setAuthFocused] = useState(false);

  const passwordRef = useRef(null);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  const passwordCheckedRef = useRef(null);
  const [isPasswordCheckedFocused, setPasswordCheckedFocused] = useState(false);

  const [statusBarHeight, setStatusBarHeight] = useState(0);

  const [progress, setProgress] = useState(1);
  const form = useForm({
    mode:'all'
  });
  const keyboardStatus = useKeyboardEvent();
  
  const passwordChecked = form.watch('passwordChecked');

  
  const callAuth = ()=>{
    console.log("인증요청");    
    setProgress(progress+1);

  }
  
  
  const isValidation = 
  (progress === 2 && form.watch('eauth') && !form.formState.errors.eauth) || 
  (form.watch('pauth') &&!form.formState.errors.pauth) ||
  (progress === 3 && (form.watch('password') && form.watch('passwordChecked')) && (form.watch('password') === form.watch('passwordChecked')));

  const inputStyle = {
    marginBottom:16,
  }

  useEffect(()=>{
    console.log(passwordChecked);
    console.log(form.formState.errors.passwordChecked)
  },[passwordChecked,form])
  useEffect(()=>{
    Platform.OS === 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height)
    }) : null
  }, []);
  return (
    <Wrapper>
      <FormProvider {...form}>
        <SafeContainer >
          <KeyDismiss onPress={()=>Keyboard.dismiss()}>
            <KeyContainer 
              keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight+44 }
              behavior={Platform.OS === "ios" ? "padding" : "height"} >
              <ProgressBar progress={progress}/>
              <Container>
                <RefTextInput
                  name="email" 
                  label="이메일 주소" 
                  placeholder="이메일 주소" 
                  autoCapitalize = 'none'
                  ref={emailRef}
                  focus={isEmailFocused}
                  onFocus={()=>setEmailFocused(true)}
                  setFocused={setEmailFocused}
                  blurOnSubmit={false}
                  isEditable={progress === 1}
                  suffix={
                    {
                      isNeedDelete : true,
                      isAuth:true,
                      authText:'인증요청',
                      authPressEvent:callAuth
                      // timer:900,
                    }
                  }
                  rules={
                    {
                      required: '필수 입력 항목 입니다.',
                      pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: '이메일 형식에 맞지 않습니다.',
                      }
                    }
                  }
                  style={inputStyle}
                />
                
                {progress === 2 && 
                  <RefTextInput 
                    name="eauth" 
                    label="인증번호" 
                    placeholder="인증번호" 
                    autoCapitalize = 'none'
                    ref={authlRef}
                    focus={isEAuthFocused}
                    onFocus={()=>setAuthFocused(true)}
                    setFocused={setAuthFocused}
                    blurOnSubmit={false}
                    suffix={
                      {
                        isAuth:true,
                        authText:'재발송',
                        authPressEvent:callAuth,
                        timer:180,
                      }
                    }
                    rules={
                      {
                        required: '필수 입력 항목 입니다.',                        
                        minLength:{
                          value: 8,
                          message: '이메일로 발송된 8자리 인증번호를 입력해 주세요.'
                        },
                        maxLength:{
                          value: 8,
                          message: '이메일로 발송된 8자리 인증번호를 입력해 주세요.'
                        },
                      }
                    }
                    style={inputStyle}
                  />
                }
                {progress > 2 &&<PasswordBox>
                 <RefTextInput 
                  name="password" 
                  ref={passwordRef} 
                  label="비밀번호"
                  autoCapitalize = 'none'
                  focus={isPasswordFocused}
                  onFocus={()=>setPasswordFocused(true)}
                  setFocused={setPasswordFocused}
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
                  style={inputStyle} 
                />
                 <RefTextInput 
                  name="passwordChecked" 
                  ref={passwordCheckedRef} 
                  label="비밀번호 재입력"
                  autoCapitalize = 'none'
                  focus={isPasswordCheckedFocused}
                  onFocus={()=>setPasswordCheckedFocused(true)}
                  setFocused={setPasswordCheckedFocused}
                  placeholder="비밀번호 재입력"
                  rules={
                    {
                      required: '필수 입력 항목 입니다.',
                      validate: value => value === form.watch('password') || "비밀번호가 일치하지 않습니다.",
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
                  style={inputStyle} 
                />
                {progress === 3 &&<View>
                <CaptionBox>
                  <Typography text={'CaptionR'}>
                    {'\u2022   '}
                  </Typography>
                  <Typography text={'CaptionR'}>
                    {'비밀번호는 8~32자리의 영문자, 숫자, 특수문자를 조합하여 설정해주세요.'}
                  </Typography>
                </CaptionBox>
                <CaptionBox>
                  <Typography text={'CaptionR'}>
                    {'\u2022   '}
                  </Typography>
                  <Typography text={'CaptionR'}>
                    {'다른 사이트에서 사용하는 것과 동일하거나 쉬운 비밀번호는 사용하지 마세요.'}
                  </Typography>
                </CaptionBox>
                <CaptionBox>
                  <Typography text={'CaptionR'}>
                    {'\u2022   '}
                  </Typography>
                  <Typography text={'CaptionR'}>
                    {'안전한 계정 사용을 위해 비밀번호는 주기적으로 변경해 주세요.'}
                  </Typography>
                </CaptionBox>
                </View>}
                </PasswordBox>}
                {!keyboardStatus.isKeyboardActivate &&
                  <ButtonContainer>
                    <Button 
                      type='yellow' 
                      label="다음" 
                      disabled={!isValidation}
                      onPressEvent={()=>{
                        setProgress(progress+1)
                      }}
                    />
                  </ButtonContainer> 
                }
              </Container>
              <KeyboardButton 
                isKeyboardActivate={keyboardStatus.isKeyboardActivate} 
                label="다음" 
                disabled={!isValidation} 
                onPressEvent={()=>{
                  setProgress(progress+1)
                  passwordRef.current?.focus();
                }}
              />
            </KeyContainer>
          </KeyDismiss>
        </SafeContainer>
      </FormProvider>
    </Wrapper>
  );
};

export default Pages;


const KeyDismiss = styled.Pressable`
  flex: 1;
`
const SafeContainer = styled.SafeAreaView`
  flex:1;
`
const KeyContainer = styled.KeyboardAvoidingView`
  flex: 1;
  position: relative;
`
const PasswordBox = styled.View`
  
`
const CaptionBox = styled.View`
  flex-direction: row;
`
const Container = styled.View` 
  flex: 1;
  position: relative;
  align-items: center;
  background-color: white;
  padding :0px 24px;
  margin-top: 40px;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 22px;
  margin-bottom: 24px;
`;

