import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAtom, useAtomValue} from 'jotai';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {SafeAreaView, Text, View} from 'react-native';
import styled from 'styled-components';

import {PAGE_NAME as ApartmentApplicationInformationPageName} from './Pages/index';
import Arrow from '../../../../../assets/icons/Spot/arrowRight.svg';
import {
  apartApplicationDiningTypeAtom,
  isApartMealDinnerInfoAtom,
  isApartMealInfoAtom,
  isApartMealLunchInfoAtom,
  isApartMealMorningInfoAtom,
} from '../../../../../biz/useApartApplication/store';
import Button from '../../../../../components/Button';
import MealButton from '../../../../../components/ButtonMealType';
import Label from '../../../../../components/Label';
import ProgressBar from '../../../../../components/ProgressBar2';
import Typography from '../../../../../components/Typography';
import {getStorage, setStorage} from '../../../../../utils/asyncStorage';
import {PAGE_NAME as ApartmentApplicationLastPageName} from '../LastPage';

export const PAGE_NAME = 'P__GROUP__CREATE__APARTMENT__APPLICATION__THIRD';
const Pages = () => {
  const navigation = useNavigation();

  const [touch, setTouch] = useAtom(apartApplicationDiningTypeAtom);
  const [isMorning, setMorning] = useAtom(isApartMealMorningInfoAtom);
  const [isLunch, setLunch] = useAtom(isApartMealLunchInfoAtom);
  const [isDinner, setDinner] = useAtom(isApartMealDinnerInfoAtom);

  const [isMealInfo, setMealInfo] = useAtom(isApartMealInfoAtom);

  const isValidation =
    touch.length !== 0 &&
    (isMorning !== null || isLunch !== null || isDinner !== null);

  useEffect(() => {
    const getData = async () => {
      const data = await getStorage('page3-1');
      const data2 = await getStorage('page3-2');
      const data3 = await getStorage('page3-3');
      const touchData = await getStorage('page3');
      const getDataPage = JSON.parse(data);
      const getDataPage2 = JSON.parse(data2);
      const getDataPage3 = JSON.parse(data3);
      const getTouchData = JSON.parse(touchData);
      if (getTouchData !== null) {
        if (
          getDataPage !== null ||
          getDataPage !== null ||
          getDataPage3 !== null
        ) {
          if (getDataPage !== null && Object.keys(getDataPage).length !== 0) {
            delete getDataPage.deliveryTime2;
          }
          if (getDataPage2 !== null && Object.keys(getDataPage2).length !== 0) {
            delete getDataPage2.deliveryTime2;
          }
          if (getDataPage3 !== null && Object.keys(getDataPage3).length !== 0) {
            delete getDataPage3.deliveryTime2;
          }
          setMorning(getDataPage);
          setLunch(getDataPage2);
          setDinner(getDataPage3);
        }
        setTouch(getTouchData.mealType);
      }
    };

    getData();
  }, []);

  const saveStorage = async () => {
    await setStorage(
      'page3',
      JSON.stringify({
        mealType: touch,
      }),
    );
  };

  return (
    <Wrap>
      <ProgressBar progress={3} />
      <ContainerWrap>
        <Container>
          <Title>식사 타입</Title>
          <MealButtonWrap>
            <MealButton touch={touch} setTouch={setTouch} />
          </MealButtonWrap>
          {touch.includes(0) && (
            <Container>
              <Title>식사 정보</Title>
              <InfoBar
                onPress={() => {
                  saveStorage();
                  navigation.navigate(ApartmentApplicationInformationPageName, {
                    diningType: 1,
                  });
                }}>
                <DiningType>아침</DiningType>
                <InfoBarView>
                  {isMorning === null ? (
                    <Label type="blue" label="입력하기" size="labelM" />
                  ) : (
                    <Label type="grey8" label="입력완료" size="labelM" />
                  )}
                  <ArrowIcon />
                </InfoBarView>
              </InfoBar>
            </Container>
          )}
          {touch.includes(1) && (
            <Container>
              <InfoBar
                onPress={() => {
                  saveStorage();
                  navigation.navigate(ApartmentApplicationInformationPageName, {
                    diningType: 2,
                  });
                }}>
                <DiningType>점심</DiningType>
                <InfoBarView>
                  {isLunch === null ? (
                    <Label type="blue" label="입력하기" size="labelM" />
                  ) : (
                    <Label type="grey8" label="입력완료" size="labelM" />
                  )}
                  <ArrowIcon />
                </InfoBarView>
              </InfoBar>
            </Container>
          )}
          {touch.includes(2) && (
            <Container>
              <InfoBar
                onPress={() => {
                  saveStorage();
                  navigation.navigate(ApartmentApplicationInformationPageName, {
                    diningType: 3,
                  });
                }}>
                <DiningType>저녁</DiningType>
                <InfoBarView>
                  {isDinner === null ? (
                    <Label type="blue" label="입력하기" size="labelM" />
                  ) : (
                    <Label type="grey8" label="입력완료" size="labelM" />
                  )}
                  <ArrowIcon />
                </InfoBarView>
              </InfoBar>
            </Container>
          )}
        </Container>
      </ContainerWrap>
      <ButtonWrap>
        <Button
          label={'다음'}
          disabled={!isValidation}
          onPressEvent={() => {
            navigation.navigate(ApartmentApplicationLastPageName);
          }}
        />
      </ButtonWrap>
    </Wrap>
  );
};

export default Pages;

const Wrap = styled.SafeAreaView`
  background-color: ${({theme}) => theme.colors.grey[0]};
  flex: 1;
`;

const ButtonWrap = styled.View`
  padding: 0px 20px;
  position: absolute;
  bottom: 35px;
`;

const MealButtonWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ContainerWrap = styled.View`
  margin: 0px 24px;
`;

const Container = styled.View`
  margin-bottom: 40px;
`;

export const Title = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 8px;
`;

const InfoBar = styled.Pressable`
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  padding: 16px 20px;
  border-radius: 14px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InfoBarView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DiningType = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const ArrowIcon = styled(Arrow)`
  margin-left: 12px;
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

const MealLabel = styled(Typography).attrs({text: 'BottomButtonSB'})`
  color: ${({theme, touch}) =>
    touch ? theme.colors.grey[0] : theme.colors.grey[5]};
`;

const MealView = styled.View`
  flex-direction: row;
`;
