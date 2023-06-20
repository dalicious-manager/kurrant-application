import React, {useState} from 'react';
import {
  Modal,
  Text,
  Pressable,
  View,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import styled from 'styled-components';

import QuestionIcon from '../../assets/icons/MealCart/question.svg';
import useFoodDetail from '../../biz/useFoodDetail/hook';
import {useGetUserInfo} from '../../hook/useUserInfo';
import {Price} from '../../pages/Main/Bnb/MealDetail/Main';
import withCommas from '../../utils/withCommas';
import Button from '../Button';
import Typography from '../Typography';

const Component = ({
  id,
  price,
  membershipDiscountedPrice,
  makersDiscountedPrice,
  periodDiscountedPrice,
  totalDiscountRate,
  discountPrice,
  membershipDiscountedRate,
  makersDiscountedRate,
  periodDiscountedRate,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {foodDetailDiscount, isfoodDetailDiscount} = useFoodDetail(); // 할인정보
  const firstDiscount = price - membershipDiscountedPrice;
  const secondDiscount = firstDiscount - makersDiscountedPrice;
  const lastDiscount = secondDiscount - periodDiscountedPrice;
  const {data: isUserInfo} = useGetUserInfo();
  const getData = async () => {
    await foodDetailDiscount(id);
  };

  return (
    <Wrap>
      <Modal
        transparent={false}
        visible={modalVisible}
        presentationStyle={'fullScreen'}>
        <View>
          <ModalView>
            <InnerView>
              <TitleView>
                <Title>가격 안내</Title>
              </TitleView>
              <ScrollViewWrap showsVerticalScrollIndicator={false}>
                <Price>{withCommas(price)}원</Price>
                <DscText>오프라인 매장에서 판매되는 가격입니다.</DscText>
                <View>
                  <PriceWrap>
                    <Percent>
                      {Math.round(totalDiscountRate * 100) / 100}%
                    </Percent>
                    <TotalPrice>
                      {withCommas(price - discountPrice)}원
                    </TotalPrice>
                  </PriceWrap>
                  <DscText>최종 할인율이 적용된 최종 가격입니다.</DscText>
                  <DscText>
                    할인이 중첩되는 경우 멤버십 할인&gt;판매자 할인&gt;기간
                    할인순으로 순차 적용됩니다.
                  </DscText>
                </View>
                <ContentWrap>
                  <Text>[매장가]</Text>
                  <DscText>{withCommas(price)}원</DscText>
                </ContentWrap>
                {!isUserInfo?.data?.isMembership &&
                  isfoodDetailDiscount.membershipDiscountRate !== 0 && (
                    <ContentWrap>
                      <Text>[멤버십 가입시 판매가]</Text>
                      <DscText> &#183; 멤버십 할인 적용시</DscText>
                      <DscText>
                        {withCommas(price)}원 x (100%-
                        {isfoodDetailDiscount.membershipDiscountRate}%) ={' '}
                        {isfoodDetailDiscount.membershipDiscountedPrice === 0
                          ? 0
                          : withCommas(
                              isfoodDetailDiscount.membershipDiscountedPrice,
                            )}
                        원
                      </DscText>
                      {makersDiscountedRate !== 0 && (
                        <DscText> &#183; 판매자 할인 추가 적용시</DscText>
                      )}
                      {makersDiscountedRate !== 0 && (
                        <DscText>
                          {isfoodDetailDiscount.membershipDiscountedPrice === 0
                            ? 0
                            : withCommas(
                                isfoodDetailDiscount.membershipDiscountedPrice,
                              )}
                          원 x (100%-{isfoodDetailDiscount.makersDiscountRate}%)
                          ={' '}
                          {withCommas(
                            isfoodDetailDiscount.makersDiscountedPrice,
                          )}
                          원
                        </DscText>
                      )}
                      {periodDiscountedRate !== 0 && (
                        <DscText> &#183; 기간 할인 추가 적용시</DscText>
                      )}
                      {periodDiscountedRate !== 0 && (
                        <DscText>
                          {withCommas(
                            isfoodDetailDiscount.makersDiscountedPrice === 0
                              ? isfoodDetailDiscount.membershipDiscountedPrice
                              : isfoodDetailDiscount.makersDiscountedPrice,
                          )}
                          원 x (100%-{isfoodDetailDiscount.periodDiscountRate}%)
                          ={' '}
                          {withCommas(
                            isfoodDetailDiscount.periodDiscountedPrice,
                          )}
                          원
                        </DscText>
                      )}
                    </ContentWrap>
                  )}
                {totalDiscountRate !== 0 && (
                  <ContentWrap>
                    <Text>[최종 판매가]</Text>
                    {membershipDiscountedRate !== 0 && (
                      <DscText> &#183; 멤버십 할인 적용시</DscText>
                    )}
                    {membershipDiscountedRate !== 0 && (
                      <DscText>
                        {withCommas(price)}원 x (100%-{membershipDiscountedRate}
                        %) = {withCommas(firstDiscount)}원
                      </DscText>
                    )}
                    {makersDiscountedRate !== 0 && (
                      <DscText> &#183; 판매자 할인 추가 적용시</DscText>
                    )}
                    {makersDiscountedRate !== 0 && (
                      <DscText>
                        {withCommas(firstDiscount)}원 x (100%-
                        {makersDiscountedRate}%) = {withCommas(secondDiscount)}
                        원
                      </DscText>
                    )}
                    {periodDiscountedRate !== 0 && (
                      <DscText> &#183; 기간 할인 추가 적용시</DscText>
                    )}
                    {periodDiscountedRate !== 0 && (
                      <DscText>
                        {withCommas(secondDiscount)}원 x (100%-
                        {periodDiscountedRate}%) = {withCommas(lastDiscount)}원
                      </DscText>
                    )}
                  </ContentWrap>
                )}
                <ContentWrap>
                  <Text>[최종 할인율]</Text>
                  <DscText>= 할인 가격 / 매장가</DscText>
                  <DscText>
                    ({withCommas(price)}원 - {withCommas(lastDiscount)}원) /{' '}
                    {withCommas(price)} ={' '}
                    {Math.round(totalDiscountRate * 100) / 100}%
                  </DscText>
                </ContentWrap>
              </ScrollViewWrap>
              <ButtonWrap>
                <Button
                  label={'확인'}
                  size={'modalFull'}
                  text={'Button09SB'}
                  onPressEvent={() => setModalVisible(!modalVisible)}
                />
              </ButtonWrap>
            </InnerView>
          </ModalView>
        </View>
      </Modal>

      <QuestionIcon
        onPress={() => {
          getData();
          setModalVisible(true);
        }}
      />
    </Wrap>
  );
};

export default Component;

const Wrap = styled.View``;
const ModalView = styled.View`
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
`;

const InnerView = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.grey[0]};
  margin: 122px 28px;
  border-radius: 14px;
`;

const ScrollViewWrap = styled.ScrollView`
  margin: 0px 16px;
`;

const ContentWrap = styled.View`
  margin-top: 16px;
`;

const TitleView = styled.View`
  align-items: center;
  height: 67px;
  justify-content: center;
`;
const Title = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const ButtonWrap = styled.View`
  margin: 12px 28px 26px 28px;
`;

const DscText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[4]};
`;

const Percent = styled(Typography).attrs({text: 'Body06SB'})`
  color: ${props => props.theme.colors.red[500]};
`;

const TotalPrice = styled(Percent)`
  color: ${props => props.theme.colors.grey[2]};
  margin-left: 4px;
`;

const PriceWrap = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;
