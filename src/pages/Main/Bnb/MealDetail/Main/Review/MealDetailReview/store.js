import {atomWithReset} from 'jotai/utils';
export const infiniteQueryRefetchStatusAtom = atomWithReset('');
export const isFetchingReviewDetailAtom = atomWithReset(false);
export const hasNextPageReviewDetailAtom = atomWithReset(false);
export const fetchNextPageReviewDetailAtom = atomWithReset(undefined);
