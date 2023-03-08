import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useAtom, useAtomValue} from 'jotai';
import React, {useLayoutEffect, useState} from 'react';
import {Keyboard, SafeAreaView, Text, View} from 'react-native';
import styled from 'styled-components';

import useApartApplication from '../../../../../biz/useApartApplication/hook';
import {
  apartApplicationDiningTypeAtom,
  apartMemoAtom,
  isApartMealDinnerInfoAtom,
  isApartMealInfoAtom,
  isApartMealLunchInfoAtom,
  isApartMealMorningInfoAtom,
  isApartmentApplicant,
  isApartSendAddressAtom,
  isApartSendAddressInfoAtom,
} from '../../../../../biz/useApartApplication/store';
import Button from '../../../../../components/Button';
import ProgressBar from '../../../../../components/ProgressBar2';
import useKeyboardEvent from '../../../../../hook/useKeyboardEvent';
import {getStorage} from '../../../../../utils/asyncStorage';
import {PAGE_NAME as GroupCompletePageName} from '../../../GroupCreate/CreateComplete';
import {Title} from '../ThirdPage';

export const PAGE_NAME = 'P__GROUP__CREATE__APARTMENT__APPLICATION__LAST';
const Pages = () => {
  const navigation = useNavigation();
  const [isMemo, setIsMemo] = useAtom(apartMemoAtom);
  const {apartApplication} = useApartApplication();
  const user = useAtomValue(isApartmentApplicant);
  const apartmentInfo = useAtomValue(isApartSendAddressAtom);
  const [, setApartmentDiningTypeInfo] = useAtom(
    apartApplicationDiningTypeAtom,
  );
  const [isMorning, setMorning] = useAtom(isApartMealMorningInfoAtom);
  const [isLunch, setLunch] = useAtom(isApartMealLunchInfoAtom);
  const [isDinner, setDinner] = useAtom(isApartMealDinnerInfoAtom);
  const address = useAtomValue(isApartSendAddressInfoAtom);
  const mealInfo = useAtomValue(isApartMealInfoAtom);
  const memo = useAtomValue(apartMemoAtom);

  console.log(isMorning, isLunch, isDinner, '999');
  const applicationPress = async () => {
    const addressData = await getStorage('page2-1');
    const get = JSON.parse(addressData);
    const arr = [];

    if (isMorning) {
      arr.push(isMorning);
    }
    if (isLunch) {
      arr.push(isLunch);
    }
    if (isDinner) {
      arr.push(isDinner);
    }
    const data = {
      user: user,
      address: Object.keys(address).length === 0 ? get : address,
      apartmentInfo: apartmentInfo,
      //mealDetails: Array.isArray(mealInfo) ? mealInfo : arr,
      mealDetails: arr,
      memo: memo,
    };

    try {
      await apartApplication(data);
      removeStorage();
      navigation.navigate(GroupCompletePageName, {name: 'apartment'});
    } catch (err) {
      alert(err.toString().replace('error: ', ''));
    }
  };

  const keyboardStatus = useKeyboardEvent();

  const removeStorage = async () => {
    AsyncStorage.removeItem('page1');
    AsyncStorage.removeItem('page2');
    AsyncStorage.removeItem('page2-1');
    AsyncStorage.removeItem('page3');
    AsyncStorage.removeItem('page3-1');
    AsyncStorage.removeItem('page3-2');
    AsyncStorage.removeItem('page3-3');
    setApartmentDiningTypeInfo([]);
    setMorning({});
    setLunch({});
    setDinner({});
  };
  return (
    <Wrap>
      <ProgressBar progress={4} />
      <KeyDismiss onPress={() => Keyboard.dismiss()}>
        <ContainerWrap>
          <Title>기타 내용(선택)</Title>
          <Memo
            placeholder="특이사항이 있다면 적어주세요. &#13;&#10;예. 비건 샐러드 식사 필요"
            multiline={true}
            onChangeText={text => setIsMemo(text)}
            value={isMemo}
          />
        </ContainerWrap>
      </KeyDismiss>

      {!keyboardStatus.isKeyboardActivate && (
        <ButtonWrap>
          <Button
            label={'스팟 개설 신청'}
            onPressEvent={() => {
              applicationPress();
            }}
          />
        </ButtonWrap>
      )}
    </Wrap>
  );
};

export default Pages;

const Wrap = styled.SafeAreaView`
  background-color: ${({theme}) => theme.colors.grey[0]};
  flex: 1;
`;

const ContainerWrap = styled.View`
  margin: 0px 24px;
`;

const KeyDismiss = styled.Pressable`
  flex: 1;
`;

const ButtonWrap = styled.View`
  padding: 0px 20px;
  position: absolute;
  bottom: 35px;
`;

const Memo = styled.TextInput`
  width: 100%;
  height: 50%;
  padding: 16px 20px;
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  border-radius: 14px;
  justify-content: flex-start;
`;
