import { useAtom } from "jotai";
import React, { useCallback } from "react";
import { ActivityIndicator, Alert } from "react-native";
import styled, { useTheme } from 'styled-components/native';

import useUserMe from "~biz/useUserMe";
import { isSNSConnectAtom } from "~biz/useUserMe/store";
import { SocialConnectIcons } from "~components/Icon";
import Typography from "~components/Typography";
import Wrapper from "~components/Wrapper";
import snsConnected from "~utils/snsConnected";

export const PAGE_NAME = "P__MY_PAGE__CONNECTED_SNS"
const Pages = ()=>{
    const { userMePersonal, readableAtom:{myInfoPerson,isMyInfoPersonalLoading, isSNSConnectLoading,isSNSDisconnectLoading}} = useUserMe();
    const [isConnected , ] = useAtom(isSNSConnectAtom);
    const {snsConnectID,snsDisconnectID} = snsConnected();
    const getData = useCallback(async()=>{
        await userMePersonal();    
    },[userMePersonal])
    const connectSNS = async(social)=>{
        await snsConnectID(social);
        await getData();
    }
    const disconnectSNS = async(social)=>{
        Alert.alert(
        "계정 연결 해지",
        "SNS 계정 연결을 해지하시겠어요?",
        [{
            text:"취소",
        },
            {
            text:"해지",
            onPress:async()=>{
                await snsDisconnectID(social);
                await getData();
            }
            }
        ],{
            cancelable: true,
        }
        )
        
    }
    const themeApp = useTheme();
    const isLoading = isMyInfoPersonalLoading || isSNSConnectLoading || isSNSDisconnectLoading;
    return(
        <Wrapper paddingTop={24}>
            {isConnected.map((v)=>{
                return (
                  <SNSPiece key={v.social} onPress={()=>!v.isConnect ? connectSNS(v.social) : disconnectSNS(v.social)}>  
                    <SNSIdBox>
                        <SocialConnectIcons social={v.social} isConnect={v.isConnect ? true : false}/>
                        <SNSConnectText text={'Body06R'} textColor={v.email ? themeApp.colors.grey[3]:themeApp.colors.grey[7]}>{v.email ? v.email : "연결된 계정이 없어요"}</SNSConnectText>
                    </SNSIdBox>
                    <SNSConnectText 
                      text='Button10R' 
                      textColor={v.isConnect 
                      ? themeApp.colors.grey[3]
                      : themeApp.colors.grey[5]}
                    >
                      {v.isConnect ? '연결완료': '연결하기'}
                    </SNSConnectText>
                  </SNSPiece>
                )
              })}
             {isLoading && 
             <LoadingBox>
                <ActivityIndicator size={'large'} color={themeApp.colors.yellow[500]}/>
                </LoadingBox>}
        </Wrapper>  
    )
}

export default Pages;

const SNSPiece = styled.Pressable`
    padding: 8px 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;  
    padding-left: 24px;
    padding-right: 24px;
`;
const SNSIdBox = styled.View`
    flex-direction: row;
    align-items: center;  
`
const SNSConnectText = styled(Typography)`
    margin-left: 12px;
`
const LoadingBox = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
  opacity: 0.5;
`