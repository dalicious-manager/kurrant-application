export {default} from './hook';
export * as Fetch from './Fetch';

import {timeLeftIndicator} from '../../utils/dateFormatter';
import {extractNumberOnly} from '../../utils/stringRegexFormatter';

export const isDueDateCloseRenderRed = (dueDate, orderDate) => {
  return timeLeftIndicator(dueDate, orderDate)[1];
};
