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
  corpApplicationWeek,
  isCorpMealDinnerInfoAtom,
  isCorpMealInfoAtom,
  isCorpMealLunchInfoAtom,
  isCorpMealMorningInfoAtom,
} from '../../../../../../biz/useCorporationApplication/store';
import BottomSheet from '../../../../../../components/BottomSheet/component';
import BottomSheetPrice from '../../../../../../components/BottomSheetPrice';
import Button from '../../../../../../components/Button';
import WeekButton from '../../../../../../components/ButtonWeek';
import CloseButton from '../../../../../../components/CloseButton';
import RefTextInput from '../../../../../../components/RefTextInput';
import Typography from '../../../../../../components/Typography';
import useKeyboardEvent from '../../../../../../hook/useKeyboardEvent';
import {getStorage, setStorage} from '../../../../../../utils/asyncStorage';
import {
  formattedMealTime,
  formattedTime,
} from '../../../../../../utils/dateFormatter';
import withCommas from '../../../../../../utils/withCommas';
import {Cancel, Confirm, IosButton} from '../../SecondPage';
import {priceAverage, surpportPrice} from './function';
import {foodPriceList, supportPriceList} from './Price/price';

export const PAGE_NAME = 'CORPORATION__APPLICATION__MEAL__INFO';
const Pages = ({route}) => {
  const navigation = useNavigation();

  const diningType = route.params.diningType;
  // const [isCorpMealInfo,setMealInfo] = useAtom(isCorpMealMorningInfoAtom);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selected, setSelected] = useState(); // priceAverage
  const [selected2, setSelected2] = useState(); // supportPrice
  const [name, setName] = useState();
  const [name2, setName2] = useState();
  const [time, setTime] = useState(new Date()); // TimePicker 초기값
  const [show, setShow] = useState(false); // TimePicker
  const [infoShow, setInfoShow] = useState(false); // 배송시간 선택 후 나오는 View
  const [isMorning, setMorning] = useAtom(isCorpMealMorningInfoAtom);
  const [isLunch, setLunch] = useAtom(isCorpMealLunchInfoAtom);
  const [isDinner, setDinner] = useAtom(isCorpMealDinnerInfoAtom);
  const [touch, setTouch] = useState([]); // 요일 선택
  const form = useForm({
    mode: 'all',
  });

  const foodPrice = () => {
    setModalVisible(true);
  };

  const supportPrice = () => {
    setModalVisible2(true);
  };

  const {
    formState: {errors},
    watch,
    handleSubmit,
    setValue,
  } = form;
  const priceAverageChk = watch('priceAverage');
  const supportPriceChk = watch('supportPrice');
  const svcCountChk = watch('svcCount');
  const deliveryTimeChk = watch('deliveryTime');

  const isValidation =
    priceAverageChk &&
    !errors.priceAverage &&
    touch.length !== 0 &&
    supportPriceChk &&
    !errors.supportPrice &&
    deliveryTimeChk &&
    !errors.deliveryTime &&
    svcCountChk &&
    !errors.svcCount;

  const inputStyle = {
    marginBottom: 16,
  };

  const keyboardStatus = useKeyboardEvent();
  const saveAtom = async () => {
    if (diningType === 1) {
      await setStorage(
        'corpPage3-1',
        JSON.stringify({
          diningType: 1,
          priceAverage: priceAverage(priceAverageChk),
          supportPrice: surpportPrice(supportPriceChk),
          expectedUserCount: Number(svcCountChk),
          serviceDays: touch,
          deliveryTime: deliveryTimeChk.substr(3),
          deliveryTime2: deliveryTimeChk,
        }),
      );
    } else if (diningType === 2) {
      await setStorage(
        'corpPage3-2',
        JSON.stringify({
          diningType: 2,
          priceAverage: priceAverage(priceAverageChk),
          supportPrice: surpportPrice(supportPriceChk),
          expectedUserCount: Number(svcCountChk),
          serviceDays: touch,
          deliveryTime: deliveryTimeChk.substr(3),
          deliveryTime2: deliveryTimeChk,
        }),
      );
    } else {
      await setStorage(
        'corpPage3-3',
        JSON.stringify({
          diningType: 3,
          priceAverage: priceAverage(priceAverageChk),
          supportPrice: surpportPrice(supportPriceChk),
          expectedUserCount: Number(svcCountChk),
          serviceDays: touch,
          deliveryTime: deliveryTimeChk.substr(3),
          deliveryTime2: deliveryTimeChk,
        }),
      );
    }
    const price = foodPriceList?.filter(el => el.text === priceAverageChk);
    const support = supportPriceList?.filter(el => el.text === supportPriceChk);
    const supportPrice = Number(
      support[0].text.replace(/,/g, '').replace(/[^0-9]/g, ''),
    );
    const atomSupportPrice = Number(
      name2?.replace(/,/g, '').replace(/[^0-9]/g, ''),
    );
    const data = await getStorage('corpPage3-1');
    const data2 = await getStorage('corpPage3-2');
    const data3 = await getStorage('corpPage3-3');
    const get = JSON.parse(data);
    const get2 = JSON.parse(data2);
    const get3 = JSON.parse(data3);
    if (diningType === 1) {
      setMorning({
        diningType: 1,
        priceAverage: selected === undefined ? price[0].id : selected,
        supportPrice: atomSupportPrice === NaN ? supportPrice : supportPrice,
        expectedUserCount: Number(svcCountChk),
        serviceDays: touch,
        deliveryTime:
          Object.keys(get).length !== 0
            ? get.deliveryTime
            : formattedTime(time),
      });
    } else if (diningType === 2) {
      setLunch({
        diningType: 2,
        priceAverage: selected === undefined ? price[0].id : selected,
        supportPrice: atomSupportPrice === NaN ? supportPrice : supportPrice,
        expectedUserCount: Number(svcCountChk),
        serviceDays: touch,
        deliveryTime:
          Object.keys(get2).length !== 0
            ? get2.deliveryTime
            : formattedTime(time),
      });
    } else {
      setDinner({
        diningType: 3,
        priceAverage: selected === undefined ? price[0].id : selected,
        supportPrice: atomSupportPrice === NaN ? supportPrice : supportPrice,
        expectedUserCount: Number(svcCountChk),
        serviceDays: touch,
        deliveryTime:
          Object.keys(get3).length !== 0
            ? get3.deliveryTime
            : formattedTime(time),
      });
    }
    navigation.goBack();
  };

  const showTimePicker = () => {
    setShow(true);
  };

  const onChange = (event, selectedTime) => {
    if (Platform.OS === 'android') {
      setShow(false);
      setInfoShow(true);
    }

    setTime(selectedTime);
    setValue('deliveryTime', formattedMealTime(selectedTime));
  };

  const foodPriceValue = text => {
    setValue('priceAverage', text);
  };

  const supportPriceValue = text => {
    setValue('supportPrice', text);
  };
  console.log(selected);
  useEffect(() => {
    const getData = async () => {
      const data1 = await getStorage('corpPage3-1');
      const data2 = await getStorage('corpPage3-2');
      const data3 = await getStorage('corpPage3-3');
      if (data1 !== null || data2 !== null || data3 !== null) {
        const get = JSON.parse(data1);
        const get2 = JSON.parse(data2);
        const get3 = JSON.parse(data3);

        if (get !== null && diningType === 1) {
          setValue('priceAverage', priceAverage(get.priceAverage));
          setValue('supportPrice', surpportPrice(get.supportPrice));
          setValue('svcCount', get.expectedUserCount.toString());
          setTouch(get.serviceDays);
          setValue('deliveryTime', get.deliveryTime2);
        } else if (get2 !== null && diningType === 2) {
          setValue('priceAverage', priceAverage(get2.priceAverage));
          setValue('supportPrice', surpportPrice(get2.supportPrice));
          setValue('svcCount', get2.expectedUserCount.toString());
          setTouch(get2.serviceDays);
          setValue('deliveryTime', get2.deliveryTime2);
        } else {
          setValue('priceAverage', priceAverage(get3.priceAverage));
          setValue('supportPrice', surpportPrice(get3.supportPrice));
          setValue('svcCount', get3.expectedUserCount.toString());
          setTouch(get3.serviceDays);
          setValue('deliveryTime', get3.deliveryTime2);
        }
      }
    };

    getData();
  }, []);
  const type = diningType === 1 ? '아침' : diningType === 2 ? '점심' : '저녁';
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${type} 식사 정보`,
      headerLeft: () => <CloseButton margin={[10, 0]} />,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrap>
      <ScrollWrap>
        <FormProvider {...form}>
          <KeyDismiss onPress={() => Keyboard.dismiss()}>
            <Container>
              <RefTextInput
                label="식단 가격 범위"
                placeholder="식단 가격 범위"
                name="priceAverage"
                style={inputStyle}
                onPressIn={foodPrice}
                showSoftInputOnFocus={false}
              />
              <RefTextInput
                label="일일 식사 지원금"
                placeholder="일일 식사 지원금"
                name="supportPrice"
                style={inputStyle}
                onPressIn={supportPrice}
                showSoftInputOnFocus={false}
              />
              <RefTextInput
                label="예상 인원수"
                name="svcCount"
                keyboardType="numeric"
                placeholder="예상 인원수"
                style={inputStyle}
                rules={{
                  //   required: '필수 입력 항목 입니다.',
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
      </ScrollWrap>
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
            }}
          />
        </ButtonWrap>
      )}
      <BottomSheetPrice
        title="식단 가격 범위"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setSelected={setSelected}
        selected={selected}
        data={foodPriceList}
        setName={setName}
        setValue={foodPriceValue}
      />
      <BottomSheet
        title="일일 식사 지원금"
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
        setSelected={setSelected2}
        selected={selected2}
        data={supportPriceList}
        setName={setName2}
        setValue={supportPriceValue}
      />
    </Wrap>
  );
};
//navigation.goBack();
export default Pages;

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
