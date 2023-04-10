export const calculateTotalReviewWaitList = ReviewWaitList => {
  let sum = 0;
  ReviewWaitList.orderFood.forEach(value => {
    sum += value.orderItemDtoList.length;
  });

  return sum;
};
