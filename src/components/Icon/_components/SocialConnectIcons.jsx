import React from 'react';
import AppleConnectIcon from '~assets/icons/SocialConnect/appleConnect.svg';
import AppleDisConnectIcon from '~assets/icons/SocialConnect/appleDisconnect.svg';
import FacebookConnectIcon from '~assets/icons/SocialConnect/facebookConnect.svg';
import FacebookDisConnectIcon from '~assets/icons/SocialConnect/facebookDisconnect.svg';
import GoogleConnectIcon from '~assets/icons/SocialConnect/googleConnect.svg';
import GoogleDisConnectIcon from '~assets/icons/SocialConnect/googleDisconnect.svg';
import KakaoConnectIcon from '~assets/icons/SocialConnect/kakaoConnect.svg';
import KakaoDisConnectIcon from '~assets/icons/SocialConnect/kakaoDisconnect.svg';
import NaverConnectIcon from '~assets/icons/SocialConnect/naverConnect.svg';
import NaverDisConnectIcon from '~assets/icons/SocialConnect/naverDisconnect.svg';

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
const Component = ({size = 40, color, social = 'NAVER', isConnect = false}) => {
  const SocialIcon = socialName => {
    switch (socialName) {
      case 'KAKAO':
        if (isConnect) {
          return <KakaoConnectIcon size={size} color={color} />;
        }
        return <KakaoDisConnectIcon size={size} color={color} />;

      case 'APPLE':
        if (isConnect) {
          return <AppleConnectIcon size={size} color={color} />;
        }
        return <AppleDisConnectIcon size={size} color={color} />;
      case 'FACEBOOK':
        if (isConnect) {
          return <FacebookConnectIcon size={size} color={color} />;
        }
        return <FacebookDisConnectIcon size={size} color={color} />;
      case 'GOOGLE':
        if (isConnect) {
          return <GoogleConnectIcon size={size} color={color} />;
        }
        return <GoogleDisConnectIcon size={size} color={color} />;
      case 'NAVER':
        if (isConnect) {
          return <NaverConnectIcon size={size} color={color} />;
        }
        return <NaverDisConnectIcon size={size} color={color} />;
      default:
        break;
    }
  };

  return <IconWrapper>{SocialIcon(social)}</IconWrapper>;
};

export default Component;
