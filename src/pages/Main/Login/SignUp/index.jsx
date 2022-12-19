import { useNavigation } from '@react-navigation/native';
import React,{useState,useEffect} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {Platform,Keyboard,NativeModules,View, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
import { PAGE_NAME as SignUpComplatePageName } from './SignUpComplate';
export const PAGE_NAME = 'P_SIGN_UP__MODAL__SIGN_UP';
const { StatusBarManager } = NativeModules;

const Pages = () => {

  const auth = useAuth();

  const navigation = useNavigation();
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [progress, setProgress] = useState(1);
  const [isPhoneAuth, setPhoneAuth] = useState(false);

  const form = useForm({
    mode:'all'
  });
  const {formState:{errors},watch,handleSubmit} = form;
  const keyboardStatus = useKeyboardEvent();

  const password = watch('password');
  const passwordChecked = watch('passwordChecked');
  const phoneNumber = watch('phone');
  const email = watch('email');
  const emailAuth = watch('eauth');
  const phoneAuth = watch('pauth');
  const userName = watch('name');

  const {joinUser} = useJoinUser();
  // navigation.navigate(SignUpComplatePageName,{
  //   useName:"장경태"
  // });
  const Infomation = ()=>{
    if (progress === 1) return '커런트 계정으로 사용할\n이메일 주소를 입력해 주세요.'
    if (progress === 2) return '이메일로 발송된 인증번호를\n입력해 주세요.'
    if (progress === 3 && password && passwordChecked &&
      password === passwordChecked) return '휴대폰 번호를 입력해 주세요.'
    if (progress === 3) return '비밀번호를 입력해 주세요.'    
    if (progress === 4) return 'SNS로 발송된 인증번호를\n입력해 주세요.'
    if (progress === 5) return '이제 이름만 입력하면\n회원가입이 완료됩니다.'    
    
  }

  const isValidation = 
  (progress === 2 && emailAuth && !errors.eauth) || 
  (progress === 4 && phoneAuth &&!errors.pauth) ||
  (progress ===5 && userName && !errors.name);
  // (progress === 3 && (password && passwordChecked) && (password === passwordChecked) && phoneNumber && !errors.phone);

  
  const callMailAuth = async()=>{
    console.log("메일 인증요청");    
    try {
      await auth.requestEmailAuth({ receivers: [email] }, 1);
      setProgress(progress+1);
    }catch(err){
      Alert.alert(
        "메일 인증 요청 실패",
        err.toString(),
          [
              {
                  text: "확인",
                  onPress: () => { },
                  style: "cancel",
    
                },
          ],
      )
    }
  }
  const callPhoneAuth = async()=>{
    console.log("핸드폰 인증요청");    
    if(phoneNumber && !errors.phone ) {
      try {
        await auth.requestPhoneAuth({to:phoneNumber}, 1);
        setProgress(progress+1);
        setPhoneAuth(true);
      }catch(err){
        Alert.alert(
          "핸드폰 인증 요청 실패",
          err.toString(),
            [
                {
                    text: "확인",
                    onPress: () => { },
                    style: "cancel",
      
                  },
            ],
        )
      }
      
    }
  }
  const onSubmit = async(data) => {
    try {
      const datas={
        email: data.email,
        name: data.name,
        password : data.password,
        passwordCheck:data.passwordChecked,
        phone : data.phone
      }
      await joinUser(datas);
      navigation.navigate(SignUpComplatePageName,{
        useName:"장경태"
      });
    }catch(err){
      console.log(err)
    }
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
                <ScrollView
                  keyboardShouldPersistTaps={'always'}
                >
                {progress < 5 && <RefTextInput
                  name="email" 
                  label="이메일 주소" 
                  placeholder="이메일 주소" 
                  autoCapitalize = 'none'
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
                    keyboardType='numeric'
                    autoCapitalize = 'none'
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
                {progress > 2 && progress < 5 &&<PasswordBox>
                 <RefTextInput 
                  name="password" 
                  label="비밀번호"
                  autoCapitalize = 'none'
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
                  label="비밀번호 재입력"
                  autoCapitalize = 'none'
                  placeholder="비밀번호 재입력"
                  rules={
                    {
                      required: '필수 입력 항목 입니다.',
                      validate: value => value === password || "비밀번호가 일치하지 않습니다.",
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
                {progress === 3 && !(password === passwordChecked) && <View>
                <CaptionBox>
                  <CaptionPoint>
                    {'\u2022   '}
                  </CaptionPoint>
                  <CaptionText>
                    {'비밀번호는 8~32자리의 영문자, 숫자, 특수문자를 조합하여 설정해주세요.'}
                  </CaptionText>
                </CaptionBox>
                <CaptionBox>
                  <CaptionPoint>
                    {'\u2022   '}
                  </CaptionPoint>
                  <CaptionText>
                    {'다른 사이트에서 사용하는 것과 동일하거나 쉬운 비밀번호는 사용하지 마세요.'}
                  </CaptionText>
                </CaptionBox>
                <CaptionBox>
                  <CaptionPoint>
                    {'\u2022   '}
                  </CaptionPoint>
                  <CaptionText>
                    {'안전한 계정 사용을 위해 비밀번호는 주기적으로 변경해 주세요.'}
                  </CaptionText>
                </CaptionBox>
                </View>}
                </PasswordBox>}
                {progress >= 3 && progress < 5 && password && passwordChecked &&
                  password === passwordChecked && 
                <View>
                  <RefTextInput
                  name="phone" 
                  label="휴대폰 번호" 
                  placeholder="휴대폰 번호" 
                  keyboardType='numeric'
                  autoCapitalize = 'none'
                  blurOnSubmit={false}
                  isEditable={progress === 3 && !isPhoneAuth}
                  suffix={
                    {
                      isNeedDelete : true,
                      isAuth:true,
                      authText:'인증요청',
                      authPressEvent:callPhoneAuth
                      // timer:900,
                    }
                  }
                  rules={
                    {
                      required: '필수 입력 항목 입니다.',
                      pattern: {                        
                        value: /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
                        message: '올바른 휴대폰 번호를 입력해주세요.',
                      }
                    }
                  }
                  style={inputStyle}
                />
                {progress ===4 && isPhoneAuth && <RefTextInput 
                    name="pauth" 
                    label="인증번호" 
                    placeholder="인증번호" 
                    keyboardType='numeric'
                    autoCapitalize = 'none'
                    blurOnSubmit={false}
                    suffix={
                      {
                        isAuth:true,
                        authText:'재발송',
                        authPressEvent:callPhoneAuth,
                        timer:180,
                      }
                    }
                    rules={
                      {
                        required: '필수 입력 항목 입니다.',                        
                        minLength:{
                          value: 8,
                          message: '휴대폰으로 발송된 8자리 인증번호를 입력해주세요.'
                        },
                        maxLength:{
                          value: 8,
                          message: '휴대폰으로 발송된 8자리 인증번호를 입력해주세요.'
                        },
                      }
                    }
                    style={inputStyle}
                  />}
                  </View>
                }
                {progress === 5 && <RefTextInput 
                    name="name" 
                    label="이름" 
                    placeholder="이름" 
                    autoCapitalize = 'none'
                    blurOnSubmit={false}           
                    suffix={
                      {
                          isNeedDelete: true,
                          // timer:900,
                      }
                    }
                    rules={
                      {
                        required: '필수 입력 항목 입니다.',
                        pattern: {                        
                          value: /^[가-힣a-zA-Z]+$/,
                          message: '올바른 이름을 입력해 주세요.',
                        }
                      }
                    }
                    style={inputStyle}
                  />}
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
                onPressEvent={async()=>{
                  if(progress < 5){
                    if(progress<=2){
                      await auth.confirmEmailAuth(emailAuth, 1);
                    }else{
                      await auth.confirmPhoneAuth(phoneAuth, 1);
                    }
                    
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
const PasswordBox = styled.View`
  
`
const CaptionBox = styled.View`
  flex-direction: row;
`
const CaptionText = styled(Typography).attrs({text :'CaptionR'})`
  color:${({theme})=>theme.colors.grey[4]};
  flex:1;
`
const CaptionPoint = styled(Typography).attrs({ text: 'CaptionR' })`
    color:${({ theme }) => theme.colors.grey[4]};
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

