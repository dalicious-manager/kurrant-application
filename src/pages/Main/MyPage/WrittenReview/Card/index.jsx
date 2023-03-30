import React, {useCallback} from 'react';
import {Alert, Dimensions} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import styled from 'styled-components';
import Typography from '../../../../../components/Typography';
import ArrowRightGrey4 from '../../../../../assets/icons/Arrow/ArrowRightGrey4.svg';
import StarRating from '../../../../../components/StarRating/StarRating';

import AdminOrMakersReview from './AdminOrMakersReview';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME2 as EditReviewPage2ScreenName} from '../../../../../screens/Main/Review/CreateReview/Page2';

import OnlyForMakers from './OnlyForMakers';
// import {deleteReview} from '../../../../../biz/useReview/useWrittenReview/Fetch';

import Review, {
  PAGE_NAME as ReviewPageName,
} from '../../../../../pages/Main/MyPage/Review';
import {SCREEN_NAME as ReviewScreenName} from '../../../../../screens/Main/Review';
import WrittenReview, {
  PAGE_NAME as WrittenReviewPageName,
} from '../../../../../pages/Main/MyPage/WrittenReview';
import {getStorage} from '../../../../../utils/asyncStorage';
import {deleteReview} from '../../../../../biz/useReview/useWrittenReview/Fetch';

// '../../../pages/Main/MyPage/Review';
const onlyForMakers = true;
// const onlyForMakers = false;

const Component = ({
  id,
  editItem,
  makersName,
  foodName,
  writtenDate,
  option,
  rating,
  reviewText,
  adminReview,
  makersComment,
  forMakers,
  imageLocation,
  createDate,
  updateDate,
}) => {
  const navigation = useNavigation();

  // console.log('여기가 보여주는 데이터임 여기 확인해라');
  // console.log(foodName);
  // console.log(forMakers);

  const getToken = useCallback(async () => {
    const token = await getStorage('token');

    let tokenBox;
    if (token) {
      tokenBox = JSON.parse(token);
    }

    return tokenBox?.accessToken;
  }, []);

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

  const handleDelete = async () => {
    const token = await getToken();

    Alert.alert(
      `리뷰 삭제`,
      `리뷰를 삭제하면 재작성이 불가해요. \n  정말 삭제하시겠어요?`,
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
            await deleteReview(id, token, () => {
              navigation.reset({
                routes: [
                  {
                    name: ReviewScreenName,

                    state: {
                      index: 1,
                      routes: [
                        {
                          name: ReviewPageName,
                        },
                        {
                          name: WrittenReviewPageName,
                        },
                      ],
                    },
                  },
                ],
              });
            });

            return;
          },

          style: 'destructive',
        },
      ],
    );
  };

  return (
    <Container>
      <TopWrap>
        <TitleWrap>
          <RestaurentNameText>
            {'['}
            {makersName}
            {']'}
            {foodName}
          </RestaurentNameText>
          <ArrowRightGrey4 />
        </TitleWrap>

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
          {writtenDate} {createDate === updateDate ? '작성' : '수정'}
        </PostDateText>
      </RowWrap>

      {forMakers && <OnlyForMakers />}

      {imageLocation && imageLocation.length > 0 && (
        <>
          <ImagesWrap>
            {imageLocationToSix.map((v, i) => {
              if (v) {
                return (
                  <ImageWrap key={i}>
                    <MealImage
                      source={{
                        uri: v,
                      }}
                    />
                  </ImageWrap>
                );
              } else {
                return (
                  <ImageWrap key={i}>
                    <DefaultImage />
                  </ImageWrap>
                );
              }
            })}
          </ImagesWrap>
          <ReviewWrap>
            <ReviewText numberOfLines={3} ellipsizeMode="tail">
              {reviewText}
            </ReviewText>
          </ReviewWrap>
        </>
      )}

      {adminReview && (
        <CommentWrap>
          <AdminOrMakersReview
            pngLink={adminReview.pngLink}
            writtenDate={adminReview.createDate}
            message={adminReview.content}
          />
        </CommentWrap>
      )}

      {makersComment && (
        <CommentWrap>
          <AdminOrMakersReview
            makersName={makersName}
            pngLink={makersComment.pngLink}
            writtenDate={makersComment.createDate}
            message={makersComment.content}
          />
        </CommentWrap>
      )}
    </Container>
  );
};

export default Component;

const Container = styled.View`
  width: 100%;
  margin: 12px 0;
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
`;

const RestaurentNameText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-right: 4px;
`;

const EditWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

const EditText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.blue[500]};
  margin-right: 6px;
`;
const DeleteText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.grey[4]};
  margin-left: 6px;
`;

const RowWrap = styled.View`
  flex-direction: row;

  align-items: center;
  margin-bottom: 11px;
`;
const StarsWrap = styled.View`
  flex-direction: row;
`;

const PostDateText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.grey[4]};
  margin-left: 6px;
`;
const ImagesWrap = styled.View`
  flex-direction: row;
  margin-bottom: 9px;
`;

const ImageWrap = styled.View`
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

const ReviewWrap = styled.View``;

const ReviewText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-left: 6px;
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
