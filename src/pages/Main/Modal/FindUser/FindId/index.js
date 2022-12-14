import React, { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Platform, Keyboard, NativeModules, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import useAuth from '../../../../../biz/useAuth';
import Button from '../../../../../components/Button';
import KeyboardButton from '../../../../../components/KeyboardButton';
import RefTextInput from '../../../../../components/RefTextInput';
import Typography from '../../../../../components/Typography';
import Wrapper from '../../../../../components/Wrapper';
import useKeyboardEvent from '../../../../../hook/useKeyboardEvent';

export const PAGE_NAME = 'P_LOGIN__MODAL__FIND_ID';
/**
 *
 * @param {object} props
 * @returns
 */
const { StatusBarManager } = NativeModules;

const inputStyle = {
    marginBottom: 16,
}

const Pages = () => {
    const [progress, setProgress] = useState(1);
    const Infomation = () => {
        if (progress === 1) return '아이디를 찾기 위해선\n휴대폰 번호 인증이 필요해요.'
        if (progress >= 2) return '휴대폰 SMS로 발송된 인증번호를\n확인해주세요.'
    }
    const auth = useAuth();
    const [statusBarHeight, setStatusBarHeight] = useState(0);


    const [isPhoneAuth, setPhoneAuth] = useState(false);
    const form = useForm({
        mode: 'all'
    });
    const { formState: { errors }, watch, handleSubmit } = form;

    const keyboardStatus = useKeyboardEvent();
    const phoneNumber = watch('phone');
    const phoneAuth = watch('pauth');

    const callPhoneAuth = async () => {
        console.log("핸드폰 인증요청", phoneNumber);

        if (phoneNumber && !errors.phone) {
            try {
                // await auth.requestPhoneAuth({ to: phoneNumber }, 2);
                setProgress(progress + 1);
                setPhoneAuth(true);
            } catch (err) {
                Alert.alert(
                    "안증요청 실패",
                    err.toString(),
                    [
                        {
                            text: "확인",
                            onPress: () => { },
                            style: "cancel",
                        },
                    ],

                ); console.log(err)
            }

        }
    }

    const isValidation = progress >= 2 && phoneAuth && !errors.pauth && !auth.readableAtom.isConfirmPhoneLoading;
    const onSubmit = async (data) => {
        try {
            await auth.confirmPhoneAuth(phoneAuth, 2);
            console.log(data);
        } catch (err) {
            Alert.alert(
                "인증번호 오류",
                "올바른 인증번호를 입력해주세요.",
                [
                    {
                        text: "확인",
                        onPress: () => { },
                        style: "cancel",
                    },
                ],

            );
            console.log(err)
        }

    };
    useEffect(() => {

        Platform.OS === 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
            setStatusBarHeight(statusBarFrameData.height)
        }) : null
    }, []);
    return (
        <Wrapper>

            <FormProvider {...form}>
                <SafeContainer >
                    <KeyDismiss onPress={() => Keyboard.dismiss()}>
                        <KeyContainer
                            keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight + 44}
                            behavior={Platform.OS === "ios" ? "padding" : "height"} >
                            <Container>
                                <ScrollView
                                    keyboardShouldPersistTaps={'always'}>
                                    <InfomationText>{Infomation()}</InfomationText>
                                    <RefTextInput
                                        name="phone"
                                        label="휴대폰 번호"
                                        placeholder="휴대폰 번호"
                                        keyboardType='numeric'
                                        autoCapitalize='none'
                                        blurOnSubmit={false}
                                        isEditable={progress === 1 && !isPhoneAuth}
                                        suffix={
                                            {
                                                isNeedDelete: true,
                                                isAuth: true,
                                                authText: '인증요청',
                                                authPressEvent: callPhoneAuth
                                                // timer:900,
                                            }
                                        }
                                        rules={
                                            {
                                                required: '필수 입력 항목 입니다.',
                                                pattern: {
                                                    value: /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
                                                    message: '올바른 휴대폰 번호를 입력해주세요.',
                                                }
                                            }
                                        }
                                        style={inputStyle}
                                    />
                                    {progress >= 2 && isPhoneAuth && <RefTextInput
                                        name="pauth"
                                        label="인증번호"
                                        placeholder="인증번호"
                                        autoCapitalize='none'
                                        keyboardType='numeric'
                                        blurOnSubmit={false}
                                        suffix={
                                            {
                                                isAuth: true,
                                                authText: '재발송',
                                                authPressEvent: callPhoneAuth,
                                                timer: 180,
                                            }
                                        }
                                        rules={
                                            {
                                                required: '필수 입력 항목 입니다.',
                                                minLength: {
                                                    value: 8,
                                                    message: '휴대폰으로 발송된 8자리 인증번호를 입력해주세요.'
                                                },
                                                maxLength: {
                                                    value: 8,
                                                    message: '휴대폰으로 발송된 8자리 인증번호를 입력해주세요.'
                                                },
                                            }
                                        }
                                        style={inputStyle}
                                    />}

                                </ScrollView>
                                {!keyboardStatus.isKeyboardActivate &&
                                    <ButtonContainer>
                                        <Button
                                            type='yellow'
                                            label={"아이디 찾기"}
                                            disabled={!isValidation}
                                            onPressEvent={() => {
                                                handleSubmit(onSubmit)();
                                            }}
                                        />
                                    </ButtonContainer>
                                }
                            </Container>
                            <KeyboardButton
                                isKeyboardActivate={keyboardStatus.isKeyboardActivate}
                                label={"아이디 찾기"}
                                disabled={!isValidation}
                                onPressEvent={() => {
                                    handleSubmit(onSubmit)();
                                }}
                            />
                        </KeyContainer>
                    </KeyDismiss>
                </SafeContainer>
            </FormProvider>
        </Wrapper>
    );
};

export default Pages;

const KeyDismiss = styled.Pressable`
  flex: 1;
`
const SafeContainer = styled.SafeAreaView`
  flex:1;
`
const KeyContainer = styled.KeyboardAvoidingView`
  flex: 1;
  position: relative;
`

const Container = styled.View` 
  flex: 1;
  position: relative;
  align-items: center;
  background-color: white;
  padding :0px 24px;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 22px;
  margin-bottom: 24px;
`;

const InfomationText = styled(Typography).attrs({ text: 'Title04SB' })`
  color:${({ theme }) => theme.colors.grey[2]};
  margin: 24px;
  margin-top: 40px;

`