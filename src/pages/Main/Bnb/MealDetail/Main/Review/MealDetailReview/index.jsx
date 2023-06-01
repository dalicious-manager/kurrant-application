import {
  Dimensions,
  FlatList,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import styled, {useTheme} from 'styled-components';
import Typography from '~components/Typography';
import {RightSkinnyArrow, YellowStar} from '~components/Icon';

import Card from './Card';

import BottomSheet from '~components/BottomSheet';

import {convertDateFormat1} from '../../../../../../../utils/dateFormatter';
import RateStars from '~components/RateStars';
import {
  ArrowUpAndDown,
  Picture,
  Settings,
} from '../../../../../../../components/Icon';
import {useEffect, useState} from 'react';
import BottomModalMultipleSelect from '../../../../../../../components/Review/BottomModalMultipleSelect/BottomModalMultipleSelect';
import BottomModalMultipleSample from '~components/Review/BottomModalMultipleSample';
// import BottomModalMultipleSample from '../../../../../../../components/Review/BottomModalMultipleSample';
import CheckedIcon from '~assets/icons/BottomSheet/Checked.svg';
import {Shadow} from 'react-native-shadow-2';
import useGetMealDetailReview from '../useGetMealDetailReview/useGetMealDetailReview';
import {buildCustomUrl, modifyStarRatingCount} from './logic';
import {useAtom} from 'jotai';
import {infiniteQueryRefetchStatusAtom} from './store';

// const Component = ({dailyFoodId}) => {
const Component = () => {
  const theme = useTheme();

  // 샘플 대에터
  const dailyFoodId = 40827;

  // 필터 값들 모으기

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  // 베스트순,최신순,리뷰순 (sort)
  // sort : 베스트순(default) -> 0 , 최신순 -> 1, 리뷰순 -> 2

  const [orderFilter, setOrderFilter] = useState(0);

  // 포토리뷰만(photo)
  // photo : 둘다 -> 값 없음,  포토리뷰 없음 -> 0, 포토리뷰만 -> 1

  const [isOnlyPhoto, setIsOnlyPhoto] = useState(false);

  // 별점 필터(starFilter)
  // starFilter : 없음, 1,2,3,4,5
  const [rateSelected, setRateSelected] = useState([]);

  // 상품 상세 리뷰 키워드
  const [refetchStatus, setRefetchStatus] = useAtom(
    infiniteQueryRefetchStatusAtom,
  );

  const [url, setUrl] = useState(
    // `/dailyfoods/${dailyFoodId}/review?sort=0&page=${page}&limit=${limit}`,
    `/dailyfoods/${dailyFoodId}/review?sort=0`,
  );

  useEffect(() => {
    setUrl(buildCustomUrl(dailyFoodId, orderFilter, isOnlyPhoto, rateSelected));
  }, [
    dailyFoodId,
    orderFilter,
    isOnlyPhoto,
    rateSelected,
    setUrl,
    setRefetchStatus,
  ]);

  const {
    getInfiniteQuery,

    mealDetailReview,
    isLast,
    starAverage,
    totalCount,
    isError,
    foodId,
    reviewWrite,

    starRatingCounts,
    // getMealDetailReviewInfiniteQueryRefetch,
  } = useGetMealDetailReview(url, dailyFoodId);

  const {hasNextPage, fetchNextPage, refetch, isFetching} = getInfiniteQuery;

  // useEffect(() => {
  //   setRefetchStatus('filter');
  //   // getMealDetailReviewInfiniteQueryRefetch();
  // }, [url]);

  const onEndReached = () => {
    // console.log('onEndReached 적용됨');

    if (hasNextPage) {
      setRefetchStatus('scroll');
    }
  };

  const [showSelectList, setShowSelectList] = useState(false);

  // best, latest, photo, rating, like

  // 바텀 모달
  const [bottomModalOpen, setBottomModalOpen] = useState(false);

  const handleSelectBottomModal = id => {
    if (rateSelected.includes(id)) {
      setRateSelected([...rateSelected.filter(v => v !== id)]);
    } else {
      setRateSelected([...rateSelected, id]);
    }
  };

  const showSelectedOrderFilter = orderFilter => {
    if (orderFilter === 0) {
      return '베스트 순';
    } else if (orderFilter === 1) {
      return '최신순';
    } else if (orderFilter === 2) {
      return '리뷰 추천순';
    }
  };

  const sampleData1 = [
    '맛',
    '향',
    '한우',
    '국',
    '한식',
    '맛',
    '향',
    '한우',
    '국',
    '한식',
  ];

  // useEffect(() => {
  //   console.log('데이터 확인 infinite');
  //   console.log(data?.pages[0]);
  //   setMealDetailReview(data?.pages[0]?.items);
  // }, [data]);

  useEffect(() => {
    console.log('밀 디테일 리뷰 확인하기 ');
    console.log(mealDetailReview);
  }, [mealDetailReview]);

  return (
    <Container>
      <Pressable
        onPress={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}>
        <Text>랄랄ㄹ라라라ㅏ라ㅏ</Text>
      </Pressable>

      {/* <Wrap1>
        <TitleWrap>
          <ReviewCount>리뷰({totalCount})</ReviewCount>
        </TitleWrap>

        <StarRatingWrap>
          <RateStars
            ratingInput={starAverage}
            width={'132px'}
            margin={'3px'}
            disableButton={true}
            callback={() => {}}
          />

          <RatingPointText>{starAverage}</RatingPointText>

          <RatingOutOfText>/</RatingOutOfText>
          <RatingOutOfText>5</RatingOutOfText>
        </StarRatingWrap>

        <Wrap3>
          {Array.isArray(sampleData1) && sampleData1.length > 0 && (
            <FlatFlatList
              data={sampleData1}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.5}
              contentContainerStyle={{
                height: 56,
                alignItems: 'center',
              }}
              renderItem={({item, index}) => {
                return (
                  <ButtonPressable
                    // isClicked={true}
                    isClicked={false}
                    isFirst={index === 0}
                    isLast={index === sampleData1.length - 1}>
                    <ButtonText isClicked={false}>{item}</ButtonText>
                  </ButtonPressable>
                );
              }}
            />
          )}
        </Wrap3>

        <Wrap4>
          <Wrap6>
            <FilterPressable
              onPress={() => {
                setShowSelectList(!showSelectList);
              }}>
              <ArrowUpAndDown />
              <FilterText>{showSelectedOrderFilter(orderFilter)}</FilterText>
            </FilterPressable>

            <ThinGreyLineVertical />
            <FilterPressable
              onPress={() => {
                setIsOnlyPhoto(!isOnlyPhoto);
              }}>
              <Picture
                isOn={isOnlyPhoto}
                color={
                  isOnlyPhoto ? theme.colors.blue[500] : theme.colors.grey[4]
                }
              />
              <FilterText isOn={isOnlyPhoto}>포토리뷰만</FilterText>
            </FilterPressable>
          </Wrap6>

          <FilterPressable
            onPress={() => {
              setBottomModalOpen(!bottomModalOpen);
            }}>
            <Settings />
            <FilterText>별점필터</FilterText>
          </FilterPressable>
        </Wrap4>
        <Wrap5>
          <GoToWriteReviewPressable
            onPress={() => {
              refetch();
            }}>
            <GoToWriteReviewText>리뷰작성 </GoToWriteReviewText>
            <RightSkinnyArrow
              width={'5px'}
              height={'9px'}
              color={theme.colors.blue[500]}
            />
          </GoToWriteReviewPressable>
        </Wrap5>
      </Wrap1> */}

      {/* {showSelectList && (
        <WrapWrapView>
          <ShadowWrap startColor="rgba(0, 0, 0, 0.03)" distance={14}>
            <FilterSelecterWrap>
              <FilterSelecterPressable
                onPress={() => {
                  setOrderFilter(0);

                  setShowSelectList(false);
                }}>
                <SelectorText>베스트 순</SelectorText>
              </FilterSelecterPressable>
              <FilterSelecterPressable
                isTopBorder={true}
                onPress={() => {
                  setOrderFilter(1);

                  setShowSelectList(false);
                }}>
                <SelectorText>최신 순</SelectorText>
                <></>
              </FilterSelecterPressable>
              <FilterSelecterPressable
                isTopBorder={true}
                onPress={() => {
                  setOrderFilter(2);

                  setShowSelectList(false);
                }}>
                <SelectorText>리뷰 추천순</SelectorText>
              </FilterSelecterPressable>
            </FilterSelecterWrap>
          </ShadowWrap>
        </WrapWrapView>
      )} */}

      <ReviewListWrap>
        <CardsWrap>
          {Array.isArray(mealDetailReview) &&
            mealDetailReview.length > 0 &&
            mealDetailReview.map(item => {
              return (
                <Card
                  key={item.reviewId}
                  id={item.reviewId}
                  userName={item.userName}
                  item={item}
                  likeNum={item.like}
                  isLike={item.isLike}
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
              );
            })}
        </CardsWrap>
      </ReviewListWrap>

      <BottomModalMultipleSelect
        modalVisible={bottomModalOpen}
        setModalVisible={setBottomModalOpen}
        title="별점 필터"
        data={modifyStarRatingCount(starRatingCounts)}
        multiple={true}
        selected={rateSelected}
        setSelected={handleSelectBottomModal}
        SelecterComponent={BottomModalSelecterComponent}
      />
    </Container>
  );
};
export default Component;

const Container = styled.View`
  width: 100%;

  padding: 16px 24px;
  width: 100%;
  position: relative;
  /* border: 1px solid black; */
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

const Wrap3 = styled.View`
  width: ${() => {
    return `${Dimensions.get('screen').width}px;`;
  }};
`;

const FlatFlatList = styled.FlatList`
  height: 56px;

  padding: 0 24px;
  /* padding-right: 40px; */
`;

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

const FilterPressable = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: relative;
`;

const ButtonPressable = styled.Pressable`
  ${({isClicked, theme}) =>
    !isClicked && `border: 1px solid ${theme.colors.grey[6]};`}

  border-radius: 50px;

  margin: 4px;
  padding: 4px 12px;

  ${({isFirst}) => isFirst && `margin-left: 0px;`}
  ${({isLast}) => isLast && `margin-right: 40px;`}

  ${({isClicked, theme}) =>
    isClicked && `background-color: ${theme.colors.grey[2]}`}



  align-items: center;
  justify-content: center;
`;

const ButtonText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme, isClicked}) =>
    isClicked ? '#ffffff' : theme.colors.grey[3]};
`;

const WrapWrapView = styled.View`
  position: absolute;
  top: 215px;
  left: 30px;
  z-index: 1;
`;

const ShadowWrap = styled(Shadow)`
  border-radius: 7px;
`;

const FilterSelecterWrap = styled.View`
  width: 84px;
  background-color: #ffffff;
  flex-direction: column;
  align-items: center;
  border-radius: 7px;
`;
const FilterSelecterPressable = styled.Pressable`
  flex: 1;
  width: 100%;

  justify-content: center;
  padding: 12px;

  ${({isTopBorder, theme}) => {
    if (isTopBorder) {
      return `
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: ${theme.colors.grey[8]};
    `;
    }
  }}
  ${({isBottomBorder, theme}) => {
    if (isBottomBorder) {
      return `
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${theme.colors.grey[8]};  `;
    }
  }}
`;

const SelectorText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme, isClicked}) =>
    isClicked ? theme.colors.grey[2] : theme.colors.grey[5]};
`;

const FilterText = styled(Typography).attrs({text: 'Button10SB'})`
  color: ${({theme, isOn}) =>
    isOn ? theme.colors.blue[500] : theme.colors.grey[4]};
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
  position: relative;
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
  /* margin-bottom: 40px; */
  /* border: 1px solid black; */
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

const BottomModalSelecterComponent = ({selected, item}) => {
  return (
    <>
      {selected.includes(item.id) ? (
        <ContentItemBox>
          <RowView>
            <RateStars
              ratingInput={item.text}
              width={'132px'}
              margin={'3px'}
              disableButton={true}
              callback={() => {}}
            />
            <ContentItemText>({item.reviewCount})</ContentItemText>
          </RowView>

          <CheckedIcon />
        </ContentItemBox>
      ) : (
        <ContentItemBox>
          <RowView>
            <RateStars
              ratingInput={item.text}
              width={'132px'}
              margin={'3px'}
              disableButton={true}
              callback={() => {}}
            />
            <ContentItemText>({item.reviewCount})</ContentItemText>
          </RowView>
        </ContentItemBox>
      )}
    </>
  );
};

const ContentItemBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid black; */
  padding-right: 6px;
`;

const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ContentItemText = styled(Typography).attrs({text: 'Body05R'})`
  margin-left: 10px;
`;

// const reviewList = [
//   {
//     reviewId: 96,
//     imageLocation: [
//       'https://kurrant-v1-develop.s3.ap-northeast-2.amazonaws.com/reviews/0001682497168367/rn_image_picker_lib_temp_bcb3216b-997f-4bed-8fcc-a135103ef392.jpg',
//     ],
//     content:
//       '스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났으니 너의 희망은 무엇이..냐 삼각지 로타리에 궂은비 ..내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났..으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날.내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났..으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날',
//     satisfaction: 5,
//     createDate: '2023-04-26T17:19:28.471+09:00',
//     updateDate: '2023-04-28T16:46:48.899+09:00',
//     forMakers: false,
//     makersName: '알렉산더',
//     itemName: '핸드드립',
//     commentList: [
//       {
//         writer: '알렉산더',
//         content:
//           '스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났으니 너의 희망은 무엇이..냐 삼각지 로타리에 궂은비 ..내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났..으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날.내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났..으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날 스물세글자스물세글자스물세글자스물세글자22한국어랑 글자랑 간격이 다르다 이풍진세상을 만났으니 너의 희망은 무엇이냐 삼각지 로타리에 궂은비 내리던날',
//         createDate: '2023-04-27',
//         updateDate: '2023-04-28',
//       },
//     ],
//   },
// ];
