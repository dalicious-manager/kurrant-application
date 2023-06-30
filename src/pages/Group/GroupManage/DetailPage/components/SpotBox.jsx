import React from 'react';
import FastImage from 'react-native-fast-image';
import styled, {css} from 'styled-components';

import {SpotManageMy} from '../../../../../assets';
import Typography from '../../../../../components/Typography';
const SpotBox = () => {
  const SpotImageBox = type => {
    if (type === 'my') {
    }
    if (type === 'share') {
    }
    if (type === 'private') {
    }
  };
  return (
    <Wrap>
      <IconTitle>
        <ImageBox source={SpotManageMy} />
        <Typography text="Body05SB">마이스팟</Typography>
      </IconTitle>
      <CurrentSpot>
        <Typography text="Body06R">0</Typography>
        <Typography text="Body06R">/1 이용중</Typography>
      </CurrentSpot>
    </Wrap>
  );
};

export default SpotBox;

const Wrap = styled.View`
  flex-direction: column;
  ${({isCenter}) => {
    if (isCenter) {
      css`
        padding-left: 24px;
        padding-right: 24px;
      `;
    }
  }}
`;
const IconTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
`;
const CurrentSpot = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ImageBox = styled(FastImage)`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;
