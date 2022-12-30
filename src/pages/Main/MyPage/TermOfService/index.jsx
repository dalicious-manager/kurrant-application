import React from "react";

import Wrapper from "~components/Wrapper";

import ListBox from "./ListBox";
import { PAGE_NAME as PrivacyPageName } from "./Privacy";
import { PAGE_NAME as TermPageName } from "./Term";
export const PAGE_NAME = "P__MY_PAGE__TERM_OF_SERVICE"

const Pages =  ()=>{
    return(
        <Wrapper paddingTop={24}>
            <ListBox title="서비스 이용 약관" routeName={TermPageName}/>
            <ListBox title="개인정보 처리 방침" routeName={PrivacyPageName}/>
        </Wrapper>
    )
}


export default Pages;

