import {useAtom} from 'jotai';
import React from 'react';
import styled from 'styled-components';
import {useTheme} from 'styled-components/native';
import Label from '~components/Label';
import Typography from '~components/Typography';

import MealImage from './MealImage';
import {foodDetailDataAtom} from '../../../../../biz/useBanner/store';
import {YellowStar} from '../../../../../components/Icon';
import withCommas from '../../../../../utils/withCommas';
import {PAGE_NAME as MealDetailPageName} from '../../MealDetail/Main';

const Card = ({
  m,
  isAddMeal,
  realToTalDiscountRate,
  totalDiscount,
  orderDailyFoodId,
  cartDailyFoodId,
  time,
  setDailyfoodId,
  detailFetching,
  addCartPress,
  navigation,
}) => {
  const [foodDetailData, setFoodDetailData] = useAtom(foodDetailDataAtom);
  //// 필요한 것들 확인하기
  // 원가 price
  // 할인율 discountedPrice/price * 100
  // 할인된 금액 discountedPrice
  // 리뷰 별점 reviewAverage
  // 총 리뷰 수
  // 비건, 신라면 맵기 vegan, spicy

  const themeApp = useTheme();

  // 4.0 일 경우 4.0으로 표기되게 바꾸기

  return (
    <Contents
      key={m.id}
      spicy={m.spicy}
      vegan={m.vegan}
      disabled={m.status === 2 || m.status === 6 || isAddMeal || m.status === 5}
      onPress={e => {
        setDailyfoodId(m.id);
        setTimeout(() => {
          navigation.navigate(MealDetailPageName, {
            dailyFoodId: m.id,
            deliveryTime: time,
            detailFetching: detailFetching,
          });
        }, 200);

        e.stopPropagation();
      }}>
      <ContentsText>
        <MakersName soldOut={m.status}>{m.makersName}</MakersName>
        <MealName soldOut={m.status} numberOfLines={1} ellipsizeMode="tail">
          {m.foodName}
        </MealName>
        {/* <MealDsc soldOut={m.status} numberOfLines={2} ellipsizeMode="tail">
          {m.description}
        </MealDsc> */}

        <PriceWrap>
          {Math.round(Math.round(realToTalDiscountRate * 100) / 100) !== 0 && (
            <OriginPrice>{withCommas(m.price)}원</OriginPrice>
          )}

          <PriceWrap2>
            {Math.round(Math.round(realToTalDiscountRate * 100) / 100) !==
              0 && (
              <PercentText soldOut={m.status}>
                {Math.round(Math.round(realToTalDiscountRate * 100) / 100)}%
              </PercentText>
            )}

            <Price soldOut={m.status}>
              {withCommas(m.price - totalDiscount)}원
            </Price>
          </PriceWrap2>
        </PriceWrap>

        {m.totalReviewCount > 0 && (
          <ReviewWrap>
            <YellowStar
              color={
                m.status === 2 || m.status === 6
                  ? themeApp.colors.grey[6]
                  : '#FDC800'
              }
              width="15px"
              height="15px"
            />
            <ReviewAverageText isSoldout={m.status === 2 || m.status === 6}>
              {m?.reviewAverage && m.reviewAverage?.toString().length === 1
                ? m.reviewAverage.toFixed(1)
                : m.reviewAverage}
            </ReviewAverageText>
            <TotalReviewCount isSoldout={m.status === 2 || m.status === 6}>
              리뷰 {m.totalReviewCount}
            </TotalReviewCount>
          </ReviewWrap>
        )}

        <LabelWrapper>
          {m.vegan && m.vegan !== null && (
            <LabelWrap>
              {m.status === 2 || m.status === 6 ? (
                <Label label={`${m.vegan}`} type={'soldOut'} />
              ) : (
                <Label label={`${m.vegan}`} type={'vegan'} />
              )}
            </LabelWrap>
          )}

          {m.spicy !== null && (
            <LabelWrap>
              {m.status === 2 || m.status === 6 ? (
                <Label label={`${m.spicy}`} type={'soldOut'} />
              ) : (
                <Label label={`${m.spicy}`} />
              )}
            </LabelWrap>
          )}
        </LabelWrapper>
      </ContentsText>
      <MealImage
        lastOrderTime={m.lastOrderTime}
        status={m.status}
        image={m.image}
        dailyFoodId={m.id}
        orderFoodList={orderDailyFoodId}
        cartFoodList={cartDailyFoodId}
        onPressEvent={() => {
          addCartPress(m.id, m.serviceDate, m.diningType, m);
        }}
        isAddMeal={isAddMeal}
        rank={m.rank}
      />

      {m.status === 2 && (
        <SoldOut soldOut={m.status} rank={m.rank}>
          품절됐어요
        </SoldOut>
      )}
      {m.status === 6 && (
        <SoldOut soldOut={m.status} rank={m.rank}>
          마감됐어요
        </SoldOut>
      )}
    </Contents>
  );
};

export default Card;

const Contents = styled.Pressable`
  padding: ${({spicy, vegan}) =>
    spicy || vegan ? '18px 0px 28px 0px' : '18px 0px 28px 0px'};
  margin: 0px 28px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 1px;
  align-items: center;
  min-height: 160px;
`;

const LabelWrap = styled.View`
  margin-top: 6px;
  margin-right: 4px;
`;

const LabelWrapper = styled.View`
  flex-direction: row;
`;

const ContentsText = styled.View`
  width: 60%;
`;

const PriceWrap = styled.View`
  /* margin-top: 4px; */
  margin-bottom: 6px;
`;

const PriceWrap2 = styled.View`
  flex-direction: row;
`;

const SoldOut = styled(Typography).attrs({text: 'Title04SB'})`
  position: absolute;
  right: ${({rank}) => (rank === 1 ? '17px' : '15px')};
  top: ${({rank}) => (rank === 1 ? '60%' : '55%')};
  color: ${props => props.theme.colors.grey[4]};
  z-index: 1000;
`;
export const MakersName = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6
      ? theme.colors.grey[6]
      : theme.colors.grey[4]};
  margin-bottom: 2px;
`;

export const MealName = styled(Typography).attrs({text: 'Body05SB'})`
  white-space: nowrap;
  word-break: nowrap;
  text-overflow: ellipsis;
  color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6
      ? theme.colors.grey[6]
      : theme.colors.grey[2]};
  margin-bottom: 6px;
`;

const Price = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6
      ? theme.colors.grey[6]
      : theme.colors.grey[2]};
`;

const MealDsc = styled(Typography).attrs({text: 'MealDes'})`
  color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6
      ? theme.colors.grey[6]
      : theme.colors.grey[4]};
  margin-top: 6px;
`;

const PercentText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6 ? theme.colors.grey[6] : '#DD5257'};
  margin-right: 4px;
`;

const OriginPrice = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6
      ? theme.colors.grey[6]
      : theme.colors.grey[5]};
  text-decoration: line-through;
  text-decoration-color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6
      ? theme.colors.grey[6]
      : theme.colors.grey[5]};
  /* margin-left: 6px; */
`;

const NoServieceView = styled.View`
  position: absolute;
  top: ${({status, isMembership}) => (status && !isMembership ? '10%' : '30%')};
  left: 29%;
`;

const NoSpotView = styled(NoServieceView)`
  justify-content: center;
  align-items: center;
  left: 18%;
`;

const NoServiceText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[5]};
`;

const ReviewWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const ReviewAverageText = styled(Typography).attrs({text: 'SmallLabelR'})`
  margin-left: 2px;
  margin-right: 5px;
  color: ${({theme, isSoldout}) =>
    isSoldout ? theme.colors.grey[6] : theme.colors.grey[2]};
`;
const TotalReviewCount = styled(Typography).attrs({text: 'SmallLabelR'})`
  color: ${({theme, isSoldout}) =>
    isSoldout ? theme.colors.grey[6] : theme.colors.grey[4]};
`;

// ContentsText
// MakersName
// MealName
// MealDsc
// PriceWrap
// PercentText
// Price
// OriginPrice
// LabelWrap
// Label
// MealImage
// SoldOut
// SoldOut
