import React from 'react';
import styled from 'styled-components/native';

import { AppleSnsIcon, FacebookSnsIcon,GoogleSnsIcon} from '../Icon';
import { getSnsButtonColor, getSnsButtonBorder } from './style';

/**
 * @param {object} props
 * @param {'login' | 'email' | 'kakao' | 'naver'} props.type_sns
 * @param {Number} props.size
 * @param {function} props.onPressEvent
 * @returns
 */
const Component = ({ type_sns = 'email', size, onPressEvent = () => { console.log('sns 라운드 버튼을 누르셨습니다.') } }) => {

  const renderButton = () => {
    switch (type_sns) {
      case 'apple':
        return <AppleSnsIcon/>;
      case 'google':
        return <GoogleSnsIcon/>;
      case 'facebook':
        return <FacebookSnsIcon/>;
    }
  };

  return (
    <ButtonWrap type_sns={type_sns} onPress={onPressEvent} size={size}>
      <IconWrap type_sns={type_sns}>{renderButton(type_sns)}</IconWrap>
    </ButtonWrap>
  );
};

export default Component;

const ButtonWrap = styled.Pressable`
  width: ${({ size }) => size+"px"};
  border-radius: 50px;
  overflow: hidden;
  position: relative;
  height: ${({ size }) => size+"px"};
  margin: 16px 8px;
  ${({ type_sns }) => getSnsButtonBorder(type_sns)};
  ${({ type_sns }) => getSnsButtonColor(type_sns)};
`;
const IconWrap = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;  
    
`;

