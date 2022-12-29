import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from 'styled-components/native';

import Wrapper from "~components/Wrapper";

import ListBox from "../../ListBox";
import { PAGE_NAME as MarketingAgreePageName} from "../MarketingAgree";
export const PAGE_NAME = "P__MY_PAGE__EMAIL_SETTING"
const Pages = ()=>{
   const form = useForm();
    return(
        <Wrapper paddingTop={24}>
            <FormProvider {...form}>

            </FormProvider>
        </Wrapper>  
    )
}

export default Pages;

