import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {View, Text, Keyboard} from 'react-native';
import styled from 'styled-components';

import Icon from '../../../assets/icons/Map/map.svg';
import Button from '../../../components/Button';
import SpotTextInput from '../../../components/SpotTextInput';
import Typography from '../../../components/Typography';
import {useApplyMySpot} from '../../../hook/useSpot';
import withHyphenNumber from '../../../utils/phoneNumber';
import {PAGE_NAME as MySpotMapPage} from '../../Map/MySpotMap';
import {PAGE_NAME as DeliveryPage} from '../../Spots/mySpot/Delivery';
import {PAGE_NAME as NotDeliveryPage} from '../../Spots/mySpot/NotDelivery';

export const PAGE_NAME = 'MY_SPOT_DETAIL';
const DetailAddress = ({route}) => {
  const navigation = useNavigation();
  const center = route?.params?.center; // 좌표
  const name = route?.params?.address; // 지번 주소
  const roadAddress = route?.params?.roadAddress; // 도로명 주소
  const showAddress = route?.params?.showAddress; // true면 지번주소로 넘어온거
  const zipcode = route?.params?.zipcode;
  const jibunAddress = route?.params.jibunAddress;

  const {mutateAsync: applySpot, data: res, isSuccess} = useApplyMySpot();
  const form = useForm({
    mode: 'all',
  });

  const {
    formState: {errors},
    watch,
    handleSubmit,
    setValue,
  } = form;
  console.log(roadAddress);
  const detailAddress = watch('detailAddress');
  const nickNameAddress = watch('nickNameAddress');
  const phoneNumber = watch('phoneNumber');
  const phone = phoneNumber?.split('-');

  const onSaveAddress = async () => {
    const data = {
      address: {
        zipCode: zipcode,
        address1: roadAddress,
        address2: detailAddress,
        latitude: center.latitude,
        longitude: center.longitude,
      },
      mySpotName: nickNameAddress,
      jibunAddress: jibunAddress,
      phone: phone?.join(''),
    };

    await applySpot(data);
  };

  useEffect(() => {
    if (isSuccess) {
      if (res.data.isExist) {
        navigation.navigate(DeliveryPage, {
          mySpotName: res.data.name,
          address: res.data.address,
          isAlarm: res.data.isAlarm,
          name: name, // 검색시 건물이름  Or 지번주소
        });
      } else {
        navigation.navigate(NotDeliveryPage, {
          isExist: res.data.isExist,
        });
      }
    }
  }, [isSuccess]);
  return (
    <Wrap onPress={() => Keyboard.dismiss()}>
      <SpotName>{showAddress ? name : roadAddress}</SpotName>
      <AddressWrap>
        <Label>
          <LabelText>도로명</LabelText>
        </Label>
        <Address>{roadAddress}</Address>
      </AddressWrap>
      <CheckMapWrap
        onPress={() =>
          navigation.navigate(MySpotMapPage, {
            center: center,
          })
        }>
        <Icon />
        <CheckMapText>지도에서 위치 확인</CheckMapText>
      </CheckMapWrap>
      <InputWrap>
        <FormProvider {...form}>
          <SpotTextInput
            label="상세 주소 입력(선택)"
            name="detailAddress"
            placeholder="예. 3층 / 302호"
          />
          <SpotTextInput
            label="주소 별명 입력(선택)"
            name="nickNameAddress"
            placeholder="예. 우리 집 / 회사"
            style={{paddingTop: 24}}
          />
          <SpotTextInput
            label="휴대폰번호 입력(선택)"
            name="phoneNumber"
            placeholder="예. 010-1234-1234"
            style={{paddingTop: 24}}
            value={withHyphenNumber(phoneNumber)}
          />
        </FormProvider>
      </InputWrap>

      <ButtonWrap>
        <Button
          label="주소 저장"
          onPressEvent={form.handleSubmit(onSaveAddress)}
        />
      </ButtonWrap>
    </Wrap>
  );
};

export default DetailAddress;

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
  margin-top: 25px;
`;

const CheckMapWrap = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
`;
const CheckMapText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[2]};
  padding-left: 9px;
`;

const ButtonWrap = styled.View`
  position: absolute;
  bottom: 35px;

  left: 20px;
`;
