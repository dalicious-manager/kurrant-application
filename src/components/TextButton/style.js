import { css } from 'styled-components';

import { textStyles } from '../Typography/styles';


export const getLabelSizeStyle = sizeType => {
    return labelSizeStyle[sizeType];
}

const labelSizeStyle = {
   label17SB: textStyles.BottomButtonSB,
   label17R: textStyles.BottomButtonR,
   label15SB: textStyles.Button09SB,
   label15R: textStyles.Button09R,
   label13SB: textStyles.Button10SB,
   label13R: textStyles.Button10R,

}

export const getLabelColor = type => {
    return labelColor[type];
}

const labelColor = {

    grey2: css`
        color: ${({theme}) => theme.colors.grey[2]};
    `,
    grey4: css`
        color: ${({theme}) => theme.colors.grey[4]};
    `,
    grey6: css`
        color: ${({theme}) => theme.colors.grey[6]};
    `,
    blue: css`
        color: ${({theme}) => theme.colors.blue[500]};
    `,
    red: css`
        color: ${({theme}) => theme.colors.red[500]};
    `,
    redLine: css`
    color: ${({theme}) => theme.colors.red[500]};
    text-decoration:underline;
    text-decoration-color:${({theme}) => theme.colors.red[500]};
`,

}