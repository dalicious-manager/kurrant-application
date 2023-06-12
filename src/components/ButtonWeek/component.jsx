import id from 'date-fns/esm/locale/id/index.js';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';

import Typography from '../Typography';

const Component = ({touch, setTouch}) => {
  const week = ['월', '화', '수', '목', '금', '토', '일'];

  const onPressButton = idx => {
    if (touch?.includes(idx)) {
      return setTouch(touch?.filter(v => v !== idx));
    }
    setTouch([...touch, idx]);
  };

  return (
    <Wrap>
      {week.map((m, idx) => {
        return (
          <ButtonWrap
            key={idx}
            onPress={() => {
              onPressButton(idx);
            }}
            touch={touch?.includes(idx)}
            idx={idx}>
            <WeekText touch={touch?.includes(idx)} idx={idx}>
              {m}
            </WeekText>
          </ButtonWrap>
        );
      })}
    </Wrap>
  );
};

export default Component;

const Wrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;
const ButtonWrap = styled.Pressable`
  background-color: ${({theme, touch}) =>
    touch ? theme.colors.grey[2] : theme.colors.grey[8]};
  padding: 8px 12px;
  border-radius: 7px;
`;

const WeekText = styled(Typography).attrs({text: 'BottomButtonSB'})`
  color: ${({theme, touch}) =>
    touch ? theme.colors.grey[0] : theme.colors.grey[5]};
`;
