import React from "react";
import { View } from "react-native";
import styled from "styled-components";

import BallonArrow from '../../assets/icons/Balloon/BalloonDownArrow.svg';
import Typography from "../Typography";
const Component = ({
    label = ''
}) => {

    return (
        <Wrap>
            <Ballon>
               <Label>{label}</Label> 
            </Ballon>
            <BallonArrow/>
        </Wrap>
    )
}

export default Component;

const Wrap = styled.View`
align-items:center;
`;
const Ballon = styled.View`
background-color:${({theme}) => theme.colors.grey[2]};
border-radius:10px;
padding: 6px 12px;
`;

const Label = styled(Typography).attrs({text:'Body06R'})`
color:${({theme}) => theme.colors.grey[0]};
`;