import React from 'react';
import styled from 'styled-components';

import Typography from '../Typography';

const Component = ({
  label,
  disabled = false,
  onPressEvent = () => {
    console.log('dddd');
  },
}) => {
  return (
    <Wrap onPress={onPressEvent} disabled={disabled}>
      <Label disabled={disabled}>{label}</Label>
    </Wrap>
  );
};

export default Component;

const Wrap = styled.Pressable`
  width: 77px;
  padding: 6.5px 0px;
  box-sizing: border-box;
  border: 1px solid ${props => props.theme.colors.grey[7]};
  border-radius: 100px;
  background-color: ${props => props.theme.colors.grey[0]};
  align-items: center;
  justify-content: center;
  margin-left: 6px;
`;

const Label = styled(Typography).attrs({text: 'Button10SB'})`
  color: ${({theme, disabled}) =>
    disabled ? theme.colors.grey[6] : theme.colors.red[500]};
  line-height: 19px;
`;
