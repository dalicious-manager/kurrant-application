import React from 'react';
import {
  FormProvider,
  useForm,
  useFormContext,
  Controller,
} from 'react-hook-form';
import {View, Text} from 'react-native';
import styled from 'styled-components';

import {
  PointInput,
  PointInputWrap,
  PointUnitText,
  PointWrap,
  XIcon,
} from '../../../../MealCart/Main';

const Point = ({
  handlePress,
  clearPoint,
  inputRef,
  onFocusInput,
  onBlurInput,
  totalPrice,
  userPoint,
  medtronicTotalPrice,
  totalMealPersentPrice,
}) => {
  const {control, handleSubmit, watch} = useFormContext();

  return (
    <Controller
      control={control}
      name="point"
      defaultValue={'0'}
      render={({field: {onChange, value}}) => {
        return (
          <PointWrap>
            <Text>-{`\u00A0`}</Text>
            <PointInputWrap>
              <PointInput
                returnKeyType="done"
                keyboardType="number-pad"
                ref={inputRef}
                onFocus={onFocusInput}
                // onBlur={onBlurInput}
                value={
                  totalMealPersentPrice
                    ? userPoint > medtronicTotalPrice &&
                      Number(value) > medtronicTotalPrice
                      ? medtronicTotalPrice.toString()
                      : userPoint < medtronicTotalPrice &&
                        Number(value) > userPoint
                      ? userPoint.toString()
                      : value
                    : userPoint > totalPrice && Number(value) > totalPrice
                    ? totalPrice.toString()
                    : userPoint < totalPrice && Number(value) > userPoint
                    ? userPoint.toString()
                    : value
                }
                onChangeText={onChange}
                onSubmitEditing={handlePress}
              />
              <ClearInputButton onPress={clearPoint}>
                <XIcon />
              </ClearInputButton>
            </PointInputWrap>
            <PointUnitText>P</PointUnitText>
          </PointWrap>
        );
      }}
    />
  );
};

export default Point;

const ClearInputButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
`;
