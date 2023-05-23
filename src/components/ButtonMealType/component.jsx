import React, {useEffect} from 'react';
import styled from 'styled-components';

import Typography from '../Typography';
import {width, heigth} from '../../theme';

const Component = ({
  label,
  disabled = false,

  touch,
  setTouch,

  margin = '0',
  title = ['아침', '점심', '저녁'],
}) => {
  const onPressButton = idx => {
    if (touch?.includes(idx)) {
      if (touch?.length > 1) {
        return setTouch(touch?.filter(v => v !== idx));
      }
      return;
    }

    setTouch([...touch, idx]);
  };

  return (
    <>
      {title.map((t, idx) => {
        return (
          <Wrap
            margins={margin}
            key={idx}
            onPress={() => {
              onPressButton(idx);
            }}
            touch={touch?.includes(idx)}
            idx={idx}>
            <TextView>
              <Label touch={touch?.includes(idx)} idx={idx}>
                {t}
              </Label>
            </TextView>
          </Wrap>
        );
      })}
    </>
  );
};

export default Component;

const Wrap = styled.Pressable`
  border-color: ${({theme, disabled, touch, allTouch}) =>
    !touch ? theme.colors.grey[8] : disabled && theme.colors.grey[7]};
  border-width: 1px;
  border-radius: 14px;
  background-color: ${({theme, disabled, touch, allTouch}) =>
    touch
      ? theme.colors.grey[2]
      : disabled
      ? theme.colors.grey[0]
      : theme.colors.grey[8]};
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: ${width * 103}px;
  height: 40px;
  margin-right: ${({margins}) => margins && margins}px;
`;

const Line = styled.View`
  width: 100%;
  border-bottom: solid;
  border-color: ${({theme}) => theme.colors.grey[7]};
  border-width: 1px;
  transform: rotate(160deg);
  position: absolute;
  top: 18px;
  box-sizing: border-box;
`;

const TextView = styled.View``;

const Label = styled(Typography).attrs({text: 'BottomButtonSB'})`
  color: ${({theme, disabled, touch}) =>
    touch
      ? theme.colors.grey[0]
      : disabled
      ? theme.colors.grey[6]
      : theme.colors.grey[5]};
`;
