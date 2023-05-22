import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useShoppingBasket from "../../biz/useShoppingBasket/hook";
import Typography from "../Typography";
import { useGetShoppingBasket } from "../../hook/useShoppingBasket";


const Component = () =>{
    const [quantity,setQuantity] = useState(0);
    const {data :isLoadMeal} = useGetShoppingBasket();
    useEffect(()=>{     
  
        const qty = isLoadMeal?.data?.spotCarts.map(m => m.cartDailyFoodDtoList.map((v)=>v.cartDailyFoods.length))
        const badgeQty = qty?.flat().reduce((acc,cur) => {
            return acc + cur
        },0) 
        setQuantity(badgeQty);
    },[isLoadMeal])
    return (
        <>
         { quantity !== 0 &&<Wrap>
            <Count>{quantity}</Count>
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
justify-content:center;
`;