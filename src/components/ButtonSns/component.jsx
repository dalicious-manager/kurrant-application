import React, { useEffect } from 'react';
import styled, { css } from 'styled-components/native';

import { KaKaoIcon, NaverIcon} from '../Icon';
import KakaoTalk from '../../assets/icons/KakaoTalk.svg'
import NaverLogo from '../../assets/icons/NaverLogo.svg'
import Balloon from '~components/Balloon';
import Typography from '../Typography';
import { getSnsButtonColor, getSnsButtonBorder } from './style';

/**
 * @param {object} props
 * @param {'login' | 'email' | 'kakao' | 'naver'} props.type_sns
 * @param {function} props.onPressEvent
 * @returns
 */
const Component = ({ type_sns = 'email', onPressEvent = () => { console.log('sns 버튼을 누르셨습니다.') } ,isLast }) => {
  const snsButtonLabel = {
    kakao: '카카오톡으로 로그인',
    email: '회원가입',
    login: '로그인',
    naver: '네이버로 로그인',
  };
  const {balloonEvent, BalloonWrap,balloonEventNotOut} = Balloon();
  const renderButton = () => {
    switch (type_sns) {
      case 'naver':
        
        return <NaverLogo />;
    }
  };
  useEffect(()=>{
    if(isLast)
      balloonEventNotOut()
  },[isLast])
        return (    <>
        {type_sns ==='login' && <BalloonWrap message={`최근 로그인한 방법이에요`}  size={'B'}
    location={{top:'-38px'}} vertical={'down'}
    horizontal={'center'} onPress={()=>console.log("test")}/>}
        <ButtonWrap type_sns={type_sns} onPress={onPressEvent}>
      <SnsButton type_sns={type_sns}>
        <Label text={"BottomButtonSB"} type_sns={type_sns}>{snsButtonLabel[type_sns]}</Label>
      </SnsButton>
      <IconWrap type_sns={type_sns}>{renderButton(type_sns)}</IconWrap>
      
    </ButtonWrap>
    
    </>
  );
};

export default Component;

const ButtonWrap = styled.Pressable`
  width: 100%;
  border-radius: 50px;
  overflow: hidden;
  position: relative;
  height: 56px;
  margin: 8px 0px;
  ${({ type_sns }) => getSnsButtonBorder(type_sns)};
  z-index: -1;
`;
const SnsButton = styled.View`
  align-items: center;
  ${({ type_sns }) => getSnsButtonColor(type_sns)}
`;
const IconWrap = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  align-items: center;
  justify-content: center;
  ${({ type_sns }) =>
    type_sns === 'email' ?
    css`
      padding: 0 20px;
    `
    : css`
      left:24px;
    `}
    
`;

const Label = styled(Typography)`
  color: ${({ theme }) => theme.colors.grey[1]};
  display: flex;
  padding: 17px 0px;
  justify-content: center;
  align-items: center;
${({ type_sns }) =>
    type_sns === 'naver' && 
    css`
      color: ${({ theme }) => theme.colors.neutral[0]};
    `}
`;
