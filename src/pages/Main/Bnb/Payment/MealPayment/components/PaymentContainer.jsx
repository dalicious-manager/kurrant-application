import React, {useCallback} from 'react';
import Payment from './Payments';

const PaymentContainer = ({
  clientKey,
  payment,
  onLoading,
  orderItems,
  onApproveError,
  onApproveFailed,
  onApproveSucceed,
}) => {
  const onWebViewMessageReceived = useCallback(
    async e => {
      const tossPaymentMessageFromWeb = JSON.parse(e.nativeEvent.data);
      console.log(tossPaymentMessageFromWeb);
      // 웹뷰로 부터 성공 및 실패 둘중 아무것도 받지못했을떄.
      if (!tossPaymentMessageFromWeb.type) {
        onApproveError();
        return;
      }
      // 결제 실패했을경우
      if (tossPaymentMessageFromWeb.type === 'fail') {
        onApproveFailed(tossPaymentMessageFromWeb.data);
        return;
      }
      // 결제 승인되었을경우
      onApproveSucceed(tossPaymentMessageFromWeb.data);
    },
    [onApproveSucceed, onApproveError, onApproveFailed],
  );

  const detectIsLoading = useCallback(
    isLoading => {
      if (!onLoading) {
        return;
      }
      onLoading(isLoading);
    },
    [onLoading],
  );

  return (
    <Payment
      clientKey={clientKey}
      payment={payment}
      onWebViewMessageReceived={onWebViewMessageReceived}
      detectIsLoading={detectIsLoading}
      orderItems={orderItems}
    />
  );
};

export default PaymentContainer;
