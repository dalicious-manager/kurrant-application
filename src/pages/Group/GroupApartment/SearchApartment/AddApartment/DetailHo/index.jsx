import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  Text,
  View,
  NativeModules,
  Platform,
  Keyboard,
  TextInput,
} from 'react-native';
import styled from 'styled-components';

import useApartApplication from '../../../../../../biz/useApartApplication/hook';
import useGroupSpots from '../../../../../../biz/useGroupSpots/hook';
import Button from '../../../../../../components/Button';
import KeyboardButton from '../../../../../../components/KeyboardButton';
import RefTextInput from '../../../../../../components/RefTextInput';
import Typography from '../../../../../../components/Typography';
import useKeyboardEvent from '../../../../../../hook/useKeyboardEvent';
import {PAGE_NAME as GroupManageDetailPageName} from '../../../../GroupManage/DetailPage';

const {StatusBarManager} = NativeModules;
export const PAGE_NAME = 'P__GROUP__APARTMENT__MODIFY__HO';
const Pages = ({route}) => {
  const id = route.params.id;

  const [text, setText] = useState('');
  const navigation = useNavigation();
  const keyboardStatus = useKeyboardEvent();
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const {apartmentModifyHo} = useApartApplication();
  const {isDetailSpot, setDetailSpot} = useGroupSpots();

  const isValidation = text !== '';

  useEffect(() => {
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const modifyHosu = async () => {
    try {
      await apartmentModifyHo(id, {
        ho: Number(text),
      });
      setDetailSpot({...isDetailSpot, ho: Number(text)});
      navigation.goBack();
    } catch (err) {
      throw err;
    }
  };
  return (
    <Wrap>
      <SafeContainer>
        <KeyDismiss onPress={() => Keyboard.dismiss()}>
          <KeyContainer
            keyboardVerticalOffset={
              Platform.OS === 'ios' && statusBarHeight + 44
            }
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Container>
              <Title>세대 호수</Title>
              <HoView
                placeholder="예.1204"
                keyboardType="numeric"
                onChangeText={newText => setText(newText)}
              />
            </Container>
            {!keyboardStatus.isKeyboardActivate && (
              <ButtonContainer>
                <Button
                  type="yellow"
                  label={'저장'}
                  disabled={!isValidation}
                  onPressEvent={modifyHosu}
                />
              </ButtonContainer>
            )}

            <KeyboardButton
              isKeyboardActivate={keyboardStatus.isKeyboardActivate}
              label={'저장'}
              disabled={!isValidation}
              onPressEvent={modifyHosu}
            />
          </KeyContainer>
        </KeyDismiss>
      </SafeContainer>
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

const HoView = styled.TextInput`
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  border-radius: 14px;
  padding: 14px 20px;
`;

const Title = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  margin-bottom: 8px;
`;
