import {FlatList, Text, View} from 'react-native';
import styled from 'styled-components';
import Typography from '~components/Typography';
import {RightSkinnyArrow, YellowStar} from '~components/Icon';

import Card from './Card';
import {convertDateFormat1} from '../../../../../../../utils/dateFormatter';

const Component = () => {
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

      <ReviewListWrap>
        {/* <SampleView /> */}

        {
          Array.isArray(reviewList) &&
            reviewList.length > 0 &&
            reviewList.map(item => {
              return (
                <View>
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
            })

          // <FlatList
          //   showsVerticalScrollIndicator={false}
          //   showsHorizontalScrollIndicator={false}
          //   data={reviewList}
          //   scrollEnabled={true}
          //   renderItem={({item, index}) => {
          //     // 서버 -> 프론트 객체 프로퍼티 이름 치환하기

          //     return (
          //       <View>
          //         <Card
          //           id={item.reviewId}
          //           createDate={item.createDate}
          //           updateDate={item.updateDate}
          //           writtenDate={convertDateFormat1(item.createDate)}
          //           option={item.option}
          //           rating={item.satisfaction}
          //           reviewText={item.content}
          //           imageLocation={item.imageLocation}
          //           forMakers={item.forMakers}
          //           commentList={item.commentList}
          //         />
          //       </View>
          //     );
          //   }}
          // />
        }
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

const ReviewListWrap = styled.View`
  width: 100%;
  background-color: #ffffff;
`;

const SampleView = styled.View`
  height: 400px;
`;
