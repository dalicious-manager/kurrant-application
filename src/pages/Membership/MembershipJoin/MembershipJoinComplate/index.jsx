import { useNavigation } from "@react-navigation/native";
import React from "react"
import styled from "styled-components";
import { useTheme } from "styled-components/native";

import Button from "~components/Button";
import Image from '~components/Image';
import Typography from "~components/Typography";

import { PAGE_NAME as MembershipInfoPage } from "../../../Membership/MembershipInfo";

import { MembershipJoinComplateImage } from "~assets"
export const PAGE_NAME = 'P__MEMBERSHIP__JOIN_COMPLATE';

const Pages = ({route}) => {
    console.log(route)
    const {params}=route;
    const themeApp = useTheme();
    const navigation = useNavigation();
    return (
        <Conotainer>
            <Image imagePath={MembershipJoinComplateImage} scale={1.0}/>
            <Title textColor={themeApp.colors.grey[2]}>{params?.useName}님, 축하드려요!</Title>
            <CaptionText textColor={themeApp.colors.grey[4]}>멤버십 가입이 완료되었어요.{'\n'}이제 다양한 혜택을 누릴 수 있어요.</CaptionText>
            <ButtonContainer>
                <Button
                    type='yellow'
                    label={"확인"}
                    onPressEvent={() => {
                        navigation.navigate(MembershipInfoPage)
                        // navigation.reset({
                        //     index: 0,
                        //     routes: [
                        //       {
                        //         name: SCREEN_NAME,
                        //       },
                        //     ],
                        //   })
                    }}
                />
            </ButtonContainer>
        </Conotainer>
    )
}

export default Pages;

const Conotainer = styled.View`
    background-color: white;
    flex: 1;
    align-items: center;
    padding-top: 100px;
`
const Title = styled(Typography).attrs({text:'LargeTitle'})`
    margin-top: 10px;
    text-align: center;
`

const CaptionText= styled(Typography).attrs({text:'Body05R'})`
    margin-top: 10px;
    text-align: center;
`

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 22px;
  margin-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
`;