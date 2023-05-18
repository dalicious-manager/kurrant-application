import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {FlatList, Platform, Text, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled, {css} from 'styled-components';
import Button from '~components/Button';
import DietRepoCard from '../Main/Components/DietRepoCard';

export const PAGE_NAME = 'P_MAIN__DIET_REPO__AddDiet';

import {PAGE_NAME as DietRepoAddMyDietPageName} from '~pages/Main/Bnb/DietRepo/AddMyDiet';

const Pages = ({route}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(DietRepoAddMyDietPageName);
  };

  return (
    <Container>
      <Text>식사 추가</Text>
      <Pressable onPress={() => {}}>
        <Text>내 음식 추가로 가세~~</Text>
      </Pressable>

      <FlatList
        ListHeaderComponent={
          <View style={{paddingLeft: 24, paddingRight: 24}}></View>
        }
        contentContainerStyle={{paddingBottom: 190}}
        data={[1, 2, 3, 4]}
        scrollEnabled={true}
        renderItem={({item}) => {
          return (
            <>
              <DietRepoCard type="" />
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
