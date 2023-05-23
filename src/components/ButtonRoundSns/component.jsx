import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import Balloon from '~components/Balloon';

import {getSnsButtonColor, getSnsButtonBorder} from './style';
import {
  AppleSnsIcon,
  FacebookSnsIcon,
  GoogleSnsIcon,
  NaverSnsIcon,
  KakaoSnsIcon,
} from '../Icon';
/**
 * @param {object} props
 * @param {'login' | 'email' | 'kakao' | 'naver'} props.type_sns
 * @param {Number} props.size
 * @param {function} props.onPressEvent
 * @returns
 */
const Component = ({
  type_sns = 'email',
  size,
  onPressEvent = () => {
    console.log('sns 라운드 버튼을 누르셨습니다.');
  },
  isLast = false,
}) => {
  const {balloonEvent, BalloonWrap, balloonEventNotOut} = Balloon();
  const osLocation = () => {
    if (Platform.OS === 'ios') {
      switch (type_sns) {
        case 'apple':
          return {bottom: '-50px', right: '86px'};
        case 'google':
          return {bottom: '-50px', right: '23px'};
        case 'facebook':
          return {bottom: '-50px', right: '86px'};
        case 'kakao':
          return {bottom: '-50px', left: '38px'};
        case 'naver':
          return {bottom: '-50px', left: '38px'};
      }
    }
    if (Platform.OS === 'android') {
      switch (type_sns) {
        case 'apple':
          return {bottom: '-50px', right: '86px'};
        case 'google':
          return {bottom: '-50px', right: '23px'};
        case 'facebook':
          return {bottom: '-50px', right: '86px'};
        case 'kakao':
          return {bottom: '-50px', left: '38px'};
        case 'naver':
          return {bottom: '-50px', left: '38px'};
      }
    }
  };
  const typeArrowVertical = () => {
    switch (type_sns) {
      case 'apple':
        return 'up';
      case 'google':
        return 'up';
      case 'facebook':
        return 'up';
      case 'kakao':
        return 'up';
      case 'naver':
        return 'up';
    }
  };
  const typeArrowHorizontal = () => {
    switch (type_sns) {
      case 'apple':
        return 'right';
      case 'google':
        return 'center';
      case 'facebook':
        return 'right';
      case 'kakao':
        return 'left';
      case 'naver':
        return 'left';
    }
  };
  const renderButton = () => {
    switch (type_sns) {
      case 'apple':
        return <AppleSnsIcon />;
      case 'google':
        return <GoogleSnsIcon />;
      case 'facebook':
        return <FacebookSnsIcon />;
      case 'kakao':
        return <KakaoSnsIcon />;
      case 'naver':
        return <NaverSnsIcon />;
    }
  };
  useEffect(() => {
    if (isLast) balloonEventNotOut();
  }, [isLast]);
  return (
    <>
      <ButtonWrap type_sns={type_sns} onPress={onPressEvent} size={size}>
        <IconWrap type_sns={type_sns}>{renderButton(type_sns)}</IconWrap>
      </ButtonWrap>
      {isLast && (
        <BalloonWrap
          message={`최근 로그인한 방법이에요`}
          size={'B'}
          location={osLocation()}
          vertical={typeArrowVertical()}
          horizontal={typeArrowHorizontal()}
          onPress={() => console.log('test')}
        />
      )}
    </>
  );
};

export default Component;

const ButtonWrap = styled.Pressable`
  width: ${({size}) => size + 'px'};
  border-radius: 50px;
  overflow: hidden;
  position: relative;
  height: ${({size}) => size + 'px'};
  margin: 16px 8px;
  ${({type_sns}) => getSnsButtonBorder(type_sns)};
  ${({type_sns}) => getSnsButtonColor(type_sns)};
`;
const IconWrap = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;
