import React, {useState, useEffect, forwardRef} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {Image, TouchableOpacity} from 'react-native';
import styled, {css, useTheme} from 'styled-components/native';

import {textStyles} from './styles';
import {AntDesignIcon} from '../Icon';
import Typography from '../Typography';

/**
 *
 * @param {object} props
 * @param {object} props.rules
 * @param {string} props.name
 * @param {string} props.placeholder
 * @param {boolean} props.isEditable
 * @param {boolean} props.isPassword
 * @param {boolean} props.focus
 * @param {function} props.setFocused
 * @param {object} props.suffix
 * @param {boolean} props.suffix.isNeedDelete
 * @param {number} props.suffix.timer
 * @param {number} props.suffix.isAuth
 * @param {number} props.suffix.authText
 * @param {function} props.suffix.authPressEvent
 * @param {string} props.label
 * @param {string} props.errMsg
 * @param {object} props.style
 *
 * @returns
 */
const Component = forwardRef(
  (
    {
      name,
      placeholder = '',
      isEditable = true,
      isPassword = false,
      rules = {},
      suffix = {
        isNeedDelete: false,
        timer: 0,
        isAuth: false,
        authText: '',
        authPressEvent: () => {
          console.log('인증 요청');
        },
      },

      additionalCssOnTextInput = '',
      height = '56px',
      setisFocused,
      label = '',
      caption = '',
      errMsg = '',
      defaultValue,
      style,
      ...rest
    },
    ref,
  ) => {
    // Hook
    const {
      control,
      watch,
      formState: {errors},
      resetField,
    } = useFormContext();

    const data = watch(name);
    const [focus, setFocused] = useState(false);
    const themeApp = useTheme();

    // Props
    const containerProps = {
      editable: isEditable,
    };

    const textInputProps = {
      placeholder,
      autoComplete: 'off',
      editable: isEditable,
    };

    // Suffix Contents
    let suffixContent = '';
    let timerContent = '';

    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue && defaultValue}
        render={({field: {onChange, value}}) => {
          return (
            <Wrapper {...style}>
              {/* Label */}
              {label && (
                <LabelContainer>
                  <Typography
                    text="Body06R"
                    textColor={
                      errors[name]
                        ? themeApp.colors.red[500]
                        : themeApp.colors.grey[4]
                    }>
                    {label}
                  </Typography>
                </LabelContainer>
              )}
              {/* TextInput */}
              <ControlContainer
                heights={height}
                isEditable={isEditable}
                isError={errors[name]}
                {...containerProps}
                focus={focus}>
                {/* <InputContainer> */}
                <StyledTextInput
                  additionalCssOnTextInput={additionalCssOnTextInput}
                  ref={ref && ref}
                  {...textInputProps}
                  name={name}
                  onChangeText={onChange}
                  onBlur={() => {
                    setFocused(false);
                    if (setisFocused) {
                      setisFocused(false);
                    }
                  }}
                  onFocus={() => {
                    setFocused(true);
                    if (setisFocused) {
                      setisFocused(true);
                    }
                  }}
                  focus={focus}
                  text={'Body05R'}
                  // suffix={!!suffixContent}
                  // timer={timer.remainTime > 0}
                  // value={formatter()}
                  // secureTextEntry={isPassword ? !isShowing : false}
                  {...rest}
                />
                {/* </InputContainer> */}
              </ControlContainer>
              {/* caption */}
              {caption && (
                <CaptionContainer>
                  <Typography
                    text="CaptionR"
                    textColor={
                      value ? themeApp.colors.grey[4] : themeApp.colors.grey[5]
                    }>
                    {caption}
                  </Typography>
                </CaptionContainer>
              )}
              {/* Error Message */}
              {errors[name] && (
                <LabelContainer>
                  <Typography
                    variant="h500"
                    weight="R"
                    textColor={themeApp.colors.red[500]}>
                    {errors[name].message}
                  </Typography>
                </LabelContainer>
              )}
            </Wrapper>
          );
        }}
      />
    );
  },
);

// Wrapper
const Wrapper = styled.View`
  width: 100%;
`;

// Label
const LabelContainer = styled.View`
  width: 100%;
  margin-bottom: 8px;
`;

// Caption
const CaptionContainer = styled.View`
  width: 100%;
  background-color: transparent;
`;

// TextInput
const ControlContainer = styled.View`
  position: relative;
  width: 100%;
  height: ${({heights}) => heights && heights};
  border-radius: 14px;
  ${({isEditable, theme, isError, focus}) => {
    if (isEditable) {
      return css`
        border-color: ${isError
          ? theme.colors.red[500]
          : focus
          ? theme.colors.blue[500]
          : theme.colors.grey[7]};
        border-width: ${focus ? '2px' : '1px'};
      `;
    }
  }}
`;

const InputContainer = styled.View`
  /* width: 100%;
  justify-content: center;
  align-items: flex-start; */
`;

const StyledTextInput = styled.TextInput`
  ${({text}) => text && textStyles[text]}
  padding: ${({focus}) => (focus ? '16px 19px' : '17px 20px')};
`;

export default Component;
