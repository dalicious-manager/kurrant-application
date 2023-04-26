import {Dimensions, Text} from 'react-native';
import styled from 'styled-components';
import Typography from '~components/Typography';

const NoPhotosSign = () => {
  const HeightSettings = Dimensions.get('screen').height - 200;

  return (
    <Container height={HeightSettings}>
      <FlexFiller flex={200} />

      <TextWrap flex={60}>
        <TextText>등록된 음식 사진이 없어요. </TextText>
        <TextText>관리자에게 문의 부탁드려요.</TextText>
      </TextWrap>

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

const FlexFiller = styled.View`
  flex: ${({flex}) => flex};
`;

const TextText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[5]};
`;
