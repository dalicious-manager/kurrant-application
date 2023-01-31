import React from "react";
import styled from "styled-components";

import useShoppingBasket from "../../biz/useShoppingBasket/hook";
import Typography from "../Typography";


const Component = () =>{

    const {isquantity,isLoadMealLoading} = useShoppingBasket();
    
    return (
        <>
         { isquantity !== 0 &&<Wrap>
            <Count>{isquantity}</Count>
        </Wrap>}
        </>
    )
};

export default Component;

const Wrap = styled.View`
width:16px;
height:16px;
border-radius:8px;
background-color:${({theme})=>theme.colors.yellow[500]};
position:absolute;
top:-5px;
right:3px;
`;

const Count = styled(Typography).attrs({text:'Badge'})`
color:${({theme}) => theme.colors.grey[1]};
text-align:center;

`;