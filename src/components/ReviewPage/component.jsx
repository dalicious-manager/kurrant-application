import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';

import ArrowRight from '../../assets/icons/Arrow/arrowRight.svg';
import StarIcon from '../../assets/icons/starSmall.svg';
import TextButton from '../../components/TextButton';
import Typography from '../Typography';

const Component = () => {
  const star = [0, 1, 2, 3, 4];

  return (
    <View>
      <Header>
        <Text>리뷰(132)</Text>
        <Review>
          <TextButton size={'label13R'} type={'grey4'} label={'리뷰작성'} />
          <ArrowIcon />
        </Review>
      </Header>
      <View>
        <UserName>남**</UserName>
        <ReviewStarWrap>
          <ReviewStar>
            {star.map(el => (
              <StarIcon key={el} />
            ))}
          </ReviewStar>
          <DateText>2022.02.11 작성</DateText>
        </ReviewStarWrap>
      </View>
    </View>
  );
};

export default Component;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Review = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ArrowIcon = styled(ArrowRight)`
  color: ${props => props.theme.colors.grey[5]};
  margin-left: 4px;
`;

const ReviewStarWrap = styled.View`
  flex-direction: row;
`;
const ReviewStar = styled.View`
  flex-direction: row;
`;

const DateText = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${props => props.theme.colors.grey[4]};
  margin-left: 6px;
`;

const UserName = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[2]};
`;
