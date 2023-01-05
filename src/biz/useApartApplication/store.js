import { atomWithReset } from 'jotai/utils';


// 개벼 ㄹ
export const isApartUserNameAtom = atomWithReset('');
export const isApartUserPhoneAtom = atomWithReset('');
export const isApartUserEmailAtom = atomWithReset('');


// export const isApartexport const isApartmentApplicant = atomWithReset({})

// export const isApartFullAddressAtom = atomWithReset({});
// export const isApartSendAddressAtom = atomWithReset({});
// export const isApartSendAddressInfoAtom = atomWithReset({});

// export const isApartMealInfoAtom = atomWithReset({});


// export const apartDeliveryAtom = atomWithReset();Atom = atomWithReset('');
// export const isApartAddressAtom = atomWithReset('');
// export const isApartAddressAtom = atomWithReset('');
// export const isApartAddressAtom = atomWithReset('');
// export const isApartAddressAtom = atomWithReset('');

// 사용하고 있는거
export const isApartmentApplicant = atomWithReset({})

export const isApartFullAddressAtom = atomWithReset('');
export const isApartSendAddressAtom = atomWithReset({});
export const isApartSendAddressInfoAtom = atomWithReset({});

export const isApartMealInfoAtom = atomWithReset(null);


export const apartDeliveryAtom = atomWithReset('');

export const apartMemoAtom = atomWithReset('');
// 배송 날짜 
export const apartApplicationDate = atomWithReset('');

// Fecth Atom

export const isApartApplicationCheckAtom = atomWithReset([]);

// 신청 응답값

export const apartApplicationResAtom = atomWithReset({});

// 스팟 신청 목록 조회

export const apartApplicationListAtom = atomWithReset([]);

// 요일

export const apartApplicationWeek = atomWithReset([]);
