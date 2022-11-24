import { css } from "styled-components";

export const getToggleWrapBackground = disabled => {
  if(disabled) {
    return css `
      background-color: ${({ theme }) => theme.colors.neutral[200]};
    `
  } else {
    return css `
      background-color: ${({ theme }) => theme.colors.neutral[30]};
    `
  }
};


export const getToggleWrapSize = size => {
  return toggleWrapSize[size];
};

const toggleWrapSize = {
  sm: css `
    width: 124px;
    height: 28px;
  `,
  md: css `
    width: 179px;
    height: 32px;
  `,
  lg: css `
    width: 100%;
    height: 44px;
  `,
}

export const getToggleSize = size => {
  return toggleSize[size];
};

const toggleSize = {
  sm: css `
    width: 59px;
    padding: 2px;
  `,
  md: css `
    width: 85px;
    padding: 4px;
  `,
  lg: css `
    width: 48%;
    padding: 10px;
  `,
}

export const getFontStyle = size => {
  return fontStyle[size];
};

const fontStyle = {
  sm: css `
    font-size: 10px;
    line-height: 16px;
    font-weight: 500;
  `,
  md: css `
    font-size: 12px;
    line-height: 18px;
    font-weight: 500;
  `,
  lg: css `
    font-size: 14px;
    line-height: 18px;
    font-weight: 500;
  `,
}