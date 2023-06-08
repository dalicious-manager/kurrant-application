import React, {useState} from 'react';
import {Alert} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import styled from 'styled-components/native';

import Typography from '../Typography';

const Component = () => {
  const [fileResponse, setFileResponse] = useState([]);

  const handleDocunemtSelection = async () => {
    try {
      const response = await DocumentPicker.pickMultiple({
        type: [types.allFiles],
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
      });
      setFileResponse(response);
    } catch (err) {
      Alert.alert('사진 선택', err?.toString()?.replace('error: ', ''));
    }
  };

  let uploadFileLabel = fileResponse[0]
    ? fileResponse[0]?.name.slice(-25) +
      (fileResponse.length > 1 ? ` 외 ${fileResponse.length - 1}개` : '')
    : '선택된 파일 없음';
  let checkedVolume =
    fileResponse
      .map(item => item.size)
      .reduce((prevVolume, currentVolume) => prevVolume + currentVolume, 0) >
    10 * 1024 * 1024;

  return (
    <Wrap>
      <TitleWrap>
        <Title>인증정보</Title>
      </TitleWrap>
      <UploadWrap>
        <UploadLabelWrap onPress={handleDocunemtSelection}>
          <UploadLabel weight="B">업로드</UploadLabel>
        </UploadLabelWrap>
        <UploadFileWrap>
          <UploadLabel weight="R">{uploadFileLabel}</UploadLabel>
        </UploadFileWrap>
      </UploadWrap>
      {checkedVolume && (
        <ErrorMessageWrap>
          <ErrorMessage>제한된 용량을 초과합니다.</ErrorMessage>
        </ErrorMessageWrap>
      )}
    </Wrap>
  );
};

export default Component;

const Wrap = styled.View``;
const TitleWrap = styled.View`
  margin-bottom: 4px;
`;
const UploadWrap = styled.View`
  height: 44px;
  flex-direction: row;
  justify-content: space-between;
`;
const UploadLabelWrap = styled.Pressable`
  flex: 2.5;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  border-radius: 6px;
  background-color: ${({theme}) => theme.colors.neutral[30]};
`;
const UploadFileWrap = styled.View`
  flex: 8;
  justify-content: center;
  padding-left: 12px;
  border-radius: 6px;
  background-color: ${({theme}) => theme.colors.neutral[200]};
`;
const ErrorMessageWrap = styled.View``;

const Title = styled(Typography).attrs({variant: 'h500', weight: 'R'})``;
const UploadLabel = styled(Typography).attrs({variant: 'h600'})`
  color: ${({theme}) => theme.colors.neutral[700]};
`;
const ErrorMessage = styled(Typography).attrs({variant: 'h500', weight: 'R'})`
  color: ${({theme}) => theme.colors.red[500]};
`;
