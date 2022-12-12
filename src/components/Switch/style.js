import {css} from 'styled-components';

export const getToggleBackgroundColor = Type => {
  if(Type) {
    return css `
      background-color: ${({theme}) => theme.colors.yellow[500]};
    `
  } else {
    return css `
      background-color: ${({theme}) => theme.colors.neutral[300]};
    `
  }
};

export const getToggleWrapSize = size => {
  return ToggleWrapSize[size];
};

const ToggleWrapSize = {
  md: css`
    width: 51px;
    height: 31px;
  `,
  sm: css`
    width: 28px;
    height: 16px;
  `,
};

export const getToggleSize = size => {
  return ToggleSize[size];
};

const ToggleSize = {
  md: css`
    width: 27px;
    height: 27px;
  `,
  sm: css`
    width: 10px;
    height: 10px;
  `,
};

export const getToggleTop = (size, agree) => {
  if(agree){
  if (size === 'md') {
    return css`
      top: 2px;
      left: 22px;
    `;
  } else {
    return css`
      top: 3px;
      left: 14px;
    `;
  }} else {
  if (size === 'md') {
    return css`
      top: 2px;
      left: 2px;
    `;
  } else {
    return css`
      top: 3px;
      left: 3px;
    `;
  }

  }
};