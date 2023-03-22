import React from 'react';
import {Dimensions} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import styled from 'styled-components';
import Typography from '../../../../../components/Typography';
import ArrowRightGrey4 from '../../../../../assets/icons/Arrow/ArrowRightGrey4.svg';
import StarRating from '../../../../../components/StarRating/StarRating';

import AdminReview from './AdminReview';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME2 as EditReviewPage2ScreenName} from '../../../../../screens/Main/Review/CreateReview/Page2';

import OnlyForMakers from './OnlyForMakers';

// const onlyForMakers = true;
const onlyForMakers = false;

const Component = ({
  id,
  makersName,
  foodName,
  writtenDate,
  option,
  rating,
  reviewText,
  adminReview,
}) => {
  const navigation = useNavigation();

  const handleDelete = () => {
    console.log('ㅗㅑㅗㅑㅗㅑㅑ ' + id);
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
              navigation.navigate(EditReviewPage2ScreenName);
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

        <PostDateText>{writtenDate} 작성</PostDateText>
      </RowWrap>

      {onlyForMakers ? (
        <>
          <ImagesWrap>
            <ImageWrap>
              <MealImage
                source={{
                  uri: 'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
                }}
              />
            </ImageWrap>
            <ImageWrap>
              <MealImage
                source={{
                  uri: 'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
                }}
              />
            </ImageWrap>
            <ImageWrap>
              <MealImage
                source={{
                  uri: 'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
                }}
              />
            </ImageWrap>
            <ImageWrap>
              <MealImage
                source={{
                  uri: 'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
                }}
              />
            </ImageWrap>
            <ImageWrap>
              <MealImage
                source={{
                  uri: 'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
                }}
              />
            </ImageWrap>
            <ImageWrap>
              <DefaultImage />
            </ImageWrap>
          </ImagesWrap>
          <ReviewWrap>
            <ReviewText>{reviewText}</ReviewText>
          </ReviewWrap>
        </>
      ) : (
        <OnlyForMakers />
      )}

      {adminReview && (
        <CommentWrap>
          <AdminReview
            pngLink={adminReview.pngLink}
            adminName={adminReview.adminName}
            writtenDate={adminReview.writtenDate}
            message={adminReview.message}
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
