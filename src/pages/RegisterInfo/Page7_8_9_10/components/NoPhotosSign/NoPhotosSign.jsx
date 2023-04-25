import {Dimensions, Text} from 'react-native';
import styled from 'styled-components';

const NoPhotosSign = () => {
  const HeightSettings = Dimensions.get('screen').height - 200;

  console.log('높이 ');
  console.log(HeightSettings);

  return (
    <Container height={HeightSettings}>
      <FlexFiller flex={200} />

      <TextWrap flex={60}>
        <Text style={{marginBottom: 6}}>등록된 음식 사진이 없습니다 </Text>
        <Text>관리자에게 문의해주세요</Text>
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
