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

import {PAGE_NAME as PayCheckPasswordCheckPageName} from '../PayCheckPasswordCheck';
import {PAGE_NAME as RePayCheckPasswordEmailPageName} from '../RePayCheckPasswordEmail';
import {PurchaseDetailPageName} from '../../../PurchaseHistory/Detail';
import {PAGE_NAME as EveryCardPageName} from '../PaymentManage/EveryCard';
import {PAGE_NAME as SelectedDefaultCardName} from '../PaymentManage/SelectedDefaultCard';
import {PAGE_NAME as DefaultPaymentManage} from '../../../../Bnb/Payment/DefaultPaymentManage';
import {PAGE_NAME as MemebershipPaymentManage} from '../../../../../Membership/MembershipJoin/MemebershipPaymentManage';
import useOrderMeal from '../../../../../../biz/useOrderMeal';
import {FormProvider, useForm} from 'react-hook-form';
import {getStorage, setStorage} from '../../../../../../utils/asyncStorage';
import Form from '../../../../../../components/Form';
import Check from '../../../../../../components/Check';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const PAGE_NAME = 'P__MY_PAGE__PAYMENT_MANAGE__PAY_CHECK_PAY';

const {StatusBarManager} = NativeModules;

export default function Password({route}) {
  const params = route?.params;
  const [isCard, setIsCard] = useAtom(registCardAtom);
  // 함수들은 Class 를 외부에서 생성하여 import를 하여 사용하였다.
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const agreeCheck = useForm();
  const {order, orderNice, orderLoading} = useOrderMeal();
  const navigation = useNavigation();
  const [clickLoading, setClickLoading] = useState(false);

  const [registLoading, setRegistLoading] = useState();
  const keyboardStatus = useKeyboardEvent();
  const inputRef = useRef(null);
  // input value
  const {submitPasswordCheck} = useUserMe();
  const [state, setState] = useState('');
  const themeApp = useTheme();
  // input onChange
  const handleInputChange = e => {
    setState(e.nativeEvent.text);
  };
  const onSubmit = async () => {
    setClickLoading(true);
    try {
      const data = await submitPasswordCheck({payNumber: state});
      if (data.statusCode === 200) {
        if (agreeCheck.watch(agreeCheck).agreeCheck) {
          await setStorage('payNumber', state);
        } else {
          await setStorage('payNumber', '');
        }
        const result = await orderNice({
          ...JSON.parse(params?.orderData),
        });

        if (result?.data) {
          const resetAction = StackActions.popToTop();
          navigation.dispatch(resetAction);
          navigation.navigate(PurchaseDetailPageName, {
            id: result?.data,
          });
        }
      }
    } catch (error) {
      alert(error.toString().replace('error:', ''));
    } finally {
      setClickLoading(false);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '결제 비밀번호 입력',
    });
  }, []);
  const isValidation = state?.length >= 6 && !registLoading;
  useEffect(() => {
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);
  useEffect(() => {
    const setPassword = async () => {
      const password = await getStorage('payNumber');
      setState(password);
    };
    setPassword();
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
          <PasswordText active={state?.length > 0}></PasswordText>
          <PasswordText active={state?.length > 1}></PasswordText>
          <PasswordText active={state?.length > 2}></PasswordText>
          <PasswordText active={state?.length > 3}></PasswordText>
          <PasswordText active={state?.length > 4}></PasswordText>
          <PasswordText active={state?.length > 5}></PasswordText>
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
              label={'완료'}
              disabled={!isValidation && clickLoading}
              onPressEvent={onSubmit}
            />
          </ButtonContainer>
        )}
      </StyledPassword>
      <RightBlocks>
        <Pressable
          style={{}}
          onPress={() => {
            navigation.navigate(RePayCheckPasswordEmailPageName);
          }}>
          <RePassword text={'CaptionR'} textColor={themeApp.colors.grey[4]}>
            비밀번호 재설정
          </RePassword>
        </Pressable>
      </RightBlocks>
      <RightBlock>
        <FormProvider {...agreeCheck}>
          <Check name="agreeCheck" value={true}>
            <Label text="Body06R" textColor={themeApp.colors.grey[4]}>
              이 비밀번호 저장
            </Label>
          </Check>
        </FormProvider>
      </RightBlock>
      <KeyboardButton
        isKeyboardActivate={keyboardStatus.isKeyboardActivate}
        label={'완료'}
        disabled={!isValidation && clickLoading}
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

const PasswordText = styled.Text`
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
const SubContainer = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
`;
const RightBlock = styled.View`
  max-height: 50px;
  padding-right: 24px;
  padding-left: 24px;
`;
const RightBlocks = styled.View`
  max-height: 50px;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 24px;
  padding-left: 24px;
`;

const Label = styled(Typography)``;
