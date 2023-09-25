/* eslint-disable import/order */
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Dimensions, Image, Platform, Text} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import styled from 'styled-components';
import {css} from 'styled-components/native';
import ArrowRightGrey4 from '~assets/icons/Arrow/ArrowRightGrey4.svg';
// import AdminOrMakersReview from './AdminOrMakersReview';

import AdminOrMakersReview from '~components/Review/AdminOrMakersReview';
import {isOverThreeLines} from '~components/Review/WrittenReviewCard/logic';
// import {SCREEN_NAME2 as EditReviewPage2ScreenName} from '../../../../../screens/Main/Review/CreateReview/Page2';

import OnlyForMakers from './OnlyForMakers';
// import {deleteReview} from '../../../../../biz/useReview/useWrittenReview/Fetch';

// import {SCREEN_NAME as ReviewScreenName} from '../../../../../screens/Main/Review';
// import {PAGE_NAME as WrittenReviewPageName} from '../../../../../pages/Main/MyPage/WrittenReview';
// import {getStorage} from '../../../../../utils/asyncStorage';
import {
  deleteReview,
  deleteReview2,
} from '~biz/useReview/useWrittenReview/Fetch';
import useWrittenReview from '~biz/useReview/useWrittenReview/hook';
import {SkinnyArrowDown} from '~components/Icon';
import StarRating from '~components/StarRating/StarRating';
import Typography from '~components/Typography';

import {PAGE_NAME2 as EditReviewPage2ScreenName} from '~pages/Main/MyPage/Review/CreateReview/Page2';

import ImageModal from './ImageModal/ImageModal';
// import useWrittenReview from '../../../../../biz/useReview/useWrittenReview/hook';
import {changeSeperator} from '../../../../../utils/dateFormatter';
// import {SkinnyArrowDown} from '../../../../../components/Icon';

// const onlyForMakers = false;

import {PAGE_NAME as mealDetailPageName} from '../../../../../pages/Main/Bnb/MealDetail/Main';

const Component = ({
  id,
  editItem,
  makersName,
  foodName,
  writtenDate,
  option,
  rating,
  reviewText,
  focusId,
  forMakers,
  imageLocation,
  createDate,
  updateDate,
  commentList,
  toast,
  dailyFoodId,
  sseType8List,
}) => {
  // dailyFoodId
  // deliveryTime
  // 필요

  // console.log(dailyFoodId);

  const navigation = useNavigation();

  const [imageModalVisible, setImageModalVisible] = useState(false);

  const {getWrittenReview} = useWrittenReview();

  const [firstClickedImageIndex, setFirstClickedImageIndex] = useState(0);
  const [elaborateComment, setElaborateComment] = useState(false);

  let imageLocationToSix = [];

  // imageLocation이 널일 경우 null 을 빈 배열로 고쳐주기
  let importImageLocation = [];
  if (!imageLocation) {
  } else {
    importImageLocation = imageLocation;
  }

  for (let i = 0; i < 6; i++) {
    imageLocationToSix.push(importImageLocation[i]);
  }

  // 운영자 메이커스 댓글 늦게 작성한 댓글이 위에 있게 sorting해야됨

  const handleDelete = async () => {
    // const token = await getToken();

    Alert.alert(
      `리뷰 삭제`,
      `리뷰를 삭제하면 재작성이 불가해요. \n정말 삭제하시겠어요?`,
      [
        {
          text: '취소',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: `삭제`,
          onPress: async () => {
            try {
              const response = await deleteReview2({id: id});

              if (response.statusCode !== 200) {
                Alert.alert('리뷰 삭제 실패', `${response.message}`, [
                  {
                    text: '확인',
                    onPress: () => {},
                    style: 'cancel',
                  },
                ]);
              } else {
                toast.toastEvent();
                await getWrittenReview();
              }
            } catch (err) {
              Alert.alert('리뷰 삭제 실패', '', [
                {
                  text: '확인',
                  onPress: () => {},
                  style: 'cancel',
                },
              ]);
            }

            return;
          },

          style: 'destructive',
        },
      ],
    );
  };

  const handlePressReviewText = () => {
    setElaborateComment(!elaborateComment);
  };

  const [calcFontSize, setCalcFontSize] = useState(278 * 0.05115);

  const getWidth = e => {
    const {width, height, x, y} = e.nativeEvent.layout;

    setCalcFontSize(width * 0.052279);
  };

  // '\n'개수 파악하기

  // /n이 하나일떄 24*24
  // /n이 두개일떄 24
  // /n 이 세개일떄 0

  return (
    <Container focusId={focusId} id={id}>
      <TopWrap>
        <TitlePressable
          onPress={() => {
            navigation.navigate(mealDetailPageName, {
              dailyFoodId,
              disableAddCartFromReview: true,
              reviewIdFromWrittenReview: !forMakers && id,
            });
          }}>
          <RestaurentNameText numberOfLines={1} ellipsizeMode="tail">
            {'['}
            {makersName}
            {'] '}
            {foodName}
          </RestaurentNameText>
          <ArrowRightGrey4 />
        </TitlePressable>

        <EditWrap>
          <Pressable
            onPress={() => {
              navigation.navigate(EditReviewPage2ScreenName, {
                id: id,
                status: 'edit',
                editItem,
              });
            }}>
            <EditText>수정</EditText>
          </Pressable>
          <Pressable
            onPress={() => {
              handleDelete();
            }}>
            <DeleteText>삭제</DeleteText>
          </Pressable>
        </EditWrap>
      </TopWrap>

      {option ? (
        <OptionWrap>
          <MiniGreyBlock />
          <OptionText>추가옵션 : {option}</OptionText>
        </OptionWrap>
      ) : (
        <></>
      )}

      <RowWrap>
        <StarsWrap>
          <StarRating rating={rating} width="66px" margin="1px" />
        </StarsWrap>

        <PostDateText>
          {changeSeperator(writtenDate, '-', '. ')}{' '}
          {createDate === updateDate ? '작성' : '수정'}
        </PostDateText>
      </RowWrap>

      {forMakers && <OnlyForMakers />}

      {imageLocation && imageLocation.length > 0 && (
        <ImagesWrapper>
          {imageLocationToSix.map((v, i) => {
            if (v) {
              // 이미지가 수직 이미지인가 수평이미지인가 확인하기

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
            textBreakStrategy={
              Platform.OS === 'android' ? 'balanced' : undefined
            }
            calcFontSize={calcFontSize}>
            {reviewText}
          </ReviewText>
        ) : (
          <ReviewText
            // textBreakStrategy={Platform.OS === 'android' ? 'simple' : undefined}
            textBreakStrategy={
              Platform.OS === 'android' ? 'balanced' : undefined
            }
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
                  isSseType8={sseType8List.includes(v.commentId)}
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
  //margin: 12px 0;
  //margin-bottom: 40px;
  padding: 24px;
  ${({focusId, id}) => {
    // console.log(focusId, id, 'focusId === id');
    if (focusId === id) {
      return css`
        background-color: ${({theme}) => theme.colors.grey[8]};
      `;
    }
  }}
`;

const TopWrap = styled.View`
  flex-direction: row;

  justify-content: space-between;
  margin-bottom: 5px;
`;
const TitlePressable = styled.Pressable`
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
`;

const EditText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${props => props.theme.colors.blue[500]};
  margin-right: 6px;
`;
const DeleteText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${props => props.theme.colors.grey[4]};
  margin-left: 6px;
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
const ImagesWrapper = styled.Pressable`
  flex-direction: row;
  padding-top: 11px;
  padding-bottom: 4px;
  /* border: 1px solid black; */
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
  width: 86%;
  margin: auto;
  position: relative;
  /* border: 1px solid black; */
  margin-top: 4px;
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
