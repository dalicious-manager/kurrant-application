import {Text} from 'react-native';
import styled from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import ProgressBar from '~components/ProgressBar7';

import {PAGE_NAME as RegisterInfoFinishPageName} from '../Finish';
import TitleBox from './components/TitleBox';
import useGetRegisterInfo from '../../../biz/useRegisterInfo/getRegisterIist/hook';
import ImageBox from './components/ImageBox.jsx/ImageBox';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE7';

const Pages = ({route}) => {
  //   const [clickAvaliable, setClickAvaliable] = useState(false);
  // route.params

  const {
    getCountryFoodList,
    getAlergyList,
    getJobList,
    getDetailJobList,
    getCountryList,
    getFoodImageList,
    countryFoodList,
    alergyList,
    jobList,
    detailJobList,
    countryList,
    foodImageList,
  } = useGetRegisterInfo();

  useEffect(() => {
    getFoodImageList();
  }, []);

  // useEffect(() => {
  //   console.log(foodImageList);
  // }, [foodImageList]);

  const navigation = useNavigation();

  const handlePress = () => {
    console.log('ㅗㅑ');
    navigation.navigate(RegisterInfoFinishPageName);
  };

  return (
    <Container
      paddingHorizontal={24}
      styles={{
        position: 'relative',
      }}>
      <ScrollViewContainer showsVerticalScrollIndicator={false}>
        <ProgressBar progress={7} />
        <TitleBox
          num={1}
          title={`아래 음식 중 마음에 드는 \n음식 3개를 선택해 주세요`}
        />

        <ImageBox foodImageList={foodImageList} />
      </ScrollViewContainer>
      <ButtonNext
        size="full"
        label="다음"
        text={'BottomButtonSB'}
        // disabled={!clickAvaliable}
        onPressEvent={() => {
          handlePress();
        }}
      />
    </Container>
  );
};
export default Pages;

const Container = styled.View`
  flex: 1;
  /* padding: 35px 20px; */
  /* padding: 15px 20px; */
  align-items: center;
  background-color: #ffffff;
`;

const ScrollViewContainer = styled.ScrollView`
  width: 100%;
  /* height: 90%; */
  background-color: #ffffff;
`;

const ButtonNext = styled(Button)`
  position: relative;
  bottom: 35px;
`;
