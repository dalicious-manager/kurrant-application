import React from "react";
import { Pressable, Text } from "react-native";
import styled from "styled-components";

import { getLabelColor, getLabelSizeStyle } from "./style";
/**
 * @param {object} props
 * @param {'label17SB' | 'label17R' | 'label15SB'| 'label15R' | 'label13SB' | 'label13R'} props.size
 * @param {'grey2' | 'grey4' | 'grey6' | 'blue' | 'red' } props.type
 * @param {function} props.onPressEvent
 * @returns
 */

const Component = ({
    label = '텍스트레이블',
    type = 'grey2',
    size = 'label17R',
    onPressEvent = () => { console.log('텍스트 레이블 누름')}
}) => {

    return (
        <Pressable onPress={onPressEvent}>
            <Label type={type} size={size}>
                {label}
            </Label>
        </Pressable>
    )
}

export default Component; 

const Label = styled.Text`
 ${({ type }) => getLabelColor(type)};
 ${({ size }) => getLabelSizeStyle(size)};

`

