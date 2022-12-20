/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react"
import styled from "styled-components";
import { useTheme } from "styled-components/native";


import Typography from "~components/Typography";
import {formattedDate} from "~utils/dateFormatter"

import useAuth from "../../../../../../biz/useAuth";
import { SocialIcons } from "../../../../../../components/Icon";
import { PAGE_NAME as EmailLoginPageName} from "../../../EmailLogin";
import { PAGE_NAME as LoginPageName} from "../../../Login";

export const PAGE_NAME = 'P_FIND_ID_COMPLATE';

const Pages = ({route}) => {
    const {phone} = route.params;
    const [userId, setUserId] = useState({
        email:'',
        connectedSns: [],
        recentLoginDateTime: ""
    })
    const themeApp = useTheme();
    const navigation = useNavigation();
    const {findEmail}=useAuth();
    const getUserId = async()=>{
        const userEmail = await findEmail({phone:phone});
        console.log(userEmail);
        setUserId(userEmail.data);
    }
    useEffect(()=>{
        console.log(userId);
        if(userId.email === ''){
            getUserId();
        }
        
    },[])
   
    
    return (
        <Conotainer>
            <Title textColor={themeApp.colors.grey[2]}>입력하신 정보로{'\n'}찾은 계정 정보예요.</Title>
            <LoginContainer>
            {userId.connectedSns.map((icon)=>{
                console.log(icon)
                const onPressEvent= ()=>{
                    if(icon==='GENERAL'){
                        navigation.reset({
                            index: 1,
                            routes: [
                                {
                                    name: LoginPageName,
                                },
                                {
                                    name: EmailLoginPageName,
                                    params: {
                                        userId: userId.email
                                    }
                                },
                            ],
                        })
                    }
                }
                return <LoginBox key={icon}>
                    <InfoBox>
                        <SocialIcons social={icon} />
                        <EmailText text={'Body05SB'}>{userId.email}</EmailText>
                    </InfoBox>
                    <LoginButton onPress={onPressEvent}>
                        <LoginBoxText textColor={themeApp.colors.neutral[0]}>로그인</LoginBoxText>
                    </LoginButton>
                </LoginBox>
            })}
            </LoginContainer>
            <DateBox>
                <CaptionText >{formattedDate(userId.recentLoginDateTime, '년월일')} 마지막 로그인</CaptionText>
            </DateBox>
        </Conotainer>
    )
}

export default Pages;

const Conotainer = styled.View`
    background-color: white;
    flex: 1;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 40px;
`;

const Title = styled(Typography).attrs({text:'LargeTitle'})`
    margin-top: 10px;
    text-align: left;
`

const LoginBox = styled.View`
    padding: 8px 0; 
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
const InfoBox =styled.View`
    flex-direction: row;
    align-items: center;
`
const LoginButton = styled.Pressable`
    background-color: ${({theme})=> theme.colors.grey[2]};
    border-radius: 30px;
    overflow: hidden;
`;
const LoginBoxText= styled(Typography).attrs({text:'Button10SB'})`
    text-align: center;
    padding: 6.5px 16px;
`;

const EmailText= styled(Typography)`
    text-align: center;
    padding-left: 11px;
`;
const CaptionText= styled(Typography)`  
    text-align: center;
`;

const LoginContainer = styled.View`
    margin-top: 24px;
`

const DateBox = styled.View`
    position: absolute;
    bottom:35px;
    justify-content: center;
    align-items: center;
    left:24px;
    width: 100%;

`;
