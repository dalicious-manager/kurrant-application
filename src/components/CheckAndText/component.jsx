import React from 'react';
import styled from 'styled-components';
import {CheckIcon} from '../Icon';
import Typography from '../Typography';

/**
 * @param {object} props
 * @param {string} marginBottom
 
 * @returns
 */

const Component = ({
  marginBottom = '',
  text = '텍스트를 입력하세요',
  inputCheck,
  setInput,
  input,
}) => {
  return (
    <ShowOnlyToOwnerWrap marginBottom={marginBottom}>
      <CheckBox
        checked={input[inputCheck]}
        onPress={() => {
          const checkboxStatus = {...input};
          checkboxStatus[inputCheck] = !input[inputCheck];
          setInput(checkboxStatus);
        }}>
        <CheckIcon
          style={{width: 15, height: 10}}
          // size={36}
          color={'#ffffff'}
        />
      </CheckBox>
      <Title4>{text}</Title4>
    </ShowOnlyToOwnerWrap>
  );
};

export default Component;

const ShowOnlyToOwnerWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({marginBottom}) => marginBottom};
`;
const CheckBox = styled.Pressable`
  width: 24px;
  height: 24px;
  background-color: ${props => {
    if (props.checked) {
      return props.theme.colors.grey[2];
    } else {
      return props.theme.colors.grey[7];
    }
  }};
  border-radius: 7px;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`;
const Title4 = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.grey[2]};
`;
