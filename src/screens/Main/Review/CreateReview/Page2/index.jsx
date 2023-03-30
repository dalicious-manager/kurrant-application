import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';

import styled, {useTheme} from 'styled-components';

import Button from '../../../../../components/Button';
import {CheckIcon, XCircleIcon} from '../../../../../components/Icon';
import RateStars from '../../../../../components/RateStars';

import Typography from '../../../../../components/Typography';
import UploadPhoto from '../../../../../components/UploadPhoto';
import ReviewInput from './ReviewInput';
import {starRatingAtom} from './store';
import {useNavigation, useRoute} from '@react-navigation/native';
import {createReview} from '../../../../../biz/useReview/useCreateAndEditReview/Fetch';
import RNFetchBlob from 'rn-fetch-blob';

import Config from 'react-native-config';
import {getStorage} from '../../../../../utils/asyncStorage';
import useWrittenReview from '../../../../../biz/useReview/useWrittenReview/hook';

import Review, {SCREEN_NAME as ReviewScreenName} from '../../../Review';
import {Alert, FlatList, Text, View} from 'react-native';

export const SCREEN_NAME = 'S_MAIN__CREATE_REVIEW_PAGE_2';
export const SCREEN_NAME2 = 'S_MAIN__EDIT_REVIEW_PAGE_2';

const apiHostUrl =
  Config.NODE_ENV === 'dev'
    ? Config.API_DEVELOP_URL + '/' + Config.API_VERSION
    : Config.API_HOST_URL + '/' + Config.API_VERSION;

const Screen = ({route}) => {
  const [starRating, setStarRating] = useAtom(starRatingAtom);
  const [clickDisable, setClickDisable] = useState(false);

  // 모든 사진
  const [photosArray, setPhotosArray] = useState([]);

  // FlatList 에 넣을 배열 만들기

  const [photosArrayForFlatList, setPhotosArrayForFlatList] = useState([]);

  useEffect(() => {
    // 사진 채우기 기능 추가

    setPhotosArrayForFlatList(['addPic', ...photosArray]);
  }, [photosArray]);

  useEffect(() => {
    console.log(photosArrayForFlatList);
  }, [photosArrayForFlatList]);

  const {getWrittenReview} = useWrittenReview();
  const id = route?.params?.id;
  const status = route?.params?.status;
  const editItem = route?.params?.editItem;

  // console.log('진짜 징하다');
  // console.log(editItem);

  const theme = useTheme();

  // editItem 있으면 등록하기

  const navigation = useNavigation();

  // 받아온 editItem에서 이미지 추출해서 등록하기
  //
  useEffect(() => {
    if (editItem) {
      const editItemModify = editItem.image
        ? editItem.image.map(v => {
            //
            let fileName = v.split('/').pop();
            return {
              id: v,
              uri: v,
              fileName: fileName,
            };
          })
        : [];

      setPhotosArray(editItemModify);
    }
  }, [editItem]);

  const getToken = useCallback(async () => {
    const token = await getStorage('token');

    let tokenBox;
    if (token) {
      tokenBox = JSON.parse(token);
    }

    return tokenBox?.accessToken;
  }, []);

  const [input, setInput] = useState({
    review: '',
    isExclusive: false,
  });

  // 사장님에게만 보이기옵션은 수정할 수 없다

  const form = useForm({
    mode: 'all',
  });

  useEffect(() => {
    setInput({...input, review: form.watch('review')});
  }, [form.watch('review')]);

  // 데이터 있으면 input에 바로등록하기

  useEffect(() => {
    if (editItem && editItem.reviewText) {
      setInput({...input, review: editItem.reviewText});
    }
  }, [editItem]);

  const handlePhotoRemove = photoId => {
    const thisPhotoArray = [...photosArray];
    const returnArray = thisPhotoArray.filter(value => value.id !== photoId);
    setPhotosArray(returnArray);
  };

  useEffect(() => {
    // 처음아닐때  되게하기
    // if (!isMount) return;

    if (input.review?.length >= 10 && input.review?.length <= 500) {
      setClickDisable(false);
      return;
    } else {
      setClickDisable(true);
    }
  }, [input]);

  // 여기가 완료 클릭

  const onSignInPressed = data => {
    const sendCreateData = {
      orderItemId: id,
      satisfaction: starRating,
      content: data.review,
      forMakers: input.isExclusive,
    };

    const createReview = async (photosArray = []) => {
      const url = `${apiHostUrl}/users/me/reviews`;

      const token = await getToken();

      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      };

      return RNFetchBlob.fetch('POST', url, headers, [
        ...photosArray,
        {
          name: 'reviewDto',
          data: JSON.stringify(sendCreateData),
          type: 'application/json',
        },
      ]);
    };

    const editReview = async (editId, photosArray = []) => {
      const url = `${apiHostUrl}/users/me/reviews/update?id=${editId}`;

      const token = await getToken();

      // photosArray에서 웹에있는 데이터, 로컬인 데이터 배열 둘로 나눠야됨

      console.log('보내는 데이터임');
      console.log(data);

      // editItem && editItem.reviewText
      // ? editItem.reviewText
      // data.review 가 없으면 editItem을 바로 받아오게하기

      let webArray = [];
      let localArray = [];

      photosArray.forEach((v, i) => {
        // 웹에서온 데이터랑, 로컬에서부터의 데이터랑 서로 나누기

        if (v.uri.slice(0, 8) === 'file:///') {
          localArray.push({
            name: 'fileList',
            filename: v.fileName,
            data: RNFetchBlob.wrap(v.uri.slice(8)),
            type: 'image/jpeg',
          });
        } else {
          webArray.push(v.uri);
        }
      });

      const sendEditData = {
        satisfaction: starRating,
        content: input.review,
        images: webArray,
        // 무조건
        forMakers: editItem.forMakers ? true : input.isExclusive,
      };

      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      };

      // console.log('이게 수정할때 보내는 데이터임');

      // console.log(data.reviewed);

      // console.log(sendEditData);

      return RNFetchBlob.fetch('PATCH', url, headers, [
        ...localArray,
        {
          name: 'updateReqDto',
          data: JSON.stringify(sendEditData),
          type: 'application/json',
        },
      ]);
    };

    const photoDataArray = photosArray.map((v, i) => {
      return {
        name: 'fileList',
        filename: v.fileName,
        data: RNFetchBlob.wrap(v.uri.slice(8)),
        type: 'image/jpeg',
      };
    });

    if (status === 'create') {
      createReview(photoDataArray)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);

          if (data.statusCode === 200) {
            Alert.alert('작성 완료', '리뷰가 작성되었습니다 ', [
              {
                text: '확인',
                onPress: async () => {
                  getWrittenReview();
                  navigation.reset({routes: [{name: ReviewScreenName}]});
                },
                style: 'cancel',
              },
            ]);
          } else if (data.statusCode === 400) {
            Alert.alert('작성 실패', data.message, [
              {
                text: '확인',
                onPress: async () => {},
                style: 'cancel',
              },
            ]);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else if (status === 'edit') {
      console.log('edit 이여');

      editReview(id, photosArray)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);

          if (data.statusCode === 200) {
            Alert.alert('수정 완료', '리뷰가 수정되었습니다 ', [
              {
                text: '확인',
                onPress: async () => {
                  getWrittenReview();
                  navigation.reset({routes: [{name: ReviewScreenName}]});
                },
                style: 'cancel',
              },
            ]);
          } else {
            Alert.alert('수정 실패', data.message, [
              {
                text: '확인',
                onPress: async () => {},
                style: 'cancel',
              },
            ]);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    console.log('input registered');
  };

  return (
    <>
      <Container2>
        <FormProvider {...form}>
          <Container
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}>
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
                <Title2> 사진 업로드 {photosArray.length}/6 </Title2>
                <NotMandatory>(선택)</NotMandatory>
              </Title2Wrap>

              {/* <PhotosScrollViewWrap
                // style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{
                  flexDirection: 'row',
                  height: 100,
                }}>
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
                    })}
                </PhotosView>
              </PhotosScrollViewWrap> */}

              {/* <FlatListWrapper nestedScrollEnabled={true}>
                <UploadPhoto
                  width="80px"
                  height="80px"
                  input={input}
                  photosArray={photosArray}
                  setPhotosArray={setPhotosArray}
                />

               
              </FlatListWrapper> */}

              <FlatFlatList
                data={photosArrayForFlatList}
                scrollEnabled={true}
                horizontal={true}
                contentContainerStyle={{
                  height: 100,
                  alignItems: 'center',
                }}
                renderItem={({item}) => {
                  if (typeof item === 'object') {
                    return (
                      <>
                        <PhotoImageWrap>
                          <DeleteButton
                            onPress={() => {
                              handlePhotoRemove(item.id);
                            }}>
                            <XCircleIcon />
                          </DeleteButton>

                          <PhotoImage source={{uri: item.uri}} />
                        </PhotoImageWrap>
                      </>
                    );
                  } else {
                    return (
                      <UploadPhoto
                        width="80px"
                        height="80px"
                        input={input}
                        photosArray={photosArray}
                        setPhotosArray={setPhotosArray}
                      />
                    );
                  }
                }}
              />
            </UploadPhotosWrap>

            <ReviewWrap>
              <Title3>
                리뷰를{' '}
                {route.name === 'S_MAIN__EDIT_REVIEW_PAGE_2' ? '수정' : '작성'}
                해주세요
              </Title3>

              <ReviewInput
                editContentInput={
                  editItem && editItem.reviewText
                    ? editItem.reviewText
                    : undefined
                }
              />

              {/* <ShowOnlyToOwnerWrap>
                {editItem && editItem.forMakers ? (
                  <>
                    <CheckBox disabled={true}>
                      <CheckIcon
                        style={{width: 15, height: 10}}
                        color={theme.colors.grey[7]}
                      />
                    </CheckBox>
                  </>
                ) : (
                  <CheckBox
                    checked={input.isExclusive}
                    onPress={() => {
                      setInput({...input, isExclusive: !input.isExclusive});
                    }}>
                    <CheckIcon
                      style={{width: 15, height: 10}}
                      color={'#ffffff'}
                    />
                  </CheckBox>
                )}

                <Title4>사장님에게만 보이기 </Title4>
              </ShowOnlyToOwnerWrap> */}

              <ShowOnlyToOwnerWrap>
                {!editItem && (
                  <>
                    <CheckBox
                      checked={input.isExclusive}
                      onPress={() => {
                        setInput({...input, isExclusive: !input.isExclusive});
                      }}>
                      <CheckIcon
                        style={{width: 15, height: 10}}
                        color={'#ffffff'}
                      />
                    </CheckBox>
                  </>
                )}

                {editItem ? (
                  <Title4 isEditItem={!!editItem}>
                    {' '}
                    {editItem.forMakers
                      ? '사장님에게만 보이는 리뷰'
                      : '모두에게 보이는 리뷰'}{' '}
                  </Title4>
                ) : (
                  <Title4 isEditItem={!!editItem}>사장님에게만 보이기 </Title4>
                )}
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
            disabled={clickDisable}
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

const FlatListWrapper = styled.View`
  flex-direction: row;
`;

const FlatFlatList = styled.FlatList`
  height: 100px;
`;

const ShowOnlyToOwnerWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;

  position: relative;
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

  ${({disabled}) => {
    if (disabled) {
      return `
      background-color: white;
      
      `;
    }
  }}

  border-radius: 7px;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`;
const Title4 = styled(Typography).attrs({text: 'Body06R'})`
  position: relative;
  left: -3px;
  color: ${props => {
    if (props.isEditItem) {
      return props.theme.colors.grey[5];
    } else {
      return props.theme.colors.grey[2];
    }
  }};
`;
const Warnings = styled(Typography).attrs({text: ' CaptionR'})`
  color: ${props => props.theme.colors.grey[4]};
  margin-bottom: 32px;
`;

const ButtonFinal = styled(Button)`
  position: relative;
  bottom: 20px;
`;
