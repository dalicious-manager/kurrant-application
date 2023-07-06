import {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, Platform} from 'react-native';
import Animated from 'react-native-reanimated';
import styled, {css} from 'styled-components';
import {
  formattedWeekDate,
  stringDateToJavascriptDate,
  toStringByFormatting,
} from '../../../../../utils/dateFormatter';

import Typography from '~components/Typography';

import CalendarButton from '~components/CalendarButton';
import BuyCalendar from '~components/BuyCalendar';
import {useAtomValue} from 'jotai';
import {isUserInfoAtom} from '../../../../../biz/useUserInfo/store';
import useAuth from '../../../../../biz/useAuth/hook';

import LinearGradient from 'react-native-linear-gradient';
import Button from '~components/Button';
import {useNavigation} from '@react-navigation/native';

import {PAGE_NAME as DietRepoHistoryPageName} from '~pages/Main/Bnb/DietRepo/History';
import {PAGE_NAME as DietRepoAddDietPageName} from '~pages/Main/Bnb/DietRepo/AddDiet';
import {View} from 'react-native';
import FlatListBanner from './Components/FlatListBanner';
import DietRepoCard from './Components/DietRepoCard';
import {ArrowRightBlue} from '../../../../../components/Icon';

import useGetDietRepo from '../useGetDietRepo';
import {modifyDietRepoMainData} from '../logic';

import LoadingScreen from '~components/LoadingScreen';

import useDietRepoMutation from '../useDietRepoMutation';
import DietRepoCalendar2 from '../DietRepoCalendar/DietRepoCalendar2';
import {useGetDailyfood} from '../../../../../hook/useDailyfood';
import {getStorage, setStorage} from '../../../../../utils/asyncStorage';
import {useQueryClient} from 'react-query';

export const PAGE_NAME = 'P_MAIN__DIET_REPO__MAIN';

const Pages = ({route}) => {
  const navigation = useNavigation();

  const {
    readableAtom: {userRole},
  } = useAuth();

  // 유저정보에서 현재 스팟 가져오기
  const userInfo = useAtomValue(isUserInfoAtom);
  const userSpotId = userRole === 'ROLE_GUEST' ? 1 : userInfo?.spotId;

  const {data: dailyfoodData} = useGetDailyfood(
    userSpotId,
    formattedWeekDate(new Date()),
  );

  const pager = useRef();

  const [sliderValue, setSliderValue] = useState(1);

  const [date, setDate] = useState(
    route?.params?.date
      ? typeof route?.params?.date === 'object'
        ? route?.params?.date
        : stringDateToJavascriptDate(route?.params?.date, '-')
      : new Date(),
  );
  const {
    isDietRepoMainRefetchLoading,
    dietRepoMainRefetch,
    totalNutrition,
    dietRepoMainList,
  } = useGetDietRepo(formattedWeekDate(date), undefined, undefined);

  useEffect(() => {
    dietRepoMainRefetch();

    const fetchYo = async date => {
      if (typeof date === 'object') {
        if (
          (await getStorage(`dietRepo_Date_${toStringByFormatting(date)}`)) ===
          toStringByFormatting(date)
        ) {
        } else {
          saveMeal(toStringByFormatting(date));
          setStorage(
            `dietRepo_Date_${toStringByFormatting(date)}`,
            toStringByFormatting(date),
          );
        }
      } else if (typeof date === 'string') {
        if ((await getStorage(`dietRepo_Date_${date}`)) === date) {
        } else {
          saveMeal(date);
          setStorage(`dietRepo_Date_${date}`, date);
        }
      }
    };
    fetchYo(date);
  }, [date]);

  const {saveMeal} = useDietRepoMutation();

  const dayPress = selectedDate => {
    setDate(stringDateToJavascriptDate(selectedDate, '-'));
  };

  const handleHistoryPress = () => {
    navigation.navigate(DietRepoHistoryPageName, {
      date: formattedWeekDate(date),
    });
  };

  return (
    <>
      <Container>
        <CalendarWrap>
          {/* <DietRepoCalendarNew
            initialDate={route?.params?.date}
            BooleanValue={false}
            type={'grey2'}
            color={'white'}
            size={'Body05R'}
            onPressEvent2={dayPress}
            // daily={daily}
            selectDate={formattedWeekDate(date)}
            margin={'0px 28px'}
            scrollDir
            pagerRef={pager}
            // onPageScroll2={onPageScroll2}
            sliderValue={sliderValue}
            isServiceDays={isServiceDays}
          /> */}

          <DietRepoCalendar2
            initialDate={route?.params?.date}
            BooleanValue={false}
            type={'grey2'}
            color={'white'}
            size={'Body05R'}
            onPressEvent2={dayPress}
            selectDate={formattedWeekDate(date)}
            margin={'0px 28px'}
            pagerRef={pager}
            sliderValue={sliderValue}
            isServiceDays={dailyfoodData?.data?.serviceDays}
          />
        </CalendarWrap>

        <FlatList
          ListHeaderComponent={
            <View style={{paddingLeft: 24, paddingRight: 24}}>
              <FlatListBanner
                todayTotalCal={totalNutrition?.totalCalorie}
                nutritionList={[
                  {
                    lable: '탄수화물',
                    amount: totalNutrition?.totalCarbohydrate,
                  },
                  {lable: '단백질', amount: totalNutrition?.totalProtein},
                  {lable: '지방', amount: totalNutrition?.totalFat},
                ]}
              />
            </View>
          }
          contentContainerStyle={{paddingBottom: 190}}
          data={modifyDietRepoMainData(
            dietRepoMainList,
            formattedWeekDate(date),
          )}
          scrollEnabled={true}
          renderItem={({item}) => {
            return (
              <FlatListView style={{paddingLeft: 24, paddingRight: 24}}>
                <FlatListView2>
                  <MealTimeText>{item.menuTime}</MealTimeText>

                  <AddMealPressable
                    onPress={() => {
                      navigation.navigate(DietRepoAddDietPageName, {
                        date: formattedWeekDate(date),
                        diningType: item.diningType,
                      });
                    }}>
                    <AddMealText>식사 추가</AddMealText>
                    <ArrowRightBlue />
                  </AddMealPressable>
                </FlatListView2>

                {Array.isArray(item.menuList) && item.menuList.length > 0 ? (
                  <View>
                    {item.menuList.map((v, i) => {
                      return (
                        <DietRepoCard key={v.reportId} type="main" item1={v} />
                      );
                    })}
                  </View>
                ) : (
                  <>
                    <GreyThinLine />
                  </>
                )}
              </FlatListView>
            );
          }}
        />

        <ButtonWrapper
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0.3)',
            'rgba(255, 255, 255, 0.7)',
            'rgba(255, 255, 255, 0.8048)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 0.95)',
          ]}>
          <ButtonNext
            size="full"
            label="식사 히스토리"
            text={'BottomButtonSB'}
            // disabled={!clickAvaliable}
            onPressEvent={() => {
              handleHistoryPress();
            }}
          />
        </ButtonWrapper>
      </Container>
      {isDietRepoMainRefetchLoading && <LoadingScreen />}
    </>
  );
};

export default Pages;

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  /* position: absolute; */
`;

const CalendarWrap = styled.View`
  height: 85px;
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 1px;
  width: 100%;
`;

const FlatListView = styled.View`
  /* margin-top: 25px; */
`;
const FlatListView2 = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
`;

const MealTimeText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const AddMealText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme}) => theme.colors.blue[500]};
  margin-right: 4px;
`;

const AddMealPressable = styled.Pressable`
  flex-direction: row;

  align-items: center;
`;

const GreyThinLine = styled.View`
  width: 100%;
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 1px;
  margin-bottom: 25px;
`;

const ButtonWrapper = styled(LinearGradient)`
  position: relative;
  ${() => {
    if (Platform.OS === 'ios') {
      return css`
        bottom: 35px;
      `;
    } else {
      return css`
        bottom: 24px;
        /* bottom: 1px; */
      `;
    }
  }}

  padding:0 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonNext = styled(Button)``;

// const LoadingScreen = styled.View`
//   flex: 1;
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   justify-content: center;
//   align-items: center;

//   background-color: white;

//   opacity: 0.6;
// `;
