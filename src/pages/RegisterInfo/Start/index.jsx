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

import {SmallXVectorIcon} from '../../../components/Icon';

import RegisterInfoBack from '../../../assets/images/RegisterInfo/RegisterInfoBack.png';

// import BuyMeal, {
//   PAGE_NAME as BuyMealPageName,
// } from '../../pages/Main/Bnb/BuyMeal/Main';

import Typography from '~components/Typography';
import {removeItemFromStorage, setStorage} from '../../../utils/asyncStorage';

export const PAGE_NAME = 'P__REGISTER_INFO_START';

const Pages = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const handlePress = () => {
    navigation.navigate(RegisterInfoPage1PageName);
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
      styles={{
        position: 'relative',
      }}>
      <ScrollViewContainer>
        <Background
          platform={Platform.OS}
          source={RegisterInfoBack}
          resizeMode="cover"
        />
      </ScrollViewContainer>

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

  align-items: center;

  background-color: ${({theme}) => theme.colors.grey[8]};
  position: relative;
`;

const ScrollViewContainer = styled.ScrollView`
  width: 100%;

  height: 750px;

  background-color: ${({theme}) => theme.colors.grey[8]};
`;

const Background = styled.Image`
  width: 100%;

  ${({platform}) => {
    if (platform === 'ios') {
      return css`
        height: 750px;
      `;
    } else {
      return css`
        height: 710px;
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
