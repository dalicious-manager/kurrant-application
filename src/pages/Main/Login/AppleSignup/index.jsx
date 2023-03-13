import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Platform, Keyboard, NativeModules} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import Button from '~components/Button';
import KeyboardButton from '~components/KeyboardButton';
import RefTextInput from '~components/RefTextInput';
import Typography from '~components/Typography';
import Wrapper from '~components/Wrapper';
import useAuth from '../../../../biz/useAuth';
import useKeyboardEvent from '../../../../hook/useKeyboardEvent';
import {SCREEN_NAME} from '../../../../screens/Main/Bnb';
import snsLogin from '../../../../utils/snsLogin';
export const PAGE_NAME = 'P_SIGN_UP__MODAL__APPLE__SIGN_UP';
const {StatusBarManager} = NativeModules;

const Pages = () => {
  const navigation = useNavigation();
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const {appleLogin} = snsLogin();
  const {nameSetting} = useAuth();
  const form = useForm({
    mode: 'all',
  });
  const {handleSubmit} = form;
  const keyboardStatus = useKeyboardEvent();

  const onSubmit = async data => {
    try {
      await nameSetting(data);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: SCREEN_NAME,
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const inputStyle = {
    marginBottom: 16,
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
              <InfomationText>
                {'사용하실 이름을 입력 해주세요.'}
              </InfomationText>
              <Container>
                <ScrollView keyboardShouldPersistTaps={'always'}>
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
                </ScrollView>
                {!keyboardStatus.isKeyboardActivate && (
                  <ButtonContainer>
                    <Button
                      type="yellow"
                      label={'확인'}
                      onPressEvent={async () => {
                        handleSubmit(onSubmit)();
                      }}
                    />
                  </ButtonContainer>
                )}
              </Container>
              <KeyboardButton
                isKeyboardActivate={keyboardStatus.isKeyboardActivate}
                label={'확인'}
                onPressEvent={async () => {
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
  margin-top: 40px;
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
  margin-bottom: 24px;
`;
