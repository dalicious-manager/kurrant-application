import React, { useState } from "react";
import { Modal, View,Text, Pressable,Alert, SafeAreaView,Dimensions, Platform,StyleSheet} from "react-native";
import styled from "styled-components";
import Typography from "../Typography";

import XIcon from "./icon/x.svg";

const windowWidth = Dimensions.get('window').width;
const Component = ({
    text,
    title
}) =>{

    const [modalVisible, setModalVisible] = useState(false);

    return (

        <SafeAreaView >
            <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            
            >
                <Wrap>
                    <InnerWrap style={styles.container}>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Icon/>
                        </Pressable>
                        <TextType>{text}</TextType>
                    </InnerWrap>
                </Wrap>
            </Modal>
            <TitleWrap
            onPress={() => setModalVisible(true)}>
                <Text>{title}</Text>
            </TitleWrap>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        ...Platform.select({
            ios:{
                shadowColor:'#343337',
                shadowOpacity:0.5,
                shadowOffset:{
                    height:1,
                    width:0,
                }
            },
            android:{
                elevation:3
            }
        })
    }
})
export default Component;

const Wrap = styled.View`
width:${windowWidth}px;

`;
const TitleWrap = styled.Pressable`
position:relative;
`;
const InnerWrap = styled.View`
background-color:#fff;
/* width:100%; */
padding:12px 16px;
position:absolute;
top:150px;
border-radius:7px;
margin:0px 24px;
`;

const TextType = styled(Typography).attrs({text:'CaptionR'})`
color:${({theme}) => theme.colors.grey[2]};
`;

const Icon = styled(XIcon)`
align-self:flex-end;
/* position:absolute;
right:0px; */
`;