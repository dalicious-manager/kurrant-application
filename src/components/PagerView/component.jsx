import React from "react";
import { View, Text } from "react-native";
import PagerView from "react-native-pager-view";
import styled from "styled-components";

const Component = ({children}) => {
    return (
        <Wrap>
            <View key="1">
                {children}
            </View>
            
            

            
        </Wrap>
            
      
    )
}

export default Component;

const Wrap = styled(PagerView)`

flex:1;

`;