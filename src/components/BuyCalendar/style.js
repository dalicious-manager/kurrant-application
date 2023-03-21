import { css } from 'styled-components';

import { textStyles } from '../Typography/styles';

export const getCircleColor = type => {
  return circleColor[type];
};

const circleColor = {

    grey2: css`
        background-color: ${({ theme }) => theme.colors.grey[2]};
    `,
    grey7: css`
        background-color: ${({ theme }) => theme.colors.grey[7]};
    `
};

export const getTodayColor = color => {
    return todayColor[color];
};

const todayColor = {
    grey2: css`
        color: ${({ theme }) => theme.colors.grey[2]};
    `,
    white: css`
        color: ${({ theme }) => theme.colors.grey[0]};
    `
}

export const getFontStyle = size => {
    return fontStyle[size];
}

const fontStyle ={
    Body05R: textStyles.Body05R,
    Body06R: textStyles.Body06R,

}