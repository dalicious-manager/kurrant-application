import React from 'react';
import { View } from 'react-native';
import styled, { css } from 'styled-components/native';

import Typography from '../Typography';

/** 예시 */
// <TableBodyRow renderItem={renderItem} />
// 
// const renderItem = {
//   coinName_En: 'Atom',
//   coinName_Kr: '코스모스아톰',
//   currentPrice: '0.00029619',
//   currentPrice_Kr: '8,477',
//   dodPercent: '+3.28',
//   transactionAmount: '24.6608',
//   transactionAmount_Kr: '7억',
// }

/**
 *
 * @param { object } props
 * @param { object } props.renderItem
 * @param { string } props.renderItem.coinName_En 종목 영문명
 * @param { string } props.renderItem.coinName_Kr 종목 한글명
 * @param { string } props.renderItem.currentPrice 현재가
 * @param { string } props.renderItem.currentPrice_Kr 현재가(KRW)
 * @param { string } props.renderItem.dodPercent 전일대비 변화율
 * @param { string } props.renderItem.transactionAmount 거래대금
 * @param { string } props.renderItem.transactionAmount_Kr 거래대금(KRW)
 * @returns
 */

const Component = ({ renderItem }) => {
  const isPositive = renderItem?.dodPercent >= 0;

  return (
    <Wrap>
      <Wrapper>
        <CoinNameWrap>
          <AtomWrap>
            <CoinNameEn>{renderItem?.coinName_En.toUpperCase()}</CoinNameEn>
          </AtomWrap>
          <View>
            <SubText>{renderItem?.coinName_Kr}</SubText>
          </View>
        </CoinNameWrap>
        <CurrentPriceWrap>
          <AtomWrap>
            <CurrentPrice isPositive={isPositive}>
              {renderItem?.currentPrice}
            </CurrentPrice>
          </AtomWrap>
          <View>
            <SubText align={'right'}>{renderItem?.currentPrice_Kr}KRW</SubText>
          </View>
        </CurrentPriceWrap>
        <DoDWrap>
          <DoD isPositive={isPositive}>{renderItem?.dodPercent}%</DoD>
        </DoDWrap>
        <AmountWrap>
          <AtomWrap>
            <Amout>{renderItem?.transactionAmount}</Amout>
          </AtomWrap>
          <View>
            <SubText align={'right'} >{renderItem?.transactionAmount_Kr} KRW</SubText>
          </View>
        </AmountWrap>
      </Wrapper>
    </Wrap>
  );
};

export default Component;

const Wrap = styled.View``;
const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0 12px;
`;

const CoinNameWrap = styled.View`
  flex: 2;
`;

const CoinNameEn = styled(Typography).attrs({ variant: 'h600', weight: 'B' })`
  color: ${({ theme }) => theme.colors.neutral[900]};
`;

const SubText = styled(Typography).attrs({ variant: 'h400', weight: 'R' })`
  font-weight: 400;
  font-size: 10px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.neutral[400]};
`;

const CurrentPriceWrap = styled.View`
  flex: 2;
`;

const CurrentPrice = styled(Typography).attrs({ variant: 'h500', weight: 'B', align: 'right' })`
  ${({ isPositive }) =>
    isPositive
      ? css`
          color: ${({ theme }) => theme.colors.red[500]};
        `
      : css`
          color: ${({ theme }) => theme.colors.blue[500]};
        `}
`;

const DoDWrap = styled.View`
  margin-top: 7px;
  flex: 1.35;
`;

const DoD = styled(Typography).attrs({ variant: 'h500', weight: 'R', align: 'right' })`
  ${({ isPositive }) =>
    isPositive
      ? css`
          color: ${({ theme }) => theme.colors.red[500]};
        `
      : css`
          color: ${({ theme }) => theme.colors.blue[500]};
        `}
`;
const AmountWrap = styled.View`
  flex: 1.35;
`;

const Amout = styled(Typography).attrs({ variant: 'h500', weight: 'R', align: 'right' })`
  color: ${({ theme }) => theme.colors.neutral[900]};
`;
const AtomWrap = styled.View`
  margin-bottom: 2px;
`;
