import {formattedDate, formattedDateAndDay} from '../dateFormatter';

/**
 *
 * @param {number} price
 */
const DAILYFOOD = 1; //정기식사
const PRODUCT = 2; //마켓
const MEMBERSHIP = 3; //멤버십
const CATERING = 4; //케이터링

export default function withCommas(price) {
  if (!price) return '0';

  return Math.round(price)
    .toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function generateOrderCode(orderType, userId, spotId) {
  const codeType = () => {
    switch (orderType) {
      case DAILYFOOD:
        return 'S';
      case PRODUCT:
        return 'P';
      case MEMBERSHIP:
        return 'M';
      case CATERING:
        return 'C';
    }
  };
  let code = codeType();
  const now = formattedDate(new Date(), '');
  code += now.toString()?.replace('-', '');
  code += idToFiveString(userId);
  code += create4DigitKey();
  return code;
}

const idToFiveString = id => {
  const strId = id.toString();
  if (id > 10000) {
    return strId.substring(0, 4);
  } else if (id > 1000) {
    return '0' + strId;
  } else if (id > 100) {
    return '00' + strId;
  } else if (id > 10) {
    return '000' + strId;
  } else {
    return '0000' + strId;
  }
};
const spotToFiverString = id => {
  const strId = id.toString();
  if (id > 10000) {
    return strId.substring(0, 4);
  } else if (id > 1000) {
    return '0' + strId;
  } else if (id > 100) {
    return '00' + strId;
  } else if (id > 10) {
    return '000' + strId;
  } else {
    return '0000' + strId;
  }
};

const create4DigitKey = () => {
  const rnd = Math.round(Math.random() * 100000);
  const strId = rnd.toString();
  if (rnd > 10000) {
    return strId.substring(0, 4);
  } else if (rnd > 1000) {
    return strId;
  } else if (rnd > 100) {
    return '0' + strId;
  } else if (rnd > 10) {
    return '00' + strId;
  } else {
    return '000' + strId;
  }
};
