import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Keyboard, View, TouchableOpacity} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

import useAuth from '../../../../../biz/useAuth';
import Button from '../../../../../components/Button';
import RefTextInput from '../../../../../components/RefTextInput';
import Typography from '../../../../../components/Typography';
import Wrapper from '../../../../../components/Wrapper';
import useKeyboardEvent from '../../../../../hook/useKeyboardEvent';
import {PAGE_NAME as ChagePasswordPageName} from '../ChagePassword';
import {PAGE_NAME as FindIdPageName} from '../FindId';
export const PAGE_NAME = 'P_LOGIN__MODAL__FIND_PASSWORD';
/**
 *
 * @param {object} props
 * @returns
 */
const inputStyle = {
  marginBottom: 16,
};

const Pages = () => {
  const navigation = useNavigation();
  const themeApp = useTheme();

  const auth = useAuth();
  const handleRoutePress = () => {
    navigation.navigate(FindIdPageName ?? '');
  };

  const keyboardStatus = useKeyboardEvent();
  const form = useForm({
    mode: 'all',
  });
  const {
    formState: {errors},
    watch,
    handleSubmit,
  } = form;
  const email = watch('email');
  const userName = watch('name');
  const isValidation =
    email &&
    userName &&
    !errors.email &&
    !errors.name &&
    !auth.readableAtom.isCheckedAuthLoading;
  const onSubmit = async data => {
    try {
      await auth.checkedAuth(data);
      navigation.navigate(ChagePasswordPageName, {
        type: 'email',
        email: email,
      });
    } catch (error) {
      alert(error.toString().replace('error:', ''));
    }
  };
  const onSubmit2 = async data => {
    try {
      await auth.checkedAuth(data);
      navigation.navigate(ChagePasswordPageName, {
        type: 'phone',
      });
    } catch (error) {
      alert(error.toString().replace('error:', ''));
    }
  };

  return (
    <Wrapper>
      <FormProvider {...form}>
        <SafeContainer>
          <KeyDismiss onPress={() => Keyboard.dismiss()}>
            <InfomationText>
              비밀번호를 재설정하기 위해선{'\n'}회원정보 확인이 필요합니다.
            </InfomationText>
            <KeyContainer>
              <Container>
                <RefTextInput
                  name="name"
                  label="이름"
                  placeholder="이름"
                  autoCapitalize="none"
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
                />
                <RefTextInput
                  name="email"
                  label="아이디(이메일)"
                  placeholder="아이디(이메일)"
                  autoCapitalize="none"
                  blurOnSubmit={false}
                  suffix={{
                    isNeedDelete: true,
                    // timer:900,
                  }}
                  rules={{
                    required: '필수 입력 항목 입니다.',
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: '이메일 형식에 맞지 않습니다.',
                    },
                  }}
                  style={inputStyle}
                />

                <View>
                  <CaptionBox>
                    <CaptionPoint>{'\u2022   '}</CaptionPoint>
                    <CaptionText>
                      회원 비밀번호는
                      <CaptionEffect>{' 암호화 '}</CaptionEffect>
                      저장되어 분실 시 찾아드릴 수 없는 정보입니다.
                    </CaptionText>
                  </CaptionBox>
                  <CaptionBox>
                    <CaptionPoint>{'\u2022   '}</CaptionPoint>
                    <CaptionText>
                      <CaptionEffect>등록된 회원정보 확인</CaptionEffect>
                      {' 을 통해 비밀번호를 재설정 하실 수 있습니다.'}
                    </CaptionText>
                  </CaptionBox>
                  <CaptionBox>
                    <CaptionPoint>{'\u2022   '}</CaptionPoint>
                    <CaptionText>
                      {
                        '가입시 등록하신 이름과 이메일을 기입하신 후, 비밀번호 재설정을 위한 메시지를 받을 곳을 선택해주세요.'
                      }
                    </CaptionText>
                  </CaptionBox>
                  <CaptionBox>
                    <CaptionPoint>{'\u2022   '}</CaptionPoint>
                    <CaptionText>
                      회원 이름과 이메일 정보가 일치하지 않는 경우 메시지를 받을
                      수 없습니다.
                    </CaptionText>
                  </CaptionBox>
                </View>

                {!keyboardStatus.isKeyboardActivate && (
                  <ButtonContainer>
                    <TouchableOpacity onPress={handleRoutePress}>
                      <LableContainer>
                        <Typography
                          text={'CaptionR'}
                          textColor={themeApp.colors.grey[4]}>
                          아이디 찾기
                        </Typography>
                      </LableContainer>
                    </TouchableOpacity>
                    <ButtonBox>
                      <Button
                        type="yellow"
                        label={'이메일로 재설정'}
                        disabled={!isValidation}
                        onPressEvent={() => {
                          handleSubmit(onSubmit)();
                        }}
                      />
                    </ButtonBox>
                    <ButtonBox>
                      <Button
                        type="yellow"
                        label={'휴대폰으로 재설정'}
                        disabled={!isValidation}
                        onPressEvent={() => {
                          handleSubmit(onSubmit2)();
                        }}
                      />
                    </ButtonBox>
                  </ButtonContainer>
                )}
              </Container>
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
const CaptionBox = styled.View`
  flex-direction: row;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;
const CaptionEffect = styled(Typography).attrs({text: 'CaptionSB'})`
  color: ${({theme}) => theme.colors.grey[4]};
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

const LableContainer = styled.View`
  flex-direction: row;
  justify-self: center;
  align-self: center;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.grey[4]};
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 22px;
  margin-bottom: 24px;
`;
const ButtonBox = styled.View`
  margin-top: 12px;
`;

const InfomationText = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin: 24px;
  margin-top: 40px;
`;
