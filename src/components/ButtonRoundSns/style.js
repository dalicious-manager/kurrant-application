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
    background-color: ${({ theme }) => '#F5F5F5'}; 
  `,
  login: css`
  background-color: ${({ theme }) => '#F5F5F5'}; 
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
    border: 1px solid ${({ theme }) => '#F5F5F5'}; 
    `,
  login: css`
    border: 1px solid ${({ theme }) => '#F5F5F5'}; 
    `,
  apple: css`
    border: 1px solid ${({ theme }) => theme.colors.neutral[900]}; 
  `,
};
