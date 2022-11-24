import React from 'react';
import styled from 'styled-components/native';

import {AntDesignIcon} from '../Icon';
import Typography from '../Typography';

/**
 *
 * @param {object} props
 * @param {string} props.category
 * @param {string} props.message
 * @returns
 */
const Component = ({category, message}) => {
  return (
    <Container>
      <InfoContainer>
        <CategoryContainer>
          <Typography variant="h500" weight="R" textColor="#fff">
            {category}
          </Typography>
        </CategoryContainer>
        <MessageContainer>
          <Typography variant="h500" weight="R" textColor="#fff">
            {message}
          </Typography>
        </MessageContainer>
      </InfoContainer>
      <IconContainer>
        <AntDesignIcon name="close" size={16} color="#fff" />
      </IconContainer>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  height: 36px;
  background-color: #000;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const InfoContainer = styled.View`
  width: 90%;
  height: 100%;
  flex-direction: row;
  align-items: center;
`;
const CategoryContainer = styled.View`
  height: 100%;
  justify-content: center;
  padding-right: 8px;
  padding-left: 12px;
`;
const MessageContainer = styled.View`
  height: 100%;
  justify-content: center;
`;
const IconContainer = styled.View`
  width: 10%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export default Component;
