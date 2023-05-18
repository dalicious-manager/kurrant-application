import {Text} from 'react-native';
import styled from 'styled-components';

export const PAGE_NAME = 'P_MAIN__DIET_REPO__AddMyDiet';

const Pages = ({route}) => {
  return (
    <Container>
      <Text>내 음식 추가 </Text>
    </Container>
  );
};
export default Pages;

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;

  padding: 0px 24px;
`;
