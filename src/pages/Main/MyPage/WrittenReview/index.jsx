import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, Text, View} from 'react-native';
import styled from 'styled-components';
import Toast from '~components/Toast';

import Card from './Card';
import {DefaultProfile} from '../../../../assets';
import {calculateTotalWrittenReviewList} from '../../../../biz/useReview/useWrittenReview/calculation';
import useWrittenReview from '../../../../biz/useReview/useWrittenReview/hook';
import {totalWrittenReview} from '../../../../biz/useReview/useWrittenReview/store';
import {
  convertDateFormat1,
  formattedWeekDate,
} from '../../../../utils/dateFormatter';
import NoOrder from '../NoOrder';
import {weekAtom} from '../../../../biz/useBanner/store';
import {useGetUserInfo} from '../../../../hook/useUserInfo';
import useAuth from '../../../../biz/useAuth/hook';
import {useGetDailyfoodList} from '../../../../hook/useDailyfood';

import {getTime} from '../../../../pages/Main/Bnb/BuyMeal/util/time';

export const PAGE_NAME = 'P_MAIN__MYPAGE__WRITTENREVIEW';
const sampleAdminReview = {
  pngLink: DefaultProfile,
  adminName: '일품만찬',
  writtenDate: '2022.02.19 작성',
  message:
    '다음에는 더 맛있는 메뉴를준비해보겠습니다. 이용해주셔서 다시한번 감사드리고 새해에는 더더더더더복 많이 받으세요 사랑합니다.',
};

const Pages = ({route}) => {
  const pointId = route?.params?.id;
  const flatListRef = useRef(null);

  const [idx, setIdx] = useState(-1);
  const {getWrittenReview, reviewList, writtenReviewCount} = useWrittenReview();

  // '클릭시 상품상세페이지로 이동하기' 기능에 필요한 값들 구하기
  // dailyFoodId (확인)
  // time : getTime(isUserInfo, dailyFoodDataList, sliderValue)
  //    isUserInfo (userGetUserInfo(확인)) 체크
  //    dailyFoodDataList
  //        useGetDailyFoodList(spotId, weekly, userRole)
  //            spotId : isUserInfo?.data?.spotId(확인) 체크
  //            weekly : atom에 있음(확인)
  //            userRole : useAuth(확인)
  //    sliderValue : dailyfoodDataList?.data?.diningTypes[0].diningType(확인)

  const [time, setTime] = useState('');

  const {data: isUserInfo} = useGetUserInfo();
  const [weekly] = useAtom(weekAtom);
  const {
    readableAtom: {userRole},
  } = useAuth();

  const spotId = userRole === 'ROLE_GUEST' ? 1 : isUserInfo?.data?.spotId;

  const {data: dailyfoodDataList} = useGetDailyfoodList(
    spotId,
    formattedWeekDate(weekly[0][0]),
    formattedWeekDate(weekly[weekly.length - 1][weekly[0].length - 1]),
    userRole,
  );

  useEffect(async () => {
    // console.log('dailyFoodDataList 확인');
    // console.log(dailyfoodDataList);

    if (!dailyfoodDataList) return;

    const times = await getTime(
      isUserInfo?.data,
      dailyfoodDataList?.data?.diningTypes,
      sliderValue,
    );

    setTime(times);
  }, [dailyfoodDataList]);

  useEffect(() => {
    console.log('time 확인');
    console.log(time);
  }, [time]);

  // 포인트 연결 리뷰 id & 리뷰 id 일치하는 index 찾기
  const toast = Toast();

  useEffect(() => {
    getWrittenReview();
  }, []);

  useEffect(() => {
    if (reviewList) {
      const data = reviewList?.findIndex(el => el.reviewId === pointId);
      setIdx(data);
    }
  }, [reviewList]);

  useEffect(() => {
    if (flatListRef.current && idx !== -1) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: idx,
        viewPosition: 0,
      });
    }
  }, [flatListRef, idx, pointId]);

  return (
    <Container>
      {!!reviewList && reviewList.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              if (flatListRef?.current)
                flatListRef?.current?.scrollToIndex({
                  index: info.index,
                  animated: true,
                  viewPosition: 0,
                });
            });
          }}
          data={[...reviewList, {id: 'filler'}]}
          scrollEnabled={true}
          renderItem={({item, index}) => {
            // 서버 -> 프론트 객체 프로퍼티 이름 치환하기

            if (item.id === 'filler') {
              return <Filler />;
            }

            const item2 = {
              id: item.reviewId,
              createDate: item.createDate,
              updateDate: item.updateDate,
              image: item.imageLocation,
              reviewText: item.content,
              rating: item.satisfaction,
              writtenDate: convertDateFormat1(item.createDate),
              imageLocation: item.imageLocation,
              makersName: item.makersName,
              foodName: item.itemName,
              option: item.option,
              forMakers: item.forMakers,
              commentList: item.commentList,
              dailyFoodId: item.dailyFoodId,
            };

            return (
              <View>
                <Card
                  id={item2.id}
                  focusId={pointId}
                  editItem={item2}
                  createDate={item2.createDate}
                  updateDate={item2.updateDate}
                  makersName={item2.makersName}
                  foodName={item2.foodName}
                  writtenDate={item2.writtenDate}
                  option={item2.option}
                  rating={item2.rating}
                  reviewText={item2.reviewText}
                  imageLocation={item2.imageLocation}
                  forMakers={item2.forMakers}
                  commentList={item2.commentList}
                  toast={toast}
                  dailyFoodId={item2.dailyFoodId}
                />
              </View>
            );
          }}
        />
      ) : (
        <NoOrder isArrayEmpty={true} message={`아직 작성한 리뷰가 없어요.`} />
      )}
      <toast.ToastWrap message={'리뷰가 삭제되었습니다.'} icon={'checked'} />
    </Container>
  );
};

export default Pages;

const Container = styled.View`
  width: 100%;
  height: 100%;
  // padding: 24px 25px;
  padding-top: 0px;
  background-color: #ffffff;
`;

const Filler = styled.View`
  width: 100%;
  height: 40px;
`;
