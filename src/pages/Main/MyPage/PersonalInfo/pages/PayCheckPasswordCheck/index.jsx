import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  Keyboard,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import styled, {css, useTheme} from 'styled-components/native';
import Button from '../../../../../../components/Button';
import KeyboardButton from '../../../../../../components/KeyboardButton';
import Typography from '../../../../../../components/Typography';
import BottomModal from '../../../../../../components/BottomModal';
import useKeyboardEvent from '../../../../../../hook/useKeyboardEvent';
import {PAGE_NAME as PayCheckEmailPageName} from '../PayCheckPasswordEmail';
import {PAGE_NAME as PayEmailSettingPageName} from '../PayEmailSetting';
import useUserMe from '../../../../../../biz/useUserMe/hook';
export const PAGE_NAME = 'P__MY_PAGE__PAYMENT_MANAGE__PAY_CHECK_PASSWORD_CHECK';
const {StatusBarManager} = NativeModules;

export default function PasswordCheck({route}) {
  const params = route?.params;
  // 함수들은 Class 를 외부에서 생성하여 import를 하여 사용하였다.
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const navigation = useNavigation();
  const keyboardStatuss = useKeyboardEvent();
  const [modalVisible, setModalVisible] = useState(false);
  const inputRef = useRef(null);
  // input value
  const [state, setState] = useState('');
  const {payCheckEmail} = useUserMe();
  const themeApp = useTheme();
  // input onChange
  const handleInputChange = e => {
    setState(e.nativeEvent.text);
  };
  const onSubmit = async () => {
    if (params?.password === state) {
      try {
        const email = await payCheckEmail();
        if (email?.data === 2)
          navigation.navigate(PayCheckEmailPageName, {
            password: state,
            cardData: params?.cardData,
          });
        if (email?.data === 3) setModalVisible(true);
      } catch (e) {
        Alert.alert('알림', e.toString().replace('error: ', ''));
      }
    }
  };
  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate(PayEmailSettingPageName, {
      password: state,
      cardData: params?.cardData,
    });
  };
  const isValidation = state.length >= 6 && params?.password === state;
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
        paddingTop: 110,
        backgroundColor: 'white',
      }}
      keyboardVerticalOffset={Platform.OS === 'ios' && statusBarHeight + 44}
      behavior={Platform.OS === 'ios' && 'padding'}>
      <StyledPassword>
        <Typography text={'Title03SB'} textColor={themeApp.colors.grey[2]}>
          결제 비밀번호를 다시 입력해주세요.
        </Typography>

        <PasswordBox
          onPress={() => {
            inputRef.current.blur();
            inputRef.current.focus();
          }}>
          <PasswordText active={state.length > 0}></PasswordText>
          <PasswordText active={state.length > 1}></PasswordText>
          <PasswordText active={state.length > 2}></PasswordText>
          <PasswordText active={state.length > 3}></PasswordText>
          <PasswordText active={state.length > 4}></PasswordText>
          <PasswordText active={state.length > 5}></PasswordText>
        </PasswordBox>
        <PasswordInput
          value={state}
          name="state"
          ref={inputRef}
          autoFocus={true}
          maxLength={6}
          keyboardType="numeric"
          onChange={handleInputChange}
        />
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
      <KeyboardButton
        isKeyboardActivate={keyboardStatuss.isKeyboardActivate}
        label={'이메일 인증'}
        disabled={!isValidation}
        onPressEvent={onSubmit}
      />
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'계정 등록이 필요해요.'}
        description={
          '해당 계정은 SNS의 이메일 정보가\n비공개로 되어 있어요. 비밀번호 설정을\n위해서 커런트 계정 정보를 입력해 주세요.'
        }
        buttonTitle1={'계정 등록하기'}
        buttonType1={'yellow'}
        onPressEvent1={closeModal}
      />
    </KeyboardAvoidingView>
  );
}

export const StyledPassword = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  position: relative;
  padding-left: 24px;
  padding-right: 24px;
  min-width: 200px;
`;

const PasswordText = styled.View`
  width: 18px;
  height: 18px;
  border-radius: 50px;
  margin-left: 8px;
  margin-right: 8px;
  ${({active}) => {
    if (active) {
      return css`
        background-color: #5f5e62;
      `;
    } else {
      return css`
        background-color: #e4e3e7;
      `;
    }
  }}
`;

const PasswordBox = styled.Pressable`
  flex: 1;
  margin-top: 24px;
  flex-direction: row;
  justify-content: center;
`;

const PasswordInput = styled.TextInput`
  width: 20px;
  opacity: 0;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 22px;
  left: 24px;
  margin-bottom: 35px;
`;
