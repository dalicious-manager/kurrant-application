import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Platform, Keyboard, NativeModules, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import useAuth from '../../../../../biz/useAuth';
import BottomModal from '../../../../../components/BottomModal';
import Button from '../../../../../components/Button';
import KeyboardButton from '../../../../../components/KeyboardButton';
import RefTextInput from '../../../../../components/RefTextInput';
import Typography from '../../../../../components/Typography';
import Wrapper from '../../../../../components/Wrapper';
import useKeyboardEvent from '../../../../../hook/useKeyboardEvent';
import {PAGE_NAME as LoginPageName} from '../../Login';
import {PAGE_NAME as SignUpPageName} from '../../SignUp';
import {PAGE_NAME as FindIdComplatePageName} from './FindIdComplate';

export const PAGE_NAME = 'P_LOGIN__MODAL__FIND_ID';
/**
 *
 * @param {object} props
 * @returns
 */
const {StatusBarManager} = NativeModules;

const inputStyle = {
  marginBottom: 16,
};

const Pages = () => {
  const [progress, setProgress] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const Infomation = () => {
    if (progress === 1)
      return '아이디를 찾기 위해선\n휴대폰 번호 인증이 필요해요.';
    if (progress >= 2) return '휴대폰 SMS로 발송된 인증번호를\n확인해주세요.';
  };
  const auth = useAuth();
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  const [isPhoneAuth, setPhoneAuth] = useState(false);
  const form = useForm({
    mode: 'all',
  });
  const {
    formState: {errors},
    watch,
    handleSubmit,
  } = form;

  const keyboardStatus = useKeyboardEvent();
  const phoneNumber = watch('phone');
  const phoneAuth = watch('pauth');
  const goSignUp = () => {
    navigation.reset({
      index: 1,
      routes: [
        {
          name: LoginPageName,
        },
        {
          name: SignUpPageName,
        },
      ],
    });
  };
  const callPhoneAuth = async again => {
    if (phoneNumber && !errors.phone) {
      try {
        await auth.requestPhoneAuth({to: phoneNumber}, 2);
        if (!again) {
          setProgress(progress + 1);
        }
        setPhoneAuth(true);
      } catch (err) {
        Alert.alert('인증 오류', err.toString().replace('error:', ''), [
          {
            text: '확인',
            onPress: () => {},
            style: 'cancel',
          },
        ]);
        console.log(err);
        setModalVisible(true);
      }
    }
  };

  const isValidation =
    progress >= 2 &&
    phoneAuth &&
    !errors.pauth &&
    !auth.readableAtom.isConfirmPhoneLoading;
  const onSubmit = async data => {
    try {
      await auth.confirmPhoneAuth(phoneAuth, 2);
      // await auth.findEmail({ phone: phoneNumber });
      const resetAction = StackActions.popToTop();
      navigation.dispatch(resetAction);
      navigation.navigate(FindIdComplatePageName, {
        phone: phoneNumber,
      });
    } catch (err) {
      Alert.alert('인증번호 오류', '올바른 인증번호를 입력해주세요.', [
        {
          text: '확인',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
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
    <Wrapper>
      <FormProvider {...form}>
        <SafeContainer>
          <KeyDismiss onPress={() => Keyboard.dismiss()}>
            <KeyContainer
              keyboardVerticalOffset={
                Platform.OS === 'ios' && statusBarHeight + 44
              }
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <Container>
                <ScrollView keyboardShouldPersistTaps={'always'}>
                  <InfomationText>{Infomation()}</InfomationText>
                  <RefTextInput
                    name="phone"
                    label="휴대폰 번호"
                    placeholder="휴대폰 번호"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    isEditable={progress === 1 && !isPhoneAuth}
                    suffix={{
                      isNeedDelete: true,
                      isAuth: true,
                      authText: '인증요청',
                      authPressEvent: callPhoneAuth,
                      // timer:900,
                    }}
                    rules={{
                      // required: '필수 입력 항목 입니다.',
                      required: '',
                      pattern: {
                        value: /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
                        message: '올바른 휴대폰 번호를 입력해주세요.',
                      },
                    }}
                    style={inputStyle}
                    caption={
                      !phoneNumber &&
                      '입력한 휴대폰 번호로 인증번호가 발송됩니다.'
                    }
                    padding="4px 0px"
                  />
                  {progress >= 2 && isPhoneAuth && (
                    <RefTextInput
                      name="pauth"
                      label="인증번호"
                      placeholder="인증번호"
                      autoCapitalize="none"
                      keyboardType="numeric"
                      blurOnSubmit={false}
                      suffix={{
                        isAuth: true,
                        authText: '재발송',
                        authPressEvent: callPhoneAuth,
                        timer: 180,
                      }}
                      rules={{
                        // required: '필수 입력 항목 입니다.',
                        required: '',
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
                      caption={
                        !phoneAuth &&
                        '휴대폰으로 발송된 6자리 인증번호를 입력해주세요.'
                      }
                      padding="4px 0px"
                    />
                  )}
                </ScrollView>
                {!keyboardStatus.isKeyboardActivate && (
                  <ButtonContainer>
                    <Button
                      type="yellow"
                      label={'아이디 찾기'}
                      disabled={!isValidation}
                      onPressEvent={() => {
                        handleSubmit(onSubmit)();
                      }}
                    />
                  </ButtonContainer>
                )}
              </Container>
              <KeyboardButton
                //   <KeyboardOnButton
                isKeyboardActivate={keyboardStatus.isKeyboardActivate}
                label={'아이디 찾기'}
                disabled={!isValidation}
                onPressEvent={() => {
                  handleSubmit(onSubmit)();
                }}
              />
            </KeyContainer>
          </KeyDismiss>
        </SafeContainer>
      </FormProvider>
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="가입된 계정 정보가 없어요"
        description="회원가입하고 다양한 혜택을 받아보세요"
        buttonTitle1="취소"
        buttonTitle2="회원가입하기"
        buttonType1="grey7"
        buttonType2="yellow"
        onPressEvent1={() => setModalVisible(false)}
        onPressEvent2={goSignUp}
      />
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
  margin-bottom: 11px;
`;

const InfomationText = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  /* margin: 24px; */
  margin-bottom: 24px;
  margin-top: 40px;
`;

// const KeyboardOnButton = styled(KeyboardButton)`
//   margin-bottom: 135px;
//   border: 1px solid black;
// `;
