import {useNavigation} from '@react-navigation/native';
import {Dimensions, Text} from 'react-native';
import styled from 'styled-components';
import Typography from '~components/Typography';

import {PAGE_NAME as HomeMainPageName} from '~pages/Main/Bnb/Home/Main';

const NoPhotosSign = () => {
  const navigation = useNavigation();

  const HeightSettings = Dimensions.get('screen').height - 200;

  return (
    <Container height={HeightSettings}>
      <FlexFiller flex={200} />

      <TextWrap flex={60}>
        <TextText>등록된 음식 사진이 없어요. </TextText>
        <TextText>관리자에게 문의 부탁드려요.</TextText>
      </TextWrap>

      {/* <GoBackPressable
        onPress={() => {
          navigation.navigate(HomeMainPageName);
        }}>
        <GoBackText>홈으로 가기 </GoBackText>
      </GoBackPressable> */}

      <FlexFiller flex={400} />
    </Container>
  );
};

export default NoPhotosSign;

const Container = styled.View`
  /* flex: 1; */
  height: ${({height}) => `${height}px`};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextWrap = styled.View`
  flex: ${({flex}) => flex};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GoBackPressable = styled.Pressable``;
const GoBackText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[3]};
`;

const FlexFiller = styled.View`
  flex: ${({flex}) => flex};
`;

const TextText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[5]};
`;
