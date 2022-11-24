import React from 'react';
import styled from 'styled-components/native';

import Register from '../../../../../components/Register';
import Wrapper from '../../../../../components/Wrapper';

export const PAGE_NAME = 'P_SIGNUP__PAGE__SELECT_USER_TYPE';

const Pages = () => {
  return (
    <Wrapper>
      <Register type="personal" />
      <Register type="enterprise" />
    </Wrapper>
  );
};

export default Pages;
