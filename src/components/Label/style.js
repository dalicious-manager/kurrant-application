import {css} from 'styled-components';

import {textStyles} from '../Typography/styles';

export const getLabelSizeStyle = sizeType => {
  return labelSizeStyle[sizeType];
};

const labelSizeStyle = {
  labelM: textStyles.Body06R,
  labelS: textStyles.SmallLabel,
  labelSpot: textStyles.Body06R,
};

export const getLabelWrapColor = type => {
  return labelWrapColor[type];
};

const labelWrapColor = {


    grey2: css`
        background-color: ${({ theme }) => theme.colors.grey[2]};
    `,
    grey8: css`
        background-color: ${({ theme }) => theme.colors.grey[8]};
    `,
    green: css`
        background-color: ${({ theme }) => theme.colors.green[100]};
    `,
    vegan: css`
        background-color: ${({ theme }) => theme.colors.green[500]};
    `,
    blue: css`
        background-color: ${({ theme }) => theme.colors.blue[100]};
    `,
    red: css`
        background-color: ${({ theme }) => theme.colors.red[100]};
    `,
    purple: css`
        background-color: ${({ theme }) => theme.colors.purple[100]};
    `,
    outline: css`
        border: 1px solid ${({ theme }) => theme.colors.grey[6]};
        background-color: ${({ theme }) => theme.colors.grey[0]};
    `,
    soldOut: css`
        background-color: ${({ theme }) => theme.colors.grey[6]};
    `,
      grey: css`
    background-color: ${({theme}) => theme.colors.grey[8]};
  `

}


export const getLabelColor = type => {
  return labelColor[type];
};
const labelColor = {


    grey2: css`
        color: ${({ theme }) => theme.colors.grey[0]};
    `,
    grey8: css`
        color: ${({ theme }) => theme.colors.grey[4]};
    `,
    green: css`
        color: ${({ theme }) => theme.colors.green[500]};
    `,
    blue: css`
        color: ${({ theme }) => theme.colors.blue[500]};
    `,
    red: css`
        color: ${({ theme }) => theme.colors.red[500]};
    `,
    purple: css`
        color: ${({ theme }) => theme.colors.purple[500]};
    `,
    outline: css`
        color: ${({ theme }) => theme.colors.grey[3]};
    `,
    soldOut: css`
        color: ${({ theme }) => theme.colors.grey[0]};
    `,
    vegan: css`
        color: ${({ theme }) => theme.colors.grey[0]};
    `,
      grey: css`
    color: ${({theme}) => theme.colors.grey[3]};
  `,

}

