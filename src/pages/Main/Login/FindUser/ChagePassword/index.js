import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Platform, Keyboard, NativeModules, Alert, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import useAuth from '../../../../../biz/useAuth';
import Button from '../../../../../components/Button';
import KeyboardButton from '../../../../../components/KeyboardButton';
import RefTextInput from '../../../../../components/RefTextInput';
import Typography from '../../../../../components/Typography';
import Wrapper from '../../../../../components/Wrapper';
import useKeyboardEvent from '../../../../../hook/useKeyboardEvent';
import { PAGE_NAME as EmailLoginPageName } from '../../EmailLogin';
import { PAGE_NAME as LoginPageName } from '../../Login';

export const PAGE_NAME = 'P_LOGIN__MODAL__CHANGE_PASSWORD';
/**
 *
 * @param {object} props
 * @returns
 */
const { StatusBarManager } = NativeModules;

const inputStyle = {
    marginBottom: 16,
}

const Pages = ({ route }) => {
    const [progress, setProgress] = useState(1);
    const { type, email } = route.params;
    const navigation = useNavigation();
    const Infomation = () => {
        if (progress === 1 && type === 'email') return '이메일로 발송된 인증번호를\n입력해주세요.'
        if (progress === 1) return '휴대폰 SMS로 발송된 인증번호를\n확인해주세요.'
        if (progress >= 2) return '새 비밀번호를 입력해주세요.'
    }
    const auth = useAuth();
    const [statusBarHeight, setStatusBarHeight] = useState(0);


    const [isAuth, setAuth] = useState(false);

    const form = useForm({
        mode: 'all'
    });
    const { formState: { errors }, watch, handleSubmit } = form;

    const keyboardStatus = useKeyboardEvent();
    const phoneNumber = watch('phone');
    const authNumber = watch('auth');
    const password = watch('password');
    const passwordChecked = watch('passwordChecked');

    const callPhoneAuth = async () => {
        if (phoneNumber && !errors.phone) {
            try {
                await auth.requestPhoneAuth({ to: phoneNumber }, 3);
                setAuth(true);
            } catch (err) {
                console.log(err)
            }
        }
    }
    const callMailAuth = async () => {
        try {
            await auth.requestEmailAuth({ receivers: [email] }, 3);
            setAuth(true);
        } catch (err) {
            console.log(err)
        }
    }
    const isValidation =
        (progress === 1 && authNumber && !errors.auth && (!auth.readableAtom.isConfirmPhoneLoading || !auth.readableAtom.isConfirmEmailLoading))
        || (progress >= 2 && password && passwordChecked && !errors.password && !errors.passwordChecked && (!auth.readableAtom.isChangePasswordLoading))
        ;
    const onSubmit = async (data) => {
        try {
            if (progress === 1) {
                if (type === 'phone') {
                    await auth.confirmPhoneAuth(authNumber, 3);
                } else {
                    await auth.confirmEmailAuth(authNumber, 3);
                }
                return setProgress(progress + 1);
            }
            if (type === 'phone') {
                const reqPhone = {
                    phone: data.phone,
                    password: data.password,
                    passwordCheck: data.passwordChecked,
                }
                await auth.changePassword(reqPhone, type);
            } else {
                const reqEmail = {
                    email: data.email,
                    password: data.password,
                    passwordCheck: data.passwordChecked,
                }
                await auth.changePassword(reqEmail, type);
            }
            navigation.reset({
                index: 1,
                routes: [
                    {
                        name: LoginPageName,
                    },
                    {
                        name: EmailLoginPageName,
                        params: {
                            isPassword: true
                        }
                    },
                ],
            })
            // navigation.navigate(EmailLoginPageName, {
            //     isPassword: true
            // })

        } catch (err) {
            const AlertTitle = progress === 1 ? "인증번호 오류" : "비밀번호 변경 실패"
            Alert.alert(
                AlertTitle,
                err.toString(),
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
                                    {progress === 1 && <View>
                                        {type === 'phone' ? <RefTextInput
                                            name="phone"
                                            label="휴대폰 번호"
                                            placeholder="휴대폰 번호"
                                            keyboardType='numeric'
                                            autoCapitalize='none'
                                            blurOnSubmit={false}
                                            isEditable={!isAuth}
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
                                        /> :
                                            <RefTextInput
                                                name="email"
                                                label="이메일 주소"
                                                placeholder="이메일 주소"
                                                autoCapitalize='none'
                                                autoFocus={true}
                                                blurOnSubmit={false}
                                                isEditable={!isAuth}
                                                defaultValue={email}
                                                suffix={
                                                    {
                                                        isNeedDelete: true,
                                                        isAuth: true,
                                                        authText: '인증요청',
                                                        authPressEvent: callMailAuth
                                                        // timer:900,
                                                    }
                                                }
                                                rules={
                                                    {
                                                        required: '필수 입력 항목 입니다.',
                                                        pattern: {
                                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                            message: '이메일 형식에 맞지 않습니다.',
                                                        }
                                                    }
                                                }
                                                style={inputStyle}
                                            />}
                                        {isAuth && <RefTextInput
                                            name="auth"
                                            label="인증번호"
                                            placeholder="인증번호"
                                            autoCapitalize='none'
                                            keyboardType='numeric'
                                            blurOnSubmit={false}
                                            suffix={
                                                {
                                                    isAuth: true,
                                                    authText: '재발송',
                                                    authPressEvent: type === 'phone' ? callPhoneAuth : callMailAuth,
                                                    timer: 180,
                                                }
                                            }
                                            rules={
                                                {
                                                    required: '필수 입력 항목 입니다.',
                                                    minLength: {
                                                        value: 6,
                                                        message: type === 'phone' ? '휴대폰으로 발송된 6자리 인증번호를 입력해주세요.' : '이메일로 발송된 6자리 인증번호를 입력해주세요.'
                                                    },
                                                    maxLength: {
                                                        value: 6,
                                                        message: type === 'phone' ? '휴대폰으로 발송된 6자리 인증번호를 입력해주세요.' : '이메일로 발송된 6자리 인증번호를 입력해주세요.'
                                                    },
                                                }
                                            }
                                            style={inputStyle}
                                        />}
                                    </View>}
                                    {progress >= 2 && <PasswordBox>
                                        <RefTextInput
                                            name="password"
                                            label="비밀번호"
                                            autoFocus={true}
                                            isPassword={true}
                                            autoCapitalize='none'
                                            placeholder="비밀번호"
                                            rules={
                                                {
                                                    required: '필수 입력 항목 입니다.',
                                                    minLength: {
                                                        value: 8,
                                                        message: '8글자 이상 입력'
                                                    },
                                                    maxLength: {
                                                        value: 31,
                                                        message: '32글자 이하 입력'
                                                    },
                                                    pattern: {
                                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,32}$/,
                                                        message: '비밀번호 형식에 맞지 않습니다.',
                                                    }
                                                }
                                            }
                                            style={inputStyle}
                                        />
                                        <RefTextInput
                                            name="passwordChecked"
                                            label="비밀번호 재입력"
                                            isPassword={true}
                                            autoCapitalize='none'
                                            placeholder="비밀번호 재입력"
                                            rules={
                                                {
                                                    required: '필수 입력 항목 입니다.',
                                                    validate: value => value === password || "비밀번호가 일치하지 않습니다.",
                                                    pattern: {
                                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,32}$/,
                                                        message: '비밀번호 형식에 맞지 않습니다.',
                                                    }
                                                }
                                            }
                                            style={inputStyle}
                                        />
                                        <View>
                                            <CaptionBox>
                                                <CaptionPoint>
                                                    {'\u2022   '}
                                                </CaptionPoint>
                                                <CaptionText>
                                                    {'비밀번호는 8~32자리의 영문자, 숫자, 특수문자를 조합하여 설정해주세요.'}
                                                </CaptionText>
                                            </CaptionBox>
                                            <CaptionBox>
                                                <CaptionPoint>
                                                    {'\u2022   '}
                                                </CaptionPoint>
                                                <CaptionText>
                                                    {'다른 사이트에서 사용하는 것과 동일하거나 쉬운 비밀번호는 사용하지 마세요.'}
                                                </CaptionText>
                                            </CaptionBox>
                                            <CaptionBox>
                                                <CaptionPoint>
                                                    {'\u2022   '}
                                                </CaptionPoint>
                                                <CaptionText>
                                                    {'안전한 계정 사용을 위해 비밀번호는 주기적으로 변경해 주세요.'}
                                                </CaptionText>
                                            </CaptionBox>
                                        </View>
                                    </PasswordBox>}
                                </ScrollView>
                                {!keyboardStatus.isKeyboardActivate &&
                                    <ButtonContainer>
                                        <Button
                                            type='yellow'
                                            label={progress < 2 ? "확인" : "비밀번호 재설정"}
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
                                label={progress < 2 ? "확인" : "비밀번호 재설정"}
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
const PasswordBox = styled.View`
  
`
const CaptionBox = styled.View`
  flex-direction: row;
`
const CaptionText = styled(Typography).attrs({ text: 'CaptionR' })`
  color:${({ theme }) => theme.colors.grey[4]};
  flex:1;
`
const CaptionPoint = styled(Typography).attrs({ text: 'CaptionR' })`
    color:${({ theme }) => theme.colors.grey[4]};
`
const InfomationText = styled(Typography).attrs({ text: 'Title04SB' })`
  color:${({ theme }) => theme.colors.grey[2]};
  margin: 24px;
  margin-top: 40px;

`