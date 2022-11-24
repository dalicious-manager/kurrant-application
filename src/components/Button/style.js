import {css} from 'styled-components';

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
  `,
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
    //padding: 13px 0;
    font-size: 17px;
    line-height: 22px;
  `,
};

export const getButtonColor = type => {
  return buttonColor[type];
};

const buttonColor = {
  primary: css`
    background-color: ${({theme}) => theme.colors.purple[500]}; 
  `,
  gray: css`
    background-color: ${({theme}) => theme.colors.neutral[30]}; 
  `,
  red: css`
    background-color: ${({theme}) => theme.colors.red[500]};
  `,
  blue: css`
    background-color: ${({theme}) => theme.colors.blue[500]}; 
  `,
  yellow: css`
    background-color: ${({theme}) => theme.colors.yellow[500]};
  `
  
};


export const getDisabledColor = type => {
  return disabledButtonColor[type];
};

const disabledButtonColor = {
  primary: css`
    background-color: ${({theme}) => theme.colors.purple[400]}; 
  `,
  gray: css`
    background-color: ${({theme}) => theme.colors.neutral[30]}; 
  `,
  red: css`
    background-color:${({theme}) => theme.colors.red[400]}; 
  `,
    blue: css `
    background-color: ${({theme}) => theme.colors.blue[400]}; 
  `
};

export const getLabelColor = disabled => {
  if (disabled === true) {
    return css `
      color: ${({theme}) => theme.colors.neutral[700]}; 
    `
  } else {
    return css `
      color: ${({theme}) => theme.colors.neutral[400]}; 
    `
  }
}
