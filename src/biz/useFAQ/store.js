import { atomWithReset } from 'jotai/utils';

export const FAQAtom = atomWithReset();
export const FAQTitleAtom = atomWithReset();
export const isGetFAQLoadingAtom = atomWithReset(false);