import {css} from 'styled-components';

export const getChipColor = type => {
  return chipColor[type];
}

const chipColor = {
  auth_need: css `${({theme}) => theme.colors.neutral[400]}`,
  auth_ing: css `${({theme}) => theme.colors.yellow[500]}`,
  auth_ed: css `${({theme}) => theme.colors.purple[500]}`,
  auth_deny: css `${({theme}) => theme.colors.red[500]}`,
}