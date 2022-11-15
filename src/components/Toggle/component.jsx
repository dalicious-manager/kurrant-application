import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled, { css } from 'styled-components/native';

import Typography from '../Typography';
import {
  getToggleWrapSize,
  getFontStyle,
  getToggleSize,
  getToggleWrapBackground,
} from './style';

/** 예시 */
// <Toggle
//   name='toggle1'
//   contents={contents}
//   size={'lg'}
//   defaultIndex=1
// />
//
// const contents = [
//   { label: '수량', value: '수량' },
//   { label: '금액', value: '금액' },
// ];

/**
 *
 * @param { object } props
 * @param { string } props.name 
 * @param { object } props.contents 
 * @param { string } props.contents.label 
 * @param { string } props.contents.string 
 * @param { 'sm' | 'md' | 'lg' } props.size 
 * @param { number } props.defaultIndex
 * @param { boolean } props.disabled
 * @returns
 */

const Component = ({ name = '123', contents = [{}], size = 'sm', defaultIndex, disabled }) => {
  // defaultValue - 예시  

  const defaultValue = contents[defaultIndex]?.value;

  const { control, watch } = useFormContext();

  const watchToggle = watch(name);

  return (
    <Wrapper size={size} disabled={disabled}>
      <Controller
        name={name}
        control={control}
        defaultValue={contents[defaultIndex]?.value || contents[0].value}
        render={({ field: { onChange, value } }) => (
          <React.Fragment>
            {contents?.map(item => (
              <ToggleWrap
                key={item.label}
                onPress={() => onChange(item.value)}
                checked={value === item.value}
                size={size}
                disabled={disabled}>
                <ToggleLabel checked={value === item.value} size={size}>
                  {item.value}
                </ToggleLabel>
              </ToggleWrap>
            ))}
          </React.Fragment>
        )}
      />
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  ${({ size }) => getToggleWrapSize(size)};
  ${({ disabled }) => getToggleWrapBackground(disabled)};
`;

const ToggleWrap = styled.Pressable`
  border-radius: 4px;
  ${({ size }) => getToggleSize(size)};
  ${({ checked }) =>
    checked &&
    css`
      background-color: ${({ theme }) => theme.colors.neutral[0]};
    `};
  justify-content: center;
  align-items: center;
`;

const ToggleLabel = styled(Typography)`
  ${({ size }) => getFontStyle(size)};
  color: ${({ theme }) => theme.colors.neutral[500]};
  ${({ checked }) =>
    checked &&
    css`
      color: ${({ theme }) => theme.colors.neutral[900]};
      font-weight: 700;
    `};
`;
