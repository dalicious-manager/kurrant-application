import React, { useRef } from 'react';

import Wrapper from "~components/Wrapper";
import { Dimensions } from 'react-native';
import TossPayment from 'react-native-toss-payments';
import { StackActions, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import BackButton from '../../../../../components/BackButton';
import Config from 'react-native-config';
import PaymentContainer from './components/PaymentContainer';
import {PurchaseDetailPageName} from '../../../MyPage/PurchaseHistory/Detail'
export const PAGE_NAME = "P__PAYMENT__MEAL_PAYMENT";

const Pages = ({route})=>{
    const params = route.params
    const navigation = useNavigation();
    const paymentsData = ()=>{
        if(params.easyPay!=="NOMAL"){
            return {
                orderId: params.orderId,
                amount: params.amount,
                customerName: params.name,
                customerEmail: params.email,
                easyPay:params.easyPay,
                flowMode:params.flowMode,        
                orderName: params.orderName,
                successUrl: `http://15.165.39.55/admin/success.php`,
                failUrl: 'http://15.165.39.55:8882/fail',
            }
        }else{
            return {
                orderId: params.orderId,
                amount: params.amount,
                customerName: params.name,
                customerEmail: params.email,
                flowMode:params.flowMode,      
                cardCompany:params.cardCompany,
                orderName: params.orderName,
                successUrl: `http://15.165.39.55/admin/success.php`,
                failUrl: 'http://15.165.39.55:8882/fail',
            }
        }
    }
    
    return(
        <Wrapper paddingTop={24}>
            <PaymentContainer
                clientKey={Config.TOSS_PAYMENT_CLIENT_KEY}
                payment={paymentsData()}
                onApproveError={(v) => {console.log("에러",v)}}
                onApproveFailed={() => {console.log("teset")}}
                onApproveSucceed={(v) => {
                    if(v){
                        const resetAction = StackActions.popToTop();
                        navigation.dispatch(resetAction); 
                        navigation.navigate(PurchaseDetailPageName,{
                            id:v
                        })
                    }
                }}
                orderItems={params.orderItems}
            />
        </Wrapper>
    )
}

export default Pages;
