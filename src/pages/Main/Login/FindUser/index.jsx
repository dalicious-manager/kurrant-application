import React from 'react';
import styled from 'styled-components/native';

import Register from '../../../../components/Register';
import Typography from '../../../../components/Typography';
import Wrapper from '../../../../components/Wrapper';

export const PAGE_NAME = 'P_LOGIN__MODAL__FIND_USER';

const Pages = () => {
  const Infomation = () => {
    return '로그인에 도움이 필요하세요?';
  };
  return (
    <Wrapper>
      <InfomationText>{Infomation()}</InfomationText>
      <Register />
    </Wrapper>
  );
};

export default Pages;

const InfomationText = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin: 24px;
  margin-top: 40px;
`;
