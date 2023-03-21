import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../../components/Typography';

// import QuestionCircleMonoIcon from '../assets/icons/QuestionCircleMono.svg';
import QuestionCircleMonoIcon from '../../../../assets/icons/QuestionCircleMono.svg';
import Card from './Card';
import NoOrder from '../NoOrder';

import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Popup from './Popup';
import useReviewWait from '../../../../biz/useReview/useReviewWait';
import {calculateTotalReviewWaitList} from '../../../../biz/useReview/useReviewWait/calculation';
import {totalReviewWaitList} from '../../../../biz/useReview/useReviewWait/store';
import {useAtom} from 'jotai';

export const PAGE_NAME = 'S_MAIN__MYPAGE__REVIEW';

const Pages = () => {
  const {reviewWaitList, reviewWaitCount, getReviewWait} = useReviewWait();

  // const [ReviewWaitList, setReviewWaitList] = useState(undefined);
  const [, setTotalReviewWaitList] = useAtom(totalReviewWaitList);

  useEffect(() => {
    getReviewWait();
  }, []);

  // useEffect(() => {
  //   if (!!ReviewWaitListYo) {
  //     // setTotalReviewWaitList(calculateTotalReviewWaitList(ReviewWaitListYo));
  //     setTotalReviewWaitList(reviewWaitCount);
  //     // setReviewWaitList(ReviewWaitListYo);
  //   }
  // }, [ReviewWaitListYo]);

  useEffect(() => {
    setTotalReviewWaitList(reviewWaitCount);
  }, [reviewWaitCount, setTotalReviewWaitList]);

  const [popupShow, setPopupShow] = useState(false);

  useEffect(() => {
    console.log(reviewWaitList);
  }, [reviewWaitList]);

  return (
    <Container>
      <View
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {/* 회색박스 포토후기, 텍스트후기  */}
        {!!reviewWaitList && (
          <PlaneGreyBox>
            <SmallWrap>
              <PlaneRowView>
                <MiniWrap>
                  <Typography1 variant="h400">포토후기</Typography1>

                  <PointText>100P</PointText>
                </MiniWrap>
                <MiniWrap>
                  <Typography1 variant="h400">텍스트 후기</Typography1>

                  <PointText>50P</PointText>
                </MiniWrap>
              </PlaneRowView>
              <View>
                <PlaneRowView>
                  <MiniWrap>
                    <Typography2 variant="h400">작성안내</Typography2>
                    <Pressable
                      onPress={() => {
                        setPopupShow(!popupShow);
                      }}>
                      <QuestionCircleMonoIcon />
                    </Pressable>
                  </MiniWrap>
                </PlaneRowView>
              </View>
            </SmallWrap>
          </PlaneGreyBox>
        )}

        {/* 카드를 map한다 */}

        {popupShow && <Popup setPopupShow={setPopupShow} />}

        {!!reviewWaitList ? (
          <FlatListWrap>
            <FlatList
              contentContainerStyle={{paddingBottom: 90}}
              data={reviewWaitList}
              scrollEnabled={true}
              renderItem={({item}) => {
                return (
                  <View>
                    {item.items &&
                      item.items.map((value2, index2) => {
                        console.log(value2);

                        return (
                          <Card
                            key={index2}
                            serviceDate={item.serviceDate}
                            foodName={value2.foodName}
                            option={value2.option}
                            imageLocation={value2.imageLocation}
                            diningType={value2.diningType}
                            makersName={value2.makersName}
                            reviewDDay={value2.reviewDDay}
                          />
                        );
                      })}
                  </View>
                );
              }}
            />
          </FlatListWrap>
        ) : (
          <NoOrder
            isArrayEmpty={!reviewWaitList}
            message={`주문 후 리뷰를 작성해 보세요.`}
          />
        )}
      </View>
    </Container>
  );
};

export default Pages;

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 24px 25px;
  background-color: #ffffff;
`;

const PlaneGreyBox = styled.View`
  width: 100%;
  height: 40px;
  border: 1px solid ${({theme}) => theme.colors.grey[8]};
  border-radius: 7px;
  padding: 0 15px;
  display: flex;
  /* align-items: center; */
  justify-content: center;
`;

const FlatListWrap = styled.View``;

const SmallWrap = styled.View`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;
const MiniWrap = styled.View`
  display: flex;
  flex-flow: row;
  align-items: center;
  margin-left: 6px;
`;

const PointText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.blue[500]};
  margin-left: 1px;
`;

const PlaneRowView = styled.View`
  display: flex;
  flex-flow: row;
`;

const Typography1 = styled(Typography).attrs({text: 'CaptionR'})`
  margin-right: 2px;
  color: ${({theme}) => theme.colors.grey[4]};
`;
const Typography2 = styled(Typography).attrs({text: 'CaptionR'})`
  margin-right: 4px;
  color: ${({theme}) => theme.colors.grey[4]};
`;

// 리뷰작성 카드 맵하기
