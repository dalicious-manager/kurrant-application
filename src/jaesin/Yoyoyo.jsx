import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import AlamRow from '~components/AlamRow';
// import Accordian from '../components/Accordion/component';
import Typography from '../components/Typography';
import QuestionCircleMonoIcon from '../assets/icons/QuestionCircleMono.svg';

export const hi1 = 'S_MAIN_YOYO1';
export const hi2 = 'S_MAIN_YOYO2';
const Yoyoyo = () => {
  const ReviewWaitList = [
    {
      orderDate: Date.now(),
      restarentName: '세상의 모든 아침',
      menuName: '맛있는 버섯 그라탕',
      option: '',
      image: '',
    },
    {
      orderDate: Date.now(),
      restarentName: '세상의 모든 아침',
      menuName: '맛있는 버섯 그라탕',
      option: '',
      image: '',
    },
  ];

  return (
    <Container>
      <Yoyo>
        {/* <SmallWrap>
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
        </SmallWrap> */}
      </Yoyo>
      <View>
        {/* thin text box */}
        {/* 카드를 map한다 */}
      </View>
    </Container>
  );
};

export default Yoyoyo;

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 24px 25px;
  background-color: #ffffff;
`;

const Yoyo = styled.View`
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
