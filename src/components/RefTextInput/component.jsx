import React, {useState, useEffect,forwardRef} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {TouchableOpacity} from 'react-native';
import styled, {css, useTheme} from 'styled-components/native';

import EyeOff from '../../assets/icons/TextInput/eyeOff.svg';
import EyeOn from '../../assets/icons/TextInput/eyeOn.svg';
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
 * @param {number} props.suffix.isAuth
 * @param {number} props.suffix.authText
 * @param {function} props.suffix.authPressEvent
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
  suffix = {
    isNeedDelete: false,
    timer: 0,
    isAuth:false,
    authText:'',
    authPressEvent:()=>{console.log('인증 요청')},
  },
  label = '',
  errMsg = '',
  defaultValue,
  style,
  ...rest
},ref) => {
  // Hook
  const {control,watch,formState:{errors},resetField} = useFormContext();
  const [timer, setTimer] = useState({
    remainTime: suffix.timer || 0,
    isRunning: false,
  });
  const data = watch(name);
  const [isShowing , setShowing] = useState(false);
  const [focus,setFocused] = useState(false)
  
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

  if (suffix.isNeedDelete && data) {
    suffixContent = <TouchableOpacity onPress={()=>{
      resetField(name)
      ref?.current?.focus();
    }}><AntDesignIcon name="closecircle" /></TouchableOpacity>;
  }

  // Password Showing
  if ((name==='password' || name==='passwordChecked') && data) {
    suffixContent = <TouchableOpacity onPress={()=>{
      setShowing(!isShowing)
    }}>{isShowing ? <EyeOn />:<EyeOff />}</TouchableOpacity>;
  }

  // Suffix - Timer
  if (timer.remainTime > 0) {
    timerContent = (
      <Typography variant="h600" weight="R">
        {formattedTimer(timer.remainTime)}
      </Typography>
    );
  }
  if (timer.remainTime > 0 && !timer.isRunning) {
    setTimer(prev => ({...prev, isRunning: true}));
  }
  useEffect(()=>{
    console.log(errors)
  },[errors])
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
      defaultValue={defaultValue && defaultValue}
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
              isEditable={isEditable}
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
                  onFocus={()=>setFocused(true)}
                  text={'InputText'}
                  suffix={!!suffixContent}
                  timer={timer.remainTime > 0}
                  value={value || ''}
                  secureTextEntry={name==='password' || name ==='passwordChecked' ? !isShowing :false}
                  {...rest}
                />
              </InputContainer>
              {/* Suffix */}
              {isEditable && <><TimerContainer timer={timer.remainTime > 0} isAuth={suffix.isAuth}>
                {timerContent}
              </TimerContainer><SuffixContainer suffix={!!suffixContent} isAuth={suffix.isAuth}>
                  {suffixContent}
                </SuffixContainer></>}
              {isEditable && suffix.isAuth && <AuthenticationButton onPress={()=>{
                if(suffix.authText ==='재발송'){
                  setTimer(prev => ({...prev, remainTime: 180}));
                  resetField(name);
                  return suffix.authPressEvent(true)
                }                
                suffix.authPressEvent(false)
              }}>
                    <Typography 
                      text={'Button10SB'} 
                      textColor={suffix.authText ==='재발송'
                      ? themeApp.colors.grey[3] 
                      : errors[name]
                      ? themeApp.colors.grey[6] 
                      : watch(name) 
                      ? themeApp.colors.grey[3] 
                      : themeApp.colors.grey[6]}
                    >
                      {suffix.authText}
                    </Typography>
                  </AuthenticationButton>}
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
  border: none;
  ${({isEditable,theme,isError,focus})=> { 
    if(isEditable){
      return css`
      background-color: ${theme.colors.grey[0]};
      border-bottom-color:${isError ? theme.colors.red[500]: focus ? theme.colors.blue[500]:theme.colors.grey[8]};
      border-bottom-width:2px;`
      }
    }
  }`;

const AuthenticationButton = styled.TouchableOpacity`
  min-width: 77px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: ${({theme})=> `1px solid ${theme.colors.grey[7]}`};
  padding:7px 16px;
  position: absolute;
  right: 0;
  bottom:8px;
  
`
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
  ${({timer}) => {
    if (timer) {
      return css`
        padding-right: 36%;
      `;
    }
  }}
  ${({editable}) => {
    if (!editable) {
      return css`
        color:black;
        padding-right:0px;
      `;
    }
  }}
`;

// Suffix
const SuffixContainer = styled.View`
  position: absolute;
  width: 0;
  right: 0;
  bottom: 8px;
  ${({isAuth}) => {
    if (isAuth) {
      return css`     
        align-items: flex-end;
        justify-content: space-between;
        flex-direction: row;
      `;
    }else{
      return css`
        align-items: center;
        justify-content: center;
      `
    }
  }}
  ${({suffix,isAuth}) => {
    if (suffix) {
      if(isAuth){
        return css`
          width: 32%;
        `;
      }else{
        return css`
          width: 10%;
        `;
      }
    }
  }}
`;
const TimerContainer = styled.View`
  position: absolute;
  width: 0;
  right: 0;
  bottom: 8px;
  ${({isAuth}) => {
    if (isAuth) {
      return css`        
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
      `;
    }else{
      return css`
        align-items: center;
        justify-content: center;
      `
    }
  }}
  ${({timer,isAuth}) => {
    if (timer) {
      if(isAuth){
        return css`
          width: 38%;
        `;
      }else{
        return css`
          width: 15%;
        `;
      }
      
    }
  }}
`;

export default Component;
