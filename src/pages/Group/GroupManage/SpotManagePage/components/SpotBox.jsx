import React from 'react';
import FastImage from 'react-native-fast-image';
import styled, {css} from 'styled-components';
import {useTheme} from 'styled-components/native';

import {
  SpotManageMy,
  SpotManagePrivate,
  SpotManageShare,
} from '../../../../../assets';
import Typography from '../../../../../components/Typography';
const SpotBox = ({type, spotCount = 0}) => {
  const themeApp = useTheme();
  const SpotImageBox = spots => {
    if (spots === 'my') {
      return (
        <IconTitle>
          <ImageBox source={SpotManageMy} />
          <Typography text="Body05SB">마이스팟</Typography>
        </IconTitle>
      );
    }
    if (spots === 'share') {
      return (
        <IconTitle>
          <ImageBox source={SpotManageShare} />
          <Typography text="Body05SB">공유스팟</Typography>
        </IconTitle>
      );
    }
    if (spots === 'private') {
      return (
        <IconTitle>
          <ImageBox source={SpotManagePrivate} />
          <Typography text="Body05SB">프라이빗 스팟</Typography>
        </IconTitle>
      );
    }
  };
  return (
    <Wrap isCenter={type === 'share'}>
      {SpotImageBox(type)}
      <CurrentSpot>
        <Typography text="Body06R" textColor={themeApp.colors.blue[500]}>
          {spotCount}
        </Typography>
        {type !== 'private' ? (
          <Typography text="Body06R">
            {type === 'share' ? '/2 이용중' : '/1 이용중'}
          </Typography>
        ) : (
          <Typography text="Body06R">{' 이용중'}</Typography>
        )}
      </CurrentSpot>
    </Wrap>
  );
};

export default SpotBox;

const Wrap = styled.View`
  flex-direction: column;
  ${({isCenter}) => {
    // console.log(isCenter);
    if (isCenter) {
      return css`
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
