// 리뷰 DDay계산해서 멘트 보이게하기, 빨간색까지 관리하기
export const calculateReviewDDay = reviewDDay => {
  // 5일

  // 빨간색 3일

  // 넘어가면 ' 리뷰 가능한 기한이 지났습니다'

  if (reviewDDay > 3) {
    console.log(reviewDDay + ' grey');
    return [`기한 D-${reviewDDay}`, 'grey'];
  } else if (reviewDDay > 0 && reviewDDay < 3) {
    console.log(reviewDDay + ' red');
    return [`기한 D-${reviewDDay}`, 'red'];
  } else {
    return ['리뷰 가능한 기한이 지났습니다.', 'grey'];
  }
};
