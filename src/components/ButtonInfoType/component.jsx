import React, {useEffect} from 'react';
import styled from 'styled-components';

import {width, heigth} from '../../theme';
import Typography from '../Typography';

const Component = ({
  label,
  disabled = false,

  touch,
  setTouch,

  margin = '0',
  title = [
    {id: 1, type: '모두 보기'},
    {id: 2, type: '제한 없음'},
    {id: 3, type: '제한 있음'},
  ],
}) => {
  const onPressButton = id => {
    if (touch?.includes(id)) {
      if (touch?.length > 1) {
        return setTouch(touch?.filter(v => v !== id));
      }
      return;
    }

    setTouch([id]);
  };

  return (
    <>
      {title.map((t, idx) => {
        return (
          <Wrap
            margins={margin}
            key={t.id}
            onPress={() => {
              onPressButton(t.id);
            }}
            touch={touch?.includes(t.id)}
            idx={t.id}>
            <TextView>
              <Label touch={touch?.includes(t.id)} idx={t.id}>
                {t.type}
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
