import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';

import styled from 'styled-components';

import Button from '../../../../../components/Button';
import {CheckIcon, XCircleIcon} from '../../../../../components/Icon';
import RateStars from '../../../../../components/RateStars';

import Typography from '../../../../../components/Typography';
import UploadPhoto from '../../../../../components/UploadPhoto';
import ReviewInput from './ReviewInput';
import {starRatingAtom} from './store';
import {useRoute} from '@react-navigation/native';
import {createReview} from '../../../../../biz/useReview/useCreateAndEditReview/Fetch';
import RNFetchBlob from 'rn-fetch-blob';

export const SCREEN_NAME = 'S_MAIN__CREATE_REVIEW_PAGE_2';
export const SCREEN_NAME2 = 'S_MAIN__EDIT_REVIEW_PAGE_2';

const Screen = () => {
  const [photosArray, setPhotosArray] = useState([]);
  const [starRating, setStarRating] = useAtom(starRatingAtom);

  const route = useRoute();

  useEffect(() => {
    if (route.name === 'S_MAIN__EDIT_REVIEW_PAGE_2') {
      // 리뷰 수정 페이지로 들어오면
      // 1. 서버에서 데이터를 받아온다
      // 2. 데이터들을 업ㅔㅣ트시킨다
      // 1. setStarRating
      // 2. 포토 받기
      // 3. input.review
      // 4. input.isExclusive
    }
  }, []);

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
    if (input.review?.length >= 10 && input.review?.length <= 500) {
      return;
    }

    setClickAvaliable(true);
  }, [input]);

  const onSignInPressed = data => {
    // 여기에서 작성이냐, 수정이냐 나눠야 된다
    // 라우터 이름으로 판단하면 된다  console.log(route.name);

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

    // var myHeaders = new Headers();
    // myHeaders.append(
    //   'Authorization',
    //   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMyIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2Nzk0Nzc4OTgsImV4cCI6MTY3OTQ4NTA5OH0.0439hhXri-CymVhMvcQNSkgcqYsSmHOOgthp8ss3hDU',
    // );

    /////////////
    // 방법 1  포스트맨 그대로 베끼기

    // blob으로 보낼떄

    const sendData = {
      orderItemId: 3552,
      satisfaction: 5,
      content: 'This is Review.Lalala',
      forMakers: false,
    };
    // const formData = new FormData();
    // const json = JSON.stringify(sendData);

    // // console.log(json);
    // const blob = new Blob([json], {type: 'application/json'});
    // // console.log(blob);
    // formData.append('reviewDto', blob);
    // formData.append('reviewDto2', json);

    // console.log(formData);
    // console.log(formData);
    // console.log(formData.has('reviewDto'));

    ////////////////////////////////////////
    /////////////////////////////////////////////////////
    // 라이브러리 써보기 rnFetchBlob

    // RNFetchBlob.fetch(
    //   'POST',
    //   'http://www.example.com/upload-form',
    //   {
    //     Authorization:
    //       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMyIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2Nzk1NTEzNDAsImV4cCI6MTY3OTU1ODU0MH0.BDOD6_lCpIE8As78JmLPwulxvsw4YCkbtndv_11ABjQ',

    //     'Content-Type': 'multipart/form-data',
    //   },
    //   [{name: 'reviewDto', data: json}],
    // ).then(resp => {
    //   console.log(resp);
    // });

    const sendFormDataWithToken = (formData, token) => {
      const url = 'http://3.35.197.186:8882/v1/users/me/reviews';

      // Create the request headers
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      };

      // Send the request
      return RNFetchBlob.fetch(
        'POST',
        url,
        headers,

        [
          {
            name: 'reviewDto',
            data: JSON.stringify(sendData),
          },

          // {
          //   name: 'reviewDto',
          //   data: RNFetchBlob.wrap(formData),
          // },
        ],
      );
    };

    // const jsonBlob = new Blob([JSON.stringify(sendData)], {
    //   type: 'application/json',
    // });

    const formData = new FormData();

    // formData.append('reviewDto', jsonBlob);
    // formData.append('reviewDto', sendData);
    // formData.append('reviewDto', JSON.stringify(sendData));

    // formData.append('avatar', {
    //   uri: 'file:///path/to/avatar.jpg',
    //   name: 'avatar.jpg',
    //   type: 'image/jpeg',
    // });

    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMyIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2Nzk1NTUyMzcsImV4cCI6MTY3OTU2MjQzN30.6QiiUy2fQxF-fM9rg_otVSmO9KPVvLcjdacGVCnNnVM';

    sendFormDataWithToken(formData, token)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
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
                    photosArray.map((value, index) => {
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
              <Title3>
                리뷰를{' '}
                {route.name === 'S_MAIN__EDIT_REVIEW_PAGE_2' ? '수정' : '작성'}
                해주세요
              </Title3>

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
const Title4 = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[2]};
`;
const Warnings = styled(Typography).attrs({text: ' CaptionR'})`
  color: ${props => props.theme.colors.grey[4]};
  margin-bottom: 32px;
`;

const ButtonFinal = styled(Button)`
  position: relative;
  bottom: 20px;
`;
