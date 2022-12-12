import React,{useState,useEffect} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {Platform,Keyboard,NativeModules} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRef } from 'react/cjs/react.development';
import styled from 'styled-components/native';

import useAuth from '../../../../biz/useAuth';
import useJoinUser from '../../../../biz/useJoinUser';
import Button from '../../../../components/Button';
import KeyboardButton from '../../../../components/KeyboardButton';
import ProgressBar from '../../../../components/ProgressBar';
import RefTextInput from '../../../../components/RefTextInput';
import Typography from '../../../../components/Typography';
import Wrapper from '../../../../components/Wrapper';
import useKeyboardEvent from '../../../../hook/useKeyboardEvent';

export const PAGE_NAME = 'P_SIGN_UP__MODAL__SIGN_UP';
const { StatusBarManager } = NativeModules;

const Pages = () => {

  const auth = useAuth();

  const emailRef = useRef(null);
  const emailAuthlRef = useRef(null);

  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [progress, setProgress] = useState(1);

  const form = useForm({
    mode:'all'
  });
  const {formState:{errors},watch,handleSubmit} = form;
  const keyboardStatus = useKeyboardEvent();

 
  const emailAuth = watch('eauth');

  const {joinUser} = useJoinUser();
  
  const Infomation = ()=>{
    if (progress === 1) return '커런트 계정으로 사용할\n이메일 주소를 입력해 주세요.'
    if (progress === 2) return '이메일로 발송된 인증번호를\n입력해 주세요.'
    if (progress === 3) return '비밀번호를 입력해 주세요.'    
    if (progress === 4) return 'SNS로 발송된 인증번호를\n입력해 주세요.'
    if (progress === 5) return '이제 이름만 입력하면\n회원가입이 완료됩니다.'    
    
  }

  const isValidation = 
  (progress === 2 && emailAuth && !errors.eauth) 

  // (progress === 3 && (password && passwordChecked) && (password === passwordChecked) && phoneNumber && !errors.phone);

  
  const callMailAuth = async()=>{
    console.log("메일 인증요청");    
    try {
      await auth.requestEmailAuth(emailAuth);
      setProgress(progress+1);
    }catch(err){
      console.log(err)
    }
  }
  
  const onSubmit = async(data) => {
    const datas={
      email: data.email,
      name: data.name,
      password : data.password,
      passwordCheck:data.passwordChecked,
      phone : data.phone
    }
    const joinresult = await joinUser(datas);
    console.error(joinresult);
    
  };


  const inputStyle = {
    marginBottom:16,
  }

  
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
              <InfomationText>{Infomation()}</InfomationText>
              <Container>
                <ScrollView>
                {progress < 5 && <RefTextInput
                  name="email" 
                  label="이메일 주소" 
                  placeholder="이메일 주소" 
                  autoCapitalize = 'none'
                  ref={emailRef}
                  blurOnSubmit={false}
                  isEditable={progress === 1}
                  suffix={
                    {
                      isNeedDelete : true,
                      isAuth:true,
                      authText:'인증요청',
                      authPressEvent:callMailAuth
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
                />}
                
                {progress === 2 && 
                  <RefTextInput 
                    name="eauth" 
                    label="인증번호" 
                    placeholder="인증번호" 
                    autoCapitalize = 'none'
                    ref={emailAuthlRef}
                    blurOnSubmit={false}
                    suffix={
                      {
                        isAuth:true,
                        authText:'재발송',
                        authPressEvent:callMailAuth,
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
                
                </ScrollView>
                {!keyboardStatus.isKeyboardActivate &&
                  <ButtonContainer>
                    <Button 
                      type='yellow' 
                      label={progress >= 5 ? "가입완료": "다음"}
                      disabled={!isValidation}
                      onPressEvent={()=>{                        
                        if(progress < 5){
                          return setProgress(progress+1)
                        }
                        
                        handleSubmit(onSubmit)();
                      }}
                    />
                  </ButtonContainer> 
                }
              </Container>
              <KeyboardButton 
                isKeyboardActivate={keyboardStatus.isKeyboardActivate} 
                label={progress >= 5 ? "가입완료": "다음"}
                disabled={!isValidation} 
                onPressEvent={()=>{
                  if(progress < 5){
                    return setProgress(progress+1)
                  }                  
                  handleSubmit(onSubmit)();                  
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
const InfomationText = styled(Typography).attrs({text:'Title04SB'})`
  color:${({theme})=>theme.colors.grey[2]};
  margin: 24px;
  margin-top: 40px;

`

const Container = styled.View` 
  flex: 1;
  position: relative;
  align-items: center;
  background-color: white;
  padding :0px 24px;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 22px;
  margin-bottom: 24px;
`;

