import {css} from 'styled-components/native';

/**
 * @param {'selling' | 'buying'} type
 */
export const getTypeColor = type => {
  const common = {
    up: css`
      color: ${({theme}) => theme.colors.red[500]};
    `,
    down: css`
      color: ${({theme}) => theme.colors.blue[500]};
    `,
    normal: css`
      color: ${({theme}) => theme.colors.neutral[700]};
    `,
  };
  const colors = {
    selling: {
      font: css`
        color: ${({theme}) => theme.colors.blue[500]};
      `,
      backgroundColor: css`
        background-color: ${({theme}) => theme.colors.blue[500_1]};
      `,
      bar: css`
        background-color: ${({theme}) => theme.colors.blue[500_2]};
      `,
    },
    buying: {
      font: css`
        color: ${({theme}) => theme.colors.red[500]};
      `,
      backgroundColor: css`
        background-color: ${({theme}) => theme.colors.red[500_1]};
      `,
      bar: css`
        background-color: ${({theme}) => theme.colors.red[500_2]};
      `,
    },
  };

  const mergeColors = {...common, ...colors[type]};

  return mergeColors;
};

/**
 * @param {'selling' | 'buying'} type
 * @param {'graph' | 'percentage'} visual
 */
export const getTypeColorWithVisual = (type, visual) => {
  const common = {
    up: css`
      color: ${({theme}) => theme.colors.red[500]};
    `,
    down: css`
      color: ${({theme}) => theme.colors.blue[500]};
    `,
    normal: css`
      color: ${({theme}) => theme.colors.neutral[700]};
    `,
  };
  const colors = {
    graph_selling: {
      bar: css`
        background-color: ${({theme}) => theme.colors.blue[500_2]};
      `,
      backgroundColor: css`
        background-color: ${({theme}) => theme.colors.blue[500_1]};
      `,
    },
    graph_buying: {
      bar: css`
        background-color: ${({theme}) => theme.colors.red[500_2]};
      `,
      backgroundColor: css`
        background-color: ${({theme}) => theme.colors.red[500_1]};
      `,
    },
    percentage_selling: {
      backgroundColor: css`
        background-color: ${({theme}) => theme.colors.blue[500_3]};
      `,
    },
    percentage_buying: {
      backgroundColor: css`
        background-color: ${({theme}) => theme.colors.red[500_3]};
      `,
    },
  };

  const mergeColors = {...common, ...colors[`${visual}_${type}`]};

  return mergeColors;
};
