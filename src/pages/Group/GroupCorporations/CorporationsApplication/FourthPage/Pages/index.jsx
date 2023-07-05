import {useNavigation} from '@react-navigation/native';
import {useAtom, useAtomValue} from 'jotai';
import React, {useLayoutEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Keyboard, Text, View} from 'react-native';
import styled from 'styled-components';

import {
  corpApplicationSpotsAtom,
  corpApplicationTotalSpotAtom,
  corpApplicationUseMealType,
  isCorpFullSpotAddressAtom,
  isCorpMealInfoAtom,
  isCorpSendSpotAddressInfoAtom,
} from '../../../../../../biz/useCorporationApplication/store';
import Button from '../../../../../../components/Button';
import ButtonMealType from '../../../../../../components/ButtonMealType';
import RefTextInput from '../../../../../../components/RefTextInput';
import Typography from '../../../../../../components/Typography';
import useKeyboardEvent from '../../../../../../hook/useKeyboardEvent';
import {setStorage} from '../../../../../../utils/asyncStorage';
import {Title} from '../../ThirdPage';
import {PAGE_NAME as CorporationApplicationSpotPostCodePageName} from '../Pages/map';

export const PAGE_NAME = 'CORPORATION__SPOT__APPLICATION';
const Pages = () => {
  const navigation = useNavigation();

  const isMealInfo = useAtomValue(isCorpMealInfoAtom);
  // const [touch,setTouch] = useAtom(corpApplicationUseMealType);
  const [touch, setTouch] = useState([]);
  const [isCorpSpot, setCorpSpot] = useAtom(corpApplicationSpotsAtom);
  const [isSendSpotAddress, setSendSpotAddress] = useAtom(
    isCorpSendSpotAddressInfoAtom,
  );
  const [isTotalSpot, setTotalSpot] = useAtom(corpApplicationTotalSpotAtom);
  const isCorpFullSpotAddress = useAtomValue(isCorpFullSpotAddressAtom); // TextInput value
  // touch 1:아침 2:점심 3: 저녁
  const form = useForm({
    mode: 'all',
  });

  const {
    formState: {errors},
    watch,
    handleSubmit,
    setValue,
  } = form;

  const inputStyle = {
    marginBottom: 16,
  };

  const spotNameChk = watch('spotName');
  const addressChk = watch('address');
  const remainingAddressChk = watch('remainingAddress');

  const isValidation =
    spotNameChk &&
    !errors.spotName &&
    addressChk &&
    !errors.address &&
    remainingAddressChk &&
    !errors.remainingAddress;

  const keyboardStatus = useKeyboardEvent();
  const saveAtom = async () => {
    await setStorage(
      'corpPage4-1',
      JSON.stringify([
        ...isTotalSpot,
        {
          address: {...isSendSpotAddress, address2: remainingAddressChk},
          spotName: spotNameChk,
          diningTypes: touch,
        },
      ]),
    );
    setSendSpotAddress({...isSendSpotAddress, address2: remainingAddressChk});
    setCorpSpot({
      spotName: spotNameChk,
      diningTypes: touch,
    });

    setTotalSpot([
      ...isTotalSpot,
      {
        address: {...isSendSpotAddress, address2: remainingAddressChk},
        spotName: spotNameChk,
        diningTypes: touch,
      },
    ]);
  };

  const onPressButton = idx => {
    if (touch?.includes(idx)) {
      return setTouch(touch?.filter(v => v !== idx));
    }
    setTouch([...touch, idx]);
  };

  useLayoutEffect(() => {
    setValue('address', isCorpFullSpotAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCorpFullSpotAddress]);

  return (
    <Wrap>
      <FormProvider {...form}>
        <KeyDismiss onPress={() => Keyboard.dismiss()}>
          <Container>
            <RefTextInput
              label="스팟명"
              name="spotName"
              placeholder="스팟명"
              style={inputStyle}
              caption="건물 이름 + 층으로 입력해주세요."
              suffix={{
                isNeedDelete: true,
              }}
            />

            <RefTextInput
              label="배송지"
              name="address"
              placeholder="배송지"
              style={inputStyle}
              onPressIn={() =>
                navigation.navigate(CorporationApplicationSpotPostCodePageName)
              }
            />
            <RefTextInput
              label="나머지 주소"
              name="remainingAddress"
              placeholder="나머지 주소"
              style={inputStyle}
              suffix={{
                isNeedDelete: true,
              }}
            />

            <Title>이 스팟에서 이용할 식사 타입</Title>
            <MealView>
              {isMealInfo.map((m, idx) => {
                const meal = m === 0 ? '아침' : m === 1 ? '점심' : '저녁';

                return (
                  <Meal
                    key={idx}
                    touch={touch?.includes(idx + 1)}
                    onPress={() => onPressButton(idx + 1)}>
                    <Label touch={touch?.includes(idx + 1)}>{meal}</Label>
                  </Meal>
                );
              })}
            </MealView>
          </Container>
        </KeyDismiss>
      </FormProvider>
      {!keyboardStatus.isKeyboardActivate && (
        <ButtonWrap>
          <Button
            label={'저장'}
            disabled={!isValidation}
            onPressEvent={() => {
              saveAtom();
              navigation.goBack();
            }}
          />
        </ButtonWrap>
      )}
    </Wrap>
  );
};

export default Pages;

const Wrap = styled.View`
  background-color: ${({theme}) => theme.colors.grey[0]};
  flex: 1;
`;

const Container = styled.View`
  margin: 0px 24px;
  margin-top: 40px;
`;

const KeyDismiss = styled.Pressable`
  flex: 1;
`;

const ButtonWrap = styled.View`
  padding: 0px 20px;
  position: absolute;
  bottom: 35px;
`;

const Meal = styled.Pressable`
  border-color: ${({theme, touch}) =>
    !touch ? theme.colors.grey[8] : theme.colors.grey[7]};
  border-width: 1px;
  border-radius: 14px;
  background-color: ${({theme, touch}) =>
    touch ? theme.colors.grey[2] : theme.colors.grey[8]};
  align-items: center;
  justify-content: center;
  padding: 8px 36px;
  margin-right: 8px;
`;

const Label = styled(Typography).attrs({text: 'BottomButtonSB'})`
  color: ${({theme, touch}) =>
    touch ? theme.colors.grey[0] : theme.colors.grey[5]};
`;

const MealView = styled.View`
  flex-direction: row;
`;
