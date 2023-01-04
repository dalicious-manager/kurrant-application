import React, { useEffect } from "react";
import { View,Text } from "react-native";
import styled from "styled-components";

import useShoppingBasket from "../../biz/useShoppingBasket/hook";
import Typography from "../Typography";


const Component = () =>{

    const {isLoadMeal,loadMeal,isquantity} = useShoppingBasket();
    
    // useEffect(()=>{
    //     async function loadCart(){
    //         await loadMeal();
            
    //     }
    //     loadCart();
    
    
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[])


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