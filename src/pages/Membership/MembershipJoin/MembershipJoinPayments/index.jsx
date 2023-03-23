import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Animated, ScrollView, Alert} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

import ArrowRightIcon from '~assets/icons/Arrow/arrowRight.svg';
import Arrow from '~assets/icons/Arrow/arrowTop.svg';
import PayError from '~assets/icons/Payment/payError.svg';
import Button from '~components/Button';
import Typography from '~components/Typography';

import {MembershipIconImage} from '../../../../assets';
import useMembership from '../../../../biz/useMembership';
import useUserMe from '../../../../biz/useUserMe';
import BottomModal from '../../../../components/BottomModal';
import Check from '../../../../components/Check';
import Form from '../../../../components/Form';
import Image from '../../../../components/Image';
import withCommas from '../../../../utils/withCommas';
import {PAGE_NAME as MembershipJoinComplatePageName} from '../MembershipJoinComplate';
import {PAGE_NAME as MemebershipPaymentManagePageName} from '../MemebershipPaymentManage';
import {SCREEN_NAME as RegisterCardScreenName} from '~screens/Main/RegisterCard';
export const PAGE_NAME = 'P__MEMBERSHIP__JOIN_PAYMENTS';
const Pages = ({route}) => {
  const {period, membershipData} = route.params;
  const navigation = useNavigation();
  const agreeCheck = useForm();
  const [fadeIn, setFadeIn] = useState(false);
  const [rotate, setRotate] = useState('0deg');
  const [modalVisible, setModalVisible] = useState(false);
  const [membershipTypeData, setMembershipTypeData] = useState();
  const fadeAnim = useRef(
    new Animated.Value(period === 'month' ? 86 : 108),
  ).current;
  const rotateAnim = useRef(new Animated.Value(1)).current;
  const themeApp = useTheme();
  const {getMembershipType, membershipJoin} = useMembership();
  const {
    getCardList,
    readableAtom: {cardList, selectMembershipCard},
  } = useUserMe();

  const getMembershipInfo = async () => {
    const membership = period === 'month' ? 1 : 2;
    const {data} = await getMembershipType(membership);
    console.log(data);
    setMembershipTypeData(data);
  };
  const handlePress = () => {
    Animated.timing(fadeAnim, {
      toValue: fadeIn
        ? membershipTypeData?.subscriptionType === 1
          ? 86
          : 108
        : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setFadeIn(prev => !prev);
    Animated.timing(rotateAnim, {
      toValue: fadeIn ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleEventPayments = async () => {
    console.log(agreeCheck.watch(agreeCheck).agreeCheck);
    // navigation.navigate(MembershipJoinComplatePageName);
    console.log(selectMembershipCard);
    if (agreeCheck.watch(agreeCheck).agreeCheck) {
      if (
        !cardList.find(card => card.defaultType === 2 || card.defaultType === 3)
      ) {
        setModalVisible(true);
        return;
      }
      const req = {
        paymentType: 1,
        subscriptionType: membershipTypeData?.subscriptionType,
        defaultPrice: membershipTypeData?.defaultPrice,
        yearDescriptionDiscountPrice:
          membershipTypeData?.yearDescriptionDiscountPrice,
        periodDiscountPrice: membershipTypeData?.periodDiscountPrice,
        totalPrice: membershipTypeData.totalPrice,
        cardId: selectMembershipCard[0]?.id || -1,
      };
      console.log(req);
      const result = await membershipJoin(req);
      console.log(result);
      if (result.statusCode === 200) {
        const resetAction = StackActions.pop(3);
        navigation.dispatch(resetAction);
        navigation.navigate(MembershipJoinComplatePageName);
      }
    } else {
      Alert.alert('결제 진행 을 동의해주세요');
    }
  };
  useEffect(() => {
    const getData = async () => {
      await getMembershipInfo();
      await getCardList();
    };
    getData();
  }, []);
  const ProductInfoBlock = () => {
    if (membershipTypeData?.subscriptionType === 1) {
      return (
        <Inner>
          <ImageWrap>
            <Image imagePath={MembershipIconImage} width={45} height={45} />
          </ImageWrap>

          <InnerTextView>
            <MembershipText textColor={themeApp.colors.grey[2]}>
              커런트 월간 멤버십 정기결제
            </MembershipText>
            <PriceText textColor={themeApp.colors.grey[4]}>
              {withCommas(membershipTypeData?.totalPrice)}원
            </PriceText>
          </InnerTextView>
        </Inner>
      );
    }
    return (
      <Inner>
        <ImageWrap>
          <Image imagePath={MembershipIconImage} width={45} height={45} />
        </ImageWrap>
        <InnerTextView>
          <MembershipText textColor={themeApp.colors.grey[2]}>
            커런트 연간 멤버십 정기결제
          </MembershipText>
          <PriceSaleBox>
            <PriceTextSale textColor={themeApp.colors.green[500]}>
              20%
            </PriceTextSale>
            <PriceText textColor={themeApp.colors.grey[4]}>
              {withCommas(membershipTypeData?.totalPrice)}
            </PriceText>
          </PriceSaleBox>
          <PriceTextMid textColor={themeApp.colors.grey[5]}>
            {withCommas(membershipTypeData?.defaultPrice)}
          </PriceTextMid>
        </InnerTextView>
      </Inner>
    );
  };
  useEffect(() => {
    setRotate(
      rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '0deg'],
      }),
    );
  }, [rotateAnim]);
  return (
    <>
      <ScrollView>
        <Container>
          {/** 타이틀 영역 */}
          <MembershipTitleBox>
            <MembershipTitle
              text={'Title03SB'}
              textColor={themeApp.colors.grey[2]}>
              멤버십 정기결제
            </MembershipTitle>
            <MembershipDescription
              text={'Body06R'}
              textColor={themeApp.colors.grey[4]}>
              {period === 'month'
                ? '멤버십은 처음 한번만 등록하면 매월 자동 결제됩니다.'
                : '멤버십은 처음 한번만 등록하면 매년 자동 결제됩니다.'}
            </MembershipDescription>
          </MembershipTitleBox>

          <Line />
          {/** 주문 상품 정보 */}
          <ProductInfoContainer>
            <ProductInfoExtend onPress={handlePress}>
              <ExtendText text={'Body05SB'} textColor={themeApp.colors.grey[2]}>
                주문 상품 정보
              </ExtendText>
              <Animated.View
                style={{
                  transform: [{rotate: rotate}],
                }}>
                <Arrow />
              </Animated.View>
            </ProductInfoExtend>
            <InnerContainer>
              <Animated.View style={{height: fadeAnim}}>
                {ProductInfoBlock()}
              </Animated.View>
            </InnerContainer>
          </ProductInfoContainer>

          <Line />
          {/** 최종 결제금액 */}
          <PaymentPriceContainer>
            <PaymentPriceTitle textColor={themeApp.colors.grey[2]}>
              최종 결제금액
            </PaymentPriceTitle>
            <PaymentPriceTotalBox mb={24}>
              <PaymentPriceText
                text={'Body05R'}
                textColor={themeApp.colors.grey[4]}>
                총 상품금액
              </PaymentPriceText>
              <PaymentPriceText
                text={'Body05R'}
                textColor={themeApp.colors.grey[4]}>
                {withCommas(membershipTypeData?.defaultPrice)} 원
              </PaymentPriceText>
            </PaymentPriceTotalBox>
            <PaymentPriceTotalBox mb={16}>
              <PaymentPriceText
                text={'Body05R'}
                textColor={themeApp.colors.grey[4]}>
                할인금액
              </PaymentPriceText>
              <PaymentPriceText
                text={'Body05R'}
                textColor={themeApp.colors.grey[4]}>
                <PaymentPriceText
                  text={'Body05R'}
                  textColor={
                    period === 'month'
                      ? themeApp.colors.grey[4]
                      : themeApp.colors.green[500]
                  }>
                  {withCommas(
                    membershipTypeData?.yearDescriptionDiscountPrice,
                  ) || 0}
                </PaymentPriceText>{' '}
                원
              </PaymentPriceText>
            </PaymentPriceTotalBox>
            <PaymentPriceTotalBox mb={24}>
              <PaymentPriceText
                text={'Title03SB'}
                textColor={themeApp.colors.grey[4]}>
                총 결제금액
              </PaymentPriceText>
              <PaymentPriceText
                text={'Title03SB'}
                textColor={themeApp.colors.grey[2]}>
                {withCommas(membershipTypeData?.totalPrice)} 원
              </PaymentPriceText>
            </PaymentPriceTotalBox>
          </PaymentPriceContainer>
          <Line />
          <BorderWrap>
            <CardContainer>
              <Title>결제 수단</Title>
              <DeliveryTitle>
                카드 결제시 등록한 카드로 결제가 진행됩니다.
              </DeliveryTitle>
              {selectMembershipCard[0]?.id ? (
                selectMembershipCard.map(card => {
                  return (
                    <Card
                      key={card.id}
                      onPress={() =>
                        navigation.navigate(MemebershipPaymentManagePageName)
                      }>
                      {/* <CardText>결제 카드 등록</CardText> */}
                      <CardText>
                        {card.cardCompany}(
                        {card.cardNumber?.toString().slice(-4)})
                      </CardText>
                      {/* <PayInfoWrap>
                        <PayInfo>
                          <PayError />
                          <PayText>결제불가</PayText>
                        </PayInfo>
                        <ArrowRight />
                      </PayInfoWrap> */}
                      <ArrowRight />
                    </Card>
                  );
                })
              ) : (
                <Card
                  onPress={() =>
                    navigation.navigate(MemebershipPaymentManagePageName)
                  }>
                  <CardText>결제 카드 등록</CardText>
                  <ArrowRight />
                </Card>
              )}
            </CardContainer>
          </BorderWrap>
          <FormWrap>
            <Form form={agreeCheck}>
              <Check name="agreeCheck">
                <Label>구매 조건 확인 및 결제 진행 필수 동의</Label>
              </Check>
            </Form>
          </FormWrap>
        </Container>
      </ScrollView>
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="결제수단 등록이 필요해요"
        description="최초 1회 등록으로 편리하게 결제할 수 있어요"
        buttonTitle1="결제 카드 등록하기"
        buttonType1="yellow"
        onPressEvent1={() => {
          navigation.navigate(RegisterCardScreenName, {defaultType: 1});
          setModalVisible(false);
        }}
      />
      <ButtonContainer>
        <Button
          type="yellow"
          label="결제하기"
          onPressEvent={handleEventPayments}
        />
      </ButtonContainer>
    </>
  );
};

export default Pages;

const Container = styled.View`
  background-color: white;
`;

const ImageWrap = styled.View`
  width: 45px;
  height: 45px;
`;

const MembershipTitle = styled(Typography)`
  margin-bottom: 5px;
`;
const MembershipTitleBox = styled.View`
  margin: 24px;
  margin-top: 40px;
`;
const MembershipDescription = styled(Typography)``;
const Line = styled.View`
  width: 100%;
  height: 6px;
  background-color: ${({theme}) => theme.colors.grey[8]};
`;
const ButtonContainer = styled.View`
  position: absolute;
  bottom: 0px;
  padding-bottom: 35px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: white;
`;
const CardContainer = styled.View``;
const ProductInfoContainer = styled.View``;

const ProductInfoExtend = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 17px 24px;
`;
const ExtendText = styled(Typography)``;

const Inner = styled.View`
  flex-direction: row;
  padding: 17px 24px;
`;
const InnerTextView = styled.View`
  margin-left: 12px;
`;
const InnerContainer = styled.View`
  overflow: hidden;
  margin-top: 1px;
`;

const MembershipText = styled(Typography).attrs({text: 'Body05SB'})``;
const PriceSaleBox = styled.View`
  flex-direction: row;
`;
const PriceText = styled(Typography).attrs({text: 'Body05R'})``;
const PriceTextSale = styled(Typography).attrs({text: 'Body05SB'})`
  margin-right: 5px;
`;
const PriceTextMid = styled(Typography).attrs({text: 'Body06R'})`
  text-decoration: line-through;
`;

const PaymentPriceContainer = styled.View`
  margin: 24px;
`;
const PaymentPriceTitle = styled(Typography).attrs({text: 'Body05SB'})`
  margin-bottom: 24px;
`;

const PaymentPriceText = styled(Typography)``;

const PaymentPriceTotalBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  ${({mb}) => mb && `margin-bottom:${mb}px`};
`;

const Label = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;
const BorderWrap = styled.Pressable`
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 6px;
  padding: 24px;
`;

const FormWrap = styled.View`
  margin: 24px;
  margin-bottom: 141px;
`;

const Title = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const DeliveryTitle = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[4]};
`;

const Card = styled.Pressable`
  width: 100%;
  border: 1px solid ${props => props.theme.colors.grey[7]};
  border-radius: 14px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding: 17px 24px;
`;

const CardText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const ArrowRight = styled(ArrowRightIcon)`
  color: ${props => props.theme.colors.grey[4]};
  margin-left: 8px;
`;

const PayInfoWrap = styled.View`
  flex-direction: row;
  align-items: center;
  text-align: center;
`;

const PayInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PayText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.red[500]};
  margin-left: 4px;
`;
