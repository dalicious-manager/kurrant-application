import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Alert, Keyboard} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';
import Button from '~components/Button';
import SpotTextInput from '~components/SpotTextInput';
import Typography from '~components/Typography';
import useKeyboardEvent from '~hook/useKeyboardEvent';
import {useApplyShareSpot} from '~hook/useShareSpot';

import {useUpdateMySpotInfo} from '../../../../hook/useSpot';
export const PAGE_NAME = 'P__GROUP__MANAGE__UPDATE_SPOT';
const Pages = ({route}) => {
  const groupId = route?.params?.groupId;
  const address = route?.params?.address;
  const name = route?.params?.name;
  const type = route?.params?.type;
  const {mutateAsync: updateMySpotInfo} = useUpdateMySpotInfo();
  const form = useForm({
    mode: 'all',
  });
  const navigation = useNavigation();
  const {watch} = form;

  const value = watch('value');
  const phone = watch('phone');

  const keyboardStatus = useKeyboardEvent();
  const handleUpdateName = async () => {
    try {
      if (type === 'name' && (!groupId || !type || !value)) {
        throw new Error('별명의 입력값이 올바르지 않습니다.');
      }
      if (type === 'phone' && (!groupId || !type || !phone)) {
        throw new Error('핸드폰번호의 입력값이 올바르지 않습니다.');
      }
      await updateMySpotInfo({
        id: groupId,
        target: type,
        value: type === 'name' ? value : phone,
      });
      if (navigation.canGoBack) navigation.goBack();
    } catch (error) {
      Alert.alert('저장 오류', error.toString().replace('Error: ', ''));
    }
  };
  useLayoutEffect(() => {
    if (type === 'phone') {
      navigation.setOptions({
        title: '연락처 수정',
      });
    }
  }, [navigation, type]);
  return (
    <Wrap
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={180}
        resetScrollToCoords={{x: 0, y: 0}}>
        {type === 'name' ? (
          <>
            <SpotName>{name}</SpotName>

            <AddressWrap>
              <Label>
                <LabelText>주소</LabelText>
              </Label>
              <Address>{address}</Address>
            </AddressWrap>

            <InputWrap>
              <FormProvider {...form}>
                <SpotTextInput
                  label="주소 별명 입력"
                  name="value"
                  placeholder="예. 우리 집 / 회사"
                />
              </FormProvider>
            </InputWrap>
          </>
        ) : (
          <FormProvider {...form}>
            <SpotTextInput
              label="휴대폰번호 입력"
              name="phone"
              placeholder="예. 01012341234"
            />
          </FormProvider>
        )}
      </KeyboardAwareScrollView>

      {!keyboardStatus.isKeyboardActivate && (
        <ButtonWrap>
          <Button
            label={type === 'name' ? '주소 별명 저장' : '연락처 저장'}
            onPressEvent={handleUpdateName}
            disabled={value && phone}
          />
        </ButtonWrap>
      )}
    </Wrap>
  );
};

export default Pages;

const Wrap = styled.Pressable`
  flex: 1;
  background-color: white;
  padding: 24px 24px 0px 24px;
`;

const SpotName = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const Address = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const Label = styled.View`
  background-color: ${({theme}) => theme.colors.grey[8]};
  padding: 3px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-right: 8px;
`;

const AddressWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;
const LabelText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const InputWrap = styled.View`
  margin-top: 26px;
  margin-bottom: 16px;
`;

const ButtonWrap = styled.View`
  position: absolute;
  bottom: 35px;
  left: 20px;
`;
