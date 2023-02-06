import faIR from 'date-fns/esm/locale/fa-IR/index.js';
import {useAtom} from 'jotai';
import React, {useEffect, useRef, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import styled, {useTheme} from 'styled-components';

import Button from '../../../../components/Button';
import {CheckIcon, XCircleIcon} from '../../../../components/Icon';
import RateStars from '../../../../components/RateStars';
import RefTextInput from '../../../../components/RefTextInput';
import Typography from '../../../../components/Typography';
import UploadPhoto from '../../../../components/UploadPhoto';
import ReviewInput from './ReviewInput';
import {starRatingAtom} from './store';

export const SCREEN_NAME = 'S_MAIN__CREATE_REVIEW_PAGE_2';

const Screen = () => {
  const [photosArray, setPhotosArray] = useState([]);
  const [starRating, setStarRating] = useAtom(starRatingAtom);

  const [input, setInput] = useState({
    review: '',
    isExclusive: false,
  });

  const [clickAvaliable, setClickAvaliable] = useState(false);

  const form = useForm({
    mode: 'all',
  });
  useEffect(() => {
    setInput({...input, review: form.watch('review')});
  }, [form.watch('review')]);

  const handlePhotoRemove = photoId => {
    const thisPhotoArray = [...photosArray];
    const returnArray = thisPhotoArray.filter(value => value.id !== photoId);
    setPhotosArray(returnArray);
  };

  useEffect(() => {
    setClickAvaliable(false);
    if (input.review?.length >= 10) {
      return;
    }

    setClickAvaliable(true);
  }, [input]);

  const onSignInPressed = data => {
    // 서버에 보내는 데이터 구조
    // rating : starRating | number
    // photos : photosArray | ([{id: number, uri: '이미지uri'}])
    // review : data.review | string
    // isExclusive : input.isExclusive |  boolean
    console.log({
      rating: starRating,
      photos: photosArray,
      review: data.review,
      isExclusive: input.isExclusive,
    });

    console.log('input registered');
  };

  return (
    <>
      <Container2>
        <FormProvider {...form}>
          <Container
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <SatisfactionTitle>
              <Title1>만족도를 알려주세요</Title1>
              <RateStars
                width="160px"
                margin="2px"
                ratingInput={starRating}
                callback={rating => {
                  setStarRating(rating);
                }}
              />
            </SatisfactionTitle>

            <UploadPhotosWrap>
              <Title2Wrap>
                <Title2> 사진 업로드 {photosArray.length}/5 </Title2>
                <NotMandatory>(선택)</NotMandatory>
              </Title2Wrap>

              <PhotosScrollViewWrap
                // style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <PhotosView>
                  <UploadPhoto
                    width="80px"
                    height="80px"
                    input={input}
                    photosArray={photosArray}
                    setPhotosArray={setPhotosArray}
                  />
                  {!!photosArray.length &&
                    photosArray.reverse().map((value, index) => {
                      return (
                        <PhotoImageWrap key={value.id}>
                          <DeleteButton
                            onPress={() => {
                              handlePhotoRemove(value.id);
                            }}>
                            <XCircleIcon />
                          </DeleteButton>
                          <PhotoImage source={{uri: value.uri}} />
                        </PhotoImageWrap>
                      );
                      // return <PhotoImage key={index} source={{uri: value}} />;
                    })}
                </PhotosView>
              </PhotosScrollViewWrap>
            </UploadPhotosWrap>

            <ReviewWrap>
              <Title3>리뷰를 작성해주세요</Title3>

              <ReviewInput />

              <ShowOnlyToOwnerWrap>
                <CheckBox
                  checked={input.isExclusive}
                  onPress={() => {
                    // setChecked(!checked);

                    setInput({...input, isExclusive: !input.isExclusive});
                  }}>
                  <CheckIcon
                    style={{width: 15, height: 10}}
                    // size={36}
                    color={'#ffffff'}
                  />
                </CheckBox>
                <Title4>사장님에게만 보이기 </Title4>
              </ShowOnlyToOwnerWrap>
            </ReviewWrap>

            <Warnings>
              작성된 리뷰는 다른 고객분들께 큰 도움이 됩니다. 하지만 상품 및
              서비스와 무관한 리뷰와 사진이 포함되거나 허위 리뷰, 욕설, 비방글은
              제3자의 권리를 침해하는 게시물은 통보없이 삭제될 수 있습니다.
            </Warnings>
          </Container>

          <ButtonFinal
            size="full"
            label="완료"
            text={'Button09SB'}
            disabled={clickAvaliable}
            onPressEvent={form.handleSubmit(onSignInPressed)}
          />
        </FormProvider>
      </Container2>
    </>
  );
};

export default Screen;

const Container2 = styled.View`
  padding: 0 24px;
  padding-top: 24px;
  flex: 1;
  background-color: #ffffff;
`;

const Container = styled.ScrollView`
  width: 100%;
  /* height: 90%; */
  background-color: #ffffff;
`;

const SatisfactionTitle = styled.View`
  margin-bottom: 58px;
`;
const Title1 = styled(Typography).attrs({text: 'Title03SB'})`
  color: #33334a;
  margin-bottom: 14px;
`;

const UploadPhotosWrap = styled.View`
  margin-bottom: 56px;
`;
const PhotosScrollViewWrap = styled.ScrollView`
  /* display: flex; */
  flex-direction: row;
  height: 100px;
  /* justify-content: center; */
  /* align-items: center; */
`;

const PhotosView = styled.View`
  /* flex: 1; */
  height: 100px;
  /* flex-direction: row; */
  flex-wrap: wrap;

  justify-content: center;
`;

const PhotoImageWrap = styled.View`
  /* position: relative; */
  /* overflow: hidden; */
`;

const DeleteButton = styled.Pressable`
  position: absolute;
  top: -10px;
  right: 0px;
  width: 24px;
  height: 24px;
  z-index: 3;
`;

const PhotoImage = styled.Image`
  width: 80px;
  height: 80px;
  margin: 0 8px;
  border-radius: 7px;
`;

const Title2Wrap = styled.View`
  display: flex;
  flex-direction: row;
`;
const Title2 = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-bottom: 5px;
`;
const NotMandatory = styled(Typography).attrs({text: 'Title03R'})`
  color: ${props => props.theme.colors.grey[5]};
`;

const ReviewWrap = styled.View``;
const Title3 = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-bottom: 12px;
`;

const ShowOnlyToOwnerWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;
const CheckBox = styled.Pressable`
  width: 24px;
  height: 24px;
  background-color: ${props => {
    if (props.checked) {
      return props.theme.colors.grey[2];
    } else {
      return props.theme.colors.grey[7];
    }
  }};
  border-radius: 7px;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`;
const Title4 = styled(Typography).attrs({text: 'Body06R                  '})`
  color: ${props => props.theme.colors.grey[2]};
`;
const Warnings = styled(Typography).attrs({text: ' CaptionR'})`
  color: ${props => props.theme.colors.grey[4]};
`;

const ButtonFinal = styled(Button)`
  position: relative;
  bottom: 20px;
`;
