import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {View, Text, Keyboard} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';

import Icon from '../../../assets/icons/Map/map.svg';
import Button from '../../../components/Button';
import SpotTextInput from '../../../components/SpotTextInput';
import Typography from '../../../components/Typography';
import {PAGE_NAME as MySpotMapPage} from '../../Map/MySpotMap';
import {PAGE_NAME as NotDeliveryPage} from '../../Spots/mySpot/NotDelivery';

export const PAGE_NAME = 'SHARE_SPOT_APPLY';
const ApplySpot = ({route}) => {
  const navigation = useNavigation();
  const center = route?.params?.params?.center; // 좌표
  const address = route?.params?.params?.address; // 지번 주소
  const roadAddress = route?.params?.params?.roadAddress; // 도로명 주소
  const showAddress = route?.params?.params?.showAddress; // true면 지번주소로 넘어온거
  const zipcode = route?.params?.params?.zipcode;
  const type = route?.params?.params?.type;
  console.log(route.params);
  const [use, setUse] = useState();

  const form = useForm({
    mode: 'all',
  });

  const {
    formState: {errors},
    watch,
    handleSubmit,
    setValue,
  } = form;

  const detailAddress = watch('detailAddress');
  const deliveryTime = watch('deliveryTime');
  const memo = watch('memo');

  const onSaveAddress = () => {
    navigation.navigate(NotDeliveryPage);
  };

  const data = ['예', '아니요'];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:
        type === 'registerSpot' ? '상세 정보 입력' : '스팟/시간 신청',
    });
  }, []);
  return (
    <Wrap onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        style={{flex: 1}}
        extraScrollHeight={120}
        enableOnAndroid={true}
        resetScrollToCoords={{x: 0, y: 0}}>
        <SpotName>{showAddress ? address : roadAddress}</SpotName>
        {/* <SpotName>{showAddress ? address : roadAddress}</SpotName> */}
        <AddressWrap>
          <Label>
            <LabelText>도로명</LabelText>
          </Label>
          <Address>{roadAddress}</Address>
          {/* <Address>{roadAddress}</Address> */}
        </AddressWrap>
        <InputWrap>
          <FormProvider {...form}>
            <SpotTextInput
              label="상세 주소 입력"
              name="detailAddress"
              placeholder="예. 3층 / 302호"
            />
            <CheckMapWrap
              onPress={() =>
                navigation.navigate(MySpotMapPage, {
                  center: center,
                })
              }>
              <Icon />
              <CheckMapText>지도에서 위치 확인</CheckMapText>
            </CheckMapWrap>
            <SpotTextInput
              label="배송 시간 입력"
              name="deliveryTime"
              placeholder="예. 오후 12:00"
              style={{paddingTop: 24}}
            />
            <SpotTextInput
              height="130px"
              label="기타 내용(선택)"
              name="memo"
              placeholder="특이사항이 있다면 적어주세요."
              style={{paddingTop: 24}}
            />
          </FormProvider>
        </InputWrap>
        <ButtonView>
          <AddInfoText>출입증이 필요한가요?</AddInfoText>
          {data.map((el, idx) => {
            return (
              <AddInfoButton
                key={el}
                onPress={() => {
                  setUse(idx);
                }}
                use={use}
                idx={idx}>
                <AddInfoButtonText use={use} idx={idx}>
                  {el}
                </AddInfoButtonText>
              </AddInfoButton>
            );
          })}
        </ButtonView>
      </KeyboardAwareScrollView>
      <ButtonWrap>
        <Button
          label="신청하기"
          onPressEvent={form.handleSubmit(onSaveAddress)}
        />
      </ButtonWrap>
    </Wrap>
  );
};

export default ApplySpot;

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
  margin-bottom: 16px;
`;

const CheckMapWrap = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
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
const AddInfoText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-right: 12px;
`;

const AddInfoButtonText = styled(Typography).attrs({text: 'Button10SB'})`
  color: ${({theme, use, idx}) =>
    use === idx ? theme.colors.grey[0] : theme.colors.grey[5]};
`;

const AddInfoButton = styled.Pressable`
  width: 58px;
  height: 24px;
  border-radius: 100px;
  background-color: ${({theme, use, idx}) =>
    use === idx ? theme.colors.grey[2] : theme.colors.grey[8]};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const ButtonView = styled.View`
  flex-direction: row;
`;
