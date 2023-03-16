import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from 'react-native';
import styled from 'styled-components';

const InputYo = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  console.log(errors);

  const onSignInPressed = data => {
    console.log(data);
    console.log('input registered');
  };

  //   console.log(errors);

  return (
    <>
      <Controller
        control={control}
        name="username"
        rules={{
          required: true,
          minLength: {value: 3, message: 'Password shoeuld be minimum 3'},
        }}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <TextInputWrap error={error}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={'username'}
            />
          </TextInputWrap>
        )}
      />
      <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} />
    </>
  );
};

export default InputYo;

const CustomButton = styled.Pressable`
  width: 50px;
  height: 20px;
  border: 1px solid black;
`;

const TextInputWrap = styled.View`
  width: 60%;
  background-color: ${({error}) => {
    if (error) {
      console.log(error);
      return `yellow`;
    } else {
      return `aliceblue`;
    }
  }};
`;
