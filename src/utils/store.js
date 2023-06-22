import {atomWithReset} from 'jotai/utils';
export const currentPageAtom = atomWithReset();

// 지도
export const locationInfoAtom = atomWithReset();
export const userLocationAtom = atomWithReset({
  latitude: 37.49703,
  longitude: 127.028191,
});
export const myLocationAtom = atomWithReset({
  latitude: 37.49703,
  longitude: 127.028191,
});

export const mainDimAtom = atomWithReset(false);

export const mySpotRootAtom = atomWithReset();

// 공유스팟 필터
export const mealTouchAtom = atomWithReset([1, 2, 3]);
export const touchInfoAtom = atomWithReset([1]);
