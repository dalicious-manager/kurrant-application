import {useNavigation} from '@react-navigation/native';
import { useAtom } from 'jotai';
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView } from "react-native";
import styled, { useTheme } from 'styled-components/native';

import ArrowRightIcon from "~assets/icons/Arrow/arrowRight.svg";
import useUserMe from '~biz/useUserMe'
import { isSNSConnectAtom } from '~biz/useUserMe/store';
import { SocialConnectIcons } from '~components/Icon';
import Image from '~components/Image';
import TextButton from '~components/TextButton';
import Toast from '~components/Toast';
import Typography from '~components/Typography';
import Wrapper from '~components/Wrapper';
import {getStorage} from '~utils/asyncStorage';
import snsConnected from '~utils/snsConnected';

import BottomModal from '../../../../components/BottomModal';
import { setStorage } from '../../../../utils/asyncStorage';
import { PAGE_NAME as GroupApplicationCheckPageName} from '../../../Group/GroupApartment/ApartmentApplicationCheck';
import { PAGE_NAME as GroupManagePageName} from '../../../Group/GroupManage';
import ListBox from './ListBox';
import { PAGE_NAME as  ConnectedSNSPageName} from './pages/ConnectedSNS';
import { PAGE_NAME as  EmailSettingPageName} from './pages/EmailSetting';
import { PAGE_NAME as  NotificationSettingPageName} from './pages/NotificationSetting';
import { PAGE_NAME as  PasswordSettingPageName} from './pages/PasswordSetting';
import {PAGE_NAME as PaymentManagePageName} from './pages/PaymentManage';
import { PAGE_NAME as  PhoneNumberSettingPageName} from './pages/PhoneNumberSetting';
import { PAGE_NAME as  LoginPageName} from '../../../Main/Login/Login';
import { AvatarNon } from '~assets';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const PAGE_NAME = "P__MY_PAGE__PERSONAL_INFO"

const Pages = ({route}) => {
  const themeApp = useTheme();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { userMePersonal, readableAtom:{myInfoPerson,isMyInfoPersonalLoading, isSNSConnectLoading,isSNSDisconnectLoading}} = useUserMe();
  const [isConnected , ] = useAtom(isSNSConnectAtom);
  const [message , setMessage] = useState("계정이 연결됐어요");
  const {snsConnectID,snsDisconnectID} = snsConnected();
  const {toastEvent,ToastWrap} = Toast();
  
  const getDataStorage =useCallback(async()=>{
    const data = await getStorage('isChange');
    console.log("test",data);
    if(data !== null && data !==''){
      setMessage(data);        
      await setStorage('isChange','');
      toastEvent();
    }
  },[toastEvent])
  const getData = useCallback(async()=>{
    await userMePersonal();   
  },[userMePersonal])
  const connectSNS = async(social)=>{
    const result = await snsConnectID(social);
    console.log(result);
    if(result?.statusCode === 200){
      await getData();
      setMessage("계정이 연결됐어요");
      toastEvent();
    }
    
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
            try {
              const result = await snsDisconnectID(social);
              if(result?.statusCode !== 200){
                console.log(result)
                setModalVisible(true);
              }else{
                await getData();
                setMessage("계정 연결이 해지됐어요");
                toastEvent();
              }
            } catch (error) {
              console.log(error.toString());
              setModalVisible(true);
            }
            
            
          }
        }
      ],{
        cancelable: true,
      }
    )
    
  }
  
  useEffect(()=>{
    
    
    getData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      getDataStorage();
    });

    return willFocusSubscription;    
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])  
  // if(isMyInfoPersonalLoading){
  //   return <SkeletonUI />
  // }
  const isLoading = isMyInfoPersonalLoading || isSNSConnectLoading || isSNSDisconnectLoading;
  return (
        <>
        <Wrapper paddingTop={24}>
        <ScrollView>
          <LoginBox>
            <LoginIdBox>
              <GourmetTestButton>
                <Typography text='CaptionSB' textColor={themeApp.colors.blue[500]}>나의 미식타입 테스트 </Typography>
                <ArrowRight/>
              </GourmetTestButton>            
              <Typography text='Title02SB' textColor={themeApp.colors.grey[2]}>{myInfoPerson?.name}님</Typography>
              {myInfoPerson.hasGeneralProvider && <Typography text='Body06R' textColor={themeApp.colors.grey[2]}>{myInfoPerson?.email}</Typography>}
            </LoginIdBox>
            <AvatarBackground source={AvatarNon} resizeMode={'cover'}>
              <Image imagePath={{uri:'https://asset.kurrant.co/img/common/soup.png'}} scale={1.0} styles={{width:55.05,height:48.47}}/>
            </AvatarBackground>
          </LoginBox>
        
          {/* 포인트 활성시
            <PointBox point={41030}/> 
          */}
         
          <Line />
          <SNSContainer>
            <SNSTitleBox>
              <SNSTitle text='Body06R' textColor={themeApp.colors.grey[2]}>SNS 계정 연결</SNSTitle>
              <SNSTitleTail>
                <TextButton TextButton label="계정정보" type='grey4' size='label13R' onPressEvent={()=>navigation.navigate(ConnectedSNSPageName)}/>
                <ArrowSNSRight/>
              </SNSTitleTail>
            </SNSTitleBox>
            <SNSBox>
            {
              isConnected.map((v)=>{
                return (
                  <SNSPiece key={v.social} onPress={()=>!v.isConnect ? connectSNS(v.social) : disconnectSNS(v.social)}>                
                    <SocialConnectIcons social={v.social} isConnect={v.isConnect ? true : false}/>
                    <SNSConnectText 
                      text='SmallLabel' 
                      textColor={v.isConnect 
                      ? themeApp.colors.grey[3]
                      : themeApp.colors.grey[5]}
                    >
                      {v.isConnect ? '연결완료': '연결하기'}
                    </SNSConnectText>
                  </SNSPiece>
                )
              })
            }
            
            </SNSBox>
          </SNSContainer>
          <Line />
          <ListBox title='휴대폰번호 변경' routeName={PhoneNumberSettingPageName}/>
          <ListBox 
          title={!myInfoPerson.hasGeneralProvider ? '이메일/비밀번호 설정' : '비밀번호 변경'}  
          description={!myInfoPerson.hasGeneralProvider && '설정하기'} 
          routeName={!myInfoPerson.hasGeneralProvider ? EmailSettingPageName:PasswordSettingPageName}/>

          <ListBox title='결제수단 관리' routeName={PaymentManagePageName}/>
          <ListBox title='그룹/스팟 관리' routeName={GroupManagePageName}/>
          <ListBox title='스팟 개설 요청 내역' routeName={GroupApplicationCheckPageName}/>
          <ListBox title='알림 설정' routeName={NotificationSettingPageName}/>
          <Line />
          <TextButtonBox>
            <TextButton label="로그아웃" type='grey4' size='label13R' onPressEvent={async()=>{
              await AsyncStorage.clear().then(()=>{
                navigation.reset({
                  index: 0,
                  routes: [
                      {
                          name: LoginPageName,
                      },                    
                  ],
              })
              });
             
            }}/>
          </TextButtonBox>
          <TextButtonBox>
            <TextButton label="탈퇴하기" type='grey4' size='label13R'/>
          </TextButtonBox>
        </ScrollView>
        <ToastWrap icon='checked' message={message}/>
        <BottomModal 
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title='이메일/비밀번호를 설정해주세요' 
          description={'SNS 계정 연결 해제는\n이메일/비밀번호 설정 후 가능해요.'} 
          buttonTitle1="다음에하기" 
          buttonTitle2='설정하러가기' 
          buttonType1='grey7' 
          buttonType2='yellow'  
          onPressEvent1={()=> setModalVisible(false)}
          onPressEvent2={()=>console.log("설정하러 가기")}
        />
      </Wrapper>
      {isLoading && <LoadingBox>
        <ActivityIndicator size={'large'} color={themeApp.colors.yellow[500]}/>
      </LoadingBox>}
    </>
  )
}

export default Pages;

const GourmetTestButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin-bottom: 2px;
`
const LoginBox = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
  margin-left: 24px;
  margin-right: 24px;
`
const LoginIdBox = styled.View`
`

const SNSContainer = styled.View`
   margin-left: 24px;
   margin-right: 24px;
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
  opacity: 0.8;
`
const SNSTitleBox = styled.View`
  flex-direction: row;
  align-items: center; 
  margin-top: 16px;
  margin-bottom: 16px;
  justify-content: space-between;
`
const SNSTitleTail = styled.View`
  flex-direction: row;
  align-items: center;
`
const SNSTitle = styled(Typography)`

`
const SNSBox =styled.View`
  margin-left: 24px;
  margin-right: 4px;
  margin-bottom: 24px;
  flex-direction: row;
`;
const SNSPiece = styled.Pressable`
  flex: 1;
  margin-right: 20px;
  justify-content: center;
  align-items: center;  
`;

const SNSConnectText = styled(Typography)`
  margin-top: 9px;
`

const ArrowRight = styled(ArrowRightIcon)`
  color:${props => props.theme.colors.blue[500]};
  margin-left: 4px;
`;
const ArrowSNSRight = styled(ArrowRightIcon)`
  color:${props => props.theme.colors.grey[5]};
  margin-left: 4px;
`;

const TextButtonBox = styled.View`
  margin-top: 24px;
  margin-left: 24px;
`

const AvatarBackground =  styled.ImageBackground`
  width: 72px;
  height: 72px;
  margin-right: 4px;
  justify-content: center;
  align-items: center;
`
const Line = styled.View`
  width: 100%;
  height: 6px;
  background-color: ${({theme}) => theme.colors.grey[8]};
`;

