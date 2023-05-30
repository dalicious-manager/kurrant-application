export const buildCustomUrl = (
  dailyFoodId,
  orderFilter = 0,
  isOnlyPhoto = undefined,
  rateSelected = [],
  page = 1,
  limit = 10,
) => {
  const basicUrl = [
    `/dailyfoods/${dailyFoodId}/review?&page=${page}&limit=${limit}`,
  ];

  // 베스트순

  if (orderFilter + 1) {
    basicUrl.push(`&sort=${orderFilter}`);
  }

  // 포토리뷰

  if (isOnlyPhoto) {
    // basicUrl.push(`&photo=${isOnlyPhoto}`);
    basicUrl.push(`&photo=1`);
  } else {
  }

  // 별점필터

  //   rateSelected

  if (rateSelected.length > 0) {
    basicUrl.push(`&starFilter=${rateSelected.join(',')}`);
  }

  console.log('basicUrl');
  console.log(basicUrl);

  return basicUrl.join('');
};

export const modifyStarRatingCount = starRatingCount =>
  Object.entries(starRatingCount).map((v, i) => {
    return {
      id: v[0],
      text: v[0],
      reviewCount: v[1],
    };
  });
