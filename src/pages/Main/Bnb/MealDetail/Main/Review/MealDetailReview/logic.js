export const buildCustomUrl = (
  dailyFoodId,
  orderFilter = 0,
  isOnlyPhoto = undefined,
  starFilter = undefined,
) => {
  const basicUrl = [`/dailyfoods/${dailyFoodId}/review?`];

  // 베스트순

  if (orderFilter + 1) {
    basicUrl.push(`sort=${orderFilter}`);
  }

  // 포토리뷰

  if (isOnlyPhoto) {
    basicUrl.push(`&photo=${isOnlyPhoto}`);
  }

  // 별점필터

  if (starFilter) {
    basicUrl.push(`&starFilter=${starFilter}`);
  }

  console.log('basicUrl');
  console.log(basicUrl);

  return basicUrl.join('');
};
