import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../../../../components/Typography';

const Component = () => {
  return (
    <Container>
      <AdminImageWrap>
        <AdminImage
          source={require('../../../../../../assets/images/DefaultProfile.png')}
          resizeMode="cover"
        />
      </AdminImageWrap>

      <MessageWrap>
        <TitleWrap>
          <AdminName>일품만찬</AdminName>
          <WrittenDate> 2022.02.11 작성</WrittenDate>
        </TitleWrap>

        <Message>
          맛있게 드셨다니 정말 기뻐요. 다음에는 더 맛있는 메뉴를
          준비해보겠습니다. 이용해주셔서 다시한번 감사드리고 새해에는 더더더더더
          복 많이 받으세요 사랑합니다.
        </Message>
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
  padding: 16px;
  flex: 1;
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

const Message = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-left: 6px;
`;
