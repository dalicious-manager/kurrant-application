import {Dimensions, ImageBackground, Platform, Text} from 'react-native';
import styled, {css, useTheme} from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';

import A from '../../../assets/icons/RegisterInfo/A.svg';
import Q from '../../../assets/icons/RegisterInfo/Q.svg';

import {PAGE_NAME as RegisterInfoPage1PageName} from '../Page1';
import {PAGE_NAME as RegisterInfoPage2PageName} from '../Page2';
import {PAGE_NAME as RegisterInfoPage3PageName} from '../Page3';
import {PAGE_NAME as RegisterInfoPage4PageName} from '../Page4';
import {PAGE_NAME as RegisterInfoPage5PageName} from '../Page4';
import {PAGE_NAME as RegisterInfoPage6PageName} from '../Page6';
import {PAGE_NAME as RegisterInfoPage7PageName} from '../Page7_8_9_10/Page7';
import {PAGE_NAME as RegisterInfoPage10PageName} from '../Page7_8_9_10/Page10';
import {PAGE_NAME as RegisterInfoFinishPageName} from '../Finish';

import {SmallXVectorIcon, XVectorIcon} from '../../../components/Icon';

// import RegisterInfoBack from '../../../assets/icons/RegisterInfo/RegisterInfoBack.svg';
import RegisterInfoBack from '../../../assets/images/RegisterInfo/RegisterInfoBack.png';

import {PAGE_NAME as HOME} from '../../Main/Bnb/Home';

// import BuyMeal, {
//   PAGE_NAME as BuyMealPageName,
// } from '../../pages/Main/Bnb/BuyMeal/Main';

import Typography from '~components/Typography';
import {removeItemFromStorage, setStorage} from '../../../utils/asyncStorage';
import LinearGradient from 'react-native-linear-gradient';

// import BackgroundImage from './BackgroundImage';

export const PAGE_NAME = 'P__REGISTER_INFO_START';

const Pages = () => {
  //   const [clickAvaliable, setClickAvaliable] = useState(false);

  const navigation = useNavigation();
  const theme = useTheme();

  const handlePress = () => {
    // navigation.navigate(RegisterInfoPage2PageName);

    // 1. 클릭하면 localstorage에 클릭한 날짜 저장
    // 기존거 지우고 새로운거 올리기

    navigation.navigate(RegisterInfoPage3PageName);
    // navigation.navigate(RegisterInfoPage1PageName);
    // navigation.navigate(RegisterInfoFinishPageName);
    // navigation.navigate(RegisterInfoPage2PageName);
  };

  const handleTodayPress = async () => {
    await removeItemFromStorage('registerInfoClicked');

    const checkedTime = Date.now();

    await setStorage('registerInfoClicked', JSON.stringify(checkedTime));

    // 홈으로 가기
    navigation.navigate('P_MAIN__BNB__HOME');
  };

  return (
    <Container
      // paddingHorizontal={24}
      styles={{
        position: 'relative',
      }}>
      {/* <ScrollViewContainer showsVerticalScrollIndicator={false}> */}
      <ScrollViewContainer>
        {/* <Text> 안녕</Text> */}
        <Background
          platform={Platform.OS}
          source={RegisterInfoBack}
          resizeMode="cover"
        />
      </ScrollViewContainer>

      {/* <ButtonWrapper
        colors={[
          'rgba(255, 255, 255, 0)',
          'rgba(255, 255, 255, 0.3)',
          'rgba(255, 255, 255, 0.7)',
          'rgba(255, 255, 255, 0.8048)',
          'rgba(255, 255, 255, 0.9)',
          'rgba(255, 255, 255, 0.95)',
        ]}></ButtonWrapper> */}

      <Wrap3 platform={Platform.OS}>
        <NotTodayPressable
          onPress={() => {
            handleTodayPress();
          }}>
          <NotTodayText>오늘 하루동안 이 페이지 보지 않기 </NotTodayText>
          <SmallXVectorIcon color={theme.colors.grey[2]} size={9} />
        </NotTodayPressable>
      </Wrap3>

      <ButtonNext
        size="full"
        label="회원 정보 입력하기"
        text={'BottomButtonSB'}
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
  /* height: 100%; */

  align-items: center;
  /* background-color: #ffffff; */
  background-color: ${({theme}) => theme.colors.grey[8]};
  position: relative;
`;

const ScrollViewContainer = styled.ScrollView`
  width: 100%;
  /* height: 40%; */
  height: 750px;

  /* height: 100%; */
  background-color: ${({theme}) => theme.colors.grey[8]};
  /* border: 1px solid black; */
`;

// const Background = styled.ImageBackground`
const Background = styled.Image`
  /* flex: 1; */

  width: 100%;

  ${({platform}) => {
    if (platform === 'ios') {
      return css`
        height: 750px;
        /* height: 100%; */
      `;
    } else {
      return css`
        height: 710px;
        /* height: 100%; */
      `;
    }
  }}
`;

const Wrap3 = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  bottom: 107px;
  right: 24px;

  ${() => {
    if (Platform.OS === 'ios') {
      return css`
        bottom: 107px;
      `;
    } else {
      return css`
        bottom: 96px;
      `;
    }
  }}
`;

const ButtonNext = styled(Button)`
  width: ${() => `${Dimensions.get('screen').width - 48}px`};

  position: relative;

  ${() => {
    if (Platform.OS === 'ios') {
      return css`
        bottom: 35px;
      `;
    } else {
      return css`
        bottom: 24px;
      `;
    }
  }}
`;

const NotTodayPressable = styled.Pressable`
  display: flex;
  flex-flow: row;
`;
const NotTodayText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-right: 6px;
`;
