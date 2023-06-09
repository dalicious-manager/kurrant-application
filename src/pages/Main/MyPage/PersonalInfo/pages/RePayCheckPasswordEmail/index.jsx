import {StackActions, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState, useEffect, useRef} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  Alert,
} from 'react-native';
import styled, {css, useTheme} from 'styled-components/native';

import {registCardAtom} from '../../../../../../atoms/store';
import useAuth from '../../../../../../biz/useAuth';
import useUserInfo from '../../../../../../biz/useUserInfo';
import useUserMe from '../../../../../../biz/useUserMe';
import Button from '../../../../../../components/Button';
import KeyboardButton from '../../../../../../components/KeyboardButton';
import RefTextInput from '../../../../../../components/RefTextInput';
import Typography from '../../../../../../components/Typography';
import useKeyboardEvent from '../../../../../../hook/useKeyboardEvent';
import {PAGE_NAME as RePayCheckPasswordPageName} from '../RePayCheckPassword';
export const PAGE_NAME =
  'P__MY_PAGE__PAYMENT_MANAGE__RE_PAY_CHECK_PASSWORD_EMAIL';
const {StatusBarManager} = NativeModules;
const inputStyle = {
  marginBottom: 16,
};
export default function PasswordCheck({route}) {
  const params = route?.params;
  const form = useForm();
  const {
    watch,
    formState: {errors},
  } = form;
  const auth = useAuth();
  const {isUserInfo} = useUserInfo();
  const [progress, setProgress] = useState(1);
  // 함수들은 Class 를 외부에서 생성하여 import를 하여 사용하였다.
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const callMailAuth = async () => {
    try {
      await auth.requestEmailAuth({receivers: [isUserInfo?.email]}, 7);
      if (progress < 2) return setProgress(progressed => progressed + 1);
    } catch (err) {
      Alert.alert(
        '메일 인증 요청 실패',
        err.toString()?.replace('error: ', ''),
        [
          {
            text: '확인',
            onPress: () => {},
            style: 'cancel',
          },
        ],
      );
    }
  };
  const inputRef = useRef(null);
  const navigation = useNavigation();
  const keyboardStatuss = useKeyboardEvent();
  // input value
  const [state, setState] = useState('');
  const themeApp = useTheme();
  // input onChange
  const handleInputChange = e => {
    setState(e.nativeEvent.text);
  };
  const onSubmit = async data => {
    try {
      await auth.confirmEmailAuth(watch('eauth'), 7);
      inputRef.current.blur();
      navigation.navigate(RePayCheckPasswordPageName);
    } catch (error) {
      Alert.alert('이메일 인증 실패', error.toString()?.replace('error:', ''));
    }
  };
  useEffect(() => {
    callMailAuth();
  }, [isUserInfo?.email]);
  const isValidation = watch('eauth') && !errors.eauth;
  useEffect(() => {
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      keyboardVerticalOffset={Platform.OS === 'ios' && statusBarHeight + 44}
      behavior={Platform.OS === 'ios' && 'padding'}>
      <FormProvider {...form}>
        <StyledPassword>
          <Description text={'Title04SB'} textColor={themeApp.colors.grey[2]}>
            결제 비밀번호 재설정을 위해{'\n'}아래 이메일로 인증번호를
            보내드려요.
          </Description>
          {/* <DescriptionCaption
          text={'CaptionR'}
          textColor={themeApp.colors.grey[4]}>
          아래의 이메일로 인증번호를 보내드려요.
        </DescriptionCaption> */}
          <RefTextInput
            name="name"
            label="이름"
            placeholder="이름"
            autoCapitalize="none"
            defaultValue={isUserInfo?.name}
            isEditable={progress === 1}
            blurOnSubmit={false}
            suffix={{
              isNeedDelete: true,
              // timer:900,
            }}
            rules={{
              required: '필수 입력 항목 입니다.',
              pattern: {
                value: /^[가-힣a-zA-Z0-9]+$/,
                message: '올바른 이름을 입력해 주세요.',
              },
            }}
            style={inputStyle}
            padding="4px 0"
          />
          <RefTextInput
            name="email"
            label="이메일 주소"
            placeholder="이메일 주소"
            autoCapitalize="none"
            isEditable={progress === 1}
            defaultValue={isUserInfo?.email}
            blurOnSubmit={false}
            suffix={{
              isNeedDelete: true,
              isAuth: true,
              authText: '인증요청',
              authPressEvent: callMailAuth,
              disabledEvent: !auth.readableAtom.isEmailLoading,
              // timer:900,
            }}
            additionalCssOnTextInput={'padding-right: 90px'}
            rules={{
              required: '필수 입력 항목 입니다.',
              pattern: {
                value:
                  /^(([a-zA-Z0-9_-]+(\.[^<>()[\]\\,;:\s@#$%^&+/*?'"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: '올바른 이메일 주소를 입력해주세요.',
              },
            }}
            padding=" 4px 0px"
            style={inputStyle}
          />
          <RefTextInput
            name="eauth"
            label="인증번호"
            placeholder="인증번호"
            keyboardType="numeric"
            ref={inputRef}
            autoCapitalize="none"
            blurOnSubmit={false}
            suffix={{
              isAuth: true,
              authText: '재발송',
              authPressEvent: callMailAuth,
              timer: 180,
              // timer: 4,
            }}
            rules={{
              required: '필수 입력 항목 입니다.',
              minLength: {
                value: 6,
                message: '이메일로 발송된 6자리 인증번호를 입력해 주세요.',
              },
              maxLength: {
                value: 6,
                message: '이메일로 발송된 6자리 인증번호를 입력해 주세요.',
              },
            }}
            padding="4px 0"
          />
          <Typography text="CaptionR" textColor={themeApp.colors.grey[4]}>
            이메일로 발송된 6자리 인증번호를 입력해 주세요.
          </Typography>

          {!keyboardStatuss.isKeyboardActivate && (
            <ButtonContainer>
              <Button
                type="yellow"
                label={'이메일 인증'}
                disabled={!isValidation}
                onPressEvent={onSubmit}
              />
            </ButtonContainer>
          )}
        </StyledPassword>
      </FormProvider>
      <KeyboardButton
        isKeyboardActivate={keyboardStatuss.isKeyboardActivate}
        label={'이메일 인증'}
        disabled={!isValidation}
        onPressEvent={onSubmit}
      />
    </KeyboardAvoidingView>
  );
}

export const StyledPassword = styled.View`
  flex: 1;
  position: relative;
  padding-left: 24px;
  padding-right: 24px;
  min-width: 200px;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 22px;
  left: 24px;
  margin-bottom: 35px;
`;
const Description = styled(Typography)`
  margin-bottom: 8px;
`;
const DescriptionCaption = styled(Typography)`
  margin-bottom: 24px;
`;
