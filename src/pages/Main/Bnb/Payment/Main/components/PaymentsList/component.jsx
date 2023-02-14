import { useNavigation } from '@react-navigation/native';
import { el } from 'date-fns/locale';
import React from 'react';
import {BackHandler, NativeModules, Platform} from 'react-native'
import { useTheme } from 'styled-components';
import styled, { css } from 'styled-components/native';
import { KakaoPayIcon, NaverIcon, NaverPayIcon, NomalCardIcon } from '../../../../../../../components/Icon';
import Typography from '../../../../../../../components/Typography';
import { setStorage } from '../../../../../../../utils/asyncStorage';


import { ArrowLeftBoxIcon, MaterialIcons } from '../Icon';

/**
 *
 * @param {object} props
 * @param {Function} props.onSelectPress
 * @returns
 */
const Component = ({
  onSelectPress=()=>{},
  select,
  name,
}) => {
  
  const IconSelect = (pay)=>{
    if(pay==="NOMAL"){
      return  <NomalCardIcon />
    }else if(pay==="KAKAOPAY"){
      return  <KakaoPayIcon />
    }else if(pay==="NAVERPAY"){
      return  <NaverPayIcon />
    }
  } 
  const TextSelect = (pay)=>{
    if(pay==="NOMAL"){
      return  "카드"
    }else if(pay==="KAKAOPAY"){
      return  "카카오페이"
    }else if(pay==="NAVERPAY"){
      return  "네이버페이"
    }
  } 
  const themeApp = useTheme();
  return (
    <Wrpaper isSelect={select===name} onPress={()=>{
        setStorage('easyPay',name)
        onSelectPress(name)
      }}>
      <Box>
        {IconSelect(name)}
        <PayText text={select===name ? "Body05SB":"Body05R"} textColor={themeApp.colors.grey[2]}>{TextSelect(name)}</PayText>
      </Box>
    </Wrpaper>
  );
};

const Wrpaper = styled.Pressable`
  ${({isSelect, theme})=>{
    if(isSelect){
      return css`
        border: 2px solid ${theme.colors.blue[500]};
        background-color: ${theme.colors.blue[100]};
      `
    }else{
      return css`
        border: 1px solid ${theme.colors.grey[7]};
        padding: 1px;
        background-color: white;
      `
    }
  }}
  box-sizing: border-box;
  align-items:center;
  justify-content:center;
  border-radius:14px;
  height:106px;
  margin-left:4px;
  margin-right:4px;
  flex:1;
`;
const Box = styled.View`
  justify-content: center;
  align-items: center;
`
const PayText = styled(Typography)`
  text-align: center;
  margin-top: 14px;
`

export default Component;
