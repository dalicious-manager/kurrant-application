import { atomWithReset } from 'jotai/utils';


export const isPurchaseLoadingAtom = atomWithReset(false);
export const isMarketPurchaseLoadingAtom = atomWithReset(false);
export const isCatorPurchaseLoadingAtom = atomWithReset(false);
export const isMealPurchaseLoadingAtom = atomWithReset(false);
export const isPurchaseDetailLoadingAtom = atomWithReset(false);
export const purchaseAtom = atomWithReset([]);
export const purchaseMealAtom = atomWithReset([]);
export const purchaseMarketAtom = atomWithReset([]);
export const purchaseCatorAtom = atomWithReset([]);
export const purchaseDetailAtom = atomWithReset({});


