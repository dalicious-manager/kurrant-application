import DatePicker from '@react-native-community/datetimepicker';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {FormProvider, useForm, Controller} from 'react-hook-form';
import {
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import DatePicker from 'react-native-modern-datepicker';
import styled, {css, useTheme} from 'styled-components/native';

import DateOrderItemContainer from './components/DateOrderItemContainer';
// import ModalCalendar from './ModalCalendar';
import usePurchaseHistory from '../../../../../../biz/usePurchaseHistory';
import {purchaseAtom} from '../../../../../../biz/usePurchaseHistory/store';
import {CalendarIcon} from '../../../../../../components/Icon';
import Typography from '../../../../../../components/Typography';
import Wrapper from '../../../../../../components/Wrapper';
import {useGetAllPurchaseHistory} from '../../../../../../hook/usePurchaseHistory';
import {formattedWeekDate} from '../../../../../../utils/dateFormatter';
import Skeleton from '../../Skeleton';

export const PAGE_NAME = 'P_MAIN__EVERYTHING__HISTORY';

const Pages = () => {
  const navigation = useNavigation();
  const themeApp = useTheme();
  const form = useForm();
  const [, setAllPurchase] = useAtom(purchaseAtom);
  const [startDate, setStartDate] = useState(
    startDate || new Date().setDate(new Date().getDate() - 7),
  );
  const [showDateModal, setShowDateModal] = useState(false);
  const [endDate, setEndDate] = useState(endDate || new Date());
  const [showDateModal2, setShowDateModal2] = useState(false);
  const onChangeDate = (event, date, setModal, setSelected) => {
    if (Platform.OS === 'android') {
      setModal(false);
    }

    setSelected(date);
  };

  const confirmPress = setModal => {
    setModal(false);
  };
  const [searchDate, setSearchDate] = useState([
    {id: 0, text: '1주일', isActive: true},
    {id: 1, text: '1개월', isActive: false},
    {id: 2, text: '3개월', isActive: false},
    {id: 3, text: '조건검색', isActive: false},
  ]);
  const {
    getPurchaseHistory,
    readAbleAtom: {isAllPurchaseLoading},
  } = usePurchaseHistory();
  const body = {
    startDate: formattedWeekDate(startDate),
    endDate: formattedWeekDate(endDate),
    orderType: 1,
  };
  const {data: allPurchase, refetch: allPurchaceRefetch} =
    useGetAllPurchaseHistory(body);
  const selectDate = date => {
    const setDate = searchDate.map(item =>
      item.id === date.id
        ? {...item, isActive: true}
        : {...item, isActive: false},
    );
    setSearchDate(setDate);
  };
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
  const ShowCalendar = (selected, onChange, confirm, setModal, setSelected) => {
    return (
      <React.Fragment>
        {Platform.OS === 'ios' && (
          <IosButton>
            <Pressable
              onPress={() => {
                setModal(false);
              }}>
              <Cancel>취소</Cancel>
            </Pressable>
            <Pressable onPress={() => confirm(setModal)}>
              <Confirm>완료</Confirm>
            </Pressable>
          </IosButton>
        )}
        <DatePicker
          value={selected}
          display="spinner"
          onChange={(event, date) =>
            onChange(event, date, setModal, setSelected)
          }
          locale="ko-KR"
        />
      </React.Fragment>
    );
  };
  const onPressCondition = async () => {
    const bodys = {
      startDate: formattedWeekDate(startDate),
      endDate: formattedWeekDate(endDate),
      orderType: 1,
    };
    await getPurchaseHistory(bodys);
  };
  useEffect(() => {
    allPurchaceRefetch();
  }, [startDate, endDate, allPurchaceRefetch]);
  useEffect(() => {
    const selectDates = searchDate.filter(v => v.isActive === true);
    const dateArray = () => {
      var now = new Date();
      if (selectDates[0].id === 0) {
        const starts = new Date(now.setDate(now.getDate() - 7));
        const ends = new Date();
        return [starts, ends];
      }

      if (selectDates[0].id === 1) {
        const starts = new Date(now.setMonth(now.getMonth() - 1));
        const ends = new Date();
        return [starts, ends];
      }
      if (selectDates[0].id === 2) {
        const starts = new Date(now.setMonth(now.getMonth() - 3));
        const ends = new Date();
        return [starts, ends];
      }
    };
    if (selectDates[0].id !== 3) {
      const [start, end] = dateArray();
      setStartDate(start);
      setEndDate(end);
    }
  }, [searchDate]);

  //////////

  return (
    <Container>
      <Wrapper>
        <DateTab>
          {searchDate.map(v => {
            return (
              <DateButton
                isActive={v.isActive}
                key={v.id}
                onPress={() => selectDate(v)}>
                <DateText
                  text={v.isActive ? 'Button10SB' : 'Button10R'}
                  isActive={v.isActive}>
                  {v.text}
                </DateText>
              </DateButton>
            );
          })}
        </DateTab>
        {searchDate.find(v => v.id === 3).isActive && (
          <ConditionSearch>
            <DateSelectedBox>
              <DateSelectButton
                onPress={() => {
                  if (showDateModal2) {
                    setShowDateModal2(false);
                  }

                  setShowDateModal(true);
                }}>
                <DateSelectedText
                  text="CaptionR"
                  textColor={themeApp.colors.grey[2]}>
                  {formattedWeekDate(startDate, '. ')}
                </DateSelectedText>
                <CalendarIcon />
              </DateSelectButton>
              <Bridge>
                <Typography text="CaptionR">-</Typography>
              </Bridge>
              <DateSelectButton
                onPress={() => {
                  if (showDateModal) {
                    setShowDateModal(false);
                  }

                  setShowDateModal2(true);
                }}>
                <DateSelectedText
                  text="CaptionR"
                  textColor={themeApp.colors.grey[2]}>
                  {formattedWeekDate(endDate, '. ')}
                </DateSelectedText>
                <CalendarIcon />
              </DateSelectButton>
            </DateSelectedBox>
            <SubmitButton>
              <Typography
                text="Button10SB"
                textColor={themeApp.colors.grey[3]}
                onPress={onPressCondition}>
                검색
              </Typography>
            </SubmitButton>
          </ConditionSearch>
        )}
        {isAllPurchaseLoading ? (
          <Skeleton />
        ) : (
          <Wrapper>
            {allPurchase?.data ? (
              <ScrollViewBox>
                {allPurchase?.data?.map((v, i) => {
                  return (
                    <DateOrderItemContainer
                      key={`${v.orderDate}${i}`}
                      itemIndex={i}
                      data={allPurchase?.data}
                      purchaseId={v.id}
                      date={v.orderDate}
                    />
                  );
                })}
                <BottomView />
              </ScrollViewBox>
            ) : (
              <NothingContainer>
                <Typography
                  text={'Body05R'}
                  textColor={themeApp.colors.grey[5]}>
                  주문 내역이 없어요
                </Typography>
              </NothingContainer>
            )}
          </Wrapper>
        )}
      </Wrapper>
      {showDateModal &&
        ShowCalendar(
          startDate,
          onChangeDate,
          confirmPress,
          setShowDateModal,
          setStartDate,
        )}
      {showDateModal2 &&
        ShowCalendar(
          endDate,
          onChangeDate,
          confirmPress,
          setShowDateModal2,
          setEndDate,
        )}
    </Container>
  );
};

export default Pages;

const DateTab = styled.View`
  flex-direction: row;
  border-bottom-color: ${({theme}) => theme.colors.grey[8]};
  border-bottom-width: 1px;
  padding: 8px 20px;
`;

const DateButton = styled.Pressable`
  border-radius: 4px;
  padding: 6.5px 12px;
  margin: 0px 4px;
  ${({isActive}) => {
    if (isActive) {
      return css`
        background-color: ${({theme}) => theme.colors.neutral[0]};
        border: 1px solid ${({theme}) => theme.colors.grey[2]};
        box-sizing: border-box;
      `;
    } else {
      return css`
        background-color: ${({theme}) => theme.colors.grey[8]};
        border: 1px solid ${({theme}) => theme.colors.grey[8]};
        box-sizing: border-box;
      `;
    }
  }}
`;

const ConditionSearch = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 8px 24px;
  border-bottom-color: ${({theme}) => theme.colors.grey[8]};
  border-bottom-width: 1px;
  align-items: center;
  justify-content: space-between;
`;
const DateSelectedBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
const DateText = styled(Typography)`
  ${({isActive}) => {
    if (isActive) {
      return css`
        color: ${({theme}) => theme.colors.grey[2]};
      `;
    } else {
      return css`
        color: ${({theme}) => theme.colors.grey[5]};
      `;
    }
  }}
`;
const NothingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Container = styled.View`
  flex: 1;
`;
const ScrollViewBox = styled(ScrollView)`
  flex: 1;
`;
const BottomView = styled.View`
  width: 100%;
  height: 28px;
`;
const Bridge = styled.View`
  margin: 0px 4px;
`;
const DateSelectButton = styled.Pressable`
  flex-direction: row;
  min-width: 123px;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  padding: 8px;
  padding-left: 12px;
`;
const DateSelectedText = styled(Typography)`
  margin-right: 15px;
`;
const SubmitButton = styled.Pressable`
  border-radius: 100px;
  padding: 6.5px 16px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
`;
export const IosButton = styled.Pressable`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: #f5f5f5;
  z-index: 999;
`;

export const Cancel = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

export const Confirm = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.blue[500]};
`;
