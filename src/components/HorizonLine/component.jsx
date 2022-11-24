/* eslint-disable react/react-in-jsx-scope */
import {View} from "react-native";
import styled from "styled-components/native";

const Component = ({ text }) => {
  return (
    <LineContainer >
    <Line />
    <View>
      <LineText>그외 SNS로 로그인</LineText>
    </View>
    <Line />
  </LineContainer>
  );
};


const LineContainer = styled.View`
    width: 100%;
    align-items: center;
    flex-direction: row;
`
const LineText = styled.Text`
    padding: 0px 8px;
    font-size: 13px;
    color:#E4E3E7;
`
const Line = styled.View`
    flex: 1;
    height: 1px;
    background-color: #E4E3E7;
`
export default Component;