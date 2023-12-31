import Postcode from '@actbase/react-daum-postcode';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import React from "react";
import { useForm } from 'react-hook-form';
import { SafeAreaView, Text } from "react-native";
import styled from "styled-components";

import { isCorpFullSpotAddressAtom, isCorpSendSpotAddressInfoAtom } from '../../../../../../../biz/useCorporationApplication/store';





export const PAGE_NAME = 'CORPORATION__APPLICATION__SPOT_POSTCODE';
const Pages = () =>{


    const navigation = useNavigation();
    const [,setCorpFullSpotAddress] = useAtom(isCorpFullSpotAddressAtom); //TextInput 에 보여줄 주소
    const [,setSendSpotAddress] = useAtom(isCorpSendSpotAddressInfoAtom); // body에 담을 주소
    
    const handleAddress = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        const zipcode = data.zonecode;
        const address = data.address;
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

        
        setCorpFullSpotAddress(fullAddress);
        setSendSpotAddress({
          'zipCode' : Number(zipcode),
          'address1' : fullAddress,
        //   'address2' : '',
          
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