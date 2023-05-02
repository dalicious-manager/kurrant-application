import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Dimensions, Image, Platform, Text} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import styled from 'styled-components';
import Typography from '~components/Typography';
import ArrowRightGrey4 from '~assets/icons/Arrow/ArrowRightGrey4.svg';
import StarRating from '~components/StarRating/StarRating';

import AdminOrMakersReview from '~components/Review/AdminOrMakersReview';
// import ImageModal from '~components/Review/ImageModal';
import {useNavigation} from '@react-navigation/native';
// import {SCREEN_NAME2 as EditReviewPage2ScreenName} from '../../../../../screens/Main/Review/CreateReview/Page2';

// import OnlyForMakers from './OnlyForMakers';
// // import {deleteReview} from '../../../../../biz/useReview/useWrittenReview/Fetch';

// import {SCREEN_NAME as ReviewScreenName} from '../../../../../screens/Main/Review';
// import {PAGE_NAME as WrittenReviewPageName} from '../../../../../pages/Main/MyPage/WrittenReview';
// import {getStorage} from '../../../../../utils/asyncStorage';
// import {
//   deleteReview,
//   deleteReview2,
// } from '../../../../../biz/useReview/useWrittenReview/Fetch';
// import ImageModal from './ImageModal/ImageModal';
// import useWrittenReview from '../../../../../biz/useReview/useWrittenReview/hook';
import {changeSeperator} from '~utils/dateFormatter';
import {SkinnyArrowDown} from '~components/Icon';
import {css} from 'styled-components/native';

// 상세페이지 카드

const Component = ({
  id,

  writtenDate,
  option,
  rating,
  reviewText,
  focusId,

  imageLocation,
  createDate,
  updateDate,
  commentList,
}) => {
  const navigation = useNavigation();

  const [imageModalVisible, setImageModalVisible] = useState(false);

  // const {getWrittenReview} = useWrittenReview();

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

  const [numLines, setNumLines] = useState(1);

  const handlePressReviewText = () => {
    setElaborateComment(!elaborateComment);
  };

  const [calcFontSize, setCalcFontSize] = useState(278 * 0.05115);

  const getWidth = e => {
    const {width, height, x, y} = e.nativeEvent.layout;

    setCalcFontSize(width * 0.052279);
  };

  return (
    <Container focusId={focusId} id={id}>
      <TopWrap>
        <TitleWrap>
          <RestaurentNameText numberOfLines={1} ellipsizeMode="tail">
            남**
          </RestaurentNameText>
          <ArrowRightGrey4 />
        </TitleWrap>

        <EditWrap>
          <Pressable
            onPress={() => {
              //   navigation.navigate(EditReviewPage2ScreenName, {
              //     id: id,
              //     status: 'edit',
              //     editItem,
              //   });
            }}>
            <EditText>도움이 되요 자리</EditText>
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

      {/* {forMakers && <OnlyForMakers />} */}

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

      {/* <ImageModal
        visible={imageModalVisible}
        setVisible={setImageModalVisible}
        imageLocation={imageLocation}
        firstClickedImageIndex={firstClickedImageIndex}
      /> */}

      <ReviewPressable onLayout={getWidth} onPress={handlePressReviewText}>
        {Platform.OS === 'ios' && numLines >= 3 && !elaborateComment && (
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

      {/* 신고하기 버튼 자리 */}

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
  //margin: 12px 0;
  //margin-bottom: 40px;
  /* padding: 24px; */
  ${({focusId, id}) => {
    // console.log(focusId, id, 'focusId === id');
    if (focusId === id) {
      return css`
        background-color: ${({theme}) => theme.colors.grey[8]};
      `;
    }
  }}/* border: 1px solid black; */
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
