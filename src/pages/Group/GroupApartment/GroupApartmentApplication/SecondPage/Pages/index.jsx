import Postcode from '@actbase/react-daum-postcode';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import React from "react";
import { SafeAreaView, Text } from "react-native";
import styled from "styled-components";

import { isApartFullAddressAtom, isApartNameAtom, isApartSendAddressAtom, isApartSendAddressInfoAtom } from '../../../../../../biz/useApartApplication/store';
import { setStorage } from '../../../../../../utils/asyncStorage';


export const PAGE_NAME = 'APARTMENT__APPLICATION__INFORMAION_POSTCODE';
const Pages = () =>{

    const navigation = useNavigation();
    const [,setApartFullAddress] = useAtom(isApartFullAddressAtom); //TextInput 에 보여줄 주소
    const [isSendAddress,setSendAddress] = useAtom(isApartSendAddressInfoAtom); // body에 담을 주소

    const handleAddress = async (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        const zipcode = data.zonecode;
        const zibunAddress = data.jibunAddress;
        const autoZibunAddress = data.autoJibunAddress;
        const roadAddress = data.query;
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        
        setApartFullAddress(fullAddress);
        await setStorage('page2-1',JSON.stringify({
          'zipCode' : Number(zipcode),
          'address1' : zibunAddress === '' ? autoZibunAddress : zibunAddress,
          'address2' : roadAddress,
        }))
        setSendAddress({
          'zipCode' : Number(zipcode),
          'address1' : zibunAddress === '' ? autoZibunAddress : zibunAddress,
          'address2' : roadAddress,
          
        })

        navigation.goBack();
      }
    
    return (
        <ModalWrap>
            <PostCodeView 
            onSelected={(data) => {
                handleAddress(data);
                
              
            }} 
            />      
        </ModalWrap>
        
    )
}

export default Pages;

const PostCodeView = styled(Postcode)`
width:100%;
height:100%;
`;

const ModalWrap = styled.SafeAreaView`
flex:1;
justify-content:center;
align-items:center;
`;