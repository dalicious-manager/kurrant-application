import React, {useRef, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {Animated, Dimensions} from 'react-native';
import styled from 'styled-components/native';

import {AntDesignIcon} from '../Icon';
import SimpleLineIcon from '../Icon/_components/SimpleLineIcon';

const Component = ({}) => {
  const {control} = useFormContext();

  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
  const focusColor = focused ? '#006adc' : '#A9ACAE';

  const animatedScale = useRef(new Animated.Value(0)).current;

  const changeWidthEvent = () => {
    !focused
      ? Animated.timing(animatedScale, {
          toValue: Dimensions.get('window').width,
          duration: 300,
          useNativeDriver: false,
        }).start()
      : Animated.timing(animatedScale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
  };

  const focusEvent = () => {
    setFocused(true), changeWidthEvent();
  };

  const blurEvent = () => {
    setFocused(false), changeWidthEvent();
  };

  return (
    <Controller
      name="search"
      control={control}
      render={({field: {onChange, value}}) => {
        const typingEvent = value => {
          onChange(value.trim()), setText(value);
        };

        const deleteEvent = () => {
          onChange(''), setText('');
        };

        return (
          <Wrap>
            <SearchWrap focused={focused}>
              <IconWrap>
                <SimpleLineIcon
                  name={'magnifier'}
                  size={20}
                  color={focusColor}
                />
              </IconWrap>
              <InputWrap>
                <Input
                  placeholder="코인명/심볼 검색"
                  returnKeyType="search"
                  useRef="search"
                  blurOnSubmit={true}
                  value={value}
                  placeholderTextColor="#A9ACAE"
                  onFocus={focusEvent}
                  onBlur={blurEvent}
                  onChangeText={value => typingEvent(value)}
                />
              </InputWrap>
              {value && (
                <DeleteWrap onPress={deleteEvent}>
                  <AntDesignIcon
                    name={'closecircle'}
                    size={16}
                    color={'#d4d8dd'}
                  />
                </DeleteWrap>
              )}
            </SearchWrap>
            <Line style={{backgroundColor: '#EEEEEE'}} />
            <Line style={{backgroundColor: '#006adc', width: animatedScale}} />
          </Wrap>
        );
      }}
    />
  );
};

export default Component;

const Wrap = styled.View`
  position: relative;
`;
const SearchWrap = styled.View`
  padding: 9px 18px;
  flex-direction: row;
`;
const Line = styled(Animated.View)`
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  position: absolute;
`;
const IconWrap = styled.View`
  margin-right: 8px;
`;
const InputWrap = styled.View`
  flex: 1;
`;
const DeleteWrap = styled.Pressable`
  width: 24px;
  justify-content: center;
  align-items: flex-end;
`;

const Input = styled.TextInput`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${({theme}) => theme.colors.neutral[900]};
`;
