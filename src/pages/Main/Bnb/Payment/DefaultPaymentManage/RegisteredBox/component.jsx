import React from "react";
import styled from "styled-components";
import { css, useTheme } from "styled-components/native";
import Checkicon from '~assets/icons/check.svg';
import Label from "~components/Label";
import Typography from "~components/Typography";


const Component = ({
    cardName,
    cardNumber,
    isMembership=false,
    isDefault=false,
    onPressEvent=()=>{},
    isSelected
}) =>{
    const themeApp = useTheme();
    return (
       <Wrap>
            <TextBox>
                <Typography text={'Body05SB'} textColor={themeApp.colors.grey[2]}>{cardName}</Typography>
                <Typography text={'CaptionR'} textColor={themeApp.colors.grey[2]}>********{cardNumber?.toString().slice(-4)}</Typography>
                <LabelContainer>
                    {isMembership && <LabelBox>
                        <Label label="멤버십 결제수단" type="blue"/>
                    </LabelBox>}
                    {isDefault && <LabelBox>
                        <Label label="기본 구매 결제수단" type="blue"/>
                    </LabelBox>}
                </LabelContainer>
            </TextBox>
            {isSelected && <Button >
                <CheckIcon checked={true} type="white"/>
            </Button>}
            
        </Wrap>
    )
};

export default Component;

const Wrap = styled.View`
    border-color:${({theme})=>theme.colors.grey[7]};
    border-width: 1px;
    border-radius: 14px;
    padding: 20px 13px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const TextBox = styled.View`

`
const LabelContainer = styled.View`
    flex-direction: row;
    margin-top: 2px;
`
const LabelBox = styled.View`
    margin-right: 6px;
`;

const Button = styled.Pressable`
    padding: 6.5px 16px;
`
const CheckIcon = styled(Checkicon)`
  color: ${({ checked }) =>
      checked
        ? css`
             ${({ type,theme }) => type === 'yellow' 
          ? theme.colors.grey[1] 
          : type === 'grey' ? theme.colors.grey[0] 
          : type ==='login' ? theme.colors.neutral[0] :theme.colors.grey[2]};
          `
        : css`
            ${({ type,theme }) => type === 'white' ? theme.colors.grey[7] : theme.colors.grey[0]};
          `};
         

  `;