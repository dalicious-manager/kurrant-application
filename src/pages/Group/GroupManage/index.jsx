import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styled from "styled-components";

import useApartApplication from "../../../biz/useApartApplication/hook";
import useGroupSpots from "../../../biz/useGroupSpots/hook";
import useUserInfo from "../../../biz/useUserInfo";
import BottomSheetSpot from "../../../components/BottomSheetSpot";
import Button from "../../../components/Button";
import Typography from "../../../components/Typography"; 
import { setStorage } from "../../../utils/asyncStorage";
import {PAGE_NAME as ApartRegisterSpotPageName} from "../GroupApartment/SearchApartment/AddApartment/DetailAddress";
import {PAGE_NAME as GroupManageDetailPageName} from "../GroupManage/DetailPage";
export const PAGE_NAME = "P__GROUP__MANAGE" ;
const Pages = () => {

    const navigation = useNavigation();

    const [modalVisible,setModalVisible] = useState(false);
    const {userGroupSpotCheck,isUserGroupSpotCheck,groupSpotDetail,userSpotRegister} = useGroupSpots();
    const {userInfo} = useUserInfo();
    
    const [selected,setSelected] = useState();
 
    const modalOpen = () => {
        setModalVisible(true);
    }

    useEffect(()=>{
        async function LoadList(){
            await userGroupSpotCheck()
        }
        LoadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const goSpotRegisterPage = async (id,clientId) => {
        try {
            const res = await userSpotRegister({
                'id':id
            });
            if (res.data === null){
                navigation.navigate(ApartRegisterSpotPageName,{id:id})
            } else {
                await setStorage('spotStatus','0');
                await userInfo()
                navigation.navigate(GroupManageDetailPageName,{id:id,clientId:clientId})
            }
            
            
        } catch(err){
            console.log(err)
        }
    }


    return (
        <SafeView>
            <Wrap>

            <MyGroup>내 그룹</MyGroup>
            <GroupNameView>
                {isUserGroupSpotCheck.length !== 0 && isUserGroupSpotCheck.map((el,idx) => (
                     <GroupName key={el.clientId}>{el.clientName}</GroupName>
                ))}
                
                
            </GroupNameView>
            
            </Wrap>
            <ButtonWrap>
                <Button label='스팟 선택' onPressEvent={modalOpen}/>
            </ButtonWrap>
            <BottomSheetSpot modalVisible={modalVisible} setModalVisible={setModalVisible} 
            title='스팟 선택' data={isUserGroupSpotCheck} selected={selected} setSelected={setSelected} 
            onPressEvent={(id,clientId)=>{goSpotRegisterPage(id,clientId)}}
            />
        </SafeView>
    )
}

export default Pages;

const SafeView = styled.SafeAreaView`
flex:1;
background-color:${({theme}) => theme.colors.grey[0]};

`;
const Wrap = styled.View`
flex:1;
align-items:center;
margin-top:80px;
`;
const ButtonWrap = styled.View`
margin: 0px 24px;
position:absolute;
bottom: 35px;
`;

const MyGroup = styled(Typography).attrs({text:'Title04R'})`
color:${({theme}) => theme.colors.grey[2]};
margin-bottom:24px;
`;
const GroupName = styled(Typography).attrs({text:'LargeTitle'})`
color:${({theme}) => theme.colors.grey[1]};
margin-bottom:24px;
`;

const GroupNameView = styled.View`
align-items:center;
`;