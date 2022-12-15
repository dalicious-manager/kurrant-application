import React from "react";
import styled from "styled-components/native";

import { MembershipImage } from "../../../assets";
import Image from "../../../components/Image";

export const PAGE_NAME = "P__MEMBERSHIP__JOIN"
const Pages= ()=>{
    return(
        <Container>
            <Image imagePath={MembershipImage}/>
        </Container>
    )
}

export default Pages;

const Container = styled.View`
    flex:1;
`