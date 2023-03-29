import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../../../../components/Typography';

const Button = ({touch, setTouch}) => {
  const title = ['전체', '적립', '사용'];

  const onPressButton = idx => {
    if (touch?.includes(idx)) {
      return setTouch(touch?.filter(v => v === idx));
    }
    setTouch([idx]);
  };
  console.log(touch);
  return (
    <Wrap>
      {title.map((el, idx) => {
        return (
          <ButtonWrap
            key={idx}
            onPress={() => {
              onPressButton(idx);
            }}>
            <ButtonPress touch={touch?.includes(idx)}>
              <ButtonText touch={touch?.includes(idx)} idx={idx}>
                {el}
              </ButtonText>
            </ButtonPress>
          </ButtonWrap>
        );
      })}
    </Wrap>
  );
};

export default Button;

const Wrap = styled.View`
  flex-direction: row;
`;

const ButtonWrap = styled.Pressable`
  margin-right: 8px;
  padding-bottom: 8px;
`;

const ButtonPress = styled.View`
  border: 1px solid
    ${({theme, touch}) => (touch ? theme.colors.grey[2] : theme.colors.grey[0])};
  min-width: 47px;
  min-height: 32px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  background-color: ${({theme, touch}) =>
    touch ? theme.colors.grey[0] : theme.colors.grey[8]};
`;

const ButtonText = styled(Typography).attrs({text: 'Button10SB'})`
  color: ${({theme, touch}) =>
    touch ? theme.colors.grey[2] : theme.colors.grey[5]};
`;
