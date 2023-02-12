import React, { useRef } from 'react';

import Wrapper from "~components/Wrapper";
import { Dimensions } from 'react-native';
import TossPayment from 'react-native-toss-payments';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import BackButton from '../../../../../components/BackButton';
import Config from 'react-native-config';
import PaymentContainer from './components/PaymentContainer';

export const PAGE_NAME = "P__PAYMENT__MEAL_PAYMENT";

const Pages = ({route})=>{
    const params = route.params
   const navigation = useNavigation();
    return(
        <Wrapper paddingTop={24}>
            <PaymentContainer
                clientKey={Config.TOSS_PAYMENT_CLIENT_KEY}
                payment={{ orderId: params.orderId,
                amount: params.amount,
                customerName: params.name,
                customerEmail: params.email,
                orderName: params.orderName,
                successUrl: `http://15.165.39.55/admin/success.php`,
                failUrl: 'http://15.165.39.55:8882/fail',}}
                onApproveError={(v) => {console.log("에러",v)}}
                onApproveFailed={() => {console.log("teset")}}
                onApproveSucceed={(v) => {
                    console.log(v);
                    if(v.status === "DONE"){
                        navigation.goBack();
                    }
                }}
                orderItems={params.orderItems}
            />
        </Wrapper>
    )
}

export default Pages;

