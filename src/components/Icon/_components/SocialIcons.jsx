import React from 'react';

import AppleIcon from '~assets/icons/Social/apple.svg';
import FacebookIcon from '~assets/icons/Social/facebook.svg';
import GeneralIcon from '~assets/icons/Social/general.svg';
import GoogleIcon from '~assets/icons/Social/google.svg';
import KakaoIcon from '~assets/icons/Social/kakao.svg';
import NaverIcon from '~assets/icons/Social/naver.svg';

import IconWrapper from '../component';
/**
 *
 * @param {object} props
 * @param {'arrow-down'} props.name
 * @param {number} props.size
 * @param {string} props.color
 * @Reference https://oblador.github.io/react-native-vector-icons/
 * @returns
 */
const Component = ({size = 16, color, social='GENERAL'}) => {

  const SocialIcon = (socialName)=>{
    switch (socialName) {
      case 'GENERAL':
        return <GeneralIcon  
          size={size}
          color={color}
        />
      case 'KAKAO':
        return  <KakaoIcon 
          size={size}
          color={color}
        />;
      case 'APPLE':
        return <AppleIcon 
          size={size}
          color={color}
        />;
      case 'FACEBOOK':
        return <FacebookIcon 
          size={size}
          color={color}
        />;
      case 'GOOGLE':
        return <GoogleIcon 
          size={size}
          color={color}
        />;
      case 'NAVER':
        return <NaverIcon 
          size={size}
          color={color}
        />;
      default:
        break;
    }
  }

  return (
    <IconWrapper>
      {SocialIcon(social)}
    </IconWrapper>
  );
};

export default Component;
