import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {ActivityIndicator, Alert, Text, View} from 'react-native';
import Config from 'react-native-config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useQueryClient} from 'react-query';
import RNFetchBlob from 'rn-fetch-blob';
import styled, {useTheme} from 'styled-components/native';
// import {starRatingAtom} from './store';
import {starRatingAtom} from '~biz/useReview/useCreateAndEditReview/store';
import useReviewWait from '~biz/useReview/useReviewWait/hook';
import useWrittenReview from '~biz/useReview/useWrittenReview/hook';
import Button from '~components/Button';
import {CheckIcon, EnabledPoint, XCircleIcon} from '~components/Icon';
import RateStars from '~components/RateStars';
import Typography from '~components/Typography';
import UploadPhoto from '~components/UploadPhoto';
import useKeyboardEvent from '~hook/useKeyboardEvent';
import {PAGE_NAME as WrittenReviewPageName} from '~pages/Main/MyPage/WrittenReview';
import {getStorage} from '~utils/asyncStorage';

import ReviewInput from './ReviewInput';
// import {SCREEN_NAME as MainScreenName} from '../../../Bnb';
import {SCREEN_NAME as MainScreenName} from '../../../../../../screens/Main/Bnb';
// import {SCREEN_NAME as ReviewScreenName} from '../../../../Review';
import {SCREEN_NAME as ReviewScreenName} from '~screens/Main/Review';
import {checkSseType3Atom} from '../../../../../../utils/sse/sseLogics/store';

// 수정후 여기로 오게 하기
// import {PAGE_NAME as WrittenReviewPageName} from '../../../../../pages/Main/MyPage/WrittenReview';
// } from '../../../pages/Main/MyPage/WrittenReview';

// import MoreMainPage, {
//   PAGE_NAME as MoreMainPageName,
// } from '../../../pages/Main/Bnb/More/Main';

export const PAGE_NAME = 'S_MAIN__CREATE_REVIEW_PAGE_2';
export const PAGE_NAME2 = 'S_MAIN__EDIT_REVIEW_PAGE_2';

const apiHostUrl =
  Config.NODE_ENV === 'dev'
    ? Config.API_DEVELOP_URL + '/' + Config.API_VERSION
    : Config.NODE_ENV === 'rel'
    ? Config.API_RELEASE_URL + '/' + Config.API_VERSION
    : Config.API_HOST_URL + '/' + Config.API_VERSION;

const Screen = ({route}) => {
  const [starRating, setStarRating] = useAtom(starRatingAtom);
  const [clickDisable, setClickDisable] = useState(false);
  const [isPhoto, setIsPhoto] = useState(true);
  const [isText, setIsText] = useState(true);
  const queryClient = useQueryClient();

  const [photosArray, setPhotosArray] = useState([]);

  const themeApp = useTheme();
  const [photosArrayForFlatList, setPhotosArrayForFlatList] = useState([]);
  const [charLength, setCharLength] = useState(0);

  // sseType3
  const [, setCheckSseType3] = useAtom(checkSseType3Atom);

  useEffect(() => {
    setPhotosArrayForFlatList(['addPic', ...photosArray]);
    if (photosArray) {
      setIsPhoto(photosArray.length > 0);
    }
  }, [photosArray]);

  const {getWrittenReview} = useWrittenReview();

  const {getReviewWait} = useReviewWait();

  const id = route?.params?.id;
  const status = route?.params?.status;
  const resetNavigate = route?.params?.resetNavigate;
  const editItem = route?.params?.editItem;

  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);

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
      setStarRating(editItem.rating);
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
  useEffect(() => {
    setIsText(form.formState.errors?.review ? false : true);
  }, [form.formState.errors?.review]);

  // 데이터 있으면 input에 바로등록하기
  useEffect(() => {
    if (editItem && editItem.reviewText) {
      setInput({...input, review: editItem.reviewText});
    }
  }, [editItem]);

  useEffect(() => {
    if (input?.review) {
      setCharLength(input?.review?.length);
    } else {
      setCharLength(0);
    }
  }, [input, setCharLength]);

  const handlePhotoRemove = photoId => {
    const thisPhotoArray = [...photosArray];
    const returnArray = thisPhotoArray.filter(value => value.id !== photoId);
    setPhotosArray(returnArray);
  };
  const keyboardStatus = useKeyboardEvent();
  useEffect(() => {
    if (input?.review?.length >= 10 && input?.review?.length <= 500) {
      setClickDisable(false);
      return;
    } else {
      setClickDisable(true);
    }
  }, [input]);

  const onSignInPressed = data => {
    const sendCreateData = {
      orderItemId: id,
      satisfaction: starRating,
      content: data.review,
      forMakers: input.isExclusive,
    };

    const createReview = async (photosArray = []) => {
      setIsLoading(true);

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
      setIsLoading(true);

      const url = `${apiHostUrl}/users/me/reviews/update?id=${editId}`;

      const token = await getToken();

      // photosArray에서 웹에있는 데이터, 로컬인 데이터 배열 둘로 나눠야됨

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
        content: input?.review,
        images: webArray,
        // 무조건
        forMakers: editItem.forMakers ? true : input.isExclusive,
      };

      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      };

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
          setIsLoading(true);
          if (data.statusCode === 200) {
            queryClient.invalidateQueries('userInfo');
            Alert.alert('작성 완료', '리뷰가 작성되었습니다 ', [
              {
                text: '확인',
                onPress: async () => {
                  await getWrittenReview();
                  await getReviewWait();
                  // navigation.navigate(ReviewScreenName, {
                  //   from: 'home',
                  // });
                  setCheckSseType3(true);

                  if (resetNavigate) {
                    // navigation.navigate(WrittenReviewPageName);
                    navigation.reset({
                      index: 1,
                      routes: [
                        {
                          name: MainScreenName,
                        },
                        {
                          name: ReviewScreenName,
                          params: {
                            from: 'point',
                          },
                        },
                      ],
                    });
                    // navigation.navigate(WrittenReviewPageName, {
                    //   screen: ReviewScreenName,
                    //   params: {
                    //     tabIndex: 1,

                    //   },
                    // });
                  } else {
                    navigation.navigate(ReviewScreenName, {
                      screen: WrittenReviewPageName,
                    });
                  }
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
          queryClient.invalidateQueries('orderMeal');
        })
        .catch(error => {
          console.error('Error:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (status === 'edit') {
      editReview(id, photosArray)
        .then(response => response.json())
        .then(data => {
          if (data.statusCode === 200) {
            Alert.alert('수정 완료', '리뷰가 수정되었습니다 ', [
              {
                text: '확인',
                onPress: async () => {
                  getWrittenReview();
                  getReviewWait();
                  // navigation.navigate(WrittenReviewPageName, {
                  //   screen: ReviewScreenName,
                  //   params: {
                  //     tabIndex: 1,
                  //   },
                  // });
                  navigation.navigate(ReviewScreenName, {
                    screen: WrittenReviewPageName,
                  });
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
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // isLoading중이면 다시 클릭했을때 alert 뜨게 하기

  return (
    <Container2>
      {isLoading && (
        <LoadingPage>
          <ActivityIndicator size={'large'} />
        </LoadingPage>
      )}

      <FormProvider {...form}>
        <>
          <ReviewPointInfoContainer>
            <ReviewPointInfo>
              <ReviewPointInfoTop>
                <Typography
                  textColor={themeApp.colors.blue[500]}
                  text="Button10R">
                  텍스트 리뷰
                </Typography>
                {input?.review?.length > 0 && isText && (
                  <View>
                    <PointText
                      text="SmallLabel"
                      textColor={
                        input?.review?.length > 0 && isText
                          ? themeApp.colors.grey[0]
                          : themeApp.colors.blue[500]
                      }>
                      50P 적립
                    </PointText>
                    {input?.review?.length > 0 && isText && <EnabledPoint />}
                  </View>
                )}
              </ReviewPointInfoTop>
              <ReviewPointInfoBottom
                active={input?.review?.length > 0 && isText}
              />
            </ReviewPointInfo>
            <ReviewPointInfo>
              <ReviewPointInfoTop>
                <Typography
                  textColor={themeApp.colors.blue[500]}
                  text="Button10R">
                  포토 리뷰
                </Typography>
                {isPhoto && (
                  <View>
                    <PointText
                      text="SmallLabel"
                      textColor={
                        isPhoto
                          ? themeApp.colors.grey[0]
                          : themeApp.colors.blue[500]
                      }>
                      70P 적립
                    </PointText>
                    {isPhoto && <EnabledPoint />}
                  </View>
                )}
              </ReviewPointInfoTop>
              <ReviewPointInfoBottom active={isPhoto} />
            </ReviewPointInfo>
          </ReviewPointInfoContainer>
          <KeyboardViewContainer extraHeight={120}>
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
                // onFocus={() => {
                //   setInputFocus(true);
                // }}
                // onBlur={() => {
                //   setInputFocus(false);
                // }}
                charLength={charLength}
                editContentInput={
                  editItem && editItem.reviewText
                    ? editItem.reviewText
                    : undefined
                }
              />
              <TextBoxBottom>
                <ShowOnlyToOwnerWrap>
                  {!editItem && (
                    <>
                      <CheckBox
                        checked={input.isExclusive}
                        onPress={() => {
                          setInput({
                            ...input,
                            isExclusive: !input.isExclusive,
                          });
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
                    <Title4 isEditItem={!!editItem}>사장님에게만 보이기</Title4>
                  )}
                </ShowOnlyToOwnerWrap>
                <ShowCurrentLettersLengthWrap>
                  <LengthText
                    colorError={form.formState.errors.review ? true : false}>
                    <LengthTextNum
                      charLength={charLength > 500 || charLength < 10}>
                      {charLength}
                    </LengthTextNum>
                    /500
                  </LengthText>
                </ShowCurrentLettersLengthWrap>
              </TextBoxBottom>
              <Warnings textColor={themeApp.colors.grey[4]}>
                작성된 리뷰는 다른 고객분들께 큰 도움이 됩니다. 하지만 상품 및
                서비스와 무관한 리뷰와 사진이 포함되거나 허위 리뷰, 욕설,
                비방글은 제3자의 권리를 침해하는 게시물은 통보없이 삭제될 수
                있습니다.
              </Warnings>
              {/* '최대 몇자인가' 보여주기 */}
            </ReviewWrap>

            {!keyboardStatus.isKeyboardActivate && <Filler />}
          </KeyboardViewContainer>

          {!keyboardStatus.isKeyboardActivate && (
            <ButtonContainer>
              <ButtonFinal
                size="full"
                label="완료"
                text={'Button09SB'}
                disabled={clickDisable}
                onPressEvent={form.handleSubmit(onSignInPressed)}
              />
            </ButtonContainer>
          )}
        </>
      </FormProvider>
    </Container2>
  );
};

export default Screen;

const Container2 = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const KeyboardViewContainer = styled(KeyboardAwareScrollView)`
  padding: 0 24px;
  padding-top: 24px;

  flex: 1;
  background-color: #ffffff;
  position: relative;
`;

const Filler = styled.View`
  width: 100%;
  height: 110px;
`;
const Filler2 = styled.View`
  width: 100%;
  height: 35px;
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
const TextBoxBottom = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const PhotoImageWrap = styled.View`
  /* position: relative; */
  /* overflow: hidden; */
`;
const PointText = styled(Typography)`
  position: absolute;
  top: 2px;
  right: 4px;
  z-index: 1;
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
const Warnings = styled(Typography).attrs({text: 'CaptionR'})`
  margin-bottom: 32px;
`;

const ButtonFinal = styled(Button)`
  width: 100%;
  margin-bottom: 20px;
  /* position: absolute;
  bottom: 20px; */
`;
const ButtonContainer = styled.View`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  background-color: white;
  position: absolute;
  bottom: 0px;
`;
const ReviewPointInfo = styled.View`
  flex: 1;
  margin-left: 5px;
  margin-right: 5px;
  padding-top: 16px;
  padding-bottom: 16px;
`;
const ReviewPointInfoTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 24px;
  align-items: center;
`;
const ReviewPointInfoBottom = styled.View`
  width: 100%;
  background-color: ${({active}) => (active ? '#3478F6' : '#EFF2FE')};
  height: 8px;
  border-radius: 4px;
  margin-top: 2px;
`;
const ReviewPointInfoContainer = styled.View`
  width: 100%;
  height: 66px;
  padding-left: 19px;
  justify-content: space-between;
  padding-right: 19px;
  flex-direction: row;
`;

const ShowCurrentLettersLengthWrap = styled.View`
  flex-direction: row-reverse;
  margin-bottom: 10px;
`;
const LengthText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props =>
    props.colorError
      ? props.theme.colors.red[500]
      : props.theme.colors.grey[4]};
  /* margin-bottom: 32px; */
`;

const LengthTextNum = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => {
    if (props.charLength) {
      return props.theme.colors.red[500];
    } else {
      return props.theme.colors.grey[4];
    }
  }};
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
  position: absolute;
  top: 0px;
  bottom: 0px;
`;
