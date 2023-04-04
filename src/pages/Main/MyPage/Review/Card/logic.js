// 리뷰 DDay계산해서 멘트 보이게하기, 빨간색까지 관리하기
export const calculateReviewDDay = reviewDDay => {
  // 5일

  // 빨간색 3일

  // 넘어가면 ' 리뷰 가능한 기한이 지났습니다'

  // if (reviewDDay > 3) {
  //   return [`기한 D-${reviewDDay}`, 'grey'];
  // } else if (reviewDDay > 0 && reviewDDay <= 3) {
  //   return [`기한 D-${reviewDDay}`, 'red'];
  // } else {
  //   return ['리뷰 가능한 기한이 지났습니다.', 'grey'];
  // }

  const myRegex = /\:/g;

  if (!!reviewDDay.match(myRegex)) {
    // 하루남음

    const hour = parseInt(reviewDDay.split(':')[0]);
    const minute = parseInt(reviewDDay.split(':')[1]);
    if (hour === 0) {
      // 한시간 이하로 남을 때
      return [`${minute}분 남음`, 'red'];
    } else {
      return [`${hour}시간 ${minute}분 남음`, 'red'];
    }
  } else {
    // 하루 이상 남음
    if (parseInt(reviewDDay) > 3) {
      return [`${reviewDDay}일 남음`, 'grey'];
    } else {
      return [`${reviewDDay}일 남음`, 'red'];
    }
  }
};
