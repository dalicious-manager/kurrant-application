import {useNavigation} from '@react-navigation/native';
import {Pressable, Text} from 'react-native';
import styled from 'styled-components';

export const PAGE_NAME = 'P_MAIN__DIET_REPO__AddDiet';

import {PAGE_NAME as DietRepoAddMyDietPageName} from '~pages/Main/Bnb/DietRepo/AddMyDiet';

const Pages = ({route}) => {
  const navigation = useNavigation();

  return (
    <Container>
      <Text>식사 추가</Text>
      <Pressable
        onPress={() => {
          navigation.navigate(DietRepoAddMyDietPageName);
        }}>
        <Text>내 음식 추가로 가세~~</Text>
      </Pressable>
    </Container>
  );
};
export default Pages;

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;

  padding: 0px 24px;
`;
