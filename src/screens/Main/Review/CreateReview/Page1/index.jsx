import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React from 'react';
import {Text, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import styled from 'styled-components';
import RateStars from '../../../../../components/RateStars';
import Typography from '../../../../../components/Typography';
import mSleep from '../../../../../helpers/mSleep';
import {SCREEN_NAME as CreateReviewPage2ScreenName} from '../Page2';
import {starRatingAtom} from '../Page2/store';

export const SCREEN_NAME = 'S_MAIN__CREATE_REVIEW_PAGE_1';

const Screens = () => {
  const navigation = useNavigation();

  const [starRating, setStarRating] = useAtom(starRatingAtom);
  return (
    <Container>
      <Wrap>
        <Title>만족도를 알려주세요</Title>
        <MenuImage
          source={{
            uri: 'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          }}
        />
        <MenuName>[풀어스] 라코타 치즈 샐러드</MenuName>

        <RateStars
          ratingInput={0}
          width={'200px'}
          margin={'2px'}
          callback={async rating => {
            setStarRating(rating);

            await mSleep(300);
            navigation.navigate(CreateReviewPage2ScreenName);
          }}
        />
      </Wrap>
    </Container>
  );
};

export default Screens;

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;

  align-items: center;
`;

const Wrap = styled.View`
  position: relative;
  top: 161px;
  align-items: center;
`;

const Title = styled(Typography).attrs({text: 'LargeTitle'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-bottom: 17px;
`;

const MenuImage = styled.Image`
  width: 114px;
  height: 114px;
  border-radius: 7px;
  margin-bottom: 12px;
`;

const MenuName = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-bottom: 27px;
`;
