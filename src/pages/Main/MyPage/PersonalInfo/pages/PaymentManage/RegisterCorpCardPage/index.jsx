import {useFocusEffect, useNavigation} from '@react-navigation/native';
import cardValidator from 'card-validator';
import React, {useCallback, useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Platform, ScrollView, NativeModules, Dimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled, {useTheme} from 'styled-components/native';
import Button from '~components/Button';
import RefTextInput from '~components/RefTextInput';
import Typography from '~components/Typography';
import Wrapper from '~components/Wrapper';
import useKeyboardEvent from '~hook/useKeyboardEvent';

import useUserMe from '../../../../../../../biz/useUserMe';
import BottomSheetCard from '../../../../../../../components/BottomSheetCard/component';
import {
  checkCorporateRegiNumber,
  isValidCardNumber,
} from '../../../../../../../utils/cardFormatter';
import {PAGE_NAME as PayCheckPasswordPageName} from '../../PayCheckPassword';
const screenHeight = Dimensions.get('window').height;

export const PAGE_NAME = 'P__MY_PAGE__PAYMENT_MANAGE__REGISTER_CORP_CARD';
export const corporationData = [
  {
    id: '01',
    text: '비씨카드',
  },
  {
    id: '02',
    text: '국민카드',
  },
  {
    id: '03',
    text: '하나카드',
  },
  {
    id: '04',
    text: '삼성카드',
  },
  {
    id: '06',
    text: '신한카드',
  },
  {
    id: '07',
    text: '현대카드',
  },
  {
    id: '08',
    text: '롯데카드',
  },
  {
    id: '11',
    text: '시티카드',
  },
  {
    id: '12',
    text: 'NH농협카드',
  },
  {
    id: '13',
    text: '수협카드',
  },
  {
    id: '15',
    text: '우리카드',
  },
  {
    id: '21',
    text: '광주카드',
  },
  {
    id: '22',
    text: '전북카드',
  },
  {
    id: '23',
    text: '제주카드',
  },
  {
    id: '25',
    text: '해외비자카드',
  },
  {
    id: '26',
    text: '해외마스터카드',
  },
  {
    id: '27',
    text: '해외다이너스카드',
  },
  {
    id: '28',
    text: '해외AMAX카드',
  },
  {
    id: '29',
    text: '해외JCB카드',
  },
  {
    id: '30',
    text: '해외카드',
  },
  {
    id: '32',
    text: '우체국카드',
  },
  {
    id: '33',
    text: 'MG새마을체크카드',
  },
  {
    id: '34',
    text: '중국은행체크카드',
  },
  {
    id: '38',
    text: '은련카드',
  },
  {
    id: '41',
    text: '신협카드',
  },
  {
    id: '42',
    text: '저축은행카드',
  },
  {
    id: '43',
    text: 'KDB산업카드',
  },
  {
    id: '44',
    text: '카카오뱅크카드',
  },
  {
    id: '45',
    text: '케이뱅크카드',
  },
  {
    id: '46',
    text: '카카오머니카드',
  },
  {
    id: '47',
    text: 'SSG머니카드',
  },
];
const Pages = ({route}) => {
  const insets = useSafeAreaInsets();
  const safeAreaHeight = insets.top + insets.bottom;
  const [selected, setSelected] = useState('');
  const params = route.params;
  const themeApp = useTheme();
  const form = useForm({
    mode: 'all',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const {StatusBarManager} = NativeModules;
  const keyboardEvent = useKeyboardEvent();
  const {
    payCheckPassword,
    readableAtom: {cardList},
  } = useUserMe();
  const {handleSubmit, watch} = form;
  const navigation = useNavigation();
  const onSubmit = async data => {
    const paycheck = await payCheckPassword();

    const exp = data.cardExpDate.split('/');
    const reqNice = {
      corporationCode: corporationData.find(
        corp => corp.text === data.cardCorporationCode,
      ).id,
      cardType: '02',
      cardNumber: data.cardNumber?.replace(/\W/gi, ''),
      expirationYear: exp[1],
      expirationMonth: exp[0],
      cardPassword: data.cardPass,
      identityNumber: data.cardCorpNumber,
      defaultType: cardList.length > 0 ? 0 : params?.defaultType || 0,
    };
    navigation.navigate(PayCheckPasswordPageName, {
      isFirst: !paycheck.data,
      cardData: JSON.stringify(reqNice),
    });
  };
  const onPressEvent = () => {};
  const isValidate =
    watch('cardNumber') &&
    watch('cardExpDate') &&
    watch('cardSecret') &&
    watch('cardPass') &&
    watch('cardCorporationCode') &&
    watch('cardCorpNumber');
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        tabBarLabelStyle: {
          fontSize: 15,
          lineHeight: 21,
          fontFamily: 'Pretendard-SemiBold',
        },
      });
      return () => {
        navigation.setOptions({
          tabBarLabelStyle: {
            fontSize: 15,
            lineHeight: 21,
            fontFamily: 'Pretendard-Regular',
          },
        });
      };
    }, []),
  );
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      extraScrollHeight={140}
      enableOnAndroid={true}>
      <Wrapper
        paddingTop={24}
        paddingHorizontal={24}
        styles={{
          height:
            Platform.OS === 'ios'
              ? screenHeight - safeAreaHeight - 100
              : screenHeight - safeAreaHeight - 120,
        }}>
        <FormProvider {...form}>
          <ScrollView>
            <CardRegisteredBox>
              <RegisteredTitleBox>
                <Typography
                  text="Title03SB"
                  textColor={themeApp.colors.grey[2]}>
                  카드 정보
                </Typography>
              </RegisteredTitleBox>
              <RegiteredView>
                <NoClickZone
                  onPress={() => {
                    setModalVisible(true);
                  }}
                />
                <RefTextInput
                  label="카드사"
                  name="cardCorporationCode"
                  placeholder="카드사 선택"
                  value={
                    corporationData.find(v => v.id === selected)?.text || null
                  }
                  rules={{
                    required: '필수 입력 항목 입니다.',
                  }}
                />
              </RegiteredView>
              <RegiteredView>
                <RefTextInput
                  label="카드번호"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  keyboardType="numeric"
                  // value={isApplicant.phone}
                  rules={{
                    required: '필수 입력 항목 입니다.',
                    validate: {
                      isValid: value => {
                        return (
                          isValidCardNumber(value?.replace(/\W/gi, '')) ||
                          '유효한 카드번호를 입력해주세요'
                        );
                      },
                    },
                  }}
                />
              </RegiteredView>
              <RegiteredView>
                <RefTextInput
                  label="유효기간"
                  name="cardExpDate"
                  placeholder="MM/YY"
                  keyboardType="numeric"
                  // value={isApplicant.phone}
                  rules={{
                    required: '필수 입력 항목 입니다.',
                    validate: {
                      isValid: value => {
                        return (
                          cardValidator.expirationDate(value).isValid ||
                          '올바른 유효기간을 입력해주세요'
                        );
                      },
                    },
                  }}
                />
              </RegiteredView>
              <RegiteredView>
                <RefTextInput
                  label="CVC(보안코드)"
                  name="cardSecret"
                  placeholder="카드 뒷면 세자리"
                  keyboardType="numeric"
                  // value={isApplicant.phone}
                  rules={{
                    required: '필수 입력 항목 입니다.',
                    validate: {
                      isValid: value => {
                        return (
                          cardValidator.cvv(value).isValid ||
                          cardValidator.cvv(value, 4).isValid ||
                          '올바른 보안코드를 입력해주세요'
                        );
                      },
                    },
                  }}
                />
              </RegiteredView>
              <RegiteredView>
                <RefTextInput
                  label="사업자등록번호"
                  name="cardCorpNumber"
                  placeholder="0000000000"
                  keyboardType="numeric"
                  // value={isApplicant.phone}
                  rules={{
                    required: '필수 입력 항목 입니다.',
                    validate: {
                      isValid: value => {
                        return (
                          checkCorporateRegiNumber(value) ||
                          '유효한 사업자등록번호를 입력해주세요'
                        );
                      },
                    },
                  }}
                />
              </RegiteredView>
              <RegiteredView>
                <RefTextInput
                  label="비밀번호"
                  name="cardPass"
                  placeholder="앞에 두자리"
                  keyboardType="numeric"
                  isPassword={true}
                  rules={{
                    required: '필수 입력 항목 입니다.',
                    maxLength: {
                      value: 2,
                      message: '올바른 비밀번호를 입력해주세요',
                    },
                  }}
                />
              </RegiteredView>
            </CardRegisteredBox>
          </ScrollView>
          {!keyboardEvent.isKeyboardActivate && (
            <ButtonBox>
              <Button
                label="등록하기"
                disabled={!isValidate}
                onPressEvent={handleSubmit(onSubmit)}
              />
            </ButtonBox>
          )}
        </FormProvider>
      </Wrapper>
      <BottomSheetCard
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'카드사'}
        data={corporationData}
        selected={selected}
        setSelected={setSelected}
        onPressEvent={onPressEvent}
      />
    </KeyboardAwareScrollView>
  );
};

export default Pages;

const NoClickZone = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #00000000;
  width: 100%;
  height: 100%;
`;

const CardRegisteredBox = styled.View``;
const RegisteredTitleBox = styled.View`
  flex-direction: row;
  margin-bottom: 28px;
`;
const RegiteredView = styled.View`
  margin-top: 12px;
  margin-bottom: 12px;
`;
const ButtonBox = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: ${({isKeyboard}) => (isKeyboard ? '100px' : '24px')};
  background-color: ${({isKeyboard}) =>
    isKeyboard ? 'rgba(0,0,0,1)' : 'white'};
`;
