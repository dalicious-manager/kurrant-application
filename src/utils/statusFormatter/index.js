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
      return '배송대기';
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
      return '배송대기';
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
