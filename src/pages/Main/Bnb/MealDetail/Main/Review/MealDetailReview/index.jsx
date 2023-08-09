import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  Text,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {useQueryClient} from 'react-query';
import styled, {useTheme} from 'styled-components';
import CheckedIcon from '~assets/icons/BottomSheet/Checked.svg';
import RateStars from '~components//RateStars';
import {RightSkinnyArrow} from '~components/Icon';
import Typography from '~components/Typography';
// import {SCREEN_NAME as CreateReviewScreenName} from '~pages/Main/MyPage/Review/CreateReview/Page1';
import {PAGE_NAME as CreateReviewPage1PageName} from '~pages/Main/MyPage/Review/CreateReview/Page1';

import Card from './Card';
import {buildCustomUrl, modifyStarRatingCount} from './logic';
import {reviewDetailDailyFoodIdAtom} from './store';
import useGetMealDetailReview from '../../../../../../../biz/useReview/useMealDetailReview/useGetMealDetailReview';
import {useMainReviewInfiniteQuery} from '../../../../../../../biz/useReview/useMealDetailReview/useMainReviewInfiniteQuery';
import {
  ArrowUpAndDown,
  Picture,
  Settings,
} from '../../../../../../../components/Icon';
import BottomModalMultipleSelect from '../../../../../../../components/Review/BottomModalMultipleSelect/BottomModalMultipleSelect';
import {convertDateFormat1} from '../../../../../../../utils/dateFormatter';

const Component = ({
  imageLocation,
  foodName,
  dailyFoodId,
  starAverage,
  totalReview,
  initialLoading,

  theme,
  navigation,
  keyword,
  reviewWrite,
  orderFilter,
  setOrderFilter,
  isOnlyPhoto,
  setIsOnlyPhoto,
  rateSelected,
  selectedKeyword,
  setSelectedKeyword,
  starRatingCounts,
  showSelectList,
  setShowSelectList,
  bottomModalOpen,
  setBottomModalOpen,
  handleSelectBottomModal,
  showSelectedOrderFilter,
  handleConfirmPress,
  isFetchingTop,
}) => {
  return (
    <Container>
      <Wrap1>
        <TitleWrap>
          <ReviewCount>리뷰({initialLoading ? '' : totalReview})</ReviewCount>
        </TitleWrap>

        <StarRatingWrap>
          <RateStars
            ratingInput={initialLoading ? '' : starAverage}
            width={'132px'}
            margin={'3px'}
            disableButton={true}
            callback={() => {}}
          />

          <RatingPointText>{initialLoading ? '' : starAverage}</RatingPointText>

          <RatingOutOfText>/</RatingOutOfText>
          <RatingOutOfText>5</RatingOutOfText>
        </StarRatingWrap>

        <Wrap3>
          {Array.isArray(keyword) && keyword.length > 0 && (
            <FlatFlatList
              data={keyword}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              initialNumToRender={5}
              contentContainerStyle={{
                height: 56,
                alignItems: 'center',
              }}
              renderItem={({item, index}) => {
                return (
                  <ButtonPressable
                    onPress={() => {
                      if (selectedKeyword === item) {
                        setSelectedKeyword('');
                      } else {
                        setSelectedKeyword(item);
                      }
                    }}
                    isClicked={selectedKeyword === item}
                    isFirst={index === 0}
                    isLast={index === keyword.length - 1}>
                    <ButtonText isClicked={selectedKeyword === item}>
                      {item}
                    </ButtonText>
                  </ButtonPressable>
                );
              }}
            />
          )}
        </Wrap3>

        <Wrap4 isMarginBottom={reviewWrite === 0}>
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

        {reviewWrite !== 0 && (
          <Wrap5>
            <GoToWriteReviewPressable
              onPress={() => {
                navigation.navigate(CreateReviewPage1PageName, {
                  orderItemId: reviewWrite,
                  imageLocation: imageLocation[0],
                  foodName,
                  resetNavigate: true,
                });
              }}>
              <GoToWriteReviewText>리뷰작성 </GoToWriteReviewText>
              <RightSkinnyArrow
                width={'5px'}
                height={'9px'}
                color={theme.colors.blue[500]}
              />
            </GoToWriteReviewPressable>
          </Wrap5>
        )}
      </Wrap1>

      {showSelectList && (
        <WrapWrapView isOn={Array.isArray(keyword) && keyword.length > 0}>
          <ShadowWrap startColor="rgba(0, 0, 0, 0.03)" distance={14}>
            <FilterSelecterWrap>
              <FilterSelecterPressable
                onPress={() => {
                  setOrderFilter(0);

                  setShowSelectList(false);
                }}>
                <SelectorText isClicked={orderFilter === 0}>
                  베스트 순
                </SelectorText>
              </FilterSelecterPressable>
              <FilterSelecterPressable
                isTopBorder={true}
                onPress={() => {
                  setOrderFilter(1);

                  setShowSelectList(false);
                }}>
                <SelectorText isClicked={orderFilter === 1}>
                  최신 순
                </SelectorText>
                <></>
              </FilterSelecterPressable>
              <FilterSelecterPressable
                isTopBorder={true}
                onPress={() => {
                  setOrderFilter(2);

                  setShowSelectList(false);
                }}>
                <SelectorText isClicked={orderFilter === 2}>
                  리뷰 추천순
                </SelectorText>
              </FilterSelecterPressable>
            </FilterSelecterWrap>
          </ShadowWrap>
        </WrapWrapView>
      )}

      <ReviewListWrap>
        {isFetchingTop && (
          <LoadingPage1>
            <ActivityIndicator size={'large'} />
          </LoadingPage1>
        )}
      </ReviewListWrap>

      <BottomModalMultipleSelect
        onConfirmPress={handleConfirmPress}
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

  position: relative;
`;

const TitleWrap = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
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

  ${({isMarginBottom}) => {
    if (isMarginBottom) {
      return `margin-bottom: 16px; `;
    }
  }}

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
  /* top: 215px; */
  top: ${({isOn}) => (isOn ? '215px' : '175px')};
  left: 30px;
  z-index: 3;
  /* border: 1px solid black; */
`;

const ShadowWrap = styled(Shadow)`
  border-radius: 7px;
`;

const FilterSelecterWrap = styled.View`
  width: ${() => {
    if (Platform.OS === 'android') {
      return `86px`;
    }
    return `84px`;
  }};
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

  margin: 0px 6px;

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

const LoadingPage = styled.View`
  background-color: white;
  opacity: 0.5;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 100%;
  flex: 1;
  padding-bottom: 150px;
`;

const LoadingPage1 = styled.View`
  margin-bottom: 18px;
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
