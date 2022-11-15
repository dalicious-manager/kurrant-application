import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import styled, {useTheme} from 'styled-components/native';

import {SimpleLineIcon} from '../Icon';
import Typography from '../Typography';

// TODO:
// Small Size 추가 props

// Props 랑 Comments 싱크 맞추기
/**
 *
 * @param {object} props
 * @param {string} props.name
 * @param {string} props.value
 * @param {boolean} props.label
 * @param {object} props.errMsg
 * @param {boolean} props.style
 * @param {number} props.onSelectPress
 *
 * @returns
 */
const Component = ({
  name,
  value,
  label = '',
  errMsg = '',
  style,
  onSelectPress,
  ...rest
}) => {
  // Hook
  const {control} = useFormContext();
  const themeApp = useTheme();

  // Event Handler
  const handleSelectPress = () => {
    if (onSelectPress) {
      onSelectPress();
    }
  };
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
            {/* Select */}
            <ControlContainer onPress={handleSelectPress}>
              <InputContainer>
                <StyledText {...rest}>{value}</StyledText>
              </InputContainer>
              {/* Suffix */}
              <SuffixContainer>
                <SimpleLineIcon name="arrow-down" />
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
  max-width: 339px;
`;

// Label
const LabelContainer = styled.View`
  width: 100%;
  background-color: transparent;
`;

// TextInput
const ControlContainer = styled.TouchableOpacity`
  position: relative;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 6px;
  background-color: #f5f6f8;
  border: none;
`;

const InputContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  height: 44px;
`;

const StyledText = styled.Text`
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  padding: 0px 8px;
  padding-right: 18%;
`;

// Suffix
const SuffixContainer = styled.View`
  position: absolute;
  width: 15%;
  height: 44px;
  top: 0;
  right: 0;
  align-items: center;
  justify-content: center;
`;

export default Component;
