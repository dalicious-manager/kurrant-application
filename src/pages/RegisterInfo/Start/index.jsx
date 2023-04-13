import {Dimensions, Text} from 'react-native';
import styled, {useTheme} from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';

import A from '../../../assets/icons/RegisterInfo/A.svg';
import Q from '../../../assets/icons/RegisterInfo/Q.svg';

import {PAGE_NAME as RegisterInfoPage1PageName} from '../Page1';
import {PAGE_NAME as RegisterInfoPage2PageName} from '../Page2';
import {PAGE_NAME as RegisterInfoPage3PageName} from '../Page3';
import {PAGE_NAME as RegisterInfoPage4PageName} from '../Page4';
import {PAGE_NAME as RegisterInfoPage6PageName} from '../Page6';
import {PAGE_NAME as RegisterInfoPage7PageName} from '../Page7_8_9_10/Page7';
import {SmallXVectorIcon, XVectorIcon} from '../../../components/Icon';

import Typography from '~components/Typography';

// import BackgroundImage from './BackgroundImage';

export const PAGE_NAME = 'P__REGISTER_INFO_START';

const Pages = () => {
  //   const [clickAvaliable, setClickAvaliable] = useState(false);

  const navigation = useNavigation();
  const theme = useTheme();

  const handlePress = () => {
    // navigation.navigate(RegisterInfoPage2PageName);
    navigation.navigate(RegisterInfoPage1PageName);
  };

  return (
    <Container
      paddingHorizontal={24}
      styles={{
        position: 'relative',
      }}>
      <BackgroundImage
        source={require('../../../assets/images/RegisterInfoBackground.png')}
      />

      <Wrap1
        style={{
          marginTop: 24,
          marginBottom: 16,
        }}>
        <QWrap>
          <Q />
          <QText>어떠한 정보를 입력하는 건가요?</QText>
        </QWrap>
        <AWrap>
          <AWrapWrap>
            <A />
          </AWrapWrap>
          <AText>
            평소 식습관 관련해서 야식, 음주, 프로틴 섭 취 빈도나 운동 빈도,
            선호하는 음식 관련한 정보를 받아요.
          </AText>
        </AWrap>
      </Wrap1>
      <Wrap1 style={{marginBottom: 4}}>
        <QWrap>
          <Q />
          <QText>입력하면 무엇이 좋은 건가요?</QText>
        </QWrap>
        <AWrap>
          <AWrapWrap>
            <A />
          </AWrapWrap>

          <AText>
            회원 정보를 바탕으로 보다 정확한 식사 추천을 받으실 수 있어요.
          </AText>
        </AWrap>
      </Wrap1>

      <SText>멤버십 가입시 식사 추천 기능 이용 가능</SText>

      <Wrap3>
        <NotTodayPressable>
          <NotTodayText>오늘 하루동안 이 페이지 보지 않기 </NotTodayText>
          <SmallXVectorIcon color={theme.colors.grey[2]} size={9} />
        </NotTodayPressable>
      </Wrap3>

      <ButtonNext
        size="full"
        label="회원 정보 입력하기"
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
  align-items: center;
  display: flex;
  background-color: ${({theme}) => theme.colors.grey[8]};
  position: relative;
`;

const BackgroundImage = styled.Image`
  width: ${() => `${Dimensions.get('screen').width}px`};
`;

const ButtonNext = styled(Button)`
  position: absolute;
  bottom: 35px;
`;

const Wrap1 = styled.View`
  width: 100%;

  border-radius: 14px;
  padding: 16px;
  background-color: #ffffff;
`;

const QWrap = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;
const QText = styled(Typography).attrs({text: 'Body05SB'})`
  margin-left: 4px;

  color: ${({theme}) => theme.colors.grey[2]};
`;
const AWrap = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AWrapWrap = styled.View`
  height: 100%;
  padding-top: 3px;
  /* border: 1px solid black; */
`;

const AText = styled(Typography).attrs({text: 'Body05R'})`
  margin-left: 4px;
  color: ${({theme}) => theme.colors.grey[2]};
  flex-shrink: 1;
`;

const SText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  margin-bottom: 24px;
`;

const Wrap3 = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

const NotTodayPressable = styled.Pressable`
  display: flex;
  flex-flow: row;
`;
const NotTodayText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-right: 6px;
`;
