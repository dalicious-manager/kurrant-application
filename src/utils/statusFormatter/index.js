/**
 *
 * @param {number} data
 */
export function formattedMealFoodStatus(data) {
  switch (data) {
    case 1:
      return '문의중';
    case 2:
      return '처리중';
    case 3:
      return '결제대기중';
    case 4:
      return '주문실패';
    case 5:
      return '결제완료';
    case 6:
      return '상품준비중';
    case 7:
      return '취소';
    case 8:
      return '취소대기';
    case 9:
      return '배송중';
    case 10:
      return '배송완료';
    case 11:
      return '수령완료';
    case 12:
      return '수동 환불';
    case 13:
      return '자동 환불';
    case 14:
      return '리뷰 작성 완료';
    default:
      break;
  }
}
export const foodCompleteStatusData = [
  {
    key: '판매대기',
    text: '판매대기',
    value: 0,
  },
  {
    key: '판매중',
    text: '판매중',
    value: 1,
  },
  {
    key: '품절',
    text: '품절',
    value: 2,
  },
  {
    key: '취소불가품',
    text: '취소불가품',
    value: 3,
  },
  {
    key: '판매중지',
    text: '판매중지',
    value: 4,
  },
  {
    key: '등록대기',
    text: '등록대기',
    value: 5,
  },
  {
    key: '주문마감',
    text: '주문마감',
    value: 6,
  },
];

export function formattedDailyFoodStatus(data) {
  switch (data) {
    case 0:
      return '판매대기';
    case 1:
      return '판매중';
    case 2:
      return '품절';
    case 3:
      return '취소불가품';
    case 4:
      return '판매중지';
    case 5:
      return '등록대기';
    case 6:
      return '주문마감';
    default:
      break;
  }
}
export function formattedCatorFoodStatus(data) {
  switch (data) {
    case 1:
      return '문의중';
    case 2:
      return '처리중';
    case 3:
      return '결제대기중';
    case 4:
      return '주문실패';
    case 5:
      return '결제완료';
    case 6:
      return '상품준비중';
    case 7:
      return '주문취소';
    case 8:
      return '배송중';
    case 9:
      return '진행완료';
    case 10:
      return '환불';
    case 11:
      return '환불';
    default:
      break;
  }
}
export function formattedCardCode(data) {
  switch (data) {
    case 51:
      return '삼성카드';
    case 33:
      return '우리카드';
    case 41:
      return '신한카드';
    case 61:
      return '현대카드';
    case 11:
      return 'KB국민카드';
    case 71:
      return '롯데카드';
    case 91:
      return 'NH농협카드';
    case 31:
      return '비씨카드';
    case 21:
      return '하나카드';
    case 36:
      return '씨티카드';
    case 15:
      return '카카오뱅크카드';
    default:
      break;
  }
}
export function formattedLogin(data) {
  switch (data) {
    case 'GOOGLE':
      return '구글 로그인';
    case 'APPLE':
      return '애플 로그인';
    case 'NAVER':
      return '네이버 로그인';
    case 'FACEBOOK':
      return '페이스북 로그인';
    case 'KAKAO':
      return '카카오 로그인';
    default:
      return data;
  }
}
export const cardListData = [
  {id: 51, text: '삼성카드'},
  // {id: 33, text: '우리카드'},
  {id: 41, text: '신한카드'},
  {id: 61, text: '현대카드'},
  {id: 11, text: 'KB국민카드 (곧 사용 가능해요)'},
  {id: 71, text: '롯데카드'},
  {id: 91, text: 'NH농협카드'},
  {id: 31, text: '비씨카드'},
  {id: 21, text: '하나카드'},
  // {id: 36, text: '씨티카드'},
  // {id: 15, text: '카카오뱅크카드'},
];
export function formattedBoardOptionStatus(data) {
  if (data.length === 1 && data[0] === 0) {
    return '[공지] ';
  } else if (
    data.length === 2 &&
    (data[0] === 1 || data[0] === 2) &&
    (data[1] === 1 || data[1] === 2)
  ) {
    return '[이벤트] ';
  } else if (data.length === 1 && data[0] === 2) {
    return '[이벤트] ';
  } else {
    return '';
  }
}
