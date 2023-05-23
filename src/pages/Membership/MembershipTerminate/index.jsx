import {useNavigation, StackActions} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

import {PAGE_NAME as MembershipTerminateComplatePageName} from './MembershipTerminateComplate';
import useMembership from '../../../biz/useMembership';
import useUserInfo from '../../../biz/useUserInfo';
import Button from '../../../components/Button';
import {
  CommentsIcon,
  DeliveryFreeIcon,
  DiscountIcon,
  PointIcon,
  ThumbsUpWithThreeStarsIcon,
} from '../../../components/Icon';
import Typography from '../../../components/Typography';
import Wrapper from '../../../components/Wrapper';
import {formattedSameDate} from '../../../utils/dateFormatter';
import withCommas from '../../../utils/withCommas';
import SubtractBox from '../MembershipJoin/SubtractBox';

export const PAGE_NAME = 'P__MEMBERSHIP__TERMINATE';

const Pages = () => {
  const themeApp = useTheme();
  const navigation = useNavigation();
  const {isUserInfo} = useUserInfo();
  const {
    membershipTerminate,
    readableAtom: {membershipInfo},
  } = useMembership();
  const terminate = async () => {
    await membershipTerminate();
    const reset = StackActions.pop(2);
    navigation.dispatch(reset);
    navigation.navigate(MembershipTerminateComplatePageName);
  };

  return (
    <Wrapper>
      <ScrollView>
        <TitleTextBox>
          <Title text="Title02SB" textColor={themeApp.colors.grey[2]}>
            {isUserInfo.name}님, 잠시만요!{'\n'}멤버십을 해지하면 혜택이
            사라져요!
          </Title>
        </TitleTextBox>
        <SubTitle>멤버십 혜택</SubTitle>
        <SubtractWrapper>
          <SubtractView>
            <SubtractBox text={'정기식사 배송비 무료'}>
              <DeliveryFreeIcon />
            </SubtractBox>
          </SubtractView>
          <SubtractView>
            <SubtractBox text={'정기식사, 마켓 상품 최대 20% 할인'}>
              <DiscountIcon />
            </SubtractBox>
          </SubtractView>
          <SubtractView>
            <SubtractBox
              text={'정기식사, 마켓 상품 리뷰 등록 시\n추가 포인트 적립'}
              disabled={true}>
              <CommentsIcon />
            </SubtractBox>
          </SubtractView>
          <SubtractView>
            <SubtractBox text={'마켓 상품 구매 시 포인트 적립'} disabled={true}>
              <PointIcon />
            </SubtractBox>
          </SubtractView>
          <SubtractView>
            <SubtractBox text={'메뉴 추천 기능 오픈'} disabled={true}>
              <ThumbsUpWithThreeStarsIcon />
            </SubtractBox>
          </SubtractView>
        </SubtractWrapper>
        <SubTextBox>
          <Title text="Title02SB" textColor={themeApp.colors.grey[2]}>
            그래도
            <Typography text="Title02SB" textColor={themeApp.colors.green[500]}>
              {' '}
              해지{' '}
            </Typography>
            하시겠어요?{'\n'}아직 구독 기간이
            <Typography text="Title02SB" textColor={themeApp.colors.green[500]}>
              {' '}
              {formattedSameDate(
                membershipInfo?.nextPayDate,
                new Date(),
              )}일{' '}
            </Typography>
            남았어요.
          </Title>
        </SubTextBox>
        <MembershipDateBox>
          <NotiContainer>
            <NotiBox>
              <Typography text="Body05R" textColor={themeApp.colors.grey[2]}>
                멤버십 종료 예정일
              </Typography>
              <Typography text="Body05SB" textColor={themeApp.colors.grey[2]}>
                {' '}
                {membershipInfo?.nextPayDate}
              </Typography>
            </NotiBox>
            <NotiBox>
              <Typography text="Body05R" textColor={themeApp.colors.grey[2]}>
                예상 환불 금액
              </Typography>
              <Typography text="Body05SB" textColor={themeApp.colors.grey[2]}>
                {' '}
                {withCommas(membershipInfo?.refundablePrice) || 0} 원
              </Typography>
            </NotiBox>
          </NotiContainer>
        </MembershipDateBox>
        <Line />
        <NoticeBox>
          <NoticeTitle text={'Body06SB'} textColor={themeApp.colors.grey[2]}>
            유의사항
          </NoticeTitle>
          <Typography text={'CaptionR'} textColor={themeApp.colors.grey[4]}>
            {membershipInfo?.nextPayDate} 이후 정기결제 청구가 되지 않는 것을
            시작으로 구독 서비스는 자동 종료됩니다.
          </Typography>
        </NoticeBox>
        <ButtonContainer>
          <ButtonBox>
            <Button
              size="half"
              type="grey7"
              label="해지하기"
              onPressEvent={terminate}
            />
          </ButtonBox>
          <ButtonBox>
            <Button
              size="half"
              type="yellow"
              label="유지하기"
              onPressEvent={() => navigation.goBack()}
            />
          </ButtonBox>
        </ButtonContainer>
      </ScrollView>
    </Wrapper>
  );
};
export default Pages;

const SubtractView = styled.View`
  margin-bottom: 15px;
`;
const SubtractWrapper = styled.View`
  margin: 24px;
  margin-bottom: 0px;
  margin-top: 16px;
  padding-bottom: 9px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.grey[8]};
`;
const TitleTextBox = styled.View`
  margin: 40px 34px;
  margin-bottom: 0px;
  padding-bottom: 40px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.grey[8]};
`;
const Title = styled(Typography)`
  text-align: center;
`;
const SubTextBox = styled.View`
  margin: 24px;
  margin-bottom: 16px;
`;
const SubTitle = styled(Typography).attrs({text: 'Title04SB'})`
  margin-top: 24px;
  margin-left: 24px;
  color: ${({theme}) => theme.colors.grey[2]};
`;
const MembershipDateBox = styled.View`
  padding: 37px;
  margin-bottom: 24px;
`;
const Line = styled.View`
  width: 100%;
  height: 6px;
  background-color: ${({theme}) => theme.colors.grey[8]};
`;
const NoticeBox = styled.View`
  margin: 24px;
`;
const NotiBox = styled.View`
  padding: 8px 16px;
  flex-direction: row;
  justify-content: space-between;
`;
const NotiContainer = styled.View`
  padding: 8px;
  background-color: ${({theme}) => theme.colors.grey[8]};
`;
const NoticeTitle = styled(Typography)`
  margin-bottom: 5px;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 36px;
  margin-left: 14px;
  margin-right: 15px;
`;
const ButtonBox = styled.View`
  margin-left: 6px;
  margin-right: 5px;
`;
