import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {GreyLockerIcon} from '~components/Icon';
import {DefaultHumanIcon} from '~components/Icon';

import Typography from '~components/Typography';
import SseRedDot from '../../../utils/sse/SseService/SseRedDot/SseRedDot';

// const sampleOnlyForReviewers = true;
const sampleOnlyForReviewers = false;

const Component = ({
  makersName,
  pngLink,
  writtenDate: createDate,
  message: content,
  isSseType8,
}) => {
  const [calcFontSize, setCalcFontSize] = useState(278 * 0.052279);

  const getWidth = e => {
    const {width, height, x, y} = e.nativeEvent.layout;

    setCalcFontSize(width * 0.052279);
  };

  return (
    <Container>
      <AdminImageWrap>
        {pngLink ? (
          <AdminImage source={pngLink} resizeMode="cover" />
        ) : (
          <DefaultHumanIcon />
        )}
      </AdminImageWrap>

      <MessageWrap onlyForReviewers={sampleOnlyForReviewers}>
        {sampleOnlyForReviewers ? (
          <OnlyForReviewersContainer>
            <GreyLockerIcon />

            <OnlyForReviewersText>
              작성자에게만 보이는 리뷰에요.
            </OnlyForReviewersText>
          </OnlyForReviewersContainer>
        ) : (
          <>
            <SseRedDotType8
              // sseType8
              isSse={isSseType8}
              position={'absolute'}
              top={'-1px'}
              right={'-2px'}
            />
            <TitleWrap>
              <AdminName>{makersName ? makersName : '운영자'}</AdminName>
              <WrittenDate> {createDate} 작성</WrittenDate>
            </TitleWrap>

            <MessageContentWrap onLayout={getWidth}>
              <Message calcFontSize={calcFontSize}>{content}</Message>
            </MessageContentWrap>
          </>
        )}
      </MessageWrap>
    </Container>
  );
};

export default Component;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 12px;
`;

const OnlyForReviewersContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const OnlyForReviewersText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[5]};
  margin-left: 6px;
`;

const AdminImageWrap = styled.View`
  width: 30px;
  height: 30px;

  border-radius: ${() => {
    const radius = (30 * 50) / 100;
    return `         
       ${radius}px`;
  }};
  background-color: ${props => props.theme.colors.grey[8]};
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
`;

const AdminImage = styled.Image`
  width: 60%;
  height: 60%;
`;

const MessageWrap = styled.View`
  margin-left: 4px;
  background-color: ${props => props.theme.colors.grey[8]};
  border-radius: 7px;
  /* padding: 16px; */

  ${({onlyForReviewers}) =>
    onlyForReviewers ? 'padding: 16px;' : 'padding: 12px 16px;'}

  flex: 1;
  /* border: 1px solid black; */
`;
const TitleWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;
const AdminName = styled(Typography).attrs({text: 'Body06SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-left: 6px;
`;

const WrittenDate = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${props => props.theme.colors.grey[4]};
  margin-left: 6px;
`;

const MessageContentWrap = styled.View`
  /* border: 1px solid black; */
  width: 278px;
`;

const Message = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-left: 6px;

  ${({calcFontSize}) => {
    if (calcFontSize) {
      return css`
        font-size: ${({calcFontSize}) => `${calcFontSize}px`};
      `;
    }
  }}
`;

const SseRedDotType8 = styled(SseRedDot)``;
