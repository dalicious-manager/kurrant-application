import React from 'react';
import styled, { css } from 'styled-components/native';

import Typography from '../Typography';

/** 예시 */
// <ContractDetail renderItem={renderItem} />
// 
// const renderItem = {
//   contractState: 'selling',
//   contractSymbol: 'XRP/BTC',
//   contractDate: '2022-09-27 17:13',
//   concludedPrice: '1,000,000',
//   concludedNumber: '1.000000',
//   motConcludedNumber: '1.000000',
// }

/**
 * 
 * @param { object } props
 * @param { object } props.renderItem
 * @param { 'selling' | 'buying' } props.renderItem.contractState
 * @param { string } props.renderItem.contractSymbol
 * @param { string } props.renderItem.contractDate
 * @param { string } props.renderItem.concludedPrice
 * @param { string } props.renderItem.concludedNumber
 * @param { string } props.renderItem.notConcludedNumber
 * @returns
 */

const Component = ({ renderItem }) => {
  return (
    <Wrap key={renderItem?.contractDate}>
      <Wrapper>
        <HeadWrap>
          <HeadDetailWrap>
            <HeadLabel weight="B" contractState={renderItem?.contractState}>
              {renderItem?.contractState === 'selling' ? '매도' : '매수'}
            </HeadLabel>
          </HeadDetailWrap>
          <HeadDetailWrap>
            <HeadLabel weight="R">{renderItem?.contractSymbol}</HeadLabel>
          </HeadDetailWrap>
        </HeadWrap>
        <BodyWrap>
          <BodyLeftWrap>
            <DateWrap>
              <DateLabel>{renderItem?.contractDate}</DateLabel>
            </DateWrap>
            <CancelWrap>
              <CancelLabel>최소</CancelLabel>
            </CancelWrap>
          </BodyLeftWrap>
          <BodyRightWrap>
            <OrderWrap>
              <Label>주문가격</Label>
              <Value>{renderItem?.concludedPrice}</Value>
            </OrderWrap>
            <OrderWrap>
              <Label>주문수량</Label>
              <Value>{renderItem?.concludedNumber}</Value>
            </OrderWrap>
            <OrderWrap>
              <Label>미체결수량</Label>
              <Value>{renderItem?.notConcludedNumber}</Value>
            </OrderWrap>
          </BodyRightWrap>
        </BodyWrap>
      </Wrapper>
    </Wrap>
  );
}

export default Component;

const Wrap = styled.View``;

const Wrapper = styled.View`
  padding: 16px 0;
`;
const HeadWrap = styled.View`
  flex-direction: row;
  margin-bottom: 4px;
`;
const HeadDetailWrap = styled.View`
  margin-right: 8px;
`;
const HeadLabel = styled(Typography).attrs({ variant: 'h600' })`
  color: ${({ theme }) => theme.colors.neutral[900]};
  ${({ contractState }) =>
    contractState === 'selling' &&
    css`
      color: ${({ theme }) => theme.colors.blue[500]};
    `}
  ${({ contractState }) =>
    contractState === 'buying' &&
    css`
      color: ${({ theme }) => theme.colors.red[500]};
    `}
`;
const BodyWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const BodyLeftWrap = styled.View`
  flex: 1;
`;
const DateWrap = styled.View``;
const DateLabel = styled(Typography).attrs({ variant: '500', weight: 'R' })`
  color: ${({ theme }) => theme.colors.neutral[400]};
`;
const CancelWrap = styled.Pressable`
  align-items: flex-start;
`;
const CancelLabel = styled(Typography).attrs({ variant: '500', weight: 'B' })`
  background-color: ${({ theme }) => theme.colors.neutral[30]};
  color: ${({ theme }) => theme.colors.neutral[700]};
  padding: 7px 12px;
  margin-top: 12px;
  border-radius: 6px;
  overflow: hidden;
`;
const BodyRightWrap = styled.View`
  flex: 0.8;
  justify-content: flex-end;
`;
const OrderWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const Label = styled(Typography).attrs({ variant: '500', weight: 'R' })`
  color: ${({ theme }) => theme.colors.neutral[500]};
`;
const Value = styled(Typography).attrs({ variant: '500', weight: 'R' })`
  color: ${({ theme }) => theme.colors.neutral[900]};
`;
