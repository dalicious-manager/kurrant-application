import {useAtom} from 'jotai';
import React from 'react';
import {Text, View, Platform} from 'react-native';
import styled from 'styled-components';

import Arrow from '../../../assets/icons/Spot/messageArrow.svg';
import BalloonMessage from '../../../components/BalloonMessage';
import Typography from '../../../components/Typography';
import {height, width} from '../../../theme';
import {mainDimAtom} from '../../../utils/store';

export const PAGE_NAME = 'MAIN_DIM_PAGE';
const MainDim = () => {
  const [showDim, setShowDim] = useAtom(mainDimAtom);
  const selectButton = () => {
    setShowDim(false);
  };
  return (
    <Wrap>
      <SpotButton os={Platform.OS} onPress={selectButton}>
        <ButtonText>스팟을 선택해 주세요</ButtonText>
        <Arrow />
      </SpotButton>
      <BalloonMessage
        location={{top: '24px'}}
        message={`배송받으실  스팟을 선택해주세요.${'\n'}초대 받으신 스팟 중${'\n'}주문하실 곳은 어디신가요?`}
      />
    </Wrap>
  );
};

export default MainDim;

const Wrap = styled.View`
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  height: 100%;
  position: absolute;
  width: 100%;
`;

const SpotButton = styled.Pressable`
  border: 1px solid #ffffff;
  border-radius: 14px;
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  margin-top: ${({os}) => (os === 'ios' ? '56px' : '32px')};
  padding: 9px 14px 9px 16px;
  margin-left: 8px;
  background-color: #313131;
`;

const ButtonText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[0]};
  margin-right: 4px;
`;
