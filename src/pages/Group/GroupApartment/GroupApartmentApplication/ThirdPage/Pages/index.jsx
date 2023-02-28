import DatePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import styled from 'styled-components';

import Arrow from '../../../../../../assets/icons/Group/arrowDown.svg';
import {
  apartApplicationDaysDinner,
  apartApplicationDaysLunch,
  apartApplicationDaysMorning,
  apartApplicationWeek,
  apartDeliveryAtom,
  isApartMealDinnerInfoAtom,
  isApartMealInfoAtom,
  isApartMealLunchInfoAtom,
  isApartMealMorningInfoAtom,
} from '../../../../../../biz/useApartApplication/store';
import Button from '../../../../../../components/Button';
import WeekButton from '../../../../../../components/ButtonWeek';
import RefTextInput from '../../../../../../components/RefTextInput';
import Typography from '../../../../../../components/Typography';
import useKeyboardEvent from '../../../../../../hook/useKeyboardEvent';
import {getStorage, setStorage} from '../../../../../../utils/asyncStorage';
import {
  formattedMealTime,
  formattedTime,
} from '../../../../../../utils/dateFormatter';
import {Cancel, Confirm, IosButton} from '../../SecondPage';

export const PAGE_NAME = 'APARTMENT__APPLICATION__INFORMAION';
const Pages = ({route}) => {
  const navigation = useNavigation();
  const diningType = route.params.diningType;
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [infoShow, setInfoShow] = useState(false);
  const [text, setText] = useAtom(apartDeliveryAtom);
  const [touch, setTouch] = useState([]);
  //   const [touch, setTouch] = useAtom(apartApplicationDaysMorning);
  //   const [touchLunch, setTouchLunch] = useAtom(apartApplicationDaysLunch);
  //   const [touchDinner, setTouchDinner] = useAtom(apartApplicationDaysDinner);

  const [isMorning, setMorning] = useAtom(isApartMealMorningInfoAtom);
  const [isLunch, setLunch] = useAtom(isApartMealLunchInfoAtom);
  const [isDinner, setDinner] = useAtom(isApartMealDinnerInfoAtom);

  const form = useForm({
    mode: 'all',
  });

  const {
    formState: {errors},
    watch,
    handleSubmit,
    setValue,
  } = form;
  //const daysChk = checkDay.some(el => el === true);
  const svcDongCountChk = watch('svcDongCount');
  const deliveryTimeChk = watch('deliveryTime');

  const isValidation =
    svcDongCountChk &&
    !errors.svcDongCount &&
    touch.length !== 0 &&
    deliveryTimeChk &&
    !errors.deliveryTime;

  const inputStyle = {
    marginBottom: 16,
  };

  const saveAtom = async () => {
    if (diningType === 1) {
      await setStorage(
        'page3-1',
        JSON.stringify({
          expectedUserCount: Number(svcDongCountChk),
          serviceDays: touch,
          deliveryTime: deliveryTimeChk.substr(3),
          deliveryTime2: deliveryTimeChk,
        }),
      );
    } else if (diningType === 2) {
      await setStorage(
        'page3-2',
        JSON.stringify({
          expectedUserCount: Number(svcDongCountChk),
          serviceDays: touch,
          deliveryTime: deliveryTimeChk.substr(3),
          deliveryTime2: deliveryTimeChk,
        }),
      );
    } else {
      await setStorage(
        'page3-3',
        JSON.stringify({
          expectedUserCount: Number(svcDongCountChk),
          serviceDays: touch,
          deliveryTime: deliveryTimeChk.substr(3),
          deliveryTime2: deliveryTimeChk,
        }),
      );
    }

    if (diningType === 1) {
      const data = await getStorage('page3-1');
      const get = JSON.parse(data);
      setMorning({
        diningType: 1,
        expectedUserCount: Number(svcDongCountChk),
        serviceDays: touch,
        deliveryTime:
          Object.keys(get).length !== 0
            ? get.deliveryTime
            : formattedTime(time),
      });
    } else if (diningType === 2) {
      const data2 = await getStorage('page3-2');
      const get2 = JSON.parse(data2);
      setLunch({
        diningType: 2,
        expectedUserCount: Number(svcDongCountChk),
        serviceDays: touch,
        deliveryTime:
          Object.keys(get2).length !== 0
            ? get2.deliveryTime
            : formattedTime(time),
      });
    } else {
      const data3 = await getStorage('page3-3');
      const get3 = JSON.parse(data3);
      setDinner({
        diningType: 3,
        expectedUserCount: Number(svcDongCountChk),
        serviceDays: touch,
        deliveryTime:
          Object.keys(get3).length !== 0
            ? get3.deliveryTime
            : formattedTime(time),
      });
    }
  };

  const showTimePicker = () => {
    setShow(true);
  };

  const keyboardStatus = useKeyboardEvent();
  const onChange = (event, selectedTime) => {
    if (Platform.OS === 'android') {
      setShow(false);
      setInfoShow(true);
    }
    // const currentDate = selectedDate;
    setTime(selectedTime);
    setText(formattedMealTime(selectedTime));
    setValue('deliveryTime', formattedMealTime(selectedTime));
  };

  useEffect(() => {
    const getData = async () => {
      const data1 = await getStorage('page3-1');
      const data2 = await getStorage('page3-2');
      const data3 = await getStorage('page3-3');
      if (data1 !== null || data2 !== null || data3 !== null) {
        const get = JSON.parse(data1);
        const get2 = JSON.parse(data2);
        const get3 = JSON.parse(data3);
        if (get !== null && diningType === 1) {
          setValue('svcDongCount', get?.expectedUserCount.toString());
          setTouch(get.serviceDays);
          setValue('deliveryTime', get.deliveryTime2);
        } else if (get2 !== null && diningType === 2) {
          setValue('svcDongCount', get2.expectedUserCount.toString());
          setTouch(get2.serviceDays);
          setValue('deliveryTime', get2?.deliveryTime2);
        } else if (get3 !== null && diningType === 3) {
          setValue('svcDongCount', get3?.expectedUserCount.toString());
          setTouch(get3.serviceDays);
          setValue('deliveryTime', get3.deliveryTime2);
        }
      }
    };

    getData();
  }, []);

  return (
    <Wrap>
      <ScrollView>
        <FormProvider {...form}>
          <KeyDismiss onPress={() => Keyboard.dismiss()}>
            <Container>
              <RefTextInput
                label="서비스 이용 예상 세대수"
                name="svcDongCount"
                keyboardType="numeric"
                placeholder="서비스 이용 예상 세대수"
                style={inputStyle}
                defaultValue={
                  diningType === 1
                    ? isMorning?.expectedUserCount
                      ? String(isMorning?.expectedUserCount)
                      : 0
                    : diningType === 2
                    ? isLunch?.expectedUserCount
                      ? String(isLunch?.expectedUserCount)
                      : 0
                    : isDinner?.expectedUserCount
                    ? String(isDinner?.expectedUserCount)
                    : 0
                }
                suffix={{
                  isNeedDelete: true,
                }}
                rules={{
                  pattern: {
                    value: /^[0-9]+$/,
                    message: '숫자만 입력해 주세요.',
                  },
                }}
              />

              <DaysText>서비스 이용 요일</DaysText>
              <WeekButton touch={touch} setTouch={setTouch} />

              <View style={inputStyle}>
                <RefTextInput
                  label="배송 시간"
                  name="deliveryTime"
                  placeholder="배송 시간"
                  onPressIn={() => {
                    showTimePicker();
                    setInfoShow(false);
                  }}
                  showSoftInputOnFocus={false}
                  minuteInterval={5}
                />
                <ArrowIcon />
              </View>
            </Container>
          </KeyDismiss>
        </FormProvider>

        {infoShow && !keyboardStatus.isKeyboardActivate && (
          <InfoWrap>
            <LetterWrap>
              <Letter>
                <InfoTitle>🚩아래 내용은 모두 상담시 안내해드립니다.</InfoTitle>
              </Letter>
              <Letter>
                <Title>배송 시간</Title>
                <Description>식사가 배송되는 시간입니다.</Description>
              </Letter>
              <Letter>
                <Title>주문 마감 시간</Title>
                <Description>
                  통상적으로 배송 12~24시간 전에 주문 마감이 되고,{'\n'} 주문
                  마감 이후 주문건은 할인 혜택에서 제외됩니다.{' '}
                </Description>
              </Letter>
              <Letter>
                <Title>주문취소 가능 시간</Title>
                <Description>
                  주문 취소는 배송 2~3시간 전까지 가능하고, 그 후에는 {'\n'}{' '}
                  취소가 불가능합니다.
                </Description>
              </Letter>
              <Letter>
                <Title>배송비</Title>
                <Description>
                  ・ 50인 미만 {'\n'}
                  강남 3구(15,000원/일), 강남 3구 외 서울지역(20,000원/일),
                  수도권 지역(25,000원/일){'\n'}・ 50인 이상 {'\n'}
                  멤버십 가입시 무료 배송(가입비 10,000원/월)
                </Description>
              </Letter>
            </LetterWrap>
          </InfoWrap>
        )}
      </ScrollView>
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
                  setInfoShow(true);
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
      {!show && !keyboardStatus.isKeyboardActivate && (
        <ButtonWrap>
          <Button
            disabled={!isValidation}
            label={'저장'}
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
//navigation.goBack();
export default Pages;

const Wrap = styled.SafeAreaView`
  background-color: ${({theme}) => theme.colors.grey[0]};
  flex: 1;
`;

const KeyDismiss = styled.Pressable``;

const ButtonWrap = styled.View`
  padding: 0px 20px;
  position: absolute;
  bottom: 35px;
`;

const Container = styled.View`
  margin: 56px 24px 0px 24px;
`;

const Letter = styled.View`
  margin-bottom: 12px;
`;

const LetterWrap = styled.View`
  padding: 12px 16px 0px 12px;
  background-color: ${({theme}) => theme.colors.blue[100]};
`;

const InfoTitle = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const Title = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.blue[500]};
`;

const Description = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const DatePickerWrap = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const ArrowIcon = styled(Arrow)`
  position: absolute;
  right: 4px;
  bottom: 12px;
`;

const InfoWrap = styled.View`
  margin: 24px;
  margin-bottom: 100px;
`;

const DaysText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 8px;
`;
