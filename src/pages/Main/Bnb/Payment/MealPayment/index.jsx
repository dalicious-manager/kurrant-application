import React, {useEffect} from 'react';

import Wrapper from '~components/Wrapper';
import {StackActions, useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';
import PaymentContainer from './components/PaymentContainer';
import {PurchaseDetailPageName} from '../../../MyPage/PurchaseHistory/Detail';
import {Alert} from 'react-native';
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
        appScheme: 'kurrant://',
        flowMode: params.flowMode,
        orderName: params.orderName,
        successUrl:
          Config.NODE_ENV === 'dev'
            ? `http://3.35.197.186/admin/success.php`
            : 'https://admin.dalicious.co/success',
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
        appScheme: 'kurrant://',
        orderName: params.orderName,
        successUrl:
          Config.NODE_ENV === 'dev'
            ? `http://3.35.197.186/admin/success.php`
            : 'https://admin.dalicious.co/success',
        failUrl: 'http://3.35.197.186:8882/fail',
      };
    }
  };
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
          Alert.alert('결재 실패', '결재를 실패하셨습니다.');
          navigation.goBack();
        }}
        onApproveSucceed={v => {
          // Clipboard.setString(v.paymentKey);
          // navigation.goBack();
          if (v.data) {
            const resetAction = StackActions.popToTop();
            navigation.dispatch(resetAction);
            navigation.navigate(PurchaseDetailPageName, {
              id: v.data,
            });
          }
        }}
        orderItems={params.orderItems}
      />
    </Wrapper>
  );
};

export default Pages;
