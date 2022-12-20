import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Image, ScrollView } from "react-native";
import styled from "styled-components/native";

import Button from "../../../components/Button";
import Images from "../../../components/Image";
import { PAGE_NAME as MembershipJoinPageName} from "../MembershipJoin";

export const PAGE_NAME = "P__MEMBERSHIP__INTRO"
const {width} = Dimensions.get('screen');
const Pages= ()=>{
    const [height, setHeight] = useState(0);
    Image.getSize('https://asset.kurrant.co/img/common/kurrantmembership.png', (w, h) => {
      setHeight(h * (width / w));
    });
    const navigation = useNavigation();
    return(
        <Container>
            <ScrollView>
                <Images imagePath={{uri: 'https://asset.kurrant.co/img/common/kurrantmembership.png'}} scale={1.0} styles={{
                    maxWidth: width,
                    height:height-100,
                }}/>
                <ButtonContainer>
                  <Button type='yellow' label="멤버십 가입하기"  onPressEvent={()=>{
                    navigation.navigate(MembershipJoinPageName);
                  }}/>
                </ButtonContainer>
            </ScrollView>
            
        </Container>
    )
}

export default Pages;

const Container = styled.View`    
    width: ${width}px;
`

const ButtonContainer = styled.View`
  margin-bottom: 24px;
  margin-left: 20px;
  margin-right: 20px;
`;