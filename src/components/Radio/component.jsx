import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';

import {getBackgroundColor, getBorderColor, getTextColor} from './style';
import Typography from '../Typography';

/** 예시 */
// <Radio
//   name='radio1'
//   title='대상구분'
//   contents={contents}
//   defaultIndex=1
// />
//
// const contents = [
//   { label: '개인', value: '개인' },
//   { label: '법인', value: '법인' },
// ];

/**
 * @param { object} props
 * @param { string } props.name useFormContext_name
 * @param { string } props.title 버튼의 타이틀
 * @param { object } props.contents 배열 안에 객체 반복
 * @param { string } props.contents.label
 * @param { string } props.contents.value
 * @param { number } props.defaultIndex default로 지정하고 싶은 값의 index 값
 * @returns
 */

const Component = ({
  name,
  title = '대상 구분',
  contents = [{}],
  defaultIndex,
}) => {
  const {control, watch} = useFormContext();
  const watchRadio = watch(name);

  const defaultValue = contents[defaultIndex]?.value;

  return (
    <Wrap>
      <TitleWrap>
        <Title>{title}</Title>
      </TitleWrap>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue || contents[0].value}
        render={({field: {onChange, value}}) => (
          <ItemWrap>
            {contents.map(item => (
              <Wrapper
                key={item.label}
                onPress={() => onChange(item.value)}
                checked={value === item.value}>
                <IconWrap>
                  <FontAwesome5
                    name={'check'}
                    size={14}
                    right
                    color={value === item.value ? '#fff' : '#A9ACAE'}
                  />
                </IconWrap>
                <LabelWrap>
                  <Label checked={value === item.value}>{item.value}</Label>
                </LabelWrap>
              </Wrapper>
            ))}
          </ItemWrap>
        )}
      />
    </Wrap>
  );
};

export default Component;

const Wrap = styled.View``;

const TitleWrap = styled.View`
  margin-bottom: 4px;
`;
const Title = styled(Typography).attrs({variant: 'h500', weight: 'R'})`
  color: ${({theme}) => theme.colors.neutral[700]};
`;

const ItemWrap = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;
const Wrapper = styled.Pressable`
  margin-right: 8px;
  padding: 9px 16px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${({checked}) => getBorderColor(checked)};
  ${({checked}) => getBackgroundColor(checked)};
`;
const IconWrap = styled.View`
  margin-right: 2px;
`;

const LabelWrap = styled.View``;

const Label = styled(Typography).attrs({variant: 'h500', weight: 'B'})`
  ${({checked}) => getTextColor(checked)};
`;
