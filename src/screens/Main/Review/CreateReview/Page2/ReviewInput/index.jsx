import React, {useEffect, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../../../../components/Typography';
import {useTheme} from 'styled-components/native';

const ReviewInput = ({editContentInput, charLength}) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  const themeApp = useTheme();
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
              style={{
                textAlignVertical: 'top',
              }}
              placeholderTextColor={themeApp.colors.grey[5]}
              {...textInputProps}
              defaultValue={editContent ? editContent : undefined}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={20}
              placeholder={'최소 10자 이상 입력해주세요'}
            />

            <ViewView>
              {error && (
                <Text style={{color: 'red', alignSelf: 'stretch'}}>
                  {error.message}
                </Text>
              )}
            </ViewView>
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
  border-radius: 14px;
  font-family: 'Pretendard-Regular';
`;

const ViewWrap = styled.View``;

const ViewView = styled.View`
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  padding-top: 6px;
`;
