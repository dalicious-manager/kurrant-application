import React from "react";
import styled from "styled-components/native";

import ArrowRight from "~assets/icons/Arrow/btnArrowRight.svg";

import Label from "../../../../components/Label";
import Typography from "../../../../components/Typography";
import withCommas from "../../../../utils/withCommas";
/** 
* @param {object} props
* @param {string} props.label
* @param {number} props.payments
* @param {number} props.isSale
* @param {number} props.dicountPayments
* @param {function} props.onPressEvent
* @return
*/

const Component = ({label,payments, isSale,dicountPayments ,onPressEvent, ...rest})=>{
    const pay = withCommas(payments === dicountPayments ? payments : dicountPayments);
    return(
        <Container isSale={isSale>0} onPress={onPressEvent} {...rest}>  
            <TitleBox>
                <MembershipText>
                    {label}                
                </MembershipText>         
                {isSale > 0 && <Label size="labelS" label={`${isSale}%`} type="green"/> }
            </TitleBox>
            <PaymentsBox>
                <PaymentsTextBox>
                    <PaymentsText>
                        {pay}원
                    </PaymentsText>
                    {isSale> 0  && <CaptionText>
                        (월 {withCommas((payments === dicountPayments ? payments : dicountPayments)/12)}원)
                    </CaptionText>}
                </PaymentsTextBox>
                <ArrowIcon />
            </PaymentsBox>
        </Container>
    )
}

export default Component;

const Container = styled.Pressable`
    width: 100%;
    border-radius: 14px;
    border:1px solid ${({theme})=>theme.colors.grey[7]};
    flex-direction: row;
    justify-content: space-between;
    padding: 24px;
    ${({isSale})=> isSale && 'padding-top:14.5px;padding-bottom:14.5px;'}
    height: 72px;
    
    /* padding-left: 24px;
    padding-right: 24px; */
    /* justify-content: center; */
    align-items: center;
`;
const TitleBox = styled.View`
    flex:1;
    flex-direction: row;
    align-items: center;
`
const PaymentsBox = styled.View`
    flex:1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`
const PaymentsTextBox = styled.View`
`
const MembershipText = styled(Typography).attrs({text:'Title04R'})`
    color:${({theme})=> theme.colors.grey[1]};
    margin-right: 5px;
`;

const ArrowIcon = styled(ArrowRight).attrs({size:500})`
    color:${props => props.theme.colors.grey[5]};
`;

const PaymentsText = styled(Typography).attrs({text:'Title04SB'})`
    color:${({theme})=> theme.colors.grey[1]};
    margin-right: 6px;
`;

const CaptionText = styled(Typography).attrs({text:'CaptionR'})`
    color:${({theme})=> theme.colors.grey[5]};
`;