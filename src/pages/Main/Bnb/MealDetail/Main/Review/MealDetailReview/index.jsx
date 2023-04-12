import {Text} from 'react-native';
import styled from 'styled-components';
import Typography from '~components/Typography';
import {
  RightSkinnyArrow,
  YellowStar,
} from '../../../../../../../components/Icon';

const Component = () => {
  return (
    <Container>
      <TitleWrap>
        <Wrap1>
          <ReviewCount>리뷰(132)</ReviewCount>
          <IconWrap>
            {/* <YellowStarIcon /> */}
            {/* <YellowStarIcon /> */}
            <YellowStar width={'12px'} height={'11px'} />
          </IconWrap>

          <Rating>4.0</Rating>
        </Wrap1>

        <GoToWriteReviewPressable onPress={() => {}}>
          <GoToWriteReviewText>리뷰작성 </GoToWriteReviewText>
          <RightSkinnyArrow width={'5px'} height={'9px'} />
        </GoToWriteReviewPressable>
      </TitleWrap>
    </Container>
  );
};
export default Component;

const Container = styled.View`
  width: 100%;

  padding: 16px 24px;
  width: 100%;
  height: 150px;
  background-color: bisque;
`;

const TitleWrap = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Wrap1 = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ReviewCount = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-right: 7px;
`;

const Rating = styled(Typography).attrs({text: 'Body06SB'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const GoToWriteReviewPressable = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

const GoToWriteReviewText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${props => props.theme.colors.grey[4]};
`;

const IconWrap = styled.View`
  width: 12px;
  height: 12px;

  /* border: 1px solid black; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
`;
