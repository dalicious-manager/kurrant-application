export const calculateTotalWrittenReviewList = list => {
  let sum = 0;

  list.writtenReviewList.forEach(value => {
    if (value.adminReview) {
      sum += 1;
    }
  });
  return sum;
};
