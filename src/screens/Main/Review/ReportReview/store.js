import {atomWithReset} from 'jotai/utils';
export const reportReviewInputAtom = atomWithReset({
  check1: false,
  check2: false,
  check3: false,
  check4: false,
  check5: false,
  check6: false,
  detail: '',
});
