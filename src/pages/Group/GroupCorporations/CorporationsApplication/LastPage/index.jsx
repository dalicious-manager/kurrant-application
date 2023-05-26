import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useAtom, useAtomValue} from 'jotai';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Keyboard, Text, TextInput} from 'react-native';
import styled from 'styled-components';

import {garbageList, hotStorageList, settingList} from './Option/option';
import useCorporationApplication from '../../../../../biz/useCorporationApplication/hook';
import {
  corpApplicationSpotsAtom,
  corpApplicationTotalSpotAtom,
  isCorpMealDinnerInfoAtom,
  isCorpMealLunchInfoAtom,
  isCorpMealMorningInfoAtom,
  isCorporationApplicant,
  isCorpSendAddressAtom,
  isCorpSendAddressInfoAtom,
  isCorpSendSpotAddressInfoAtom,
} from '../../../../../biz/useCorporationApplication/store';
import BottomSheet from '../../../../../components/BottomSheet/component';
import Button from '../../../../../components/Button';
import RefTextInput from '../../../../../components/RefTextInput';
import useKeyboardEvent from '../../../../../hook/useKeyboardEvent';
import {getStorage} from '../../../../../utils/asyncStorage';
import {PAGE_NAME as GroupCompletePageName} from '../../../GroupCreate/CreateComplete';
import {Title} from '../ThirdPage';

export const PAGE_NAME = 'P__GROUP__CREATE__COR__APPLICATION__LAST';
const Pages = () => {
  const navigation = useNavigation();

  const {corpApplication} = useCorporationApplication();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [selected, setSelected] = useState(); // garbage
  const [selected2, setSelected2] = useState(); // hotStorage
  const [selected3, setSelected3] = useState(); // setting
  const [name, setName] = useState(); // garbage
  const [name2, setName2] = useState(); // hotStorage
  const [name3, setName3] = useState(); // setting
  const [textValue, setTextValue] = useState('');

  const [isMorning, setMorning] = useAtom(isCorpMealMorningInfoAtom);
  const isLunch = useAtomValue(isCorpMealLunchInfoAtom);
  const isDinner = useAtomValue(isCorpMealDinnerInfoAtom);
  const applicant = useAtomValue(isCorporationApplicant);
  const corporationInfo = useAtomValue(isCorpSendAddressAtom);
  const address = useAtomValue(isCorpSendAddressInfoAtom);
  const spot = useAtomValue(corpApplicationTotalSpotAtom);
  //const spotAddress = useAtomValue(isCorpSendSpotAddressInfoAtom);
  const arr = [];
  arr.push(isMorning, isLunch, isDinner);
  const mealDetails = arr.filter(el => el !== null);

  const form = useForm({
    mode: 'all',
  });
  const garbagePress = () => {
    setModalVisible(true);
  };

  const hotStoragePress = () => {
    setModalVisible2(true);
  };

  const settingPress = () => {
    setModalVisible3(true);
  };

  const {
    formState: {errors},
    watch,
    handleSubmit,
    setValue,
  } = form;

  const garbageChk = watch('garbage');
  const hotStorageChk = watch('hotStorage');
  const settingChk = watch('setting');

  const isValidation =
    garbageChk &&
    !errors.garbage &&
    hotStorageChk &&
    !errors.hotStorage &&
    settingChk &&
    !errors.setting;

  const keyboardStatus = useKeyboardEvent();
  const inputStyle = {
    marginBottom: 16,
  };

  const applicationPress = async () => {
    const garbageType = selected === 0 ? true : false;
    const hotStorageType = selected2 === 0 ? true : false;
    const settingType = selected3 === 0 ? true : false;

    const data = {
      user: applicant,
      corporationInfo: corporationInfo,
      address: address,
      mealDetails: mealDetails,
      spots: spot,
      option: {
        isGarbage: garbageType,
        isHotStorage: hotStorageType,
        isSetting: settingType,
        memo: textValue,
      },
    };

    try {
      await corpApplication(data);
      removeStorage();
      navigation.navigate(GroupCompletePageName, {name: 'corporation'});
    } catch (err) {
      console.log(err);
    }
  };

  const removeStorage = async () => {
    AsyncStorage.removeItem('page1');
    AsyncStorage.removeItem('page2');
    AsyncStorage.removeItem('page2-1');
    AsyncStorage.removeItem('page3');
    AsyncStorage.removeItem('page3-1');
    AsyncStorage.removeItem('page3-2');
    AsyncStorage.removeItem('page3-3');
  };

  const garbageValue = text => {
    setValue('garbage', text);
  };

  const hotStorageValue = text => {
    setValue('hotStorage', text);
  };

  const settingValue = text => {
    setValue('setting', text);
  };

  return (
    <Wrap>
      <ScrollWrap>
        <FormProvider {...form}>
          <KeyDismiss onPress={() => Keyboard.dismiss()}>
            <Container>
              <RefTextInput
                label="쓰레기 수거 서비스(선택)"
                placeholder="쓰레기 수거 서비스(선택)"
                name="garbage"
                style={inputStyle}
                onPressIn={garbagePress}
              />
              <RefTextInput
                label="온장고 대여 서비스(선택)"
                placeholder="온장고 대여 서비스(선택)"
                caption="이용 인원 50인 미만시 신청 가능합니다."
                name="hotStorage"
                style={inputStyle}
                onPressIn={hotStoragePress}
              />
              <RefTextInput
                label="식사 세팅 지원 서비스(선택)"
                caption="이용 인원 50인 이상시 신청 가능합니다."
                name="setting"
                placeholder="식사 세팅 지원 서비스(선택)"
                style={inputStyle}
                onPressIn={settingPress}
              />

              <Title>기타 내용</Title>
              <Memo
                onChangeText={text => setTextValue(text)}
                multiline={true}
                placeholder="특이사항이 있다면 적어주세요. &#13;&#10; 예. 비건 샐러드 식사 필요"
              />
            </Container>
          </KeyDismiss>
        </FormProvider>
      </ScrollWrap>
      {!keyboardStatus.isKeyboardActivate && (
        <ButtonWrap>
          <Button
            // disabled={!isValidation}
            label={'스팟 개설 신청'}
            onPressEvent={() => {
              applicationPress();
            }}
          />
        </ButtonWrap>
      )}
      <BottomSheet
        title="쓰레기 수거 서비스(선택)"
        description={`50인 미만 : 15,000원/일 ${'\n'}50인 이상 : 500원/1인`}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setSelected={setSelected}
        selected={selected}
        data={garbageList}
        setName={setName}
        setValue={garbageValue}
      />
      <BottomSheet
        title="온장고 대여 서비스(선택)"
        description={'20,000원/월'}
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
        setSelected={setSelected2}
        selected={selected2}
        setName={setName2}
        setValue={hotStorageValue}
        data={hotStorageList}
      />
      <BottomSheet
        title="식사 세팅 지원 서비스(선택)"
        description={`1,000,000원/월, 200명 단위 인원 증가 ${'\n'}(예. 750명, 월 4,000,000원,인력 4명)`}
        modalVisible={modalVisible3}
        setModalVisible={setModalVisible3}
        setSelected={setSelected3}
        selected={selected3}
        setName={setName3}
        setValue={settingValue}
        data={settingList}
      />
    </Wrap>
  );
};

const Wrap = styled.View`
  background-color: ${({theme}) => theme.colors.grey[0]};
  flex: 1;
`;

const KeyDismiss = styled.Pressable`
  flex: 1;
`;

const ScrollWrap = styled.ScrollView`
  flex: 1;
`;

const ButtonWrap = styled.View`
  padding: 0px 20px;
  position: absolute;
  bottom: 35px;
`;

const Container = styled.View`
  margin: 56px 24px 0px 24px;
`;

const Memo = styled.TextInput`
  width: 100%;
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  border-radius: 14px;
  padding: 16px 20px;
  min-height: 168px;
  align-self: flex-start;
`;

export default Pages;
