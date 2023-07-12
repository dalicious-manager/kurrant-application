import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Text, View, NativeModules, Platform, Keyboard} from 'react-native';
import styled from 'styled-components';

import useApartApplication from '../../../../../../biz/useApartApplication/hook';
import Button from '../../../../../../components/Button';
import KeyboardButton from '../../../../../../components/KeyboardButton';
import RefTextInput from '../../../../../../components/RefTextInput';
import useKeyboardEvent from '../../../../../../hook/useKeyboardEvent';
import {setStorage} from '../../../../../../utils/asyncStorage';
import {PAGE_NAME as GroupManageDetailPageName} from '../../../../GroupManage/DetailPage';

const {StatusBarManager} = NativeModules;
export const PAGE_NAME = 'P__GROUP__APARTMENT__SEARCH__ADD__DETAIL';
const Pages = ({route}) => {
  const id = route.params.id;
  const form = useForm({
    mode: 'all',
  });
  const navigation = useNavigation();
  const keyboardStatus = useKeyboardEvent();
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const {apartmentRegisterSpot} = useApartApplication();
  const {
    formState: {errors},
    watch,
    handleSubmit,
  } = form;
  const hosuCheck = watch('hosu');
  const isValidation = hosuCheck && !errors.hosu;

  useEffect(() => {
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const addHosu = async () => {
    try {
      await apartmentRegisterSpot(id, {
        ho: hosuCheck,
      });
      await setStorage('spotStatus', '0');
      navigation.navigate(GroupManageDetailPageName, {id: id});
    } catch (err) {
      throw err;
    }
  };
  return (
    <Wrap>
      <FormProvider {...form}>
        <SafeContainer>
          <KeyDismiss onPress={() => Keyboard.dismiss()}>
            <KeyContainer
              keyboardVerticalOffset={
                Platform.OS === 'ios' && statusBarHeight + 44
              }
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <Container>
                <RefTextInput
                  name="hosu"
                  label="세대 호수(예.1204)"
                  placeholder="호수(예.1204호)"
                  keyboardType="numeric"
                />
              </Container>
              {!keyboardStatus.isKeyboardActivate && (
                <ButtonContainer>
                  <Button
                    type="yellow"
                    label={'저장'}
                    disabled={!isValidation}
                    onPressEvent={addHosu}
                  />
                </ButtonContainer>
              )}

              <KeyboardButton
                isKeyboardActivate={keyboardStatus.isKeyboardActivate}
                label={'저장'}
                disabled={!isValidation}
                onPressEvent={addHosu}
              />
            </KeyContainer>
          </KeyDismiss>
        </SafeContainer>
      </FormProvider>
    </Wrap>
  );
};

export default Pages;

const Wrap = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.grey[0]};
`;

const Container = styled.View`
  margin: 40px 24px 0px 24px;
  flex: 1;
`;

const KeyContainer = styled.KeyboardAvoidingView`
  flex: 1;
  position: relative;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 35px;
  margin: 0px 24px;
`;

const KeyDismiss = styled.Pressable`
  flex: 1;
`;
const SafeContainer = styled.SafeAreaView`
  flex: 1;
`;
