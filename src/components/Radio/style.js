import {css} from 'styled-components';

export const getBackgroundColor = checked => {
  if (checked) {
    return css`
      background-color: ${({theme}) => theme.colors.purple[500]};
    `;
  } else {
    return css`
      background-color: ${({theme}) => theme.colors.neutral[0]};
    `;
  }
};

export const getBorderColor = checked => {
  if (checked) {
    return css`
      border: 1px solid ${({theme}) => theme.colors.purple[500]};
    `;
  } else {
    return css`
      border: 1px solid ${({theme}) => theme.colors.neutral[50]};
    `;
  }
};

export const getTextColor = checked => {
  if (checked) {
    return css`
      color: ${({theme}) => theme.colors.neutral[0]};
    `;
  } else {
    return css`
      color: ${({theme}) => theme.colors.neutral[500]};
    `;
  }
};
