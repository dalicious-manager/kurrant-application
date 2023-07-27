import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  View,
  Text,
  Keyboard,
  Platform,
  NativeModules,
  Pressable,
  Alert,
} from 'react-native';
import styled from 'styled-components';
import BackButton from '~components/BackButton';
import Button from '~components/Button';
import KeyboardButton from '~components/KeyboardButton';
import RefTextInput from '~components/RefTextInput';

import RandomIcon from '../../../../assets/icons/Nickname/random.svg';
import useKeyboardEvent from '../../../../hook/useKeyboardEvent';
import {useSettingNickname} from '../../../../hook/useNickname';
import {useGetUserInfo} from '../../../../hook/useUserInfo';
import {SCREEN_NAME} from '../../../../screens/Main/Bnb';
import {fetchJson} from '../../../../utils/fetch';
export const PAGE_NAME = 'MYPAGE_NICKNAME';

const {StatusBarManager} = NativeModules;
const Pages = ({route}) => {
  const from = route?.params?.from;
  const navigation = useNavigation();
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const {data: isUserInfo} = useGetUserInfo();

  const {mutateAsync: settingNickname} = useSettingNickname();
  const form = useForm({
    mode: 'all',
  });

  const {
    formState: {errors},
    watch,
    handleSubmit,
    setValue,
  } = form;
  const keyboardStatus = useKeyboardEvent();

  const nickname = watch('nickname');

  const validation = nickname && !errors.nickname;

  const onSubmit = async () => {
    try {
      await settingNickname({name: nickname});
      if (from) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: SCREEN_NAME,
            },
          ],
        });
      } else {
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('닉네임 설정', error.toString().replace('error: ', ''));
    }
  };

  const getRandomNickname = async () => {
    const res = await fetchJson('/public/nicknames', 'GET');
    setValue('nickname', res.data);
  };

  useEffect(() => {
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  useEffect(() => {
    setValue('nickname', isUserInfo?.data?.nickname);
  }, [isUserInfo?.data?.nickname, setValue]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: from ? '닉네임 설정' : '닉네임 수정',
      headerLeft: () => {
        return !from && <BackButton margin={[10, 0]} />;
      },
    });
  }, []);

  return (
    <Wrap>
      <FormProvider {...form}>
        <KeyDismiss onPress={() => Keyboard.dismiss()}>
          <KeyContainer
            keyboardVerticalOffset={
              Platform.OS === 'ios' && statusBarHeight + 84
            }
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Container>
              <View>
                <RefTextInput
                  name="nickname"
                  label="닉네임"
                  placeholder="닉네임"
                  caption="닉네임은 2~12자리로 설정해 주세요."
                  padding="4px 0px"
                  rules={{
                    pattern: {
                      value: /^[가-힣a-zA-Z0-9]{2,12}$/,
                      message:
                        '닉네임은 띄어쓰기 없이 한글,영문,숫자만 가능해요.',
                    },
                  }}
                  errorStyle={{marginTop: 4}}
                />
                <RandomPress onPress={getRandomNickname}>
                  <RandomIcon />
                </RandomPress>
              </View>
            </Container>
            {!keyboardStatus.isKeyboardActivate && (
              <ButtonWrap>
                <Button
                  label="완료"
                  disabled={!validation}
                  onPressEvent={() => {
                    handleSubmit(onSubmit)();
                  }}
                />
              </ButtonWrap>
            )}
            <KeyboardButton
              isKeyboardActivate={keyboardStatus.isKeyboardActivate}
              label={'완료'}
              disabled={!validation}
              onPressEvent={() => {
                handleSubmit(onSubmit)();
              }}
            />
          </KeyContainer>
        </KeyDismiss>
      </FormProvider>
    </Wrap>
  );
};

export default Pages;

const Container = styled.View`
  padding: 0px 24px;
  flex: 1;
`;

const Wrap = styled.View`
  flex: 1;
  background-color: white;

  padding-top: 40px;
`;
const KeyDismiss = styled.Pressable`
  flex: 1;
`;
const ButtonWrap = styled.View`
  padding: 0px 20px;
  position: absolute;
  bottom: 35px;
`;
const KeyContainer = styled.KeyboardAvoidingView`
  flex: 1;
  position: relative;
`;

const RandomPress = styled.Pressable`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0px;
  bottom: 28px;
`;
