import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {useFormContext} from 'react-hook-form';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  Keyboard,
  NativeModules,
  Alert,
} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import Toast from '~components/Toast';

import useAuth from '../../biz/useAuth';
import useKeyboardEvent from '../../hook/useKeyboardEvent';
import {PAGE_NAME as FindUserPageName} from '../../pages/Main/Login/FindUser';
import {PAGE_NAME as nicknameSettingPageName} from '../../pages/Main/MyPage/Nickname/index';
import {SCREEN_NAME} from '../../screens/Main/Bnb';
import {getStorage, setStorage} from '../../utils/asyncStorage';
import Button from '../Button';
import Check from '../Check';
import KeyboardButton from '../KeyboardButton';
import RefTextInput from '../RefTextInput';
import Typography from '../Typography';

const {StatusBarManager} = NativeModules;

const Component = ({userId, isPassword, setPassword}) => {
  const navigation = useNavigation();
  const [emailId, setEmailId] = useState((userId && userId) || emailId);
  const ToastMessage = Toast();
  const labelItems = [
    {label: '아이디'},
    {label: '/'},
    {label: '비밀번호 찾기'},
  ];
  const themeApp = useTheme();
  const {login} = useAuth();
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const {
    handleSubmit,
    setValue,
    formState: {errors, dirtyFields},
  } = useFormContext();
  const keyboardStatus = useKeyboardEvent();
  const handleRoutePress = () => {
    navigation.navigate(FindUserPageName ?? '');
  };
  const onSubmit = async datas => {
    try {
      const res = await login(datas);
      setStorage('userId', datas.email);

      if (res.data.hasNickname) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: SCREEN_NAME,
            },
          ],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: nicknameSettingPageName,
              params: {
                from: 'email',
              },
            },
          ],
        });
      }
      // navigation.reset({
      //   index: 0,
      //   routes: [
      //     {
      //       name: SCREEN_NAME,
      //     },
      //   ],
      // });
      //navigation.reset({routes:[{ name:GroupCreateMainPageName}]});
      //await userInfo();
    } catch (err) {
      Alert.alert('로그인 실패', err.toString()?.replace('error: ', ''), [
        {
          text: '확인',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    }
  };
  // console.log(isUserInfo,'info')
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const renderLabels = labelItems.map((labelItem, index) => {
    return (
      <Typography
        key={index}
        text={'CaptionR'}
        textColor={themeApp.colors.grey[4]}>
        {labelItem.label}
      </Typography>
    );
  });

  const isValidation =
    (dirtyFields.email || emailId) &&
    dirtyFields.password &&
    !errors.email &&
    !errors.password;

  useEffect(() => {
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
    const getUserId = async () => {
      const userIds = await getStorage('userId');
      if (userIds) {
        setEmailId(userIds);
      }
    };

    getUserId();
  }, [navigation]);
  useEffect(() => {
    if (isPassword) {
      ToastMessage.toastEvent();
      setTimeout(() => {
        setPassword(false);
        navigation.setParams({
          isPassword: false,
        });
      }, 3000);
    }
  }, [ToastMessage, isPassword, navigation, setPassword]);
  useEffect(() => {
    console.log(emailId);
    setValue('email', emailId);
  }, [emailId, setValue, userId]);
  return (
    <SafeContainer>
      <KeyDismiss onPress={() => Keyboard.dismiss()}>
        <KeyContainer
          keyboardVerticalOffset={Platform.OS === 'ios' && statusBarHeight + 44}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Container>
            <RefTextInput
              name="email"
              label="가입한 이메일 주소"
              ref={emailRef}
              returnKeyType="next"
              autoCapitalize="none"
              onSubmitEditing={() => passwordRef.current?.focus()}
              defaultValue={emailId && emailId}
              blurOnSubmit={false}
              suffix={{
                isNeedDelete: true,
                // isButton:true,
                // buttonText:'인증요청',
                // timer:900,
              }}
              padding="4px 0px"
              placeholder="가입한 이메일 주소"
              rules={{
                required: '필수 입력 항목 입니다.',
                pattern: {
                  value:
                    /^(([a-zA-Z0-9_-]+(\.[^<>()[\]\\,;:\s@#$%^&+/*?'"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: '올바른 이메일 주소를 입력해주세요.',
                },
              }}
              style={styles.input}
            />
            <RefTextInput
              name="password"
              label="비밀번호"
              ref={passwordRef}
              isPassword={true}
              autoCapitalize="none"
              placeholder="비밀번호"
              style={styles.input}
              padding="4px 0px"
              rules={{
                required: '필수 입력 항목 입니다.',

                minLength: {
                  value: 8,
                  message: '8글자 이상 입력해주세요.',
                },
              }}
            />
            <CheckView>
              <Check name={'autoLogin'} type="login">
                <Label>로그인 상태 유지</Label>
              </Check>
            </CheckView>
            {!keyboardStatus.isKeyboardActivate && (
              <ButtonContainer>
                <TouchableOpacity onPress={handleRoutePress}>
                  <LableContainer>{renderLabels}</LableContainer>
                </TouchableOpacity>
                <Button
                  type="yellow"
                  label="로그인"
                  disabled={!isValidation}
                  onPressEvent={handleSubmit(onSubmit)}
                />
              </ButtonContainer>
            )}
          </Container>
          {keyboardStatus.isKeyboardActivate && (
            <TouchableOpacity onPress={handleRoutePress}>
              <LableContainer>{renderLabels}</LableContainer>
            </TouchableOpacity>
          )}
          <KeyboardButton
            type="login"
            isKeyboardActivate={keyboardStatus.isKeyboardActivate}
            label="로그인"
            disabled={!isValidation}
            onPressEvent={handleSubmit(onSubmit)}
          />
        </KeyContainer>
      </KeyDismiss>
      {isPassword && (
        <ToastMessage.ToastWrap
          message="비밀번호가 변경됐어요"
          icon="checked"
        />
      )}
    </SafeContainer>
  );
};
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
  margin-top: 40px;
`;
const LableContainer = styled.View`
  flex-direction: row;
  justify-self: center;
  align-self: center;
  margin-bottom: 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.grey[4]};
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 22px;
  /* margin-bottom: 24px; */
  margin-bottom: 35px;
`;
const Label = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
const CheckView = styled.View`
  width: 100%;
`;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 24,
  },

  buttonContainer: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#424242',
  },
});

export default Component;
