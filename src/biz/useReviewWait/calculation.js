export const calculateTotalReviewWaitList = ReviewWaitList => {
  let sum = 0;
  ReviewWaitList.orderFood.forEach(value => {
    console.log(value);

    sum += value.orderItemDtoList.length;
  });

  console.log(sum);
  return sum;
};
