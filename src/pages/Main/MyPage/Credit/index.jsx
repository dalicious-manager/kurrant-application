import React, {useEffect} from 'react';

import Typography from '../../../../components/Typography';

import styled from 'styled-components/native';

export const PAGE_NAME = 'P__MY_PAGE__CREDIT';

export const YesYes = 'yes';

const Page = () => {
  return (
    <Container>
      <MetadataWrap>
        {/* <CompanyName>달리셔스주식회사</CompanyName> */}
        <CreditBox>
          <CreditLine>
            <CompanyName>CEO</CompanyName>
            <Metadata>이강용</Metadata>
          </CreditLine>
        </CreditBox>
        <CreditBox>
          <CreditLine>
            <CompanyName>고문</CompanyName>
            <Metadata>안상현</Metadata>
          </CreditLine>
        </CreditBox>
        <CreditBox>
          <CreditLine>
            <TitleBox>
              <CompanyName>영업 부문</CompanyName>
              <CompanyName>Sales Director</CompanyName>
            </TitleBox>
            <Metadata>맹준호</Metadata>
          </CreditLine>
        </CreditBox>
        <CreditBox>
          <CreditLine>
            <TitleBox>
              <CompanyName>재무 부문</CompanyName>
              <CompanyName>CFO</CompanyName>
            </TitleBox>
            <Metadata>정안식</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>Management Support Manager</CompanyName>
            <Metadata>노아영</Metadata>
          </CreditLine>
        </CreditBox>
        <CreditBox>
          <CreditLine>
            <TitleBox>
              <CompanyName>사업/운영 부문</CompanyName>
              <CompanyName>Business/Operation Lead</CompanyName>
            </TitleBox>
            <Metadata>권용욱</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>Operation Manager</CompanyName>
            <Metadata>문진혁</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>Operation Manager</CompanyName>
            <Metadata>조우진</Metadata>
          </CreditLine>
        </CreditBox>
        <CreditBox>
          <CreditLine>
            <TitleBox>
              <CompanyName>개발 부문</CompanyName>
              <CompanyName>CPO</CompanyName>
            </TitleBox>
            <Metadata>남태호</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>PO Lead</CompanyName>
            <Metadata>전정호</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>UI/UX Lead</CompanyName>
            <Metadata>박수비</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>UI/UX Designer</CompanyName>
            <Metadata>구현경</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>FrontEnd Engineer</CompanyName>
            <Metadata>장경태</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>FrontEnd Engineer</CompanyName>
            <Metadata>김지혜</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>FrontEnd Engineer</CompanyName>
            <Metadata>조재신</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>BackEnd Engineer</CompanyName>
            <Metadata>이상진</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>BackEnd Engineer</CompanyName>
            <Metadata>김민지</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>BackEnd Engineer</CompanyName>
            <Metadata>강지성</Metadata>
          </CreditLine>
        </CreditBox>
        <CreditBox>
          <CreditLine>
            <TitleBox>
              <CompanyName>개발 부문 - DCAMP T Academy</CompanyName>
              <CompanyName>Data Engineering Trainee</CompanyName>
            </TitleBox>
            <Metadata>권효은</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>Data Engineering Trainee</CompanyName>
            <Metadata>김예슬</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>Data Engineering Trainee</CompanyName>
            <Metadata>김정우</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>Data Engineering Trainee</CompanyName>
            <Metadata>안가영</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>Data Engineering Trainee</CompanyName>
            <Metadata>이정현</Metadata>
          </CreditLine>
          <CreditLine>
            <CompanyName>Data Engineering Trainee</CompanyName>
            <Metadata>최지웅</Metadata>
          </CreditLine>
        </CreditBox>
        <ScrollPadding />
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
`;

const MetadataWrap = styled.ScrollView`
  padding-left: 24px;
  padding-right: 24px;
`;

const CompanyName = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  padding-right: 10px;
`;
const Metadata = styled(Typography).attrs({text: 'Body06SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  text-align: right;
  justify-self: flex-end;
  align-self: flex-end;
`;

const CreditBox = styled.View`
  margin-top: 24px;
`;
const CreditLine = styled.View`
  justify-content: flex-end;
  justify-content: flex-end;
  flex-direction: row;
`;
const TitleBox = styled.View`
  justify-content: flex-end;
  align-items: flex-end;
`;
const ScrollPadding = styled.View`
  padding: 25px;
`;
