import React, {useState, useEffect,forwardRef} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import styled, {css, useTheme} from 'styled-components/native';

import {formattedTimer} from '../../utils/dateFormatter';
import {AntDesignIcon} from '../Icon';
import Typography from '../Typography';
import { textStyles } from './styles';

/**
 *
 * @param {object} props
 * @param {object} props.rules
 * @param {string} props.name
 * @param {string} props.placeholder
 * @param {boolean} props.isEditable
 * @param {boolean} props.focus
 * @param {function} props.setFocused
 * @param {object} props.suffix
 * @param {boolean} props.suffix.isNeedDelete
 * @param {number} props.suffix.timer
 * @param {string} props.label
 * @param {string} props.errMsg
 * @param {object} props.style
 *
 * @returns
 */
const Component = forwardRef(({
  name,
  placeholder = '',
  isEditable = true,
  rules={},
  focus = false,
  setFocused = (focused)=> {},
  suffix = {
    isNeedDelete: false,
    timer: 0,
  },
  label = '',
  errMsg = '',
  style,
  ...rest
},ref) => {
  // Hook
  const {control,formState:{errors}} = useFormContext();
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

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {onChange,value}}) => {
        return (
          <Wrapper {...style}>
            {/* Label */}
            {label && (
              <LabelContainer>
                <Typography
                  text="CaptionR"
                  textColor={errors[name] ? themeApp.colors.red[500]: focus ? themeApp.colors.blue[500] : themeApp.colors.grey[2] }>
                  {value ? label:'  '}
                </Typography>
              </LabelContainer>
            )}
            {/* TextInput */}
            <ControlContainer 
              isError={errors[name]}
              {...containerProps}
              focus={focus}
            >
              <InputContainer>
                <StyledTextInput
                  ref={ref && ref}
                  {...textInputProps}
                  onChangeText={onChange}
                  onBlur={()=>setFocused(false)}
                  text={'InputText'}
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
});

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
  background-color: ${({theme})=>theme.colors.grey[0]};
  border-bottom-color:${({theme ,isError,focus})=>isError ?theme.colors.red[500]: focus ? theme.colors.blue[500]:theme.colors.grey[8]};
  border-bottom-width:2px;
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
  ${({text})=> text && textStyles[text]}
  padding: 4px 8px;

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
