import React from 'react';
import WebView from 'react-native-webview';
import styled, { css } from 'styled-components/native';

import { AntDesignIcon } from '../Icon';
import Typography from '../Typography';

/** 예시 */
// <CoinStat renderItem={renderItem} />
//
// const renderItem = {
//   coinPrice: '0.00029619',
//   coinType: 'BTC',
//   coinPriceKRW: '8,483',
//   coinDeviation: '0.000000010',
//   coinPercentage: '-3.28',
//   coinChart: 'https://images.unsplash.com/photo-1664164236867-12d1f986ac41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2127&q=80',
// }


/**
 *
 * @param { object } props
 * @param { object } props.renderItem
 * @param { string } props.renderItem.coinPrice '코인 현재가'
 * @param { string } props.renderItem.coinType '코인 타입'
 * @param { string } props.renderItem.coinPriceKRW '코인한화'
 * @param { string } props.renderItem.coinDeviation '전일대비 변화량'
 * @param { string } props.renderItem.coinPercentage '전일대비 변화율'
 * @param { string } props.renderItem.coinChart '코인 차트'
 * @returns
 */
const Component = ({ renderItem }) => {

  const isPositive = renderItem?.coinPercentage >= 0;

  return (
    <Wrap>
      <Wrapper>
        <CoinInfoWrap>
          <CoinPricesWrap>
            <CoinEachWrap>
              <CoinPriceWrap>
                <CoinPriceLg>{renderItem?.coinPrice}</CoinPriceLg>
              </CoinPriceWrap>
              <CoinPriceTagWrap>
                <CoinPriceSm weight="B">{renderItem?.coinType}</CoinPriceSm>
              </CoinPriceTagWrap>
            </CoinEachWrap>
            <CoinEachWrap>
              <CoinPriceWrap>
                <CoinPriceSm weight="R">{renderItem?.coinPriceKRW}</CoinPriceSm>
              </CoinPriceWrap>
              <CoinPriceTagWrap>
                <CoinPriceSm weight="R">KRW</CoinPriceSm>
              </CoinPriceTagWrap>
            </CoinEachWrap>
          </CoinPricesWrap>
          <CoinStatesWrap>
            <CoinStateWrap>
              <CoinState isPositive={isPositive}>전일대비</CoinState>
            </CoinStateWrap>
            <CoinStateWrap>
              <IconWrap isPositive={isPositive}>
                {isPositive ? (
                  <AntDesignIcon
                    name={'caretup'}
                    size={10}
                    color={'#d10000'}
                  />
                ) : (
                  <AntDesignIcon
                    name={'caretdown'}
                    size={10}
                    color={'#0011A7'}
                  />
                )}
              </IconWrap>
              <DeviatonWrap>
                <CoinState isPositive={isPositive}>
                  {renderItem?.coinDeviation}
                </CoinState>
              </DeviatonWrap>
            </CoinStateWrap>
            <CoinStateWrap>
              <CoinState isPositive={isPositive}>
                {renderItem?.coinPercentage}%
              </CoinState>
            </CoinStateWrap>
          </CoinStatesWrap>
        </CoinInfoWrap>
        <CoinGraphWrap>
          <CoinGraph>
            <WebView
              source={{
                uri: renderItem?.coinChart,
              }}
            />
          </CoinGraph>
        </CoinGraphWrap>
      </Wrapper>
    </Wrap>
  );
};

export default Component;

const Wrap = styled.View``;
const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const CoinInfoWrap = styled.View``;
const CoinPricesWrap = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;
const CoinEachWrap = styled.View`
  flex-direction: row;
`;
const CoinPriceWrap = styled.View`
  margin-right: 2px;
  justify-content: center;
`;
const CoinPriceTagWrap = styled.View`
  margin-right: 4px;
  justify-content: center;
`;

const CoinStatesWrap = styled.View`
  flex-direction: row;
`;
const CoinStateWrap = styled.View`
  align-items: center;
  flex-direction: row;
  margin-right: 4px;
`;
const CoinGraphWrap = styled.View`
  align-items: flex-end;
  justify-content: center;
`;
const CoinGraph = styled.View`
  width: 80px;
  height: 40px;
`;
const IconWrap = styled.View`
  margin-right: 2px;
  ${({ isPositive }) => isPositive && css`margin-top: 3px;`};
  
`;
const DeviatonWrap = styled.View``;

const CoinPriceLg = styled(Typography).attrs({ variant: 'h700', weight: 'B' })``;
const CoinPriceSm = styled(Typography).attrs({ variant: 'h500' })``;
const CoinState = styled(Typography).attrs({ variant: 'h500', weight: 'R' })`
  ${({ isPositive }) =>
    isPositive
      ? css`
          color: ${({ theme }) => theme.colors.red[500]};
        `
      : css`
          color: ${({ theme }) => theme.colors.blue[500]};
        `}
`;
