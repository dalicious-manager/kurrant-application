export const neutral = {
  0: '#FFFFFF',
  30: '#f5f6f8',
  50: '#eeeeee',
  200: '#e1e4e7',
  300: '#d4d8dd',
  400: '#a9acae',
  500: '#888888',
  700: '#424242',
  900: '#000000',
};

// Blue
export const blue = {
  50: '#F2F3FA',
  400: '#9FA5D9',
  500: '#0011a7',
  500_1: '#E8E9F1',
  500_2: '#D6D8EB',
  500_3: '#F2F3FA',
};

// Red
export const red = {
  50: '#FCF2F2',
  300: '#fff7f7',
  400: '#f2b3b3',
  500: '#d10000',
  500_1: '#F3E8E8',
  500_2: '#F0D6D6',
  500_3: '#FCF2F2',
};

// Yellow
export const yellow = {
  500: '#ff9900',
};

// Green
export const green = {
  500: '#3fab2e',
};

export const purple = {
  300: '#dff0ff',
  400: '#b3d8f9',
  500: '#006adc',
};

export const etc = {
  kakao: '#fcec4e',
};

const colors = {
  blue,
  neutral,
  red,
  yellow,
  green,
  purple,
  etc,
};

const Theme = {
  font: {
    fontFamily: 'NotoSansKR-Regular',
  },
  colors,
  padding: {
    content: 18,
  },
  paddingWrapSm: 12,
  paddingVertical: 16,
  paddingWrap: 18,
  paddingVerticalLg: 40,
};

export default Theme;
