import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Image, Text} from 'react-native';
import styled from 'styled-components';

import ModalComponent from './components/ModalComponent';
import {MySpot, ShareSpot, PrivateSpot} from '../../assets';
import Typography from '../../components/Typography';
import {PAGE_NAME as MySpotMap} from '../Map/MySpotMap';
import {PAGE_NAME as ShareSpotMap} from '../Map/ShareSpotMap';
import {PAGE_NAME as PrivateInfo} from '../Spots/privateSpot/PrivateInfo';

export const PAGE_NAME = 'SPOT_TYPE';
const SpotType = () => {
  const navigation = useNavigation();

  return (
    <Wrap showsVerticalScrollIndicator={false}>
      <View>
        <HeaderTitle>배송 받을 방법을{`\n`}선택해 주세요</HeaderTitle>

        <HeaderDscText>
          찾고 계신 스팟 타입은 무엇인가요?{`\n`}여러 개의 스팟 등록이 가능해요.
        </HeaderDscText>
      </View>

      <BoxWrap>
        <Box onPress={() => navigation.navigate(MySpotMap)}>
          <ImageWrap>
            <Image source={MySpot} style={{width: 70, height: 60}} />
            <ImageDscText>
              <ImageDsc>0</ImageDsc>/1 이용중
            </ImageDscText>
          </ImageWrap>
          <TextWrap>
            <Title>마이스팟</Title>
            <Contents>문 앞으로 개인배송{`\n`}받고 싶어요</Contents>
          </TextWrap>
        </Box>
        <ModalComponent title={1} />
      </BoxWrap>
      <BoxWrap>
        <Box onPress={() => navigation.navigate(ShareSpotMap)}>
          <ImageWrap>
            <Image source={ShareSpot} style={{width: 70, height: 60}} />
            <ImageDscText>
              <ImageDsc>0</ImageDsc>/1 이용중
            </ImageDscText>
          </ImageWrap>

          <TextWrap>
            <Title>공유 스팟</Title>
            <Contents>가까운 공유 배송 장소에서{`\n`}가져갈게요</Contents>
          </TextWrap>
        </Box>
        <ModalComponent title={2} />
      </BoxWrap>
      <BoxWrap>
        <Box
          onPress={() => navigation.navigate(PrivateInfo)}
          style={{paddingLeft: 52}}>
          <ImageWrap>
            <Image source={PrivateSpot} style={{width: 60, height: 60}} />
            <ImageDscText style={{paddingLeft: 0}}>
              <ImageDsc>0</ImageDsc>/1 이용중
            </ImageDscText>
          </ImageWrap>

          <TextWrap>
            <Title>프라이빗 스팟</Title>
            <Contents>특정 단체 내 사람들끼리{`\n`}함께 배송받을래요</Contents>
          </TextWrap>
        </Box>
        <ModalComponent title={3} />
      </BoxWrap>
    </Wrap>
  );
};

export default SpotType;

const Wrap = styled.ScrollView`
  flex: 1;
  margin: 88px 24px 0px 24px;
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
  color: ${({theme}) => theme.colors.grey[2]};
`;

const Contents = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
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
  margin-bottom: 10px;
  margin-top: 8px;
`;

const MoreText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  padding-right: 2px;
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

const ImageDsc = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme}) => theme.colors.blue[500]};
`;
