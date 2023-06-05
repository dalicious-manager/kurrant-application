import {atomWithReset} from 'jotai/utils';
export const currentPageAtom = atomWithReset();

// 지도
export const locationInfoAtom = atomWithReset();
export const userLocationAtom = atomWithReset({
  latitude: 37.49703,
  longitude: 127.028191,
});

export const mainDimAtom = atomWithReset(true);
