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
      return '주문취소';
    case 8:
      return '배송중';
    case 9:
      return '배송완료';
    case 10:
      return '수령완료';
    case 11:
      return '환불';
    case 12:
      return '환불';
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