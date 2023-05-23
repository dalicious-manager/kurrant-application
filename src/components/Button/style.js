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
  full: css`
    width: 100%;
    height: 56px;
  `,
  middle: css`
    width: 279px;
    height: 56px;
  `,
  half: css`
    width: 162px;
    height: 56px;
  `,
  modalFull: css`
    width: 100%;
    height: 50px;
  `,
  modalHalf: css`
    width: 160px;
    height: 50px;
  `,
  button38: css`
    width: 100%;
    height: 38px;
  `,
  button32: css`
    width: 73px;
    height: 32px;
  `,
  login: css`
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
    padding: 13px 0;
    font-size: 17px;
    line-height: 22px;
  `,
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
    box-sizing: border-box;
  `,
  white: css`
    background-color: ${({theme}) => theme.colors.grey[0]};
    border: ${({theme}) => `1px solid ${theme.colors.grey[5]}`};
    box-sizing: border-box;
  `,
  white2: css`
    background-color: ${({theme}) => theme.colors.grey[0]};
    border: ${({theme}) => `1px solid ${theme.colors.grey[5]}`};
    box-sizing: border-box;
  `,
  yellow: css`
    background-color: ${({theme}) => theme.colors.yellow[500]};
  `,
  login: css`
    background-color: ${({theme}) => theme.colors.yellow[500]};
  `,
  purple: css`
    background-color: ${({theme}) => theme.colors.purple[500]};
  `,
};

export const getDisabledColor = type => {
  return disabledButtonColor[type];
};

const disabledButtonColor = {
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
    border: ${({theme}) => `1px solid ${theme.colors.grey[7]}`};
    box-sizing: border-box;
  `,
  white2: css`
    background-color: ${({theme}) => theme.colors.grey[0]};
    border: ${({theme}) => `1px solid ${theme.colors.grey[7]}`};
    box-sizing: border-box;
  `,
  yellow: css`
    background-color: ${({theme}) => theme.colors.yellow[100]};
  `,
  login: css`
    background-color: ${({theme}) => theme.colors.yellow[100]};
  `,
  map: css`
    background-color: ${({theme}) => theme.colors.grey[7]};
  `,
};

export const getLabelColor = (disabled, type) => {
  if (disabled === true) {
    return css`
      color: ${({theme}) => theme.colors.grey[0]};
    `;
  } else if (type !== 'grey2' && type !== 'grey3' && type !== 'white') {
    return css`
      color: ${({theme}) => theme.colors.grey[1]};
    `;
  } else if (type === 'white') {
    return css`
      color: ${({theme}) => theme.colors.grey[3]};
    `;
  } else {
    return css`
      color: ${({theme}) => theme.colors.grey[0]};
    `;
  }
};
