import React from 'react';
import styled, {css} from 'styled-components/native';

import {getChipColor} from './style';
import Typography from '../Typography';

/**
 *
 * @param {object} props
 * @param {'auth_need' | 'auth_ing' | 'auth_ed' | 'auth_deny'} props.type auth_need: '인증필요' | auth_ing: '인증중' | auth_ed: '인증완료' | auth_deny: '인증반려'
 * @returns
 */

const Component = ({type = 'auth_need'}) => {
  const authLabel = {
    auth_need: '인증필요',
    auth_ing: '인증중',
    auth_ed: '인증완료',
    auth_deny: '인증반려',
  };

  return (
    <Wrapper>
      <ChipWrap type={type}>
        <ChipLabel>{authLabel[type]}</ChipLabel>
      </ChipWrap>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  align-items: flex-start;
`;
const ChipWrap = styled.View`
  border-radius: 6px;
  background-color: ${({type}) => getChipColor(type)};
`;
const ChipLabel = styled(Typography).attrs({variant: 'h400', weight: 'B'})`
  padding: 2px 6px;
  color: ${({theme}) => theme.colors.neutral[0]};
`;
