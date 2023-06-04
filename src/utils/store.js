import {atomWithReset} from 'jotai/utils';
export const currentPageAtom = atomWithReset();

// 지도
export const locationInfoAtom = atomWithReset();
export const userLocationAtom = atomWithReset({
  latitude: 0,
  longitude: 0,
});

export const mainDimAtom = atomWithReset(true);
