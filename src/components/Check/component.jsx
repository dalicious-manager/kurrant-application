import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled, { css } from 'styled-components/native';

import Checkicon from '../../assets/icons/check.svg';
import Typography from '../Typography';


/** 예시 */
// <Check 
//   name='signUpCheck1' 
//   label='모두 확인하였으며 동의합니다.(선택사항 포함)' 
//   labelDetail='모두 확인하였으며 동의합니다.(선택사항 포함)' 
//   onPressEventViewDetail={() => {console.log('더보기를 누르셨습니다.')}} 
// />

/**
 * @param {object} props
 * @param {'yellow' | 'grey' | 'white' |'login'} props.type 버튼 색상
 * @param {string} props.name useFormContext의 name 지정
 * @param {string} props.label 간단 설명
 * @param {string} props.labelDetail 설명 상세
 * @param {function} props.onPressEventViewDetail suffix 생성 (보기 -> 클릭 시 회원가입 상세 보기)
 *
 * @returns
 */

const Component = ({
  type='grey',
  name,
  label,
  onPressEventViewDetail,
  labelDetail,
  children,
  value,
  onPressEvents=()=>{}
}) => {
  const { control } = useFormContext();
  const [checked, setChecked] = useState(value || false);
  
  return (
    <React.Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={value || false}
        render={({ field: { onChange ,value} }) => {
          const onPressEvent = () => {
            onChange(!checked);
            setChecked(!checked);
            onPressEvents(!checked);
          }
          return (
            <Wrap>
              <Wrapper>
                <CheckboxWrap onPress={onPressEvent}>
                  <Checkbox checked={value} type={type}>
                    <CheckIcon  checked={value} type={type} />
                    {/* <FeatherIcon
                      name="check"
                      color={checked ? '#fff' : '#d4d8dd'}
                      size={16}
                    /> */}
                  </Checkbox>
                </CheckboxWrap>
                <LabelWrap>
                  {children}
                </LabelWrap>
                {onPressEventViewDetail && (
                  <DetailWrap onPress={onPressEventViewDetail}>
                    <Detail>보기</Detail>
                  </DetailWrap>
                )}
              </Wrapper>
              {labelDetail && (
                <LabelDetailWrap>
                  <LabelDetail>{labelDetail}</LabelDetail>
                </LabelDetailWrap>
              )}
            </Wrap>
          )
        }
        }
      />
    </React.Fragment >
  );
};

export default Component;

const Wrap = styled.View`
  margin-bottom: 16px;
`;
const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
const CheckboxWrap = styled.Pressable`
  margin-right: 8px;
`;
const Checkbox = styled.View`
  width: ${({ type }) =>type ==='login' ? '18.33px':'24px'};
  height: ${({ type }) =>type ==='login' ? '18.33px':'24px'};
  border-radius: ${({ type }) =>type ==='login' ? '20px':'7px'};
  background-color:
        ${({ checked }) =>
    checked
      ? css`
          ${({ type,theme }) => type === 'yellow' 
          ? theme.colors.yellow[500] 
          : type ==='grey' ? theme.colors.grey[2] 
          : type ==='login' ? theme.colors.green[500] :theme.colors.grey[0]};
        `
      : css`
          ${({ type,theme }) => type === 'white' ? theme.colors.grey[0] : theme.colors.grey[7]};
        `};
  align-items: center;
  justify-content: center;
`;
const LabelWrap = styled.View`
  flex: 1;
`;

const DetailWrap = styled.Pressable`
  margin-left: auto;
  justify-content: center;
`;
const Detail = styled(Typography).attrs({ variant: 'h500', weight: 'R' })`
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

const LabelDetailWrap = styled.View`
  padding-left: 32px;
  margin-top: 4px;
`;
const LabelDetail = styled(Typography).attrs({ variant: 'h500', weight: 'R' })`
  color: ${({ theme }) => theme.colors.neutral[900]};
`;

const CheckIcon = styled(Checkicon)`
  color: ${({ checked }) =>
      checked
        ? css`
             ${({ type,theme }) => type === 'yellow' 
          ? theme.colors.grey[1] 
          : type === 'grey' ? theme.colors.grey[0] 
          : type ==='login' ? theme.colors.neutral[0] :theme.colors.grey[2]};
          `
        : css`
            ${({ type,theme }) => type === 'white' ? theme.colors.grey[7] : theme.colors.grey[0]};
          `};
         

  `;