import {StackActions, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  Keyboard,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import styled, {css, useTheme} from 'styled-components/native';

import {registCardAtom} from '../../../../../../atoms/store';
import useUserMe from '../../../../../../biz/useUserMe';
import {payCheckPassword} from '../../../../../../biz/useUserMe/Fetch';
import Button from '../../../../../../components/Button';
import KeyboardButton from '../../../../../../components/KeyboardButton';
import Typography from '../../../../../../components/Typography';
import useKeyboardEvent from '../../../../../../hook/useKeyboardEvent';
import {PAGE_NAME as MemebershipPaymentManage} from '../../../../../Membership/MembershipJoin/MemebershipPaymentManage';
import {PAGE_NAME as DefaultPaymentManage} from '../../../../Bnb/Payment/DefaultPaymentManage';
import {PAGE_NAME as PayCheckPasswordCheckPageName} from '../PayCheckPasswordCheck';
import {PAGE_NAME as EveryCardPageName} from '../PaymentManage/EveryCard';
import {PAGE_NAME as SelectedDefaultCardName} from '../PaymentManage/SelectedDefaultCard';
import {PAGE_NAME as RePayCheckPasswordEmailPageName} from '../RePayCheckPasswordEmail';
export const PAGE_NAME = 'P__MY_PAGE__PAYMENT_MANAGE__PAY_CHECK_PASSWORD';

const {StatusBarManager} = NativeModules;

export default function Password({route}) {
  const params = route?.params;
  const [isCard, setIsCard] = useAtom(registCardAtom);
  // 함수들은 Class 를 외부에서 생성하여 import를 하여 사용하였다.
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const navigation = useNavigation();
  const [registLoading, setRegistLoading] = useState();
  const keyboardStatus = useKeyboardEvent();
  const inputRef = useRef(null);
  // input value
  const {cardRegistedNice} = useUserMe();
  const [state, setState] = useState('');
  const themeApp = useTheme();
  // input onChange
  const handleInputChange = e => {
    setState(e.nativeEvent.text);
  };
  const onSubmit = async () => {
    if (params?.isFirst) {
      console.log(params?.isFirst);
      inputRef.current.blur();
      navigation.navigate(PayCheckPasswordCheckPageName, {
        password: state,
        cardData: params?.cardData,
      });
    } else {
      try {
        setRegistLoading(true);
        await cardRegistedNice(
          {
            ...JSON.parse(params?.cardData),
            payNumber: state,
          },
          1,
        );
        // const resetAction = StackActions.pop(3);
        // navigation.dispatch(resetAction);
        if (isCard === 1) {
          navigation.navigate(SelectedDefaultCardName, {
            isRegist: true,
          });
        }
        if (isCard === 2) {
          navigation.navigate(EveryCardPageName, {
            isRegist: true,
          });
        }
        if (isCard === 3) {
          console.log(state, '기본 카드 등록');
          navigation.navigate(DefaultPaymentManage, {
            params: {isRegist: true},
          });
        }
        if (isCard === 4) {
          navigation.navigate(MemebershipPaymentManage, {
            isRegist: true,
          });
        }
      } catch (error) {
        alert(error.toString()?.replace('error:', ''));
      } finally {
        setRegistLoading(false);
      }
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: params?.isFirst ? '결제 비밀번호 설정' : '결제 비밀번호 입력',
    });
  }, []);
  const isValidation = state.length >= 6 && !registLoading;
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
          결제 비밀번호를 입력해주세요.
        </Typography>

        <PasswordBox
          onPress={() => {
            inputRef.current.blur();
            inputRef.current.focus();
          }}>
          <PasswordText active={state.length > 0} />
          <PasswordText active={state.length > 1} />
          <PasswordText active={state.length > 2} />
          <PasswordText active={state.length > 3} />
          <PasswordText active={state.length > 4} />
          <PasswordText active={state.length > 5} />
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
        {!keyboardStatus.isKeyboardActivate && (
          <ButtonContainer>
            <Button
              type="yellow"
              label={'다음'}
              disabled={!isValidation}
              onPressEvent={onSubmit}
            />
          </ButtonContainer>
        )}
      </StyledPassword>
      {!params?.isFirst && (
        <RightBlock>
          <Pressable
            onPress={() => {
              navigation.navigate(RePayCheckPasswordEmailPageName);
            }}>
            <RePassword text={'CaptionR'} textColor={themeApp.colors.grey[4]}>
              비밀번호 재설정
            </RePassword>
          </Pressable>
        </RightBlock>
      )}
      <KeyboardButton
        isKeyboardActivate={keyboardStatus.isKeyboardActivate}
        label={'다음'}
        disabled={!isValidation}
        onPressEvent={onSubmit}
      />
    </KeyboardAvoidingView>
  );
}

export const StyledPassword = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
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

const RePassword = styled(Typography)`
  text-decoration: underline;
`;
const RightBlock = styled.View`
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 24px;
  padding-right: 24px;
`;
