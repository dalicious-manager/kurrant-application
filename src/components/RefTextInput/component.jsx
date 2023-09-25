/* eslint-disable react-native/no-inline-styles */
import cardValidator from 'card-validator';
import React, {useState, useEffect, forwardRef} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {Alert, Image, TouchableOpacity} from 'react-native';
import styled, {css, useTheme} from 'styled-components/native';

import {textStyles} from './styles';
import {
  VISA,
  AMEX,
  DISCOVER,
  JCB,
  UNKOWN,
  MASTERCARD,
  UNION,
  MAESTRO,
  DINERS,
} from '../../assets';
import EyeOff from '../../assets/icons/TextInput/eyeOff.svg';
import EyeOn from '../../assets/icons/TextInput/eyeOn.svg';
import {
  cardNumberFormatter,
  cardSerialNumberFormatter,
  expirationDateFormatter,
} from '../../utils/cardFormatter';
import {formattedTimer} from '../../utils/dateFormatter';
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
        disabledEvent: true,
      },

      additionalCssOnTextInput = '',
      padding = '4px 8px',
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
    const [timer, setTimer] = useState({
      remainTime: suffix.timer || 0,
      isRunning: false,
      firstRunning: false,
    });
    const [isDisabled, setIsDisabled] = useState();
    const data = watch(name);
    const [isShowing, setShowing] = useState(false);
    const [focus, setFocused] = useState(false);
    const [values, setValues] = useState();
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

    if (suffix.isNeedDelete && data && focus) {
      suffixContent = (
        <TouchableOpacity
          onPress={() => {
            resetField(name);
            ref?.current?.focus();
          }}>
          <AntDesignIcon name="closecircle" />
        </TouchableOpacity>
      );
    }

    // Password Showing
    if (isPassword && data) {
      suffixContent = (
        <TouchableOpacity
          onPress={() => {
            setShowing(!isShowing);
          }}>
          {isShowing ? <EyeOn /> : <EyeOff />}
        </TouchableOpacity>
      );
    }

    // Suffix - Timer

    timerContent = (
      <Typography
        variant="h600"
        weight="R"
        textColor={timer.remainTime > 0 ? undefined : 'red'}>
        {timer.isRunning ? formattedTimer(timer.remainTime) : '00:00'}
      </Typography>
    );

    if (timer.remainTime > 0 && !timer.isRunning) {
      setTimer(prev => ({...prev, isRunning: true, firstRunning: true}));
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
        defaultValue={defaultValue && defaultValue}
        render={({field: {onChange, value}}) => {
          const formatter = () => {
            if (name.includes('cardNumber')) {
              return cardSerialNumberFormatter(value);
            } else if (name.includes('cardExpDate')) {
              return expirationDateFormatter(value);
            } else if (name.includes('cardPass')) {
              if (value) {
                if (value?.length > 2) {
                  return value.substring(0, 2);
                }
                return value;
              }
              return '';
            } else {
              if (value) {
                return value;
              }
              return '';
            }
          };
          const cardTypeIcon = () => {
            const {card} = cardValidator.number(value);
            let source;
            switch (card?.type) {
              case 'visa':
                source = VISA;
                break;
              case 'mastercard':
                source = MASTERCARD;
                break;
              case 'discover':
                source = DISCOVER;
                break;
              case 'american-express':
                source = AMEX;
                break;
              case 'unionpay':
                source = UNION;
                break;
              case 'maestro':
                source = MAESTRO;
                break;
              case 'jcb':
                source = JCB;
                break;
              case 'diners-club':
                source = DINERS;
                break;
              default:
                source = UNKOWN;
                break;
            }
            if (!source) return null;
            return (
              <Image
                source={source}
                scale={1.0}
                resizeMode={'stretch'}
                style={{
                  width: 29,
                  height: 18,
                  alignSelf: 'center',
                }}
              />
            );
          };

          timer.remainTime > 0 && timer.isRunning;

          const redTimerConditiion =
            // suffix?.timer &&
            (timer.remainTime <= 0 || !timer.isRunning) && timer.firstRunning;

          return (
            <Wrapper {...style}>
              {/* Label */}
              {label && (
                <LabelContainer>
                  <Typography
                    text="CaptionR"
                    textColor={
                      errors[name]
                        ? themeApp.colors.red[500]
                        : focus
                        ? themeApp.colors.blue[500]
                        : themeApp.colors.grey[2]
                    }>
                    {value ? label : name.includes('card') ? label : '  '}
                  </Typography>
                </LabelContainer>
              )}
              {/* TextInput */}
              <ControlContainer
                isEditable={isEditable}
                isError={errors[name]}
                {...containerProps}
                focus={focus}>
                {name.includes('cardNumber') && cardTypeIcon()}
                <InputContainer>
                  <StyledTextInput
                    additionalCssOnTextInput={additionalCssOnTextInput}
                    paddings={padding}
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
                    text={'InputText'}
                    suffix={!!suffixContent}
                    timer={timer.remainTime > 0}
                    value={formatter()}
                    secureTextEntry={isPassword ? !isShowing : false}
                    {...rest}
                  />
                </InputContainer>
                {/* Suffix */}
                {isEditable && (
                  <>
                    {/* <TimerContainer
                      timer={timer.remainTime > 0}
                      isAuth={suffix.isAuth}>
                      {timerContent}
                    </TimerContainer> */}

                    {timer.remainTime > 0 && timer.isRunning && (
                      <TimerContainer
                        timer={timer.remainTime > 0}
                        isAuth={suffix.isAuth}>
                        {timerContent}
                      </TimerContainer>
                    )}

                    {redTimerConditiion && (
                      <TimerContainerWhenDone>
                        <Typography variant="h600" weight="R" textColor="red">
                          00:00
                        </Typography>
                      </TimerContainerWhenDone>
                    )}

                    <SuffixContainer
                      suffix={!!suffixContent}
                      isAuth={suffix.isAuth}>
                      {suffixContent}
                    </SuffixContainer>
                  </>
                )}
                {isEditable && suffix.isAuth && (
                  <AuthenticationButton
                    disabled={isDisabled}
                    onPress={async () => {
                      setIsDisabled(true);
                      try {
                        if (suffix.authText === '재발송') {
                          setTimer(prev => ({...prev, remainTime: 180}));
                          resetField(name);
                          return suffix.authPressEvent(true);
                        }
                        await suffix.authPressEvent(false);
                      } catch (error) {
                        Alert.alert(
                          '인증번호',
                          error.toString()?.replace('error: ', ''),
                        );
                      } finally {
                        setTimeout(() => {
                          setIsDisabled(false);
                        }, 2000);
                      }
                    }}>
                    <Typography
                      text={'Button10SB'}
                      textColor={
                        suffix.authText === '재발송'
                          ? themeApp.colors.grey[3]
                          : errors[name]
                          ? themeApp.colors.grey[6]
                          : watch(name)
                          ? themeApp.colors.grey[3]
                          : themeApp.colors.grey[6]
                      }>
                      {suffix.authText}
                    </Typography>
                  </AuthenticationButton>
                )}
              </ControlContainer>
              {/* caption */}
              {caption && !errors[name] && (
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
                    style={rest.errorStyle}
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
  background-color: transparent;
`;

// Caption
const CaptionContainer = styled.View`
  width: 100%;
  background-color: transparent;
  margin-top: 4px;
`;

// TextInput
const ControlContainer = styled.View`
  position: relative;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  /* border-radius: 6px; */

  border: none;
  ${({isEditable, theme, isError, focus}) => {
    if (isEditable) {
      return css`
        background-color: ${theme.colors.grey[0]};
        border-bottom-color: ${isError
          ? theme.colors.red[500]
          : focus
          ? theme.colors.blue[500]
          : theme.colors.grey[8]};
        border-bottom-width: 2px;
      `;
    }
  }}
`;

const AuthenticationButton = styled.Pressable`
  min-width: 77px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: ${({theme}) => `1px solid ${theme.colors.grey[7]}`};
  padding: 7px 16px;
  position: absolute;
  right: 0;
  bottom: 8px;
`;
const InputContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: flex-start;
`;

const StyledTextInput = styled.TextInput`
  width: 100%;
  ${({text}) => text && textStyles[text]}
  ${({name}) =>
    name.includes('cardNumber')
      ? css`
          padding: 4px 8px;
        `
      : css`
          padding: 4px 0px;
          padding-right: 8px;
        `}
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
        color: black;
        padding-right: 0px;
      `;
    }
  }}


  padding:${({paddings}) => paddings && paddings};

  ${({additionalCssOnTextInput}) => {
    return additionalCssOnTextInput;
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
    } else {
      return css`
        align-items: center;
        justify-content: center;
      `;
    }
  }}
  ${({suffix, isAuth}) => {
    if (suffix) {
      if (isAuth) {
        return css`
          width: 32%;
        `;
      } else {
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
  /* bottom: 8px; */
  bottom: 16px;
  ${({isAuth}) => {
    if (isAuth) {
      return css`
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
      `;
    } else {
      return css`
        align-items: center;
        justify-content: center;
      `;
    }
  }}
  ${({timer, isAuth}) => {
    if (timer) {
      if (isAuth) {
        return css`
          width: 38%;
        `;
      } else {
        return css`
          width: 15%;
        `;
      }
    }
  }}
`;

const TimerContainerWhenDone = styled.View`
  position: absolute;
  width: 0;
  right: 0;
  bottom: 16px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  width: 38%;
`;

export default Component;
