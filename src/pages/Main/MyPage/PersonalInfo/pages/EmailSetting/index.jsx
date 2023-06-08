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
const {StatusBarManager} = NativeModules;

export const PAGE_NAME = 'P__MY_PAGE__EMAIL_SETTING';
const inputStyle = {
  marginBottom: 16,
};
const Pages = () => {
  const form = useForm({
    mode: 'all',
  });
  const auth = useAuth();
  const {settingEmail} = useUserMe();
  const navigation = useNavigation();
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [progress, setProgress] = useState(1);

  const {
    formState: {errors},
    watch,
    handleSubmit,
  } = form;
  const keyboardStatus = useKeyboardEvent();

  const password = watch('password');
  const passwordChecked = watch('passwordChecked');
  const email = watch('email');
  const emailAuth = watch('eauth');

  // navigation.navigate(SignUpComplatePageName,{
  //   useName:"장경태"
  // });
  const Infomation = () => {
    return '이메일/비밀번호 설정';
  };

  const isValidation =
    (progress === 2 && emailAuth && !errors.eauth) ||
    (progress >= 3 &&
      password &&
      passwordChecked &&
      !errors.password &&
      !errors.passwordChecked);
  // (progress === 3 && (password && passwordChecked) && (password === passwordChecked) && phoneNumber && !errors.phone);

  const callMailAuth = async () => {
    try {
      await auth.requestEmailAuth({receivers: [email]}, 5);
      if (progress < 2) return setProgress(progressed => progressed + 1);
      navigation.goBack();
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

  const onSubmit = async data => {
    try {
      const datas = {
        email: data.email,
        password: data.password,
        passwordCheck: data.passwordChecked,
      };
      const result = await settingEmail(datas);
      navigation.goBack();
    } catch (err) {
      console.log(err);
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
                  {progress < 5 && (
                    <RefTextInput
                      name="email"
                      label="이메일 주소"
                      placeholder="이메일 주소"
                      autoCapitalize="none"
                      blurOnSubmit={false}
                      isEditable={progress === 1}
                      suffix={{
                        isNeedDelete: true,
                        isAuth: true,
                        authText: '인증요청',
                        authPressEvent: callMailAuth,
                        // timer:900,
                      }}
                      rules={{
                        required: '필수 입력 항목 입니다.',
                        pattern: {
                          value:
                            /^(([a-zA-Z0-9_-]+(\.[^<>()[\]\\,;:\s@#$%^&+/*?'"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: '올바른 아이디를 입력해주세요.',
                        },
                      }}
                      caption="입력한 이메일 주소로 인증번호가 발송됩니다."
                      padding="4px 0"
                      style={inputStyle}
                    />
                  )}

                  {progress === 2 && (
                    <RefTextInput
                      name="eauth"
                      label="인증번호"
                      placeholder="인증번호"
                      keyboardType="numeric"
                      autoCapitalize="none"
                      blurOnSubmit={false}
                      suffix={{
                        isAuth: true,
                        authText: '재발송',
                        authPressEvent: callMailAuth,
                        timer: 180,
                      }}
                      rules={{
                        required: '필수 입력 항목 입니다.',
                        minLength: {
                          value: 6,
                          message:
                            '이메일로 발송된 6자리 인증번호를 입력해 주세요.',
                        },
                        maxLength: {
                          value: 6,
                          message:
                            '이메일로 발송된 6자리 인증번호를 입력해 주세요.',
                        },
                      }}
                      caption="이메일로 발송된 6자리 인증번호를 입력해 주세요."
                      padding="4px 0"
                      style={inputStyle}
                    />
                  )}
                  {progress > 2 && progress <= 3 && (
                    <PasswordBox>
                      <RefTextInput
                        name="password"
                        label="비밀번호"
                        isPassword={true}
                        autoCapitalize="none"
                        placeholder="비밀번호"
                        rules={{
                          required: '필수 입력 항목 입니다.',
                          minLength: {
                            value: 8,
                            message: '8글자 이상 입력',
                          },
                          maxLength: {
                            value: 31,
                            message: '32글자 이하 입력',
                          },
                          pattern: {
                            value:
                              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,32}$/,
                            message: '비밀번호 형식에 맞지 않습니다.',
                          },
                        }}
                        padding="4px 0"
                        style={inputStyle}
                      />
                      <RefTextInput
                        name="passwordChecked"
                        label="비밀번호 재입력"
                        isPassword={true}
                        autoCapitalize="none"
                        placeholder="비밀번호 재입력"
                        rules={{
                          required: '필수 입력 항목 입니다.',
                          validate: value =>
                            value === password ||
                            '비밀번호가 일치하지 않습니다.',
                          minLength: {
                            value: 8,
                            message: '8글자 이상 입력',
                          },
                          maxLength: {
                            value: 31,
                            message: '32글자 이하 입력',
                          },
                          pattern: {
                            value:
                              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,32}$/,
                            message: '비밀번호 형식에 맞지 않습니다.',
                          },
                        }}
                        padding="4px 0"
                        style={inputStyle}
                      />
                      {progress === 3 && (
                        <View>
                          <CaptionBox>
                            <CaptionPoint>{'\u2022   '}</CaptionPoint>
                            <CaptionText>
                              {
                                '비밀번호는 8~32자리의 영문자, 숫자, 특수문자($@!%*#?&)를 조합하여 설정해주세요.'
                              }
                            </CaptionText>
                          </CaptionBox>
                          <CaptionBox>
                            <CaptionPoint>{'\u2022   '}</CaptionPoint>
                            <CaptionText>
                              {
                                '다른 사이트에서 사용하는 것과 동일하거나 쉬운 비밀번호는 사용하지 마세요.'
                              }
                            </CaptionText>
                          </CaptionBox>
                          <CaptionBox>
                            <CaptionPoint>{'\u2022   '}</CaptionPoint>
                            <CaptionText>
                              {
                                '안전한 계정 사용을 위해 비밀번호는 주기적으로 변경해 주세요.'
                              }
                            </CaptionText>
                          </CaptionBox>
                        </View>
                      )}
                    </PasswordBox>
                  )}
                </ScrollView>
                {!keyboardStatus.isKeyboardActivate && (
                  <ButtonContainer>
                    <Button
                      type="yellow"
                      label={'완료'}
                      disabled={!isValidation}
                      onPressEvent={async () => {
                        if (progress < 3) {
                          try {
                            if (progress <= 2) {
                              await auth.confirmEmailAuth(emailAuth, 5);
                              return setProgress(progress + 1);
                            }
                          } catch (err) {
                            Alert.alert(
                              '인증확인 실패',
                              err.toString()?.replace('error: ', ''),
                              [
                                {
                                  text: '확인',
                                  onPress: () => {},
                                  style: 'cancel',
                                },
                              ],
                            );
                            return;
                          }
                        }
                        handleSubmit(onSubmit)();
                      }}
                    />
                  </ButtonContainer>
                )}
              </Container>
              <KeyboardButton
                isKeyboardActivate={keyboardStatus.isKeyboardActivate}
                label={'완료'}
                disabled={!isValidation}
                onPressEvent={async () => {
                  if (progress < 3) {
                    try {
                      await auth.confirmEmailAuth(emailAuth, 5);
                      return setProgress(progress + 1);
                    } catch (err) {
                      Alert.alert(
                        '인증확인 실패',
                        err.toString()?.replace('error: ', ''),
                        [
                          {
                            text: '확인',
                            onPress: () => {},
                            style: 'cancel',
                          },
                        ],
                      );
                      return;
                    }
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
const PasswordBox = styled.View``;
const CaptionBox = styled.View`
  flex-direction: row;
`;
const CaptionText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
  flex: 1;
`;
const CaptionPoint = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
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
  margin-bottom: 35px;
`;
