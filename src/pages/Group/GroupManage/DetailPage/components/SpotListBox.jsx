import React from 'react';
import styled from 'styled-components';

import Label from '../../../../../components/Label';

const SpotListBox = () => {
  return (
    <Wrap>
      <Label label="프라이빗 스팟" type={'blue'} />
    </Wrap>
  );
};

export default SpotListBox;

const Wrap = styled.View`
  flex: 1;
  padding-top: 24px;
  padding-bottom: 24px;
`;
