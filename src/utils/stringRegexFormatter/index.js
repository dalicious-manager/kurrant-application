import {faIR} from 'date-fns/locale';

export const extractNumberOnly = str => {
  if (!str.match(/[0-9]/g)) {
    return;
  }

  return str.match(/[0-9]/g).join('');
};
