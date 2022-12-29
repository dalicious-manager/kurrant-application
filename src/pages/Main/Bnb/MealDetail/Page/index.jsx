import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text, View } from "react-native"
import styled from "styled-components";

import Button from "../../../../../components/Button";
import Typography from "../../../../../components/Typography";
import { ButtonWrap } from "../../MealCart/Main";

export const PAGE_NAME = 'MEAL_DETAIL_INFORMATION_PAGE';
const Pages = ({route}) =>{
    
    const list = route.params.data;
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
      };

    return (
        <SafeView>
            <Wrap>
                <Allergy>
                    <TitleText>알레르기 유발 물질 표시 대상</TitleText>
                    <DescText>계란, 우유, 땅콩, 계란, 우유, 땅콩, 계란, 우유, 땅콩</DescText>
                </Allergy>
                <View>
                    <TitleText>원산지 정보</TitleText>
                    <TableTitle>
                        <OriginText>항목</OriginText>
                        <OriginText>원산지</OriginText>
                    </TableTitle>
                    {list.map((l,i) => 
                        <Table key={i}>
                            <OriginText>{l.name}</OriginText>
                            <OriginText>{l.from}</OriginText>
                        </Table>
                    )}
                </View>
            </Wrap>
            <ButtonWrap>
                <Button label={'확인'} onPressEvent={handleBackPress}/>
            </ButtonWrap>
        </SafeView>
    )
}

export default Pages;

const SafeView = styled.SafeAreaView`
background-color:${props => props.theme.colors.grey[0]};
flex:1;
`;

const Wrap = styled.View`
margin:40px 24px 0px 24px;
`;

const Allergy = styled.View`
margin-bottom:24px;
`;

const Table = styled.View`
flex-direction:row;
padding:10px 8px;
border-bottom-color:${props => props.theme.colors.grey[8]};
border-bottom-width:1px;
`;

const TableTitle = styled(Table)`
border-top-color:${props => props.theme.colors.grey[8]};
border-top-width:1px;
padding: 6px 8px;
`;

const TitleText = styled(Typography).attrs({text:'CaptionR'})`
color:${props => props.theme.colors.grey[3]};
margin-bottom:6px;
`;

const DescText = styled(Typography).attrs({text:'CaptionR'})`
color:${props => props.theme.colors.grey[5]};
`;

const OriginText = styled(DescText)`
width:50%;
`;

