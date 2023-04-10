import {StackActions, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState, useEffect, useRef} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
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
import {registCardAtom} from '../../../../../../atoms/store';
import useAuth from '../../../../../../biz/useAuth';
import useUserInfo from '../../../../../../biz/useUserInfo';
import useUserMe from '../../../../../../biz/useUserMe';
import Button from '../../../../../../components/Button';
import KeyboardButton from '../../../../../../components/KeyboardButton';
import RefTextInput from '../../../../../../components/RefTextInput';
import Typography from '../../../../../../components/Typography';
import useKeyboardEvent from '../../../../../../hook/useKeyboardEvent';
import {PAGE_NAME as EveryCardPageName} from '../PaymentManage/EveryCard';
import {PAGE_NAME as SelectedDefaultCardName} from '../PaymentManage/SelectedDefaultCard';
import {PAGE_NAME as DefaultPaymentManage} from '../../../../Bnb/Payment/DefaultPaymentManage';
import {PAGE_NAME as MemebershipPaymentManage} from '../../../../../Membership/MembershipJoin/MemebershipPaymentManage';
export const PAGE_NAME = 'P__MY_PAGE__PAYMENT_MANAGE__PAY_CHECK_PASSWORD_EMAIL';
const {StatusBarManager} = NativeModules;
const inputStyle = {
  marginBottom: 16,
};
export default function PasswordCheck({route}) {
  const params = route?.params;
  const form = useForm();
  const {
    watch,
    formState: {errors},
  } = form;
  const auth = useAuth();
  const {isUserInfo} = useUserInfo();
  const [isCard, setIsCard] = useAtom(registCardAtom);
  const [progress, setProgress] = useState(1);
  // 함수들은 Class 를 외부에서 생성하여 import를 하여 사용하였다.
  const {cardRegistedNice} = useUserMe();
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const callMailAuth = async () => {
    try {
      await auth.requestEmailAuth({receivers: [isUserInfo?.email]}, 7);
      if (progress < 2) return setProgress(progressed => progressed + 1);
    } catch (err) {
      Alert.alert(
        '메일 인증 요청 실패',
        err.toString().replace('error: ', ''),
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
  const navigation = useNavigation();
  const keyboardStatuss = useKeyboardEvent();
  // input value
  const [state, setState] = useState('');
  const themeApp = useTheme();
  // input onChange
  const handleInputChange = e => {
    setState(e.nativeEvent.text);
  };
  const onSubmit = async () => {
    console.log(params?.cardData);
    const ds = params?.cardData;
    console.log(ds);

    try {
      await auth.confirmEmailAuth(watch('eauth'), 7);
      const data = await cardRegistedNice(
        {
          ...JSON.parse(params?.cardData),
          payNumber: state,
        },
        2,
      );
      // const data = await cardRegistedNiceFirst({
      //   ...JSON.parse(ds),
      //   payNumber: params?.password,
      //   key: watch('eauth'),
      // });
      console.log(data);

      // const resetAction = StackActions.pop(5);
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
        navigation.navigate(DefaultPaymentManage, {
          isRegist: true,
        });
      }
      if (isCard === 4) {
        navigation.navigate(MemebershipPaymentManage, {
          isRegist: true,
        });
      }
    } catch (error) {
      Alert.alert('카드등록 실패', error.toString().replace('error:', ''));
    }
  };
  useEffect(() => {
    callMailAuth();
  }, [isUserInfo?.email]);
  const isValidation = watch('eauth') && !errors.eauth;
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
        backgroundColor: 'white',
      }}
      keyboardVerticalOffset={Platform.OS === 'ios' && statusBarHeight + 44}
      behavior={Platform.OS === 'ios' && 'padding'}>
      <StyledPassword>
        <Description text={'Title04SB'} textColor={themeApp.colors.grey[2]}>
          아래 대표 이메일로 인증번호를 보내드려요.
        </Description>
        <FormProvider {...form}>
          <RefTextInput
            name="email"
            label="이메일 주소"
            placeholder="이메일 주소"
            autoCapitalize="none"
            isEditable={progress === 1}
            defaultValue={isUserInfo?.email}
            blurOnSubmit={false}
            suffix={{
              isNeedDelete: true,
              isAuth: true,
              authText: '인증요청',
              authPressEvent: callMailAuth,
              // timer:900,
            }}
            additionalCssOnTextInput={'padding-right: 115px'}
            rules={{
              required: '필수 입력 항목 입니다.',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: '이메일 형식에 맞지 않습니다.',
              },
            }}
            padding=" 4px 0px"
            style={inputStyle}
          />
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
              // timer: 4,
            }}
            rules={{
              required: '필수 입력 항목 입니다.',
              minLength: {
                value: 6,
                message: '이메일로 발송된 6자리 인증번호를 입력해 주세요.',
              },
              maxLength: {
                value: 6,
                message: '이메일로 발송된 6자리 인증번호를 입력해 주세요.',
              },
            }}
            padding="4px 0"
          />
          <Typography text="CaptionR" textColor={themeApp.colors.grey[4]}>
            이메일로 발송된 6자리 인증번호를 입력해 주세요.
          </Typography>
        </FormProvider>
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
    </KeyboardAvoidingView>
  );
}

export const StyledPassword = styled.View`
  flex: 1;
  position: relative;
  padding-left: 24px;
  padding-right: 24px;
  min-width: 200px;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 22px;
  left: 24px;
  margin-bottom: 35px;
`;
const Description = styled(Typography)`
  margin-bottom: 48px;
`;
