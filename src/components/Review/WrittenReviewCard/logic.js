export const isOverThreeLines = text => {
  const numberOfLineChange = (text.match(/\n/g) || []).length;
  if (numberOfLineChange === 0) {
    // 0개일떄
    if (text.length / 24 > 3) {
      return true;
    } else {
      return false;
    }
  } else if (numberOfLineChange == 1) {
    if (text.length / 24 > 2) {
      return true;
    } else {
      return false;
    }
  } else if (numberOfLineChange == 2) {
    if (text.length / 24 > 1) {
      return true;
    } else {
      return false;
    }
  } else if (numberOfLineChange >= 3) {
    return true;
  } else {
    return false;
  }
};
