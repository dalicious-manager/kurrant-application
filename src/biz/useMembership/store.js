import {atomWithReset} from 'jotai/utils';

export const isMembershipProductAtom = atomWithReset(false);
export const isMembershipJoinAtom = atomWithReset(false);
export const isMembershipTerminateAtom = atomWithReset(false);
export const isMembershipHistoryLoadingAtom = atomWithReset(false);
export const isMembershipHistoryAtom = atomWithReset(false);
export const isMembershipTypeAtom = atomWithReset(false);
export const isMembershipInfoLoadingAtom = atomWithReset(false);
export const membershipInfoAtom = atomWithReset({});
