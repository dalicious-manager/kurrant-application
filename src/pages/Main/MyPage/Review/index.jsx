import React from 'react';
import {FlatList, Text, View} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../../components/Typography';

// import QuestionCircleMonoIcon from '../assets/icons/QuestionCircleMono.svg';
import QuestionCircleMonoIcon from '../../../../assets/icons/QuestionCircleMono.svg';
import Card from './Card';
import NoOrder from './NoOrder';
import {ScrollView} from 'react-native-gesture-handler';
import {orderMealMockData} from '../../../../biz/useOrderMeal/Fetch';
import {pathFind} from '../../../../components/Modal/component';
import Modal from '../../../../components/Modal';

// import Card from './Card';

export const PAGE_NAME = 'S_MAIN__MYPAGE__REVIEW';

const Pages = () => {
  // const ReviewWaitList = orderMealMockData();

  const ReviewWaitList = [
    {
      id: 1,
      orderDate: new Date(Date.now()),
      orderItemDtoList: [
        {
          restaurentName: '세상의 모든 아침',
          menuName: '맛없는 버섯 그라탕',
          diningType: '아침',
          option: '2옵션 꼬치 소스 꼬치 소스꼬치2',
          imageUrl:
            'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
        },
        {
          restaurentName: '세상의 모든 점심',
          menuName: '맛있는 버섯 그라탕',
          diningType: '점심',
          option: '1옵션 꼬치 소스 꼬치 소스꼬치1',
          imageUrl:
            'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
        },
      ],
    },
    {
      id: 2,
      orderDate: new Date(2023, 0, 14),
      orderItemDtoList: [
        {
          restaurentName: '오메 인자오셨소!',
          menuName: '두부',
          diningType: '아침',
          option: '만두 두부무침',
          imageUrl:
            'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
        },
        {
          restaurentName: '여자만 장어타운',
          menuName: '장어구이',
          diningType: '점심',
          option: '1옵션 장어 소스 꼬치 소스꼬치1',
          imageUrl:
            'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
        },
      ],
    },
    {
      id: 3,
      orderDate: new Date(2023, 0, 18),
      orderItemDtoList: [
        {
          restaurentName: '오메 인자오셨소!',
          menuName: '두부',
          diningType: '아침',
          option: '만두 두부무침',
          imageUrl:
            'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
        },
        {
          restaurentName: '여자만 장어타운',
          menuName: '장어구이',
          diningType: '점심',
          option: '1옵션 장어 소스 꼬치 소스꼬치1',
          imageUrl:
            'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
        },
      ],
    },
  ];

  return (
    <Container>
      <View
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {/* 회색박스 포토후기, 텍스트후기  */}
        {!!ReviewWaitList.length && (
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
                    <QuestionCircleMonoIcon />
                  </MiniWrap>
                </PlaneRowView>
              </View>
            </SmallWrap>
          </PlaneGreyBox>
        )}

        {/* 카드를 map한다 */}

        {!!ReviewWaitList.length ? (
          // ReviewWaitList.map((value, index) => {
          //   return (
          //     <View key={index}>
          //       {value.orderItemDtoList.map((value2, index2) => {
          //         return (
          //           <Card
          //             key={index2}
          //             orderDate={value.orderDate}
          //             menuName={value2.menuName}
          //             option={value2.option}
          //             imageUrl={value2.imageUrl}
          //             diningType={value2.diningType}
          //             restaurentName={value2.restaurentName}
          //           />
          //         );
          //       })}
          //     </View>
          //   );
          // })

          <FlatList
            data={ReviewWaitList}
            scrollEnabled={true}
            renderItem={({item}) => {
              console.log(item);
              return (
                <View>
                  {item.orderItemDtoList.map((value2, index2) => {
                    return (
                      <Card
                        key={index2}
                        orderDate={item.orderDate}
                        menuName={value2.menuName}
                        option={value2.option}
                        imageUrl={value2.imageUrl}
                        diningType={value2.diningType}
                        restaurentName={value2.restaurentName}
                      />
                    );
                  })}
                </View>
              );
            }}
          />
        ) : (
          <NoOrder isArrayEmpty={!ReviewWaitList.length} />
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
