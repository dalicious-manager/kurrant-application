import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import styled from 'styled-components';

import RateStars from '~components/RateStars';
import Typography from '~components/Typography';
// import mSleep from '~helpers/mSleep';
import mSleep from '../../../../../../helpers/mSleep';

import {PAGE_NAME as CreateReviewPage2ScreenName} from '../Page2';
// import {starRatingAtom} from '../Page2/store';
import {starRatingAtom} from '~biz/useReview/useCreateAndEditReview/store';

export const PAGE_NAME = 'S_MAIN__CREATE_REVIEW_PAGE_1';

const Screens = ({route}) => {
  const navigation = useNavigation();

  const resetNavigate = route?.params?.resetNavigate;

  const orderItemId = route.params.orderItemId;
  const imageLocation = route.params.imageLocation;
  const foodName = route.params.foodName;

  const [starRating, setStarRating] = useAtom(starRatingAtom);
  const [disable, setDisable] = useState(false);

  return (
    <Container>
      <Wrap>
        <Title>만족도를 알려주세요</Title>
        <MenuImage
          source={{
            uri: imageLocation,
          }}
        />
        <WidthView>
          <MenuName>{foodName}</MenuName>
        </WidthView>

        <RateStars
          ratingInput={0}
          width={'200px'}
          margin={'2px'}
          disableButton={disable}
          callback={async rating => {
            setStarRating(rating);
            setDisable(true);
            await mSleep(300);
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
            navigation.navigate(CreateReviewPage2ScreenName, {
              id: orderItemId,
              status: 'create',
              resetNavigate: resetNavigate,
            });
            setDisable(false);
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
  text-align: center;
`;

const WidthView = styled.View`
  width: 300px;
  flex-direction: column;
  align-items: center;
`;
