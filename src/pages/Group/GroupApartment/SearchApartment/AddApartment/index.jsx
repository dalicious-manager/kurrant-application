import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, Text ,View} from "react-native";
import styled from "styled-components";

import Apart from "../../../../../assets/icons/Group/apartImg.svg";
import useGroupSpots from "../../../../../biz/useGroupSpots/hook";
import Button from "../../../../../components/Button";
import Typography from "../../../../../components/Typography";


export const PAGE_NAME = "P__GROUP__APARTMENT__SEARCH__ADD" ;

const Pages = ({route}) => {
    
    const navigation = useNavigation();
    const {userGroupAdd} = useGroupSpots();

    const data = route.params.data;
    

    const addOwnGroup = async(id) => {
        try {
            await userGroupAdd({
                id:id
            });
        } catch(err) {
            console.log(err)
        }
    }
    return(
        <Wrap>
            <Group>그룹명</Group>
            <View>
                <Apart/>
            </View>
            <ApartName>{data.name}</ApartName>
            <Address>{data.address}</Address>
            <ButtonWrap>
                <Button label='내 그룹에 추가' onPressEvent={()=> addOwnGroup(data.id)}/>
            </ButtonWrap>
            
        </Wrap>
    )
}

export default Pages;

const Wrap = styled.View`
flex:1;
background-color:${({theme})=> theme.colors.grey[0]};
align-items:center;
`;

const ButtonWrap = styled.View`
position:absolute;
margin:0px 20px;
bottom:35px;
`;

const Group = styled(Typography).attrs({text:'Title04R'})`
color:${({theme}) => theme.colors.grey[2]};
margin-top:40px;
margin-bottom:48px;
`;

const ApartName = styled(Typography).attrs({text:'LargeTitle'})`
color:${({theme}) => theme.colors.grey[1]};
margin-top:24px;
`;

const Address = styled(Typography).attrs({text:'Body06R'})`
color:${({theme}) => theme.colors.grey[2]};
`;
