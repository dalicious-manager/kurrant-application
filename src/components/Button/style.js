import { css } from 'styled-components';

export const getButtonSizeStyles = sizeType => {
  return btnSizeStyle[sizeType];
};

const btnSizeStyle = {
  xs: css`
    width: 40px;
  `,
  sm: css`
    width: 58px;
  `,
  md: css`
    width: 58px;
  `,
  lg: css`
    width: 58px;
  `,
  xl: css`
    width: 100%;
    height: 56px;
  `
};

export const getButtonLabelStyles = sizeType => {
  return labelSizeStyle[sizeType];
};

const labelSizeStyle = {
  xs: css`
    padding: 2px 0;
    font-size: 10px;
    line-height: 16px;
  `,
  sm: css`
    padding: 7px 0;
    font-size: 12px;
    line-height: 18px;
  `,
  md: css`
    padding: 9px 0;
    font-size: 12px;
    line-height: 18px;
  `,
  lg: css`
    padding: 11px 0;
    font-size: 12px;
    line-height: 18px;
  `,
  xl: css`
    padding: 13px 0;
    font-size: 17px;
    line-height: 22px;
  `
};

export const getButtonColor = type => {
  return buttonColor[type];
};

const buttonColor = {

  grey2: css`
    background-color: ${({theme}) => theme.colors.grey[2]}; 
  `,
  grey3: css`
    background-color: ${({theme}) => theme.colors.grey[3]}; 
  `,
  grey7: css`
    background-color: ${({theme}) => theme.colors.grey[7]};
  `,
  white: css`
    background-color: ${({theme}) => theme.colors.grey[0]}; 
    border-color:${({theme}) => theme.colors.grey[5]};
  `,
  yellow: css`
    background-color: ${({ theme }) => theme.colors.yellow[500]};
  `,
  login: css`
    background-color: ${({ theme }) => theme.colors.yellow[500]};
  `

};


export const getDisabledColor = type => {
  return disabledButtonColor[type];
};

const disabledButtonColor = {
\
  grey2: css`
    background-color: ${({theme}) => theme.colors.grey[8]}; 
  `,
  grey3: css`
    background-color: ${({theme}) => theme.colors.grey[8]}; 
  `,
  grey7: css`
    background-color: ${({theme}) => theme.colors.grey[8]};
  `,
  white: css`
    background-color: ${({theme}) => theme.colors.grey[0]}; 
    border-color:${({theme}) => theme.colors.grey[7]};
  `,
  yellow: css`
    background-color: ${({theme}) => theme.colors.yellow[100]};
  `,
  login: css`
    background-color: ${({ theme }) => theme.colors.yellow[100]}; 
  `
};

export const getLabelColor = disabled => {
  if (disabled === true) {
    return css`
      color: ${({ theme }) => theme.colors.neutral[700]}; 
    `
  } else {
    return css`
      color: ${({ theme }) => theme.colors.neutral[400]}; 
    `
  }
}
