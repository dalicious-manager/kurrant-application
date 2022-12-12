import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

import MembershipIcon from "../../assets/icons/BuyMeal/membership.svg";
import Typography from "../Typography";
const Component = () => {
    return (
        <Membership>
            <MembershipIcon/>
            <MembershipText>멤버십 이용중</MembershipText>
        </Membership>
    )
}

export default Component;

const Membership = styled.View`
background-color:${({ theme }) => theme.colors.green[100]};
justify-content:center;
flex-direction:row;
align-items:center;
height:32px;
margin-bottom:8px;
`;

const MembershipText = styled(Typography).attrs({text:'CaptionR'})`
color:${({theme}) => theme.colors.green[500]};
`;