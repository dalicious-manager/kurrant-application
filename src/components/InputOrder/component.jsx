import React from 'react';
import styled, {css} from 'styled-components/native';

import {AntDesignIcon} from '../Icon';
import Typography from '../Typography';

// TODO:
// Type 맞추기 ( sell -> selling )
// Type 맞추기 ( buy -> buying )

// useModal 참고
//

// Props Comment 추가 : coinType = 'ATOM',

// 해당 페이지에서 넣어야 하는 것
// const [test, setTest] = useState(0);

// const pressMinus = () => {
//   setTest(test ? test - 1 : test);
// }
// const pressPlus = () => {
//   setTest(test + 1);
// }

/**
 *
 * @param { buying | selling | button } props.type
 * @param { string } props.title
 * @param { useState_variant } props.orderNumber
 * @param { function } props.pressMinus
 * @param { function } props.pressPlus
 * @returns
 */
const Component = ({
  type,
  title = '수량',
  coinType = 'ATOM',
  orderNumber = 0,
  pressMinus,
  pressPlus,
}) => {
  return (
    <Wrap>
      <Wrapper type={type}>
        <OrderInputWrap>
          <OrderHeadWrap>
            <OrderHead>{title}</OrderHead>
          </OrderHeadWrap>
          <OrderBodyWrap>
            <OrderNumberWrap>
              <OrderNumber type={type}>{orderNumber}</OrderNumber>
            </OrderNumberWrap>
            <OrderTagWrap>
              <OrderNumber type={type}>{coinType.toUpperCase()}</OrderNumber>
            </OrderTagWrap>
          </OrderBodyWrap>
        </OrderInputWrap>
        {type === 'btn' && (
          <OrderControlWrap>
            <OrderContolBox onPress={pressMinus}>
              <AntDesignIcon name={'minus'} size={15} color={'#000'} />
            </OrderContolBox>
            <OrderContolBox onPress={pressPlus}>
              <AntDesignIcon name={'plus'} size={15} color={'#000'} />
            </OrderContolBox>
          </OrderControlWrap>
        )}
      </Wrapper>
    </Wrap>
  );
};

export default Component;

const Wrap = styled.View``;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid ${({theme}) => theme.colors.neutral[50]};
  border-radius: 6px;
  ${({type}) => {
    switch (type) {
      case 'selling':
        return css`
          background-color: ${({theme}) => theme.colors.blue[30]};
        `;
      case 'buying':
        return css`
          background-color: ${({theme}) => theme.colors.red[30]};
        `;
      default:
        return css`
          background-color: ${({theme}) => theme.colors.neutral[0]};
        `;
    }
  }}
`;
const OrderInputWrap = styled.View`
  padding: 5px 0px;
  margin-left: 8px;
`;
const OrderHeadWrap = styled.View``;
const OrderBodyWrap = styled.View`
  flex-direction: row;
`;
const OrderNumberWrap = styled.View`
  margin-right: 4px;
`;
const OrderTagWrap = styled.View``;
const OrderControlWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 4px;
`;
const OrderContolBox = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: ${({theme}) => theme.colors.neutral[30]};
  margin-left: 4px;
`;
const OrderHead = styled(Typography).attrs({variant: 'h300', weight: 'R'})``;
const OrderNumber = styled(Typography).attrs({variant: 'h500', weight: 'R'})`
  ${({type}) => {
    switch (type) {
      case 'selling':
        return css`
          color: ${({theme}) => theme.colors.blue[500]};
        `;
      case 'buying':
        return css`
          color: ${({theme}) => theme.colors.red[500]};
        `;
      default:
        return css`
          color: ${({theme}) => theme.colors.neutral[900]};
        `;
    }
  }}
`;
