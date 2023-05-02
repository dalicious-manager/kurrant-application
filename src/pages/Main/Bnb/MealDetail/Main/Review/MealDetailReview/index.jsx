import {Dimensions, FlatList, Text, View} from 'react-native';
import styled, {useTheme} from 'styled-components';
import Typography from '~components/Typography';
import {RightSkinnyArrow, YellowStar} from '~components/Icon';

import Card from './Card';
import {convertDateFormat1} from '../../../../../../../utils/dateFormatter';
import RateStars from '~components/RateStars';
import {
  ArrowUpAndDown,
  Picture,
  Settings,
} from '../../../../../../../components/Icon';

const Component = () => {
  const theme = useTheme();

  const reviewList = [
    {
      reviewId: 96,
      imageLocation: [
        'https://kurrant-v1-develop.s3.ap-northeast-2.amazonaws.com/reviews/0001682497168367/rn_image_picker_lib_temp_bcb3216b-997f-4bed-8fcc-a135103ef392.jpg',
      ],
      content:
        '스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났으니 너의 희망은 무엇이..냐 삼각지 로타리에 궂은비 ..내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났..으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날.내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났..으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날',
      satisfaction: 5,
      createDate: '2023-04-26T17:19:28.471+09:00',
      updateDate: '2023-04-28T16:46:48.899+09:00',
      forMakers: false,
      makersName: '알렉산더',
      itemName: '핸드드립',
      commentList: [
        {
          writer: '알렉산더',
          content:
            '스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났으니 너의 희망은 무엇이..냐 삼각지 로타리에 궂은비 ..내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났..으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날.내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났..으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날',
          createDate: '2023-04-27',
          updateDate: '2023-04-28',
        },
      ],
    },
  ];

  return (
    <Container>
      <Wrap1>
        <TitleWrap>
          <ReviewCount>리뷰(132)</ReviewCount>
        </TitleWrap>

        <StarRatingWrap>
          <RateStars
            ratingInput={4}
            width={'132px'}
            margin={'3px'}
            disableButton={true}
            callback={() => {}}
          />

          <RatingPointText>4</RatingPointText>

          <RatingOutOfText>/</RatingOutOfText>
          <RatingOutOfText>5</RatingOutOfText>
        </StarRatingWrap>

        {/* <Wrap3>
          <Text>맛 향 편리 따뜻</Text>
        </Wrap3> */}

        <Wrap4>
          <Wrap6>
            <FilterWrap1>
              <ArrowUpAndDown />
              <FilterText>베스트 순</FilterText>
            </FilterWrap1>

            <ThinGreyLineVertical />
            <FilterWrap1>
              <Picture />
              <FilterText>포토리뷰만</FilterText>
            </FilterWrap1>
          </Wrap6>

          <FilterWrap1>
            <Settings />
            <FilterText>별점필터</FilterText>
          </FilterWrap1>
        </Wrap4>
        <Wrap5>
          <GoToWriteReviewPressable onPress={() => {}}>
            <GoToWriteReviewText>리뷰작성 </GoToWriteReviewText>
            <RightSkinnyArrow
              width={'5px'}
              height={'9px'}
              color={theme.colors.blue[500]}
            />
          </GoToWriteReviewPressable>
        </Wrap5>
      </Wrap1>

      <ReviewListWrap>
        {/* <SampleView /> */}
        <CardsWrap>
          {Array.isArray(reviewList) &&
            reviewList.length > 0 &&
            reviewList.map(item => {
              return (
                <View key={item.reviewId}>
                  <Card
                    id={item.reviewId}
                    createDate={item.createDate}
                    updateDate={item.updateDate}
                    writtenDate={convertDateFormat1(item.createDate)}
                    option={item.option}
                    rating={item.satisfaction}
                    reviewText={item.content}
                    imageLocation={item.imageLocation}
                    forMakers={item.forMakers}
                    commentList={item.commentList}
                  />
                </View>
              );
            })}
        </CardsWrap>

        {/* 버튼 누르면 더 볼 수 있다.  */}

        <MoreReviewPressable>
          <MoreReviewText>131개 리뷰 전체보기</MoreReviewText>
          <RightSkinnyArrow
            width={'5px'}
            height={'9px'}
            color={theme.colors.grey[4]}
          />
        </MoreReviewPressable>
      </ReviewListWrap>
    </Container>
  );
};
export default Component;

const Container = styled.View`
  width: 100%;

  padding: 16px 24px;
  width: 100%;

  /* background-color: bisque; */
`;

const TitleWrap = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
`;

const Wrap1 = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StarRatingWrap = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 28px 0px;
`;
const RatingPointText = styled(Typography).attrs({text: 'Title02SB'})`
  color: ${props => props.theme.colors.grey[2]};

  margin-left: 13px;
  margin-right: 4px;
`;

const RatingOutOfText = styled(Typography).attrs({text: 'Title02SB'})`
  color: ${props => props.theme.colors.grey[4]};

  margin-right: 4px;
`;

const Wrap3 = styled.View``;
const Wrap4 = styled.View`
  width: ${() => {
    return `${Dimensions.get('screen').width}px;`;
  }};

  padding: 12px 24px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.colors.grey[8]};
`;

const FilterWrap1 = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FilterText = styled(Typography).attrs({text: 'Button10SB'})`
  color: ${props => props.theme.colors.grey[4]};
  margin-left: 8px;
`;

const ThinGreyLineVertical = styled.View`
  height: 19px;

  margin: 0px 4px;

  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: ${props => props.theme.colors.grey[6]};
`;

const Wrap5 = styled.View`
  width: 100%;
  flex-direction: row-reverse;

  padding: 16px 0px;
`;

const Wrap6 = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ReviewCount = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-right: 7px;
`;

const GoToWriteReviewPressable = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

const GoToWriteReviewText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${props => props.theme.colors.blue[500]};
`;

const ReviewListWrap = styled.View`
  width: 100%;
  background-color: #ffffff;
`;

const CardsWrap = styled.View`
  margin-bottom: 40px;
`;

const MoreReviewPressable = styled.Pressable`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  padding: 17px 0px;

  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  border-radius: 7px;
`;

const MoreReviewText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[3]};
  margin-right: 10px;
`;
