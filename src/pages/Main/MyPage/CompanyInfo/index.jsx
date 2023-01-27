import React, {useEffect} from 'react';

import Typography from '../../../../components/Typography';

import styled from 'styled-components/native';

export const PAGE_NAME = 'P__MY_PAGE__COMPANYINFO';

import CompanyLogo from '../../../../assets/icons/CompanyLogo.svg';

export const YesYes = 'yes';

const Page = () => {
  return (
    <Container>
      <LogoWrap>
        <CompanyLogo />
      </LogoWrap>

      <MetadataWrap>
        <CompanyName>달리셔스주식회사</CompanyName>
        <Metadata>서울특별시 강남구 테헤란로 51길 21, 3층 상경빌딩</Metadata>
        <Metadata>대표 : 이강용 | 사업자등록번호 : 376-87-00441</Metadata>
        <Metadata>2016-2023 @ Dalicious company</Metadata>
      </MetadataWrap>
    </Container>
  );
};
export default Page;

const Container = styled.View`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const LogoWrap = styled.View`
  flex: 4;

  justify-content: center;
`;
const MetadataWrap = styled.View`
  flex: 1;
  justify-content: center;

  padding-bottom: 20px;
`;

const CompanyName = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  text-align: center;
  margin-bottom: 5px;
`;
const Metadata = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
  text-align: center;
`;
