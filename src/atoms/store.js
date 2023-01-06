import { atomWithReset } from 'jotai/utils';

import { PAGE_NAME as LoginPageName } from '../pages/Main/Login/Login';


export const pageNameAtom = atomWithReset(LoginPageName);