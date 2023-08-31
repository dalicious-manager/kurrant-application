import DatePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {View, Text, Keyboard, Platform, Pressable} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';

import {mapApis} from '../../../api/map';
import Icon from '../../../assets/icons/Map/map.svg';
import Button from '../../../components/Button';
import SpotTextInput from '../../../components/SpotTextInput';
import Typography from '../../../components/Typography';
import useKeyboardEvent from '../../../hook/useKeyboardEvent';
import {useApplyShareSpot} from '../../../hook/useShareSpot';
import {formattedMealTime, formattedTime} from '../../../utils/dateFormatter';
import {PAGE_NAME as RegisterSpotMapPage} from '../../Map/RegisterSpotMap';
import {PAGE_NAME as ShareSpotMapPage} from '../../Map/ShareSpotMap';
import {PAGE_NAME as CompletePage} from '../components/Complete';
import {PAGE_NAME as SpotTypePage} from '../SpotType';
export const PAGE_NAME = 'SHARE_SPOT_APPLY';
const ApplySpot = ({route}) => {
  const navigation = useNavigation();
  const center = route?.params?.center; // 좌표
  const address = route?.params?.address; // 지번 주소
  const roadAddress = route?.params?.roadAddress; // 도로명 주소
  const showAddress = route?.params?.showAddress; // true면 지번주소로 넘어온거
  const zipcode = route?.params?.zipcode;
  const type = route?.params?.type;
  const name = route?.params?.name;
  const id = route?.params?.groupId;
  const from = route?.params?.from;

  const [use, setUse] = useState();
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(new Date());
  const [text, setText] = useState('');
  const {mutateAsync: applyShareSpot} = useApplyShareSpot();

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

  const validation = detailAddress && deliveryTime && use !== undefined;

  const data = ['예', '아니요'];
  const keyboardStatus = useKeyboardEvent();
  const showTimePicker = () => {
    setShow(true);
  };

  const onChange = (event, selectedTime) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    // const currentDate = selectedDate;
    setTime(selectedTime);
    setText(formattedMealTime(selectedTime));
    setValue('deliveryTime', formattedMealTime(selectedTime));
  };

  const checkMapLocation = () => {
    if (type === 'registerSpot') {
      navigation.navigate(RegisterSpotMapPage, {
        center: center,
      });
    } else {
      navigation.navigate(ShareSpotMapPage, {
        location: center,
        id: id,
        from: from,
      });
    }
  };

  const applyAddSpotButton = async () => {
    const res = await mapApis.getRoadAddress(center.longitude, center.latitude);
    const param = from === 'application' ? 1 : from === 'spot' ? 2 : 3;
    const body = {
      address: {
        zipCode: res.zipcode,
        address1: roadAddress,
        address2: detailAddress,
        latitude: center.latitude.toString(),
        longitude: center.longitude.toString(),
      },
      groupId: id,
      deliveryTime: formattedTime(time),
      entranceOption: use === 0 ? true : false,
      memo: memo === undefined ? null : memo,
    };

    await applyShareSpot({body, param});
    navigation.reset({
      index: 1,
      routes: [
        {
          name: SpotTypePage,
        },
        {
          name: CompletePage,
          params: {
            type: 'sharSpotAppication',
          },
        },
      ],
    });
    navigation.navigate(CompletePage, {
      type: 'sharSpotAppication',
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:
        type === 'registerSpot' ? '상세 정보 입력' : '스팟/시간 신청',
    });
  }, []);
  return (
    <>
      <Wrap
        onPress={() => {
          Keyboard.dismiss();
          setShow(false);
        }}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraHeight={180}
          resetScrollToCoords={{x: 0, y: 0}}>
          <SpotName>
            {type === 'registerSpot' && showAddress
              ? address
              : type === 'registerSpot' && !showAddress
              ? roadAddress
              : name}
          </SpotName>

          <AddressWrap>
            <Label>
              <LabelText>도로명</LabelText>
            </Label>
            <Address>{roadAddress}</Address>
          </AddressWrap>
          <CheckMapWrap onPress={checkMapLocation}>
            <Icon />
            <CheckMapText>지도에서 위치 확인</CheckMapText>
          </CheckMapWrap>
          <InputWrap>
            <FormProvider {...form}>
              <SpotTextInput
                label="상세 주소 입력"
                name="detailAddress"
                placeholder="예. 3층 / 302호"
              />

              <SpotTextInput
                label="배송 시간"
                name="deliveryTime"
                placeholder="배송 시간을 선택해주세요."
                style={{paddingTop: 24}}
                onPressIn={() => {
                  showTimePicker();
                }}
                value={deliveryTime}
                showSoftInputOnFocus={false}
                minuteInterval={5}
              />
              <ButtonView>
                <AddInfoText>외부인 출입이 가능한가요?</AddInfoText>
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
              <SpotTextInput
                height="130px"
                label="기타 내용(선택)"
                name="memo"
                placeholder="특이사항이 있다면 적어주세요."
                style={{paddingTop: 24}}
              />
            </FormProvider>
          </InputWrap>
        </KeyboardAwareScrollView>

        {!show && !keyboardStatus.isKeyboardActivate && (
          <ButtonWrap>
            <Button
              label="신청하기"
              onPressEvent={applyAddSpotButton}
              disabled={!validation}
            />
          </ButtonWrap>
        )}
      </Wrap>
      {show && (
        <DatePickerWrap>
          {Platform.OS === 'ios' && (
            <IosButton>
              <Pressable
                onPress={() => {
                  setShow(false);
                }}>
                <Cancel>취소</Cancel>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShow(false);
                }}>
                <Confirm>완료</Confirm>
              </Pressable>
            </IosButton>
          )}

          <DatePicker
            value={time}
            display="spinner"
            onChange={onChange}
            locale="ko-KR"
            mode="time"
            minuteInterval={5}
            style={{backgroundColor: '#F5F5F5'}}
          />
        </DatePickerWrap>
      )}
    </>
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

  flex: 1;
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
  width: 100%;
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
  margin-top: 24px;
`;
const IosButton = styled.Pressable`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 20px;
`;

const Cancel = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const Confirm = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.blue[500]};
`;

const DatePickerWrap = styled.View`
  width: 100%;
  /* position: absolute;
  bottom: 0; */
  z-index: 999;
`;
