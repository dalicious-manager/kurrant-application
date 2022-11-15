import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

import Typography from '../Typography';


/**
 *
 * @param {object} props
 * @param {'personal' | 'enterprise' | 'personalId' | 'enterpriseId'} props.type
 * @returns
 */

const Component = ({ type = 'personal' }) => {
  const labelHead = {
    personal: '개인회원',
    enterprise: '법인회원',
    personalId: '개인회원',
    enterpriseId: '법인회원',
  };
  const labelBody = {
    personal: '개인 계정으로 가입을 진행합니다.',
    enterprise: '법인 계정으로 가입을 진행합니다. \n법인 로그인 및 가입용으로 사용할 이메일을 준비해주세요.',
    personalId: '개인 계정으로 가입된 아이디를 찾습니다.',
    enterpriseId: '법인 계정으로 가입된 아이디를 찾습니다.',
  };

  return (
    <Wrapper>
      <RegisterLabel>
        <HeaderWrap>
          <RegisterHead>{labelHead[type]}</RegisterHead>
        </HeaderWrap>
        <BodyWrap>
          <RegisterBody>{labelBody[type]}</RegisterBody>
        </BodyWrap>
      </RegisterLabel>
      <IconWrap>
        <FeatherIcon name="chevron-right" color={'#000'} size={24} />
      </IconWrap>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.TouchableOpacity`
  width: 100%;
  height: 128px;
  flex-direction: row;
  padding: 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.neutral[30]};
  align-items: center;
`;
const RegisterLabel = styled.View`
  flex: 5;
  height: 100%;
  justify-content: space-between;
`;
const HeaderWrap = styled.View``;
const BodyWrap = styled.View``;

const RegisterHead = styled(Typography).attrs({ variant: 'h800', weight: 'B' })`
  color: ${({ theme }) => theme.colors.neutral[900]};
`;
const RegisterBody = styled(Typography).attrs({ variant: 'h500', option: 'longform' })`
  color: ${({ theme }) => theme.colors.neutral[700]};
`;
const IconWrap = styled.View`
  align-items: flex-end;
  flex: 1;
`;
