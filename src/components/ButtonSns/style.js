import {css} from 'styled-components';

export const getSnsButtonColor = type => {
  return snsButtonColor[type];
};

const snsButtonColor = {
  kakao: css`
    background-color: ${({theme}) => theme.colors.etc.kakao}; 
  `,
  email: css`
    background-color: ${({theme}) => theme.colors.purple[500]}; 
  `,
  apple: css`
    background-color: ${({theme}) => theme.colors.neutral[0]}; 
  `,
};

export const getSnsButtonBorder = type => {
  return snsButtonBorder[type];
};

const snsButtonBorder = {
  kakao: css`
    border: 1px solid ${({theme}) => theme.colors.etc.kakao}; 
    `,
  email: css`
    border: 1px solid ${({theme}) => theme.colors.purple[500]}; 
    `,
  apple: css`
    border: 1px solid ${({theme}) => theme.colors.neutral[900]}; 
  `,
};
