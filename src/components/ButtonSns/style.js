import { css } from 'styled-components';

export const getSnsButtonColor = type => {
  return snsButtonColor[type];
};

const snsButtonColor = {
  kakao: css`
    background-color: ${({ theme }) => theme.colors.etc.kakao}; 
  `,
  naver: css`
    background-color: ${({ theme }) => theme.colors.etc.naver}; 
  `,
  email: css`
    background-color: ${({ theme }) => '#ffffff'}; 
  `,
  login: css`
    background-color: ${({ theme }) => theme.colors.yellow[500]}; 
  `,
  apple: css`
    background-color: ${({ theme }) => theme.colors.neutral[0]}; 
  `,
};

export const getSnsButtonBorder = type => {
  return snsButtonBorder[type];
};

const snsButtonBorder = {
  kakao: css`
    border: 1px solid ${({ theme }) => theme.colors.etc.kakao}; 
    `,
  naver: css`
    border: 1px solid ${({ theme }) => theme.colors.etc.naver}; 
    `,
  email: css`
    border: 1px solid ${({ theme }) => '#BDBAC1'}; 
    `,
  login: css`
    `,
  apple: css`
    border: 1px solid ${({ theme }) => theme.colors.neutral[900]}; 
  `,
};
