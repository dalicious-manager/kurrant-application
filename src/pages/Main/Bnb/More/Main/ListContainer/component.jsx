import React from 'react';
import {View} from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import Typography from '../../../../../../components/Typography';



/**
 * @param {object} props
 * @param {string} props.title
 * @returns 
 */

const Component = ({
  children,
  title
}) => {
  const themeApp = useTheme();
  return (
   <Container>
    <TitleBox>
      <Title text={'Body06SB'} textColor={themeApp.colors.grey[5]}>{title}</Title>
    </TitleBox>
    {children}
  </Container>
  )
};
 
export default Component;

const Title = styled(Typography)`
  
`
const TitleBox = styled.View`
  padding:0px 17px;
  flex-direction: row;
  align-items: center;
  height: 56px;
`
const Container = styled.View`
  margin-bottom: 16px;
  border-top-color: ${({theme})=>theme.colors.grey[8]};
  box-sizing: border-box;
  border-top-width: 1px;
  margin-left: 24px;
  margin-right: 24px;
`