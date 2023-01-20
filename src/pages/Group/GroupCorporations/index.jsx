import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text ,View,Image,Dimensions, ScrollView, ActivityIndicator} from "react-native";
import styled from "styled-components";

import Images from "../../../components/Image";
import Button from "../../../components/Button";
import FastImage from "react-native-fast-image";
import {PAGE_NAME as CorpApplicationPageName} from './CorporationsApplication/FirstPage';

export const PAGE_NAME = "P__GROUP__CREATE__CORPORATIONS" ;
const {width} = Dimensions.get('screen');
const Pages = () => {

    const navigation = useNavigation();
    const [height, setHeight] = useState(0);
    const [isImageLoading, setImageLoading] = useState(false);
    

    useEffect(()=>{
        const resizeImage = async () => {
            setImageLoading(true)
            await  Image.getSize('https://asset.kurrant.co/img/common/corporation.png', (w, h) => {
                setHeight(h * (width / w));
              });
              setImageLoading(false)
        }
        resizeImage()
    },[])

    if(isImageLoading){
        return <ActivityIndicator size = {'large'}/>
    }

    return (
        <Wrap>
            <ScrollView>
            <FastImage
            source={{uri:'https://asset.kurrant.co/img/common/corporation.png',
            priority:FastImage.priority.high}}
            style={{
                    maxWidth: width,
                    height:height,
                }}
            />
            </ScrollView>
            <ButtonWrap>
                <Button label={'스팟 개설 신청하기'} onPressEvent={()=>navigation.navigate(CorpApplicationPageName)}/>
            </ButtonWrap>
        </Wrap>
    )
}

export default Pages;

const Wrap = styled.View`
background-color:${({theme}) => theme.colors.grey[0]};
flex:1;
`;

const ButtonWrap = styled.View`
padding:0px 20px;
position:absolute;
bottom:35px;
`;