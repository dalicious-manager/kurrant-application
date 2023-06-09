import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {FlatList, Platform, Text, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled, {css} from 'styled-components';
import Button from '~components/Button';
import DietRepoCard from '../Main/Components/DietRepoCard';
import Typography from '~components/Typography';

import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
export const PAGE_NAME = 'P_MAIN__DIET_REPO__AddDiet';

import {PAGE_NAME as DietRepoAddMyDietPageName} from '~pages/Main/Bnb/DietRepo/AddMyDiet';
import useGetDietRepo from '../useGetDietRepo';
import {extractMonthAndDateFromDate, sampleData2} from '../logic';
import {stringDateToJavascriptDate} from '../../../../../utils/dateFormatter';

const Pages = ({route}) => {
  const navigation = useNavigation();

  console.log('route');
  console.log(route?.params?.date);
  console.log(extractMonthAndDateFromDate(route?.params?.date, '-'));
  console.log(route?.params?.diningType);

  // const yo = useGetDietRepo(undefined, '2023-05-30', 2);

  const handlePress = () => {
    navigation.navigate(DietRepoAddMyDietPageName);
  };

  return (
    <Container>
      <TitleText>
        {extractMonthAndDateFromDate(route?.params?.date, '-')[0]}월{' '}
        {extractMonthAndDateFromDate(route?.params?.date, '-')[1]}일 (
        {format(stringDateToJavascriptDate(route?.params?.date, '-'), 'EEE', {
          locale: ko,
        })}
        ) 아침에 주문한 식사 목록
      </TitleText>

      <FlatList
        ListHeaderComponent={
          <View style={{paddingLeft: 24, paddingRight: 24}}></View>
        }
        contentContainerStyle={{paddingBottom: 190}}
        data={sampleData2}
        scrollEnabled={true}
        renderItem={({item}) => {
          return (
            <>
              <DietRepoCard item2={item} />
            </>
          );
        }}
      />

      <ButtonWrapper
        colors={[
          'rgba(255, 255, 255, 0)',
          'rgba(255, 255, 255, 0.3)',
          'rgba(255, 255, 255, 0.7)',
          'rgba(255, 255, 255, 0.8048)',
          'rgba(255, 255, 255, 0.9)',
          'rgba(255, 255, 255, 0.95)',
        ]}>
        <ButtonNext
          size="full"
          label="내 음식 추가"
          text={'BottomButtonSB'}
          // disabled={!clickAvaliable}
          onPressEvent={() => {
            handlePress();
          }}
        />
      </ButtonWrapper>
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
  margin-bottom: 24px;
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
