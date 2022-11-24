import React, {useState, useEffect} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import styled, {css, useTheme} from 'styled-components/native';

import {formattedTimer} from '../../utils/dateFormatter';
import {AntDesignIcon} from '../Icon';
import Typography from '../Typography';

/**
 *
 * @param {object} props
 * @param {string} props.name
 * @param {string} props.placeholder
 * @param {boolean} props.isEditable
 * @param {object} props.suffix
 * @param {boolean} props.suffix.isNeedDelete
 * @param {number} props.suffix.timer
 * @param {string} props.label
 * @param {string} props.errMsg
 * @param {object} props.style
 *
 * @returns
 */
const Component = ({
  name,
  placeholder = '',
  isEditable = true,
  suffix = {
    isNeedDelete: false,
    timer: 0,
  },
  label = '',
  errMsg = '',
  style,
  ...rest
}) => {
  // Hook
  const {control} = useFormContext();
  const [timer, setTimer] = useState({
    remainTime: suffix.timer || 0,
    isRunning: false,
  });
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
  let suffixContent = null;

  if (suffix.isNeedDelete) {
    suffixContent = <AntDesignIcon name="closecircle" />;
  }

  if (timer.remainTime > 0) {
    suffixContent = (
      <Typography variant="h600" weight="R">
        {formattedTimer(timer.remainTime)}
      </Typography>
    );
  }

  // Suffix - Timer
  if (timer.remainTime > 0 && !timer.isRunning) {
    setTimer(prev => ({...prev, isRunning: true}));
  }
  useEffect(() => {
    if (timer.isRunning) {
      const timerId = setTimeout(() => {
        setTimer(prev => ({...prev, remainTime: prev.remainTime - 1}));
      }, 1000);

      if (timer.remainTime < 0) {
        setTimer(prev => ({...prev, isRunning: false}));
      }

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [timer]);

  // Event Handler

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur}}) => {
        return (
          <Wrapper {...style}>
            {/* Label */}
            {label && (
              <LabelContainer>
                <Typography
                  variant="h500"
                  weight="R"
                  textColor={themeApp.colors.semantic.font.label}>
                  {label}
                </Typography>
              </LabelContainer>
            )}
            {/* TextInput */}
            <ControlContainer {...containerProps}>
              <InputContainer>
                <StyledTextInput
                  {...textInputProps}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  suffix={!!suffixContent}
                  {...rest}
                />
              </InputContainer>
              {/* Suffix */}
              <SuffixContainer suffix={!!suffixContent}>
                {suffixContent}
              </SuffixContainer>
            </ControlContainer>
            {/* Error Message */}
            {errMsg && (
              <LabelContainer>
                <Typography
                  variant="h500"
                  weight="R"
                  textColor={themeApp.colors.semantic.error}>
                  {errMsg}
                </Typography>
              </LabelContainer>
            )}
          </Wrapper>
        );
      }}
    />
  );
};

// Wrapper
const Wrapper = styled.View`
  width: 100%;
`;

// Label
const LabelContainer = styled.View`
  width: 100%;
  background-color: transparent;
`;

// TextInput
const ControlContainer = styled.View`
  position: relative;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 6px;
  background-color: #f5f6f8;
  border: none;

  ${({editable}) => {
    if (!editable) {
      return css`
        background-color: #f5f6f8;
      `;
    }
  }}
`;

const InputContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: flex-start;
`;

const StyledTextInput = styled.TextInput`
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  padding: 4px 8px;
  height: 44px;

  ${({suffix}) => {
    if (suffix) {
      return css`
        padding-right: 18%;
      `;
    }
  }}
`;

// Suffix
const SuffixContainer = styled.View`
  position: absolute;
  width: 0;
  height: 44px;
  top: 0;
  right: 0;
  align-items: center;
  justify-content: center;

  ${({suffix}) => {
    if (suffix) {
      return css`
        width: 15%;
      `;
    }
  }}
`;

export default Component;
