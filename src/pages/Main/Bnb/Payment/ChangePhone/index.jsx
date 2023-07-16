import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useLayoutEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Alert, Keyboard} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';
import Button from '~components/Button';
import SpotTextInput from '~components/SpotTextInput';
import Typography from '~components/Typography';
import useKeyboardEvent from '~hook/useKeyboardEvent';
import {useApplyShareSpot} from '~hook/useShareSpot';

import {paymentPhone} from '../../../../../utils/store';
import {useUpdateMySpotInfo} from '../../../../hook/useSpot';
import {PAGE_NAME as PaymentPageName} from '../Main';
export const PAGE_NAME = 'PAYMENT_PAGE__CHANGE_PHONE';
const ChangePhone = ({orderPhone, setOrderPhone, setIsPhone}) => {
  const form = useForm({
    mode: 'all',
  });
  const navigation = useNavigation();
  const {watch} = form;

  const phone = watch('phone');
  const keyboardStatus = useKeyboardEvent();
  const handleUpdateName = async () => {
    try {
      setOrderPhone(phone);
      setIsPhone(false);
      navigation.setOptions({
        headerTitle: `주문`,
      });
      // setTimeout(() => {
      //   if (navigation.canGoBack) navigation.goBack();
      // }, 2000);
    } catch (error) {
      Alert.alert('저장 오류', error.toString().replace('Error: ', ''));
    }
  };
  console.log(phone);
  return (
    <Wrap
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={180}
        resetScrollToCoords={{x: 0, y: 0}}>
        <FormProvider {...form}>
          <SpotTextInput
            label="휴대폰번호 입력"
            name="phone"
            defaultValue={orderPhone && orderPhone}
            placeholder="예. 01012341234"
          />
        </FormProvider>
      </KeyboardAwareScrollView>

      {!keyboardStatus.isKeyboardActivate && (
        <ButtonWrap>
          <Button
            label={'연락처 저장'}
            onPressEvent={handleUpdateName}
            disabled={!phone}
          />
        </ButtonWrap>
      )}
    </Wrap>
  );
};

export default ChangePhone;

const Wrap = styled.Pressable`
  flex: 1;
  background-color: white;
  padding: 24px 24px 0px 24px;
`;

const SpotName = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const Address = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const Label = styled.View`
  background-color: ${({theme}) => theme.colors.grey[8]};
  padding: 3px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-right: 8px;
`;

const AddressWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;
const LabelText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const InputWrap = styled.View`
  margin-top: 26px;
  margin-bottom: 16px;
`;

const ButtonWrap = styled.View`
  position: absolute;
  bottom: 35px;
  left: 20px;
`;
