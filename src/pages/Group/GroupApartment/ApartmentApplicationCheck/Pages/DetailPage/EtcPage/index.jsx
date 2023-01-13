import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import styled from "styled-components";

import useApartApplication from "../../../../../../../biz/useApartApplication/hook";
import Button from "../../../../../../../components/Button";
import Typography from "../../../../../../../components/Typography";

export const PAGE_NAME = "P__GROUP__CREATE__APARTMENT__APPLICATION__ETC" ;
const Pages = ({route}) => {
    const id = route.params.data.id;
    
    const navigation = useNavigation();
    const {apartApplicationMemo,isApartCheck,setApartCheck} = useApartApplication();

    const [text,setText] = useState('');
    
    const additionPress = async () => {
        try {
           await apartApplicationMemo({
            'memo' : text,

           },id);
           setApartCheck({...isApartCheck,memo:text})
        } catch(err){
            console.log(err)
        }
    }


    return (
        <SafeArea>
            <Wrap>
                <Title>기타 내용</Title>
                <Content 
                multiline={true}
                placeholder="특이사항이 있다면 적어주세요. &#13;&#10; 예. 비건 샐러드 식사 필요"
                defaultValue={isApartCheck.memo}
                onChangeText={(newText) => setText(newText)}
                /> 
            </Wrap>
            <ButtonWrap>
                <Button label='확인' onPressEvent={() =>{additionPress(); navigation.goBack()}}/>
            </ButtonWrap>
        </SafeArea>
    )
}

export default Pages;

const SafeArea = styled.SafeAreaView`
background-color:${({theme}) => theme.colors.grey[0]};
flex:1;
`;

const Wrap = styled.View`
margin:24px;

`;

const Title = styled(Typography).attrs({text:'Body06R'})`
color:${({theme}) => theme.colors.grey[2]};
margin-bottom:8px;
`;
const Content = styled.TextInput`
width:100%;
border:1px solid ${({theme}) => theme.colors.grey[7]};
border-radius:14px;
padding:16px 20px;
min-height:168px;
align-self:flex-start;

`;

const ButtonWrap = styled.View`
margin: 0px 24px;
position:absolute;
bottom: 35px;
`;