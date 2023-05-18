import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {FlatList, Platform, Text, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled, {css} from 'styled-components';
import Button from '~components/Button';
import DietRepoCard from '../Main/Components/DietRepoCard';
import Typography from '~components/Typography';

export const PAGE_NAME = 'P_MAIN__DIET_REPO__AddMyDiet';

const Pages = ({route}) => {
  return (
    <Container>
      <TitleText>5월 8일 (월) 아침 식사 추가</TitleText>
    </Container>
  );
};
export default Pages;

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;

  padding: 0px 24px;
  padding-top: 40px;
`;

const TitleText = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const ButtonWrapper = styled(LinearGradient)`
  position: relative;
  ${() => {
    if (Platform.OS === 'ios') {
      return css`
        bottom: 35px;
      `;
    } else {
      return css`
        bottom: 24px;
        /* bottom: 1px; */
      `;
    }
  }}

  padding:0 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonNext = styled(Button)``;
