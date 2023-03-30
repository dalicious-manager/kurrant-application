import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {Line} from 'react-native-svg';
import styled from 'styled-components';
import {isDueDateCloseRenderRed} from '../../../../../biz/useMypageReview';

import Typography from '../../../../../components/Typography';
import {SCREEN_NAME as CreateReviewScreenName} from '../../../../../screens/Main/Review/CreateReview/Page1';

import {
  formattedMonthDay,
  stringDateToJavascriptDate,
  timeLeftIndicator,
  timePassIndicator,
} from '../../../../../utils/dateFormatter';

import {calculateReviewDDay} from './logic';

import {PAGE_NAME as MealDetailPageName} from '../../../../../pages/Main/Bnb/MealDetail/Main';

/**
 * @param {object} props
 * @param {object} props.serviceDate
 * @param {string} props.makersName
 * @param {string} props.foodName
 * @param {string} props.option
 * @param {string} props.imageLocation
 * @returns
 */

const Component = ({
  wholeItem,
  orderItemId,
  serviceDate,
  makersName,
  foodName,
  option,
  imageLocation,
  diningType,
  reviewDDay,
  ...rest
}) => {
  const navigation = useNavigation();

  console.log('오더 아이템 아이디');
  console.log(orderItemId);

  return (
    <Container>
      <DateText>
        {serviceDate &&
          `${formattedMonthDay(
            serviceDate,
          )} ${diningType} · ${timePassIndicator(
            new Date(Date.now()),

            stringDateToJavascriptDate(serviceDate, '-'),
          )}`}
      </DateText>

      <CardContentBox>
        <ImagePressable
          onPress={e => {
            navigation.navigate(MealDetailPageName, {dailyFoodId: orderItemId});
            e.stopPropagation();
          }}>
          <MealImage
            source={{
              uri: imageLocation,
            }}
          />
        </ImagePressable>

        <MetadataWrap>
          <SmallRowWrap>
            <RestaurentNameText>
              {'['}
              {makersName}
              {']'}
            </RestaurentNameText>
            <MenuNameText>{foodName}</MenuNameText>
            {option && <OptionText>|{option} </OptionText>}
          </SmallRowWrap>
          <SmallColumnWrap>
            <DDayText calculateReviewDDay={calculateReviewDDay(reviewDDay)[1]}>
              {calculateReviewDDay(reviewDDay)[0]}
            </DDayText>

            {reviewDDay > 0 && (
              <ReviewFormWriteButton
                onPress={() => {
                  navigation.navigate(CreateReviewScreenName, {
                    orderItemId: orderItemId,
                    imageLocation: imageLocation,
                    foodName,
                  });
                }}>
                <TextText>리뷰작성</TextText>
              </ReviewFormWriteButton>
            )}
          </SmallColumnWrap>
        </MetadataWrap>
      </CardContentBox>

      <Line />
    </Container>
  );
};

export default Component;

const Container = styled.View`
  width: 100%;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({theme}) => theme.colors.grey[8]};

  padding-top: 24px;
  padding-bottom: 24px;
`;

// 보더 바텀이 안먹는다 이거 나중에 봐야됨

const DateText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.grey[4]};
  margin-left: 1px;
  margin-bottom: 24px;
  /* margin: 23px 0; */
`;

const CardContentBox = styled.View`
  width: 100%;
  display: flex;
  flex-flow: row;
  height: 114px;
`;
const ImagePressable = styled.Pressable``;
const MealImage = styled.Image`
  width: 114px;
  height: 114px;
  border-radius: 7.5px;
`;

const MetadataWrap = styled.View`
  flex: 1;
  height: 100%;

  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  /* border: 1px solid black; */
`;

const SmallRowWrap = styled.View`
  margin-bottom: 15px;
`;

const SmallColumnWrap = styled.View`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;

  height: 32px;
`;

const RestaurentNameText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-left: 1px;
  margin: 1px 0;
`;

const MenuNameText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-left: 1px;
  margin: 1px 0;
`;

const OptionText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.grey[5]};
  margin-left: 1px;
  margin: 1px 0;
`;

const DDayText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => {
    if (props.calculateReviewDDay === 'grey') {
      return props.theme.colors.grey[5];
    } else if (props.calculateReviewDDay === 'red') {
      return props.theme.colors.red[500];
    }
  }};
  margin-left: 1px;
  margin: 2px 0;
`;

const ReviewFormWriteButton = styled.Pressable`
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 77px;
  /* line-height: 32px; */
  border: 1px solid ${props => props.theme.colors.grey[7]};
  height: 32px;
  border-radius: 16px;
`;

const ReviewDDayExpired = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 77px;
  /* line-height: 32px; */
  border: 1px solid ${props => props.theme.colors.grey[7]};
  height: 32px;
  border-radius: 16px;
`;

const TextText = styled(Typography).attrs({text: 'Button10SB'})`
  color: ${props => props.theme.colors.grey[3]};
`;
