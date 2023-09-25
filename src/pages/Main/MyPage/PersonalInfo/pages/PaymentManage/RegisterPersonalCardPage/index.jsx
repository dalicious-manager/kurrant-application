import {useFocusEffect, useNavigation} from '@react-navigation/native';
import cardValidator from 'card-validator';
import React, {useCallback, useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Platform, ScrollView, NativeModules, Dimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled, {useTheme} from 'styled-components/native';
import Button from '~components/Button';
import RefTextInput from '~components/RefTextInput';
import Typography from '~components/Typography';
import Wrapper from '~components/Wrapper';
import useKeyboardEvent from '~hook/useKeyboardEvent';

import {PAGE_NAME as PaymentManagePage} from '..';
import useUserMe from '../../../../../../../biz/useUserMe';
import {isValidCardNumber} from '../../../../../../../utils/cardFormatter';
import {PAGE_NAME as PayCheckPasswordPageName} from '../../PayCheckPassword';
const screenHeight = Dimensions.get('window').height;

export const PAGE_NAME = 'P__MY_PAGE__PAYMENT_MANAGE__REGISTER_PERSONAL_CARD';

const Pages = ({route}) => {
  const insets = useSafeAreaInsets();
  const safeAreaHeight = insets.top + insets.bottom;

  const params = route.params;
  const themeApp = useTheme();
  const form = useForm({
    mode: 'all',
  });
  const keyboardEvent = useKeyboardEvent();

  const [modalVisible, setModalVisible] = useState(false);
  const {StatusBarManager} = NativeModules;
  const {
    cardRegisted,
    cardRegistedNice,
    payCheckPassword,
    readableAtom: {cardList},
  } = useUserMe();
  const card = form.watch('cardNumber');
  const {
    formState: {errors},
    handleSubmit,
    watch,
  } = form;
  const navigation = useNavigation();
  const onSubmit = async data => {
    const paycheck = await payCheckPassword();
    const exp = data.cardExpDate.split('/');
    const reqNice = {
      cardNumber: data.cardNumber?.replace(/\W/gi, ''),
      expirationYear: exp[1],
      expirationMonth: exp[0],
      cardPassword: data.cardPass,
      identityNumber: data.cardBirthDay.substring(2),
      defaultType: cardList.length > 0 ? 0 : params?.defaultType || 0,
    };
    navigation.navigate(PayCheckPasswordPageName, {
      isFirst: !paycheck.data,
      cardData: JSON.stringify(reqNice),
    });
    //
    // const req = {
    //   cardNumber: data.cardNumber?.replace(/\W/gi, ''),
    //   expirationYear: exp[1],
    //   expirationMonth: exp[0],
    //   cardPassword: data.cardPass,
    //   identityNumber: data.cardBirthDay,
    //   cardVaildationCode: data.cardSecret,
    //   defaultType: cardList.length > 0 ? 0 : params?.defaultType || 0,
    // };

    // // const result = await cardRegisted(req);
    // try {
    //   const resultNice = await cardRegistedNice(reqNice);
    //   console.log(resultNice);
    //   // navigation.navigate(PaymentManagePage)
    //   navigation.goBack();
    // } catch (error) {
    //   alert(error.toString()?.replace('error:', ''));
    // }
  };
  const isValidate =
    watch('cardNumber') &&
    watch('cardExpDate') &&
    watch('cardSecret') &&
    watch('cardPass') &&
    watch('cardBirthDay');
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        tabBarLabelStyle: {
          fontSize: 15,
          lineHeight: 21,
          fontFamily: 'Pretendard-SemiBold',
        },
      });
      return () => {
        navigation.setOptions({
          tabBarLabelStyle: {
            fontSize: 15,
            lineHeight: 21,
            fontFamily: 'Pretendard-Regular',
          },
        });
      };
    }, []),
  );
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      extraScrollHeight={140}
      enableOnAndroid={true}>
      <Wrapper
        paddingTop={24}
        paddingHorizontal={24}
        styles={{
          height:
            Platform.OS === 'ios'
              ? screenHeight - safeAreaHeight - 100
              : screenHeight - safeAreaHeight - 120,
        }}>
        <ScrollView>
          <FormProvider {...form}>
            <CardRegisteredBox>
              <RegisteredTitleBox>
                <Typography
                  text="Title03SB"
                  textColor={themeApp.colors.grey[2]}>
                  카드 정보
                </Typography>
              </RegisteredTitleBox>
              <RegiteredView>
                <RefTextInput
                  label="카드번호"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  keyboardType="numeric"
                  // value={isApplicant.phone}
                  rules={{
                    required: '필수 입력 항목 입니다.',
                    validate: {
                      isValid: value => {
                        return (
                          isValidCardNumber(value?.replace(/\W/gi, '')) ||
                          '유효한 카드번호를 입력해주세요'
                        );
                      },
                    },
                  }}
                />
              </RegiteredView>
              <RegiteredView>
                <RefTextInput
                  label="유효기간"
                  name="cardExpDate"
                  placeholder="MM/YY"
                  keyboardType="numeric"
                  // value={isApplicant.phone}
                  rules={{
                    required: '필수 입력 항목 입니다.',
                    validate: {
                      isValid: value => {
                        return (
                          cardValidator.expirationDate(value).isValid ||
                          '올바른 유효기간을 입력해주세요'
                        );
                      },
                    },
                  }}
                />
              </RegiteredView>
              <RegiteredView>
                <RefTextInput
                  label="CVC(보안코드)"
                  name="cardSecret"
                  placeholder="카드 뒷면 세자리"
                  keyboardType="numeric"
                  // value={isApplicant.phone}
                  rules={{
                    required: '필수 입력 항목 입니다.',
                    validate: {
                      isValid: value => {
                        // const {card:{type}}= cardValidator.number(card?.replace(/\W/gi, ''))
                        return (
                          cardValidator.cvv(value).isValid ||
                          cardValidator.cvv(value, 4).isValid ||
                          '올바른 보안코드를 입력해주세요'
                        );
                      },
                    },
                  }}
                />
              </RegiteredView>
              <RegiteredView>
                <RefTextInput
                  label="생년월일"
                  name="cardBirthDay"
                  placeholder="예.19870721"
                  keyboardType="numeric"
                  // value={isApplicant.phone}
                  rules={{
                    required: '필수 입력 항목 입니다.',
                    pattern: {
                      value:
                        /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
                      message: '올바른 생년월일를 입력해주세요',
                    },
                  }}
                />
              </RegiteredView>
              <RegiteredView>
                <RefTextInput
                  label="비밀번호"
                  name="cardPass"
                  placeholder="앞에 두자리"
                  keyboardType="numeric"
                  isPassword={true}
                  // value={isApplicant.phone}
                  rules={{
                    required: '필수 입력 항목 입니다.',
                    // maxLength: {
                    //   value: 2,
                    //   message: '올바른 비밀번호를 입력해주세요',
                    // },
                  }}
                />
              </RegiteredView>
            </CardRegisteredBox>
          </FormProvider>
        </ScrollView>

        {!keyboardEvent.isKeyboardActivate && (
          <ButtonBox isKeyboard={keyboardEvent.isKeyboardActivate}>
            <Button
              disabled={!isValidate}
              label="등록하기"
              onPressEvent={handleSubmit(onSubmit)}
            />
          </ButtonBox>
        )}
      </Wrapper>
    </KeyboardAwareScrollView>
  );
};

export default Pages;

const CardRegisteredBox = styled.View`
  flex: 1;
`;
const RegisteredTitleBox = styled.View`
  flex-direction: row;
  margin-bottom: 28px;
`;
const RegiteredView = styled.View`
  margin-top: 12px;
  margin-bottom: 12px;
`;
const ButtonBox = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: ${({isKeyboard}) => (isKeyboard ? '100px' : '24px')};
  background-color: ${({isKeyboard}) =>
    isKeyboard ? 'rgba(0,0,0,1)' : 'white'};
`;
