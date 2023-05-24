import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Text, View} from 'react-native';
import styled from 'styled-components';

import {reportReviewInputAtom} from './store';
import TextAreaInput from './TextAreaInput';
import Button from '../../../../components/Button';
import CheckAndText from '../../../../components/CheckAndText';
import Typography from '../../../../components/Typography';

export const PAGE_NAME = 'P_MAIN__REPORT_REVIEW';

const Screens = () => {
  const [input, setInput] = useAtom(reportReviewInputAtom);

  const [clickAvaliable, setClickAvaliable] = useState(false);

  useEffect(() => {
    setClickAvaliable(false);

    const result =
      input.check1 ||
      input.check2 ||
      input.check3 ||
      input.check4 ||
      input.check5 ||
      input.check6;

    if (!result) {
      return;
    }

    if (input.check6 && input.detail?.length > 200) {
      return;
    }
    setClickAvaliable(true);
  }, [input]);

  const form = useForm({
    mode: 'all',

    // 혹시 전에 썼던 값을 유지 시키고 싶으면 여기 주석 풀면 됨
    // defaultValues: {
    //   report_detail: input.detail,
    // },
  });

  useEffect(() => {
    setInput({...input, detail: form.watch('report_detail')});
  }, [form.watch('report_detail')]);

  const onSignInPressed = data => {
    console.log(input);

    console.log('report succefully sent');
  };

  return (
    <Container2>
      <FormProvider {...form}>
        <Container>
          <TitleWrap>
            <Title1>신고 사유를 알려주세요!</Title1>
            <Notice1>
              허위, 왜곡된 신고는 관리자 확인 후 반영되지 않을 수 있어요.
            </Notice1>
          </TitleWrap>

          <CheckAndTextWrap>
            <CheckAndText
              marginBottom={'24px'}
              text="주문과 관련없는 내용"
              inputCheck="check1"
              input={input}
              setInput={setInput}
            />
            <CheckAndText
              inputCheck="check2"
              input={input}
              setInput={setInput}
              marginBottom={'24px'}
              text="주문과 관련없는 사진 게시"
            />
            <CheckAndText
              inputCheck="check3"
              input={input}
              setInput={setInput}
              marginBottom={'24px'}
              text="음란성, 욕설 등 부적절한 내용"
            />
            <CheckAndText
              inputCheck="check4"
              input={input}
              setInput={setInput}
              marginBottom={'24px'}
              text="부적절한 홍보 또는 광고"
            />
            <CheckAndText
              inputCheck="check5"
              input={input}
              setInput={setInput}
              marginBottom={'24px'}
              text="개인정보 유출 위험"
            />
            <CheckAndText
              inputCheck="check6"
              input={input}
              setInput={setInput}
              marginBottom={'24px'}
              text="기타(하단 내용 작성)"
            />
          </CheckAndTextWrap>

          {input.check6 && (
            <ReportDetailView>
              <TextAreaInput />
              <TextLength>{input.detail?.length || 0}/200</TextLength>
            </ReportDetailView>
          )}
        </Container>
        <ButtonFinal
          size="full"
          label="신고하기"
          text={'Button09SB'}
          disabled={!clickAvaliable}
          onPressEvent={form.handleSubmit(onSignInPressed)}
        />
      </FormProvider>
    </Container2>
  );
};

export default Screens;

const Container2 = styled.View`
  padding: 0 24px;
  padding-top: 40px;
  flex: 1;
  background-color: #ffffff;
`;

const Container = styled.ScrollView`
  width: 100%;
  /* height: 90%; */
  background-color: #ffffff;
`;

const TitleWrap = styled.View`
  margin-bottom: 41px;
`;

const Title1 = styled(Typography).attrs({text: 'Title03SB'})`
  color: #33334a;
`;

const Notice1 = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.grey[4]};
`;

const CheckAndTextWrap = styled.View``;

const ReportDetailView = styled.View`
  position: relative;
`;

const TextLength = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[4]};
  position: absolute;
  right: 0;
  bottom: -6px;
  /* margin-top: 6px; */
`;

const ButtonFinal = styled(Button)`
  position: relative;
  bottom: 30px;
`;
