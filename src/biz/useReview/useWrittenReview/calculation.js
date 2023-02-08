export const calculateTotalWrittenReviewList = list => {
  console.log(list.writtenReviewList);

  let sum = 0;

  list.writtenReviewList.forEach(value => {
    if (value.adminReview) {
      sum += 1;
    }
  });
  return sum;
  // return list.writtenReviewList.length;
};
