import React, {useEffect} from 'react';

import Wrapper from '~components/Wrapper';
import {StackActions, useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';
import PaymentContainer from './components/PaymentContainer';
import {PurchaseDetailPageName} from '../../../MyPage/PurchaseHistory/Detail';
export const PAGE_NAME = 'P__PAYMENT__MEAL_PAYMENT';

const Pages = ({route}) => {
  const params = route.params;
  const navigation = useNavigation();
  const paymentsData = () => {
    if (params.easyPay !== 'NOMAL') {
      return {
        orderId: params.orderId,
        amount: params.amount,
        customerName: params.name,
        customerEmail: params.email,
        easyPay: params.easyPay,
        flowMode: params.flowMode,
        orderName: params.orderName,
        successUrl:
          Config.NODE_ENV === 'dev'
            ? `http://3.35.197.186/admin/success.php`
            : 'http://3.35.197.186/admin/success2.php',
        failUrl: 'http://3.35.197.186:8882/fail',
      };
    } else {
      return {
        orderId: params.orderId,
        amount: params.amount,
        customerName: params.name,
        customerEmail: params.email,
        flowMode: params.flowMode,
        cardCompany: params.cardCompany,
        orderName: params.orderName,
        successUrl:
          Config.NODE_ENV === 'dev'
            ? `http://3.35.197.186/admin/success.php`
            : 'http://3.35.197.186/admin/success2.php',
        failUrl: 'http://3.35.197.186:8882/fail',
      };
    }
  };
  console.log(
    Config.NODE_ENV === 'prod'
      ? Config.TOSS_PAYMENT_CLIENT_KEY
      : Config.TOSS_PAYMENT_CLIENT_TEST_KEY,
  );
  return (
    <Wrapper paddingTop={24}>
      <PaymentContainer
        clientKey={
          Config.NODE_ENV === 'prod'
            ? Config.TOSS_PAYMENT_CLIENT_KEY
            : Config.TOSS_PAYMENT_CLIENT_TEST_KEY
        }
        payment={paymentsData()}
        onApproveError={v => {
          console.log('에러', v);
        }}
        onApproveFailed={() => {
          console.log('teset');
        }}
        onApproveSucceed={v => {
          // console.log(v)
          // Clipboard.setString(v.paymentKey);
          // navigation.goBack();
          if (v) {
            const resetAction = StackActions.popToTop();
            navigation.dispatch(resetAction);
            navigation.navigate(PurchaseDetailPageName, {
              id: v,
            });
          }
        }}
        orderItems={params.orderItems}
      />
    </Wrapper>
  );
};

export default Pages;
