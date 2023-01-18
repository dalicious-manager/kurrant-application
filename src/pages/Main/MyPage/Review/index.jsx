import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../../components/Typography';

// import QuestionCircleMonoIcon from '../assets/icons/QuestionCircleMono.svg';
import QuestionCircleMonoIcon from '../../../../assets/icons/QuestionCircleMono.svg';
import Card from './Card';
import NoOrder from './NoOrder';

// import Card from './Card';

export const PAGE_NAME = 'S_MAIN__MYPAGE__REVIEW';

const Pages = () => {
  const ReviewWaitList = [
    // {
    //   orderDate: new Date(Date.now()),
    //   restaurentName: '세상의 모든 아침',
    //   menuName: '맛있는 버섯 그라탕',
    //   option: '1옵션 꼬치 소스 꼬치 소스꼬치1',
    //   imageUrl: 'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
    // },
    // {
    //   orderDate: new Date(Date.now()),
    //   restaurentName: '세상의 모든 저녁',
    //   menuName: '맛없는 버섯 그라탕',
    //   option: '2옵션 꼬치 소스 꼬치 소스꼬치2',
    //   imageUrl: 'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
    // },
  ];

  return (
    <Container>
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
        ReviewWaitList.map((value, index) => {
          return (
            <Card
              key={index}
              orderDate={value.orderDate}
              menuName={value.menuName}
              option={value.option}
              imageUrl={value.imageUrl}
              restaurentName={value.restaurentName}
            />
          );
        })
      ) : (
        <NoOrder isArrayEmpty={!ReviewWaitList.length} />
      )}
    </Container>
  );
};

export default Pages;

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 24px 25px;
  background-color: #ffffff;

  /* ${props => {
    if (props.toggleValue) {
      return `color: ${props.theme.Black};`;
    } else {
      return `color: ${props.theme.Gray};`;
    }
  }} */

  /* ${({isArrayLength}) => {
    if (isArrayLength) {
      return `display: flex; justify-content: center; align-items:center;`;
    }
  }} */
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
