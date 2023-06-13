import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  Alert,
  Platform,
  Linking,
  PermissionsAndroid,
  Pressable,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import styled from 'styled-components';
import Toast from '~components/Toast';

import ModalComponent from './components/ModalComponent';
import {
  MySpot,
  ShareSpot,
  PrivateSpot,
  DisabledMySpot,
  DisabledPrivateSpot,
  DisabledShareSpot,
} from '../../assets';
import Typography from '../../components/Typography';
import {SCREEN_NAME} from '../../screens/Main/Bnb';
import {PAGE_NAME as MySpotMap} from '../Map/MySpotMap';
import {PAGE_NAME as ShareSpotMap} from '../Map/ShareSpotMap';
import {PAGE_NAME as PrivateInfo} from '../Spots/privateSpot/PrivateInfo';
export const PAGE_NAME = 'SPOT_TYPE';
const SpotType = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const toast = Toast();

  const usedSpot = false;

  return (
    <Wrap showsVerticalScrollIndicator={false}>
      <ContentsWrap>
        <View>
          <View>
            <HeaderTitle>배송 받을 방법을{`\n`}선택해 주세요</HeaderTitle>

            <HeaderDscText>
              찾고 계신 스팟 타입은 무엇인가요?{`\n`}여러 개의 스팟 등록이
              가능해요.
            </HeaderDscText>
          </View>

          <BoxWrap>
            <Box
              onPress={() => navigation.navigate(MySpotMap)}
              disabled={usedSpot}>
              <ImageWrap>
                <Image
                  source={usedSpot ? DisabledMySpot : MySpot}
                  style={{width: 70, height: 60}}
                />
                <ImageDscText>
                  <UsedSpotCountDsc usedSpot={usedSpot}>0</UsedSpotCountDsc>/1
                  이용중
                </ImageDscText>
              </ImageWrap>
              <TextWrap>
                <Title usedSpot={usedSpot}>마이스팟</Title>
                <Contents usedSpot={usedSpot}>
                  문 앞으로 개인배송{`\n`}받고 싶어요
                </Contents>
              </TextWrap>
            </Box>
            <ModalComponent title={1} />
          </BoxWrap>
          <BoxWrap>
            <Box
              onPress={() => navigation.navigate(ShareSpotMap)}
              disabled={usedSpot}>
              <ImageWrap>
                <Image
                  source={usedSpot ? DisabledShareSpot : ShareSpot}
                  style={{width: 70, height: 60}}
                />
                <ImageDscText>
                  <UsedSpotCountDsc usedSpot={usedSpot}>0</UsedSpotCountDsc>/2
                  이용중
                </ImageDscText>
              </ImageWrap>

              <TextWrap>
                <Title usedSpot={usedSpot}>공유 스팟</Title>
                <Contents usedSpot={usedSpot}>
                  가까운 공유 배송 장소에서{`\n`}가져갈게요
                </Contents>
              </TextWrap>
            </Box>
            <ModalComponent title={2} />
          </BoxWrap>
          <BoxWrap>
            <Box
              disabled={usedSpot}
              onPress={() => navigation.navigate(PrivateInfo)}
              style={{paddingLeft: 52}}>
              <ImageWrap>
                <Image
                  source={usedSpot ? DisabledPrivateSpot : PrivateSpot}
                  style={{width: 60, height: 60}}
                />
                <ImageDscText style={{paddingLeft: 0}}>
                  <UsedSpotCountDsc usedSpot={usedSpot}>0</UsedSpotCountDsc>/1
                  이용중
                </ImageDscText>
              </ImageWrap>

              <TextWrap>
                <Title usedSpot={usedSpot}>프라이빗 스팟</Title>
                <Contents usedSpot={usedSpot}>
                  특정 단체 내 사람들끼리{`\n`}함께 배송받을래요
                </Contents>
              </TextWrap>
            </Box>
            <ModalComponent title={3} />
          </BoxWrap>
          {show && (
            <toast.ToastWrap
              message={`설정>권한 에서 '정확한 위치' 접근 권한을 허용해 주세요`}
              isHeader={false}
            />
          )}
          <Pressable onPress={() => navigation.navigate(SCREEN_NAME)}>
            <NextText>다음에 설정하기</NextText>
          </Pressable>
        </View>
      </ContentsWrap>
    </Wrap>
  );
};

export default SpotType;

const Wrap = styled.View`
  flex: 1;
  height: 100%;
  padding: 0px 24px 0px 24px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const BoxWrap = styled.View`
  margin-bottom: 24px;
`;
const Box = styled.Pressable`
  background-color: white;
  padding: 24px 28px 24px 42px;
  border-radius: 14px;
  flex-direction: row;
  align-items: flex-end;
`;

const Title = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${({theme, usedSpot}) =>
    usedSpot ? theme.colors.grey[6] : theme.colors.grey[2]};
`;

const Contents = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme, usedSpot}) =>
    usedSpot ? theme.colors.grey[6] : theme.colors.grey[2]};
  margin-top: 8px;
`;

const TextWrap = styled.View`
  padding-left: 24px;
`;

const HeaderTitle = styled(Typography).attrs({text: 'LargeTitle'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const HeaderDscText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 16px;
  margin-top: 8px;
`;

const NextText = styled(Typography).attrs({text: 'BottomButtonR'})`
  color: ${({theme}) => theme.colors.grey[5]};
  text-align: center;
`;

const MoreButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
  align-self: flex-end;
`;

const ImageWrap = styled.View``;

const ImageDscText = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme}) => theme.colors.grey[3]};
  margin-top: 8px;
  padding-left: 6px;
`;

const UsedSpotCountDsc = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme, usedSpot}) =>
    usedSpot ? theme.colors.grey[3] : theme.colors.blue[500]};
`;

const ContentsWrap = styled.ScrollView`
  flex: 1;
`;
