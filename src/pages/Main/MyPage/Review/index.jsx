import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import styled from 'styled-components/native';
import Typography from '../../../../components/Typography';

// import QuestionCircleMonoIcon from '../assets/icons/QuestionCircleMono.svg';
import QuestionCircleMonoIcon from '../../../../assets/icons/QuestionCircleMono.svg';
import Card from './Card';
import NoOrder from '../NoOrder';

import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import useReviewWait from '../../../../biz/useReview/useReviewWait';

import Banner from './Banner';
import { useAtom } from 'jotai';
import { modalStatusAtom } from '../../../../biz/useReview/useReviewWait/store';

export const PAGE_NAME = 'S_MAIN__MYPAGE__REVIEW';

const Pages = () => {
  const {reviewWaitList, reviewWaitCount, getReviewWait, redeemablePoints} =
    useReviewWait();

  useEffect(() => {
    getReviewWait();
  }, []);

  const [popupShow, setPopupShow] = useAtom(modalStatusAtom);

  return (
    <Container>
      

      <View
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
         

        {!!reviewWaitList && reviewWaitList.length > 0 ? (
          <FlatListWrap>
            <FlatList
              ListHeaderComponent={ <View>
                {!!reviewWaitList && reviewWaitList.length > 0 && (
              <Banner redeemablePoints={redeemablePoints} />
            )}
              {!!reviewWaitList && reviewWaitList.length > 0 && (
                <View style={{paddingLeft:24,paddingRight:24}}>
                <PlaneGreyBox>
                  <SmallWrap>
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
                    <PlaneRowView>
                      <MiniWrap>
                        <Typography1 variant="h400">포토후기</Typography1>
      
                        <PointText>70P</PointText>
                      </MiniWrap>
                      <MiniWrap lmargin={6}>
                        <Typography1 variant="h400">텍스트 후기</Typography1>
      
                        <PointText>50P</PointText>
                      </MiniWrap>
                    </PlaneRowView>
                  </SmallWrap>
                </PlaneGreyBox>
                </View>
              )}
      </View>}
              contentContainerStyle={{paddingBottom: 190}}
              data={reviewWaitList}
              scrollEnabled={true}
              renderItem={({item}) => {
                return (
                  <View style={{paddingLeft:24,paddingRight:24}}>
                     
                    {item.items &&
                      item.items.map((value2, index2) => {
                        console.log(value2);
                        return (
                          <Card
                            key={index2}
                            wholeItem={value2}
                            orderItemId={value2.orderItemId}
                            serviceDate={item.serviceDate}
                            foodName={value2.foodName}
                            foodDescription={value2.foodDescription}
                            foodCount={value2.foodCount}
                            option={value2.option}
                            imageLocation={value2.imageLocation}
                            diningType={value2.diningType}
                            makersName={value2.makersName}
                            reviewDDay={value2.reviewDDay}
                            dailyFoodId={value2.dailyFoodId}
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
            isArrayEmpty={true}
            message={`아직 작성한 리뷰가 없어요.`}
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
  padding-top: 0px;
  background-color: #ffffff;
`;

const PlaneGreyBox = styled.View`
  width: 100%;
  border: 1px solid ${({theme}) => theme.colors.grey[8]};
  border-radius: 7px;
  padding: 10px 16px;
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
  background-color: gold;
  margin-left: ${({lmargin})=> lmargin ? `${lmargin}px` : 0};
`;

const PointText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.blue[500]};
  margin-left: 1px;
`;

const PlaneRowView = styled.View`
  display: flex;
  background-color: red;
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
