import React, {useEffect, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';
import styled from 'styled-components';

const ReviewInput = ({editContentInput}) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  const textInputProps = {
    // placeholder,
    autoComplete: 'off',
    editable: true,
    autoCapitalize: 'none',
  };

  const [editContent, setEditContent] = useState(undefined);

  useEffect(() => {
    if (editContentInput) {
      setEditContent(editContentInput);
    }
  }, [editContentInput]);

  return (
    <>
      <Controller
        control={control}
        name="review"
        rules={{
          minLength: {value: 10, message: '최소 10자 이상 입력해주세요'},
          maxLength: {value: 500, message: '최대 500자 까지 입력해주세요'},
        }}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <ViewWrap>
            <Input
              {...textInputProps}
              defaultValue={editContent ? editContent : undefined}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={20}
              placeholder={'최소 10자 이상 입력해주세요'}
            />
            {error && (
              <Text style={{color: 'red', alignSelf: 'stretch'}}>
                {error.message}
              </Text>
            )}
          </ViewWrap>
        )}
      />
    </>
  );
};

export default ReviewInput;

const Input = styled.TextInput`
  border: 1px solid ${props => props.theme.colors.grey[7]};
  padding: 17px 20px;
  height: 168px;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: justify;

  /* margin-bottom: 19px; */
`;

const ViewWrap = styled.View`
  margin-bottom: 19px;
`;
