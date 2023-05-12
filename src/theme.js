// Grey
export const grey = {
  0: '#FFFFFF', // white
  8: '#F5F5F5', // grey 8
  7: '#E4E3E7', // grey 7
  6: '#D5D4D9', // grey 6
  5: '#BDBAC1', // grey 5
  4: '#88888E', // grey 4
  3: '#5F5E62', // grey 3
  2: '#343337', // grey 2
  1: '#1D1C21', // grey 1
};

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
  100: '#EFF2FE',
  500: '#3478F6',
};

// Red
export const red = {
  100: '#FFEAEA',

  500: '#DD5257',
};

// Yellow
export const yellow = {
  100: '#FFF9E5',
  500: '#FDC800',
};

// Green
export const green = {
  100: '#F2FBF6',
  500: '#2AC769',
};

// Purple
export const purple = {
  100: '#F5F2FF',
  500: '#5A1EFF',
  600: '#000046',
};

export const etc = {
  kakao: '#FFE812',
  naver: '#4FA42B',
};

const colors = {
  grey,
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
    fontFamily: 'Pretendard-Regular',
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
