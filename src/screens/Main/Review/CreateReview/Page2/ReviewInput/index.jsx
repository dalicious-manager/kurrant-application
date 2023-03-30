import React, {useEffect, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../../../../components/Typography';

const ReviewInput = ({editContentInput, charLength}) => {
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
              style={{
                textAlignVertical: 'top',
              }}
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
              <ShowCurrentLettersLengthWrap>
                <LengthText>
                  (
                  <LengthTextNum charLength={charLength > 500}>
                    {charLength}
                  </LengthTextNum>
                  /500)
                </LengthText>
              </ShowCurrentLettersLengthWrap>
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
`;

const ViewWrap = styled.View`
  margin-bottom: 19px;
`;

const ViewView = styled.View`
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
`;

const ShowCurrentLettersLengthWrap = styled.View`
  flex-direction: row-reverse;
  margin-bottom: 10px;
`;
const LengthText = styled(Typography).attrs({text: ' CaptionR'})`
  color: ${props => props.theme.colors.grey[4]};
  /* margin-bottom: 32px; */
`;

const LengthTextNum = styled(Typography).attrs({text: ' CaptionR'})`
  color: ${props => {
    if (props.charLength) {
      return props.theme.colors.red[500];
    } else {
      return props.theme.colors.grey[4];
    }
  }};
`;
