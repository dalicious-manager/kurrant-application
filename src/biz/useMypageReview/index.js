import {timeLeftIndicator} from '../../utils/dateFormatter';
import {extractNumberOnly} from '../../utils/stringRegexFormatter';

export const isDueDateClose = (dueDate, orderDate) => {
  return extractNumberOnly(timeLeftIndicator(dueDate, orderDate)) < 3;
};
