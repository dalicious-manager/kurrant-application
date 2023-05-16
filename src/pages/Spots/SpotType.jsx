import {View, Image} from 'react-native';
import styled from 'styled-components';
import Typography from '../../components/Typography';
import {MySpot, ShareSpot, PrivateSpot} from '../../assets';
import ModalComponent from './components/ModalComponent';
import {useNavigation} from '@react-navigation/native';

import {PAGE_NAME as MySpotMap} from '../Map/MySpotMap';
import {PAGE_NAME as PrivateInfo} from '../Spots/privateSpot/PrivateInfo';

export const PAGE_NAME = 'SPOT_TYPE';
const SpotType = () => {
  const navigation = useNavigation();

  return (
    <Wrap showsVerticalScrollIndicator={false}>
      <View>
        <HeaderTitle>배송 받을 방법을{`\n`}선택해 주세요</HeaderTitle>

        <HeaderDscText>찾고 계신 스팟 타입은 무엇인가요?</HeaderDscText>
      </View>

      <BoxWrap>
        <Box onPress={() => navigation.navigate(MySpotMap)}>
          <Image source={MySpot} style={{width: 97, height: 76}} />
          <TextWrap>
            <Title>마이스팟</Title>
            <Contents>문 앞으로 개인배송{`\n`}받고 싶어요</Contents>
          </TextWrap>
        </Box>
        <ModalComponent title={1} />
      </BoxWrap>
      <BoxWrap>
        <Box>
          <Image source={ShareSpot} style={{width: 97, height: 76}} />
          <TextWrap>
            <Title>공유 스팟</Title>
            <Contents>가까운 공유 배송 장소에서{`\n`}가져갈게요</Contents>
          </TextWrap>
        </Box>
        <ModalComponent title={2} />
      </BoxWrap>
      <BoxWrap>
        <Box onPress={() => navigation.navigate(PrivateInfo)}>
          <Image source={PrivateSpot} style={{width: 97, height: 76}} />
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
  padding: 24px 28px 24px 24px;
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
  margin-bottom: 32px;
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
