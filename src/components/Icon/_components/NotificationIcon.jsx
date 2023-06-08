import React from 'react';

import BuymealIcon from '../../../assets/icons/NotificationCenter/buymeal.svg';
import CouponIcon from '../../../assets/icons/NotificationCenter/coupon.svg';
import EventIcon from '../../../assets/icons/NotificationCenter/event.svg';
import NoticeIcon from '../../../assets/icons/NotificationCenter/notice.svg';
import OrderIcon from '../../../assets/icons/NotificationCenter/order.svg';
import PromotionIcon from '../../../assets/icons/NotificationCenter/promotion.svg';
import SpotIcon from '../../../assets/icons/NotificationCenter/spot.svg';
import IconWrapper from '../component';
/**
 *
 * @param {object} props
 * @param {string} props.name
 * @returns
 */

const Component = ({name, size = 16, color}) => {
  const getNotifiIcon = () => {
    switch (name) {
      case '프로모션':
        return <PromotionIcon name={name} size={size} color={color} />;
      case '주문상태':
        return <OrderIcon name={name} size={size} color={color} />;
      case '공지':
        return <NoticeIcon name={name} size={size} color={color} />;
      case '이벤트':
        return <EventIcon name={name} size={size} color={color} />;
      case '쿠폰':
        return <CouponIcon name={name} size={size} color={color} />;
      case '정기식사':
        return <BuymealIcon name={name} size={size} color={color} />;
      case '스팟공지':
        return <SpotIcon name={name} size={size} color={color} />;
      default:
        break;
    }
  };
  return <IconWrapper>{getNotifiIcon()}</IconWrapper>;
};
export default Component;
