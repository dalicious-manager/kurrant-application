import React, { useRef, useState } from "react";
import { View, Text, TextInput } from "react-native";
import styled from "styled-components";


const Component = () => {
    const bodyRef = useRef();
    const [show,setShow] = useState(false);

    return (
        <View>
            <CountWrap>
                <Text>mm</Text>
                <Text onPress={() => setShow(true)}
                ref={bodyRef}
                >22</Text>
                <Text>pp</Text>
            </CountWrap>
            { show && <ShowKeypad>
                <Text>m</Text>
                <TextInput
                keyboardType="number-pad"
                onPress={bodyRef.current.focus()}
                >
                    2
                </TextInput>
                <Text>p</Text>
            </ShowKeypad>}
        </View>
        
    )
}

export default Component;

const CountWrap = styled.View`
flex-direction:row;
justify-content:space-between;
align-items:center;
border: 1px solid ${props => props.theme.colors.grey[6]};
border-radius:7px;
width:98px; 
height:38px;
background-color:${props => props.theme.colors.grey[0]};
`; 


const ShowKeypad = styled.View`
flex-direction:row;
align-items:center;
height: ${props => props.show ? '100px' : 0 };
width: 100%;
/* background-color: gold; */
position:absolute;
`;