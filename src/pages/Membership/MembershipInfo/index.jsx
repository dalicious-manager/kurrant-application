import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled, {useTheme} from 'styled-components/native';
import {formattedSameDate} from '../../../utils/dateFormatter';
import Button from '../../../components/Button';
import Label from '../../../components/Label';
import Typography from '../../../components/Typography';
import {PAGE_NAME as MembershipJoinPageName} from '../MembershipJoin';
import {PAGE_NAME as MembershipTerminatePageName} from '../MembershipTerminate';
import {PAGE_NAME as MembershipUsagedetailsPageName} from './MembershipUsageDetails';
import {PAGE_NAME as MemebershipPaymentManagePageName} from '../MembershipJoin/MemebershipPaymentManage';
import useMembership from '../../../biz/useMembership';
import withCommas from '../../../utils/withCommas';
import useUserInfo from '../../../biz/useUserInfo';
import useUserMe from '../../../biz/useUserMe';
export const PAGE_NAME = 'P__MEMBERSHIP__INFO';
const Pages = () => {
  const themeApp = useTheme();
  const navigation = useNavigation();
  const {
    getMembershipInfo,
    readableAtom: {membershipInfo, isMembershipInfoLoading},
  } = useMembership();
  const {isUserInfo} = useUserInfo();
  const {getCardList} = useUserMe();
  useEffect(() => {
    const getMembershipBenefit = async () => {
      await getMembershipInfo();
    };
    getMembershipBenefit();
    getCardList();
  }, []);
  return (
    <BackGround
      colors={[
        'rgba(39, 5, 201, 0)',
        'rgba(39, 5, 201, 0.55)',
        'rgba(39, 5, 201, 0.75)',
        'rgba(39, 5, 201, 0.85)',
      ]}
      useAngle={true}
      angle={270}>
      <ScrollView>
        <TitleBox>
          <TextCenterField
            text={'LargeTitle'}
            textColor={themeApp.colors.neutral[0]}>

            {isUserInfo?.name}님은{'\n'}멤버십 이용중

          </TextCenterField>
          <MembershipLabelBox>
            <LabelBox>
              <Label
                type={
                  membershipInfo?.membershipSubscriptionType === 'YEAR'
                    ? 'green'
                    : 'blue'
                }
                label={
                  membershipInfo?.membershipSubscriptionType === 'YEAR'
                    ? '연간구독'
                    : '월간구독'
                }
              />
            </LabelBox>
            {isUserInfo?.foundersNumber <= 5000 && (
              <LabelBox>
                <Label
                  type={'purple'}
                  label={`${isUserInfo?.foundersNumber}번째 커런트 파운더스`}
                />
              </LabelBox>
            )}
          </MembershipLabelBox>
          <NoticeBox>
            <TextCenterField
              text={'Body05SB'}
              textColor={themeApp.colors.neutral[0]}>
              다음 결제 예정일은 {membershipInfo?.nextPayDate}입니다.
            </TextCenterField>
          </NoticeBox>
        </TitleBox>
        <Container>
          <InfoTextBox>
            <Typography text={'Title03SB'} textColor={themeApp.colors.grey[2]}>
              커런트 멤버십으로 받은 혜택
            </Typography>
            <Typography text={'CaptionR'} textColor={themeApp.colors.grey[4]}>
              (최근 3개월 누적 금액)
            </Typography>
          </InfoTextBox>
          <InfoContainer>
            <SaleTextBox>
              <Typography
                text={'Title04SB'}
                textColor={themeApp.colors.grey[2]}>
                할인 혜택
              </Typography>
              <Typography
                text={'Title04SB'}
                textColor={themeApp.colors.green[500]}>
                총 {withCommas(membershipInfo?.totalDiscountBenefitPrice || 0)}{' '}
                원
              </Typography>
            </SaleTextBox>
            <SaleTextBox>
              <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>
                정기식사 무료배송
              </Typography>
              <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>
                {withCommas(membershipInfo?.deliveryFee)} 원
              </Typography>
            </SaleTextBox>
            <SaleTextBox>
              <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>
                정기식사 할인
              </Typography>
              <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>
                {withCommas(membershipInfo?.dailyFoodDiscountPrice)} 원
              </Typography>
            </SaleTextBox>
            <SaleTextBox>
              <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>
                마켓 상품 할인
              </Typography>
              <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>
                {withCommas(membershipInfo?.productDiscountPrice)} 원
              </Typography>
            </SaleTextBox>
          </InfoContainer>
          {/* 포인트 할인혜택 */}
          <InfoContainer>
            <SaleTextBox>
              <Typography
                text={'Title04SB'}
                textColor={themeApp.colors.grey[2]}>
                포인트 혜택
              </Typography>
              <Typography
                text={'Title04SB'}
                textColor={themeApp.colors.green[500]}>
                총 {withCommas(membershipInfo?.totalPointBenefitPrice || 0)} 점
              </Typography>
            </SaleTextBox>
            <SaleTextBox>
              <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>
                정기식사 리뷰작성
              </Typography>
              <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>
                {withCommas(membershipInfo?.dailyFoodReviewPoint)} 점
              </Typography>
            </SaleTextBox>
            <SaleTextBox>
              <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>
                마켓 상품 리뷰작성
              </Typography>
              <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>
                {withCommas(membershipInfo?.productReviewPoint)} 점
              </Typography>
            </SaleTextBox>
            <SaleTextBox>
              <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>
                마켓 상품 구매
              </Typography>
              <Typography text={'Body06R'} textColor={themeApp.colors.grey[2]}>
                {withCommas(membershipInfo?.productBuyPoint)} 점
              </Typography>
            </SaleTextBox>
          </InfoContainer>

        </Container>
        <ButtonContainer>
          <ButtonBox>
            <Button
              type="yellow"
              label="멤버십 이용내역"
              onPressEvent={() => {
                navigation.navigate(MembershipUsagedetailsPageName);
              }}
            />
          </ButtonBox>
          <ButtonBox>
            <Button
              type="yellow"
              label="멤버십 결제수단"
              onPressEvent={() => {
                navigation.navigate(MemebershipPaymentManagePageName);
              }}
            />
          </ButtonBox>
          <Terminate
            onPress={() => {
              navigation.navigate(MembershipTerminatePageName);
            }}>
            <TextCenterField
              text={'Body06R'}
              textColor={themeApp.colors.grey[3]}>
              멤버십 해지하기
            </TextCenterField>
          </Terminate>
        </ButtonContainer>
      </ScrollView>
    </BackGround>
  );
};

export default Pages;

const BackGround = styled(LinearGradient)`
  background-color: #000046;
  flex: 1;
`;

const Container = styled.View`
  background-color: white;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  flex: 1;
`;
const TitleBox = styled.View`
  margin-top: 40px;
  width: 100%;
  align-items: center;
`;
const TextCenterField = styled(Typography)`
  text-align: center;
`;
const LabelBox = styled.View`
  margin-top: 6px;
  padding: 2.5px;
`;
const MembershipLabelBox = styled.View`
  flex-direction: row;
`;
const NoticeBox = styled.View`
  margin-top: 20px;
  margin-bottom: 24px;
`;
const InfoTextBox = styled.View`
  margin-top: 30px;
  margin-left: 24px;
`;

const InfoContainer = styled.View`
  margin: 24px;
  margin-top: 20px;
  margin-bottom: 4px;
  padding: 16px 22px;
  border-color: ${({theme}) => theme.colors.grey[7]};
  border-width: 1px;
  border-radius: 14px;
`;
const SaleTextBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0px;
`;
const ButtonContainer = styled.View`
  background-color: white;
  padding-top: 12px;
  padding-bottom: 35px;
  padding-left: 20px;
  padding-right: 20px;
`;
const ButtonBox = styled.View`
  margin: 8px 0px;
`;
const Terminate = styled.Pressable`
  border-color: ${({theme}) => theme.colors.grey[6]};
  border-width: 1px;
  border-radius: 4px;
  align-self: flex-end;
  margin-top: 8px;
  padding: 3px 8px;
`;
