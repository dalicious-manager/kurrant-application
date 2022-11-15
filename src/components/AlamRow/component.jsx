import React from 'react';
import styled, {useTheme} from 'styled-components/native';

import {formattedTime} from '../../utils/dateFormatter';
import Typography from '../Typography';

/** 예시 */
const mock = {
  type: '지정가',
  date: new Date(),
  message: '지정가 도달',
  detailMessage: '비트코인 17,121.000 도달',
};

/**
 *
 * @param {object} props
 * @param {'지정가'|'보유자산'|'체결'} props.type
 * @param {string} props.message
 * @param {string} props.detailMessage
 * @param {string} props.date
 * @returns
 */
const Component = ({type, message, detailMessage, date}) => {
  const appTheme = useTheme();
  return (
    <Container>
      <InfoContainer>
        <LabelContainer>
          <Typography
            variant="h500"
            weight="B"
            textColor={appTheme.colors.purple[500]}>
            {type || mock.type}
          </Typography>
        </LabelContainer>
        <MessageContainer>
          <Typography variant="h600" weight="R">
            {message || mock.message}
          </Typography>
          <Typography
            variant="h500"
            weight="R"
            textColor={appTheme.colors.neutral[500]}>
            {detailMessage || mock.detailMessage}
          </Typography>
        </MessageContainer>
      </InfoContainer>
      <DateContainer>
        <Typography
          variant="h500"
          weight="R"
          textColor={appTheme.colors.neutral[400]}>
          {date || formattedTime(mock.date)}
        </Typography>
      </DateContainer>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  max-width: 339px;
  height: 62px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const InfoContainer = styled.View`
  width: 80%;
  height: 100%;
`;
const LabelContainer = styled.View`
  width: 100%;
`;

const MessageContainer = styled.View`
  width: 100%;
  height: 42px;
  justify-content: space-around;
`;

const DateContainer = styled.View`
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export default Component;
