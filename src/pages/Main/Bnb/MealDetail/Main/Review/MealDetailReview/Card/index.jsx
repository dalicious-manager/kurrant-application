import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Dimensions, Image, Platform, Text} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import styled, {useTheme} from 'styled-components';
import {css} from 'styled-components/native';
import useMealDetailReviewMutation from '~biz/useReview/useMealDetailReview/useMealDetailReviewMutation';
import {SkinnyArrowDown} from '~components/Icon';
import AdminOrMakersReview from '~components/Review/AdminOrMakersReview';
import ImageModal from '~components/Review/ImageModal/ImageModal';
import StarRating from '~components/StarRating/StarRating';
import Typography from '~components/Typography';
import {changeSeperator} from '~utils/dateFormatter';

import {ThumbsUp} from '../../../../../../../../components/Icon';
import {isOverThreeLines} from '../../../../../../../../components/Review/WrittenReviewCard/logic';
import {isGoodLoadingAtom} from '../store';

// 상세페이지 카드

const Component = ({
  id,
  dailyFoodId,
  item,
  userName,
  writtenDate,
  option,
  rating,
  reviewText,
  focusId,
  good,
  isGood,
  imageLocation,
  createDate,
  updateDate,
  commentList,
  allReviewList,
  setAllReviewList,
  isFetching,
}) => {
  const navigation = useNavigation();

  const theme = useTheme();
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const {pressLike} = useMealDetailReviewMutation();

  const [firstClickedImageIndex, setFirstClickedImageIndex] = useState(0);
  const [elaborateComment, setElaborateComment] = useState(false);

  let imageLocationToSix = [];

  let importImageLocation = [];
  if (!imageLocation) {
  } else {
    importImageLocation = imageLocation;
  }

  for (let i = 0; i < 6; i++) {
    imageLocationToSix.push(importImageLocation[i]);
  }

  const [numLines, setNumLines] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const handlePressReviewText = () => {
    setElaborateComment(!elaborateComment);
  };

  const [calcFontSize, setCalcFontSize] = useState(278 * 0.05115);

  const getWidth = e => {
    const {width, height, x, y} = e.nativeEvent.layout;

    setCalcFontSize(width * 0.052279);
  };

  // useEffect(() => {
  //   console.log('allReviewList 확인');
  //   console.log(allReviewList);
  // }, [allReviewList]);

  return (
    <Container focusId={focusId} id={id}>
      <TopWrap>
        <TitleWrap>
          <RestaurentNameText numberOfLines={1} ellipsizeMode="tail">
            {userName}
          </RestaurentNameText>
        </TitleWrap>
      </TopWrap>

      {option ? (
        <OptionWrap>
          <MiniGreyBlock />
          <OptionText>추가옵션 : {option}</OptionText>
        </OptionWrap>
      ) : (
        <></>
      )}

      <Wrap3 isMarginOn={imageLocation && imageLocation.length > 0}>
        <RowWrap>
          <StarsWrap>
            <StarRating rating={rating} width="66px" margin="1px" />
          </StarsWrap>

          <PostDateText>
            {changeSeperator(writtenDate, '-', '. ')}{' '}
            {createDate === updateDate ? '작성' : '수정'}
          </PostDateText>
        </RowWrap>

        {/* <LikePressable
            onPress={() => {
              if (isFetching) return;

              setIsGoodLocal(!isGoodLocal);
              if (isGoodLocal) {
                setGoodLocal(prev => prev - 1);
              } else {
                setGoodLocal(prev => prev + 1);
              }

              pressLike({
                dailyFoodId,
                reviewId: id,
              });
            }}>
            <EditText isGood={isGoodLocal}>도움이 돼요</EditText>
            <ThumbsUp
              width="14px"
              height="15px"
              color={
                isGoodLocal ? theme.colors.green[500] : theme.colors.grey[5]
              }
            />
            <LikeNumber isGood={isGoodLocal}>{goodLocal}</LikeNumber>
          </LikePressable> */}
        <EditWrap>
          {isGood !== undefined && (
            <LikePressable
              disabled={isLoading}
              onPress={async () => {
                setLoading(true);
                try {
                  await pressLike({
                    dailyFoodId,
                    reviewId: id,
                  });
                  const nowData = allReviewList.map(v => {
                    if (v.reviewId === id) {
                      return {
                        ...v,
                        isGood: !v.isGood,
                        good: v.isGood ? good - 1 : good + 1,
                      };
                    }
                    return v;
                  });

                  setAllReviewList(nowData);
                } catch (error) {
                  Alert.alert(
                    '도움이됐어요',
                    error.toString().replace('error:', ''),
                  );
                } finally {
                  setTimeout(() => {
                    setLoading(false);
                  }, 300);
                }
              }}>
              <EditText isGood={isGood}>도움이 돼요</EditText>
              <ThumbsUp
                width="14px"
                height="15px"
                color={isGood ? theme.colors.green[500] : theme.colors.grey[5]}
              />
              <LikeNumber isGood={isGood}>{good}</LikeNumber>
            </LikePressable>
          )}
        </EditWrap>
      </Wrap3>

      {imageLocation && imageLocation.length > 0 && (
        <ImagesWrapper>
          {imageLocationToSix.map((v, i) => {
            if (v) {
              return (
                <ImagePressable
                  key={i}
                  onPress={() => {
                    setFirstClickedImageIndex(i);
                    setImageModalVisible(true);
                  }}>
                  <MealImage
                    source={{
                      uri: v,
                    }}
                  />
                </ImagePressable>
              );
            }
            // defaultPicture 기각됨
            // else {
            //   return (
            //     <ImageWrap key={i}>
            //       <DefaultImage />
            //     </ImageWrap>
            //   );
            // }
          })}
        </ImagesWrapper>
      )}

      <ImageModal
        visible={imageModalVisible}
        setVisible={setImageModalVisible}
        imageLocation={imageLocation}
        firstClickedImageIndex={firstClickedImageIndex}
      />

      {/* <Filler /> */}

      <ReviewPressable onLayout={getWidth} onPress={handlePressReviewText}>
        {Platform.OS === 'ios' &&
          isOverThreeLines(reviewText) &&
          !elaborateComment && (
            <IconDiv
              onPress={() => {
                setElaborateComment(!elaborateComment);
              }}>
              <SkinnyArrowDown width={'12px'} height={'8px'} />
            </IconDiv>
          )}

        {/* <Text
          // lineBreakStrategyIOS={'hangul-word'}
          textBreakStrategy={Platform.OS === 'android' ? 'simple' : undefined}>
          {reviewText}
        </Text> */}

        {!elaborateComment ? (
          <ReviewText
            numberOfLines={3}
            ellipsizeMode="tail"
            // textBreakStrategy={Platform.OS === 'android' ? 'simple' : undefined}
            // textBreakStrategy={
            //   Platform.OS === 'android' ? 'balanced' : undefined
            // }
            calcFontSize={calcFontSize}>
            {reviewText}
          </ReviewText>
        ) : (
          <ReviewText
            // textBreakStrategy={Platform.OS === 'android' ? 'simple' : undefined}
            // textBreakStrategy={
            //   Platform.OS === 'android' ? 'balanced' : undefined
            // }
            calcFontSize={calcFontSize}>
            {reviewText}
          </ReviewText>
        )}
      </ReviewPressable>

      {commentList &&
        commentList.length > 0 &&
        commentList.map((v, i) => {
          if (v.writer === 'admin') {
            return (
              <CommentWrap key={`${JSON.stringify(v)}${i}`}>
                <AdminOrMakersReview
                  pngLink={v.pngLink}
                  writtenDate={v.createDate}
                  message={v.content}
                />
              </CommentWrap>
            );
          } else {
            return (
              <CommentWrap key={`${JSON.stringify(v)}${i}`}>
                <AdminOrMakersReview
                  makersName={v.writer}
                  pngLink={v.pngLink}
                  writtenDate={v.createDate}
                  message={v.content}
                />
              </CommentWrap>
            );
          }
        })}
    </Container>
  );
};

export default Component;

const Container = styled.View`
  width: 100%;

  ${({focusId, id}) => {
    if (focusId === id) {
      return css`
        background-color: ${({theme}) => theme.colors.grey[8]};
      `;
    }
  }}
  /* padding: 16px 24px; */
  padding: 0 24px;

  margin-bottom: 40px;
`;

const TopWrap = styled.View`
  flex-direction: row;

  justify-content: space-between;
  margin-bottom: 5px;
`;
const TitleWrap = styled.View`
  flex-direction: row;
  align-items: center;
  width: 78%;
`;

const RestaurentNameText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-right: 4px;
`;

const EditWrap = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
  /* border: 1px solid black; */
`;

const EditText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme, isGood}) =>
    isGood ? theme.colors.green[500] : theme.colors.grey[5]};
  margin-right: 6px;
`;

const LikeNumber = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme, isGood}) =>
    isGood ? theme.colors.green[500] : theme.colors.grey[5]};

  margin-left: 3px;
`;

const DeleteText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${props => props.theme.colors.grey[4]};
  margin-left: 6px;
`;

const Wrap3 = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* border: 1px solid black; */
  ${({isMarginOn}) => {
    if (!isMarginOn) {
      return `margin-bottom: 8px;`;
    } else {
      return `margin-bottom: 11px;`;
    }
  }}
`;

const RowWrap = styled.View`
  flex-direction: row;

  align-items: center;
`;
const StarsWrap = styled.View`
  flex-direction: row;
`;

const PostDateText = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${props => props.theme.colors.grey[4]};
  margin-left: 6px;
`;

const LikePressable = styled.Pressable`
  flex-direction: row;
  align-items: center;
  /* border: 1px solid black; */

  padding: 10px 0;
  z-index: 1;
  position: absolute;
  top: -13.3px;
  right: 0;
`;

const ImagesWrapper = styled.Pressable`
  flex-direction: row;
  /* padding-top: 11px; */
  padding-bottom: 4px;
  /* border: 1px solid black; */
  margin-bottom: 8px;
`;

const ImagePressable = styled.Pressable`
  ${() => {
    const widthyo = (Dimensions.get('screen').width - 48) / 6;

    return `
      width:  ${widthyo}px;
      height: ${widthyo}px;
    `;
  }}
  padding: 2px;
`;

const MealImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 7.5px;
`;

const DefaultImage = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 7.5px;
  background-color: #d9d9d9;
`;

const ReviewPressable = styled.Pressable`
  /* width: 278px; */
  width: 90%;
  margin: auto;
  position: relative;
  /* border: 1px solid black; */
  /* padding: 0 11px; */
`;
const ReviewText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-left: 6px;

  font-size: ${({calcFontSize}) =>
    calcFontSize ? `${calcFontSize}px` : '14.2px'};
`;
const ReviewTextTextInputAndroid = styled.TextInput`
  color: ${props => props.theme.colors.grey[2]};
  font-size: 14px;
  padding-top: 0px;
  font-weight: 400;
  padding-top: 4px;
  /* overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; */
  font-family: 'Pretendard-Regular';
`;

const ReviewTextTextInputIos = styled.TextInput`
  color: ${props => props.theme.colors.grey[2]};
  padding-top: 4px;
  font-weight: 400;
  font-size: 14px;
  font-family: 'Pretendard-Regular';
`;

const CommentWrap = styled.View`
  width: 100%;
`;

const OptionWrap = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;
  align-items: center;
`;
const MiniGreyBlock = styled.View`
  height: 12px;
  width: 3px;
  background-color: ${props => props.theme.colors.grey[7]};
`;
const OptionText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.grey[5]};
  margin-left: 4px;
`;

const IconDiv = styled.Pressable`
  position: absolute;

  bottom: 5px;
  right: -20px;
`;

const Filler = styled.View`
  width: 100%;
  height: 8px;
  border: 1px solid black;
`;
