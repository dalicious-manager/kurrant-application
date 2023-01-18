import React from 'react';

import {Line} from 'react-native-svg';
import styled from 'styled-components';
import Typography from '../../../../../components/Typography';
import {
  formattedMonthDay,
  timeLeftIndicator,
  timePassIndicator,
} from '../../../../../utils/dateFormatter';

/**
 * @param {object} props
 * @param {object} props.orderDate
 * @param {string} props.restaurentName
 * @param {string} props.menuName
 * @param {string} props.option
 * @param {string} props.imageUrl
 * @returns
 */

const Component = ({
  orderDate,
  restaurentName,
  menuName,
  option,
  imageUrl,
  diningType,
  ...rest
}) => {
  return (
    <Container>
      <DateText>
        {orderDate &&
          `${formattedMonthDay(orderDate)} ${diningType} · ${timePassIndicator(
            new Date(Date.now()),
            orderDate,
          )}`}
      </DateText>

      <CardContentBox>
        <MealImage
          source={{
            uri: imageUrl,
          }}
        />
        <MetadataWrap>
          <SmallRowWrap>
            <RestaurentNameText>
              {'['}
              {restaurentName}
              {']'}
            </RestaurentNameText>
            <MenuNameText>{menuName}</MenuNameText>
            <OptionText>|{option} </OptionText>
          </SmallRowWrap>
          <SmallColumnWrap>
            <DDayText>{timeLeftIndicator(5, orderDate)}</DDayText>
            <ReviewFormWriteButton>
              <Text>리뷰작성</Text>
            </ReviewFormWriteButton>
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
`;

const SmallRowWrap = styled.View``;

const SmallColumnWrap = styled.View`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
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
    if (false) {
      return props.theme.colors.grey[5];
    } else {
      return props.theme.colors.grey[5];
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

const Text = styled(Typography).attrs({text: 'Button10SB'})`
  color: ${props => props.theme.colors.grey[3]};
`;
