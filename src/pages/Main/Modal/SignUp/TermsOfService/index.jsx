import React, {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import styled from 'styled-components/native';

import Button from '../../../../../components/Button';
import Check from '../../../../../components/Check';
import Form from '../../../../../components/Form';
import Typography from '../../../../../components/Typography';
import UseModal from '../../../../../components/UseModal';
import Wrapper from '../../../../../components/Wrapper';

export const PAGE_NAME = 'P_SIGN_UP__MODAL__TERMS_OF_SERVICE';

const Pages = () => {
  const {ModalWrapper, close, open} = UseModal();
  const signUpCheck = useForm();

  const [check1, setCheck1] = useState(signUpCheck.watch('signUpCheck1'));
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);

  const checkAll = () => {
    console.log('123');
  };

  console.log(signUpCheck.watch());

  const handleSubmit = async data => {
    try {
      await console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitError = data => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const disabledCheck =
    signUpCheck.watch('signUpCheck1') &&
    signUpCheck.watch('signUpCheck2') &&
    signUpCheck.watch('signUpCheck3') &&
    signUpCheck.watch('signUpCheck4');

  return (
    <Wrapper paddingTop={32} paddingHorizontal={18}>
      <TitleWrap>
        <Title>{`서비스 이용을 위해\n이용약관에 동의가 필요합니다.`}</Title>
      </TitleWrap>
      <Form form={signUpCheck}>
        <CheckWrap>
          <Check
            name="signUpCheckAll"
            label="모두 확인하였으며 동의합니다. (선택사항 포함)"
            onPress={checkAll}
          />
          <Line />
          <Check
            name="signUpCheck1"
            label="[필수] 이용약관 동의"
            onPressEventViewDetail={() => {
              console.log('더보기를 누르셨습니다.');
            }}
          />
          <Check
            name="signUpCheck2"
            label="[필수] 개인정보 수집 및 이용 동의"
            onPressEventViewDetail={() => {
              console.log('더보기를 누르셨습니다.');
            }}
          />
          <Check
            name="signUpCheck3"
            label="[필수] 원화 입출금 방침 동의"
            onPressEventViewDetail={() => {
              console.log('더보기를 누르셨습니다.');
            }}
          />
          <Check
            name="signUpCheck4"
            label="[필수] 가입자 연령이 만 19세 이상임을 확인합니다."
          />
          <Check
            name="signUpCheck5"
            label="[선택] 이벤트 및 정보 안내 수신 동의"
            labelDetail="이벤트 및 상장정보, 특별한 혜택 안내를 받을 수 있습니다."
            onPressEventViewDetail={() => {
              console.log('더보기를 누르셨습니다.');
            }}
          />
        </CheckWrap>
        <Button
          label="다음"
          disabled={!disabledCheck}
          onPress={signUpCheck.handleSubmit(handleSubmit, handleSubmitError)}
        />
      </Form>
      <ModalWrapper
        title="안내"
        content="이벤트 알림을 받을 수 있는 광고성 알림 수신에 미동의하였습니다."
      />
    </Wrapper>
  );
};

export default Pages;

const TitleWrap = styled.View`
  margin-bottom: 40px;
`;
const CheckWrap = styled.View`
  margin-bottom: 24px;
`;
const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({theme}) => theme.colors.neutral[30]};
  margin: 3px 0 16px;
`;

const Title = styled(Typography).attrs({variant: 'h900'})`
  color: ${({theme}) => theme.colors.neutral[900]};
`;
