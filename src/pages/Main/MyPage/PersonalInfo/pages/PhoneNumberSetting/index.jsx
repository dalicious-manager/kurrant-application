import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  Platform,
  Keyboard,
  NativeModules,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';

import {PAGE_NAME as SignUpComplatePageName} from './SignUpComplate';
import useAuth from '../../../../../../biz/useAuth';
import useUserMe from '../../../../../../biz/useUserMe';
import Button from '../../../../../../components/Button';
import KeyboardButton from '../../../../../../components/KeyboardButton';
import RefTextInput from '../../../../../../components/RefTextInput';
import Typography from '../../../../../../components/Typography';
import Wrapper from '../../../../../../components/Wrapper';
import useKeyboardEvent from '../../../../../../hook/useKeyboardEvent';
import {setStorage} from '../../../../../../utils/asyncStorage';
const {StatusBarManager} = NativeModules;

export const PAGE_NAME = 'P__MY_PAGE__PHONE_NUMBER_SETTING';
const inputStyle = {
  marginBottom: 16,
};
const Pages = () => {
  const form = useForm({
    mode: 'all',
  });
  const auth = useAuth();
  const {settingPhoneNumber} = useUserMe();
  const navigation = useNavigation();
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [progress, setProgress] = useState(1);

  const {
    formState: {errors},
    watch,
    handleSubmit,
  } = form;
  const keyboardStatus = useKeyboardEvent();

  const [isPhoneAuth, setPhoneAuth] = useState(false);
  const phoneNumber = watch('phone');
  const phoneAuth = watch('key');

  // navigation.navigate(SignUpComplatePageName,{
  //   useName:"장경태"
  // });
  const Infomation = () => {
    if (progress === 1) {
      return '변경할 휴대폰 번호를 입력해주세요.';
    }
    return '변경할 휴대폰 SMS로 발송된 인증번호를 확인해주세요.';
  };

  const isValidation = progress === 2 && phoneAuth && !errors.eauth;
  // (progress === 3 && (password && passwordChecked) && (password === passwordChecked) && phoneNumber && !errors.phone);

  const callPhoneAuth = async () => {
    if (phoneNumber && !errors.phone) {
      try {
        await auth.requestPhoneAuth({to: phoneNumber}, 4);
        if (progress < 2) setProgress(progressed => progressed + 1);
        setPhoneAuth(true);
      } catch (err) {
        Alert.alert('핸드폰 인증 요청 실패', err.toString(), [
          {
            text: '확인',
            onPress: () => {},
            style: 'cancel',
          },
        ]);
      }
    }
  };

  const onSubmit = async data => {
    try {
      const result = await settingPhoneNumber(data);

      await setStorage('isChange', '휴대폰 번호가 변경됐어요');
      navigation.goBack(null);
    } catch (err) {
      Alert.alert('휴대폰번호 변경', err.toString()?.replace('error: '));
    }
  };

  useEffect(() => {
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  return (
    <Wrapper paddingTop={24}>
      <FormProvider {...form}>
        <SafeContainer>
          <KeyDismiss onPress={() => Keyboard.dismiss()}>
            <KeyContainer
              keyboardVerticalOffset={
                Platform.OS === 'ios' && statusBarHeight + 44
              }
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <InfomationText>{Infomation()}</InfomationText>
              <InfomationDescription>
                {
                  '이메일/비밀번호가 설정되어 있지 않아요.\n이메일/비밀번호 설정시 이메일을 통해 로그인이 가능해요.'
                }
              </InfomationDescription>
              <Container>
                <ScrollView keyboardShouldPersistTaps={'always'}>
                  <View>
                    <RefTextInput
                      name="phone"
                      label="휴대폰 번호"
                      placeholder="휴대폰 번호"
                      keyboardType="numeric"
                      autoCapitalize="none"
                      blurOnSubmit={false}
                      isEditable={progress < 2 && !isPhoneAuth}
                      suffix={{
                        isNeedDelete: true,
                        isAuth: true,
                        authText: '인증요청',
                        authPressEvent: callPhoneAuth,
                        // timer:900,
                      }}
                      rules={{
                        required: '필수 입력 항목 입니다.',
                        pattern: {
                          value: /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
                          message: '올바른 휴대폰 번호를 입력해주세요.',
                        },
                      }}
                      style={inputStyle}
                    />
                    {progress >= 2 && isPhoneAuth && (
                      <RefTextInput
                        name="key"
                        label="인증번호"
                        placeholder="인증번호"
                        keyboardType="numeric"
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        suffix={{
                          isAuth: true,
                          authText: '재발송',
                          authPressEvent: callPhoneAuth,
                          timer: 180,
                        }}
                        rules={{
                          required: '필수 입력 항목 입니다.',
                          minLength: {
                            value: 6,
                            message:
                              '휴대폰으로 발송된 6자리 인증번호를 입력해주세요.',
                          },
                          maxLength: {
                            value: 6,
                            message:
                              '휴대폰으로 발송된 6자리 인증번호를 입력해주세요.',
                          },
                        }}
                        style={inputStyle}
                      />
                    )}
                  </View>
                </ScrollView>
                {!keyboardStatus.isKeyboardActivate && (
                  <ButtonContainer>
                    <Button
                      type="yellow"
                      label={'휴대폰 번호 변경'}
                      disabled={!isValidation}
                      onPressEvent={() => {
                        handleSubmit(onSubmit)();
                      }}
                    />
                  </ButtonContainer>
                )}
              </Container>
              <KeyboardButton
                isKeyboardActivate={keyboardStatus.isKeyboardActivate}
                label={'휴대폰 번호 변경'}
                disabled={!isValidation}
                onPressEvent={() => {
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
`;
const SafeContainer = styled.SafeAreaView`
  flex: 1;
`;
const KeyContainer = styled.KeyboardAvoidingView`
  flex: 1;
  position: relative;
`;
const InfomationText = styled(Typography).attrs({text: 'Title04SB'})`
  margin: 24px;
  margin-top: 21px;
  margin-bottom: 8px;
`;
const InfomationDescription = styled(Typography).attrs({text: 'CaptionR'})`
  margin: 24px;
  margin-top: 0px;
`;

const Container = styled.View`
  flex: 1;
  position: relative;
  align-items: center;
  background-color: white;
  padding: 0px 24px;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 22px;
  margin-bottom: 24px;
`;
