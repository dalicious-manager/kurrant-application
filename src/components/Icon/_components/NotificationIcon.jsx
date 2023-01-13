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
  const getNotifiIcon = ()=>{
    switch (name) {
      case "promotion":
        return <PromotionIcon name={name} size={size} color={color} />
      case "order":
        return <OrderIcon name={name} size={size} color={color} />
      case "notice":
        return <NoticeIcon name={name} size={size} color={color} />
      case "event":
        return <EventIcon name={name} size={size} color={color} />
      case "coupon":
        return <CouponIcon name={name} size={size} color={color} />
      case "buymeal":
        return <BuymealIcon name={name} size={size} color={color} />
      case "spot":
        return <SpotIcon name={name} size={size} color={color} />
      default:
        break;
    }
  }
  return (
    <IconWrapper>
       {getNotifiIcon()}
    </IconWrapper>
  );
};
export default Component;
