import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  Keyboard,
  NativeModules,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

import KeyboardButton from '~components/KeyboardButton';
import RefTextInput from '~components/RefTextInput';
import Typography from '~components/Typography';
import Wrapper from '~components/Wrapper';
import useKeyboardEvent from '~hook/useKeyboardEvent';

import useUserMe from '../../../../../../biz/useUserMe';
import BottomModal from '../../../../../../components/BottomModal';
import Button from '../../../../../../components/Button';
import {getStorage, setStorage} from '../../../../../../utils/asyncStorage';

export const PAGE_NAME = 'P__MY_PAGE__PASSWORD_SETTING';

const {StatusBarManager} = NativeModules;

const Pages = () => {
  const themeApp = useTheme();
  const form = useForm({
    mode: 'all',
  });

  const {
    formState: {errors},
    watch,
    handleSubmit,
  } = form;
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [nowFocused, setNowFocused] = useState();
  const [newFocused, setNewFocused] = useState();
  const [newCheckFocused, setCheckFocused] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState();
  const {changePassword} = useUserMe();
  const navigation = useNavigation();
  const inputStyle = {
    marginBottom: 16,
  };
  const nowFocus = useRef(null);
  const newFocus = useRef(null);
  const newCheckFocus = useRef(null);
  const keyboardStatus = useKeyboardEvent();
  const currantPassword = form.watch('currantPassword');
  const newPassword = form.watch('newPassword');
  const newPasswordCheck = form.watch('newPasswordCheck');

  const isValidation =
    currantPassword &&
    !errors.currantPassword &&
    newPassword &&
    !errors.newPassword &&
    newPasswordCheck &&
    !errors.newPasswordCheck;
  const onSubmit = async data => {
    try {
      const result = await changePassword(data);
      if (result.errors) {
        throw new Error(result.errors);
      }
      await setStorage('isChange', '비밀번호가 변경됐어요');
      console.log('isChange');
      navigation.goBack(null);
    } catch (error) {
      console.log(error.toString());
    }
  };
  const getTitle = useCallback(() => {
    if (newFocused) {
      setTitle('새 비밀번호를 입력해주세요.');
      return;
    }
    if (newCheckFocused) {
      setTitle('새 비밀번호를 재입력해주세요.');
      return;
    }
    if (nowFocused) {
      setTitle('현재 비밀번호를 입력해주세요.');
      return;
    }
    if (!keyboardStatus.isKeyboardActivate) {
      return;
    }
    setTitle(title);
  }, [
    keyboardStatus.isKeyboardActivate,
    newCheckFocused,
    newFocused,
    nowFocused,
    title,
  ]);

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
    return async () => {
      const get = await getStorage('isChange');
    };
  }, []);
  useEffect(() => {
    getTitle();
  }, [getTitle]);

  return (
    <FormProvider {...form}>
      <Wrapper paddingTop={13}>
        <SafeContainer>
          <KeyDismiss onPress={() => Keyboard.dismiss()}>
            <KeyContainer
              keyboardVerticalOffset={
                Platform.OS === 'ios' && statusBarHeight + 44
              }
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <TitleBox>
                <Typography
                  text={'Title04SB'}
                  textColor={themeApp.colors.grey[2]}>
                  {title}
                </Typography>
              </TitleBox>
              <Container>
                <ScrollView keyboardShouldPersistTaps={'always'}>
                  <PasswordBox>
                    <RefTextInput
                      ref={nowFocus}
                      name="currantPassword"
                      label="현재 비밀번호"
                      isPassword={true}
                      setisFocused={setNowFocused}
                      autoCapitalize="none"
                      autoFocus={true}
                      placeholder="현재 비밀번호"
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
                      }}
                      padding="4px 0"
                      style={inputStyle}
                    />
                    <RefTextInput
                      ref={newFocus}
                      name="newPassword"
                      label="새 비밀번호"
                      isPassword={true}
                      setisFocused={setNewFocused}
                      autoCapitalize="none"
                      placeholder="새 비밀번호"
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
                      ref={newCheckFocus}
                      name="newPasswordCheck"
                      label="새 비밀번호 재입력"
                      isPassword={true}
                      setisFocused={setCheckFocused}
                      autoCapitalize="none"
                      placeholder="새 비밀번호 재입력"
                      padding="4px 0"
                      rules={{
                        required: '필수 입력 항목 입니다.',
                        validate: value =>
                          value === newPassword ||
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
                      style={inputStyle}
                    />
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
                  </PasswordBox>
                </ScrollView>
                {!keyboardStatus.isKeyboardActivate && (
                  <ButtonContainer>
                    <Button
                      type="yellow"
                      label={'비밀번호 변경'}
                      disabled={!isValidation}
                      onPressEvent={handleSubmit(onSubmit)}
                    />
                  </ButtonContainer>
                )}
              </Container>
              <KeyboardButton
                isKeyboardActivate={keyboardStatus.isKeyboardActivate}
                label={'비밀번호 변경'}
                disabled={!isValidation}
                onPressEvent={handleSubmit(onSubmit)}
              />
            </KeyContainer>
          </KeyDismiss>
        </SafeContainer>
        <BottomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={'동일한 비밀번호로 변경할 수 없어요.'}
          description={'다른 비밀번호를 입력해주세요.'}
          buttonTitle1={'확인'}
          buttonType1={'yellow'}
          onPressEvent1={closeModal}
        />
      </Wrapper>
    </FormProvider>
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
const TitleBox = styled.View`
  padding: 0px 24px;
  margin-bottom: 48px;
`;
const PasswordBox = styled.View``;

const Container = styled.View`
  flex: 1;
  position: relative;
  align-items: center;
  background-color: white;
  padding: 0px 24px;
`;

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
const ButtonContainer = styled.View`
  position: absolute;
  bottom: 22px;
  margin-bottom: 24px;
`;
