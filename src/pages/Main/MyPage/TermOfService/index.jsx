import React from "react";

import Wrapper from "~components/Wrapper";

import ListBox from "./ListBox";

export const PAGE_NAME = "P__MY_PAGE__TERM_OF_SERVICE"

const Pages =  ()=>{
    return(
        <Wrapper paddingTop={24}>
            <ListBox title="서비스 이용 약관"/>
            <ListBox title="개인정보 처리 방침"/>
        </Wrapper>
    )
}


export default Pages;

