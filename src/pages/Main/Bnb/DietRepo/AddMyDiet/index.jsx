import {useNavigation} from '@react-navigation/native';
import {Alert, View} from 'react-native';
import {FlatList, Platform, Text, Pressable, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled, {css} from 'styled-components';
import Button from '~components/Button';
import DietRepoCard from '../Main/Components/DietRepoCard';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import Typography from '~components/Typography';

import RefTextInput from '~components/RefTextInput';
import {useEffect, useRef, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {extractMonthAndDateFromDate} from '../logic';
import useDietRepoMutation from '../useDietRepoMutation';

import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {stringDateToJavascriptDate} from '../../../../../utils/dateFormatter';
import {extractMonthAndDateFromDate1} from '../logic';

export const PAGE_NAME = 'P_MAIN__DIET_REPO__AddMyDiet';

const Pages = ({route}) => {
  const navigation = useNavigation();

  const {addCustomMeal} = useDietRepoMutation(route?.params?.date);

  const form = useForm({
    mode: 'all',
  });
  // watch, handleSubmit, setValue 이 세가지로 거의 다 할 수 있다고 한다
  // const {watch, handleSubmit, setValue} = useForm({
  //   mode: 'all',
  // });

  const mealNameRef = useRef(null);
  const calRef = useRef(null);
  const carboRef = useRef(null);
  const proteinRef = useRef(null);
  const fatRef = useRef(null);
  // const {
  //   formState: {errors, dirtyFields},
  // } = useFormContext();

  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (
      form.watch('mealName') &&
      form.watch('cal') &&
      form.watch('carbo') &&
      form.watch('protein') &&
      form.watch('fat')
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [
    form.watch('mealName'),
    form.watch('cal'),
    form.watch('carbo'),
    form.watch('protein'),
    form.watch('fat'),
    setDisable,
  ]);

  const handlePress = () => {
    const data = {
      name: form.watch('mealName'),
      calorie: form.watch('cal'),
      carbohydrate: form.watch('carbo'),
      protein: form.watch('protein'),
      fat: form.watch('fat'),
      eatDate: route?.params?.date,
      diningType: route?.params?.diningType,
    };

    Alert.alert('내 음식 추가', '식사를 추가하시겠습니까?', [
      {
        text: '취소',
        onPress: () => {
          console.log('cancel pressed');
        },
        style: 'destructive',
      },
      {
        text: '추가',
        onPress: () => {
          try {
            addCustomMeal(data);
          } catch (err) {
            console.log(err);
          }
        },
      },
    ]);
  };

  return (
    <FormProvider {...form}>
      <Container>
        <TitleText>
          {extractMonthAndDateFromDate1(route?.params?.date, '-')[0]}월{' '}
          {extractMonthAndDateFromDate1(route?.params?.date, '-')[1]}일 (
          {format(stringDateToJavascriptDate(route?.params?.date, '-'), 'EEE', {
            locale: ko,
          })}
          ){' '}
          {route?.params?.diningType === 1
            ? '아침'
            : route?.params?.diningType === 2
            ? '점심'
            : '저녁'}
          식사 추가
        </TitleText>

        <KeyboardViewContainer
          showsVerticalScrollIndicator={false}
          // extraHeight={120}
        >
          <InputWrap>
            <RefTextInput
              name="mealName"
              label="식사 이름"
              ref={mealNameRef}
              returnKeyType="next"
              autoCapitalize="none"
              onSubmitEditing={() => mealNameRef.current?.focus()}
              // defaultValue={userId && userId}
              blurOnSubmit={false}
              suffix={{
                isNeedDelete: true,
                // isButton:true,
                // buttonText:'인증요청',
                // timer:900,
              }}
              padding="4px 0px"
              placeholder="식사 이름"
              rules={{
                required: '필수 입력 항목 입니다.',
              }}
              style={styles.input}
            />

            <RefTextInput
              name="cal"
              label="칼로리(kcal)"
              ref={calRef}
              returnKeyType="next"
              autoCapitalize="none"
              onSubmitEditing={() => calRef.current?.focus()}
              // defaultValue={userId && userId}
              blurOnSubmit={false}
              suffix={{
                isNeedDelete: true,
                // isButton:true,
                // buttonText:'인증요청',
                // timer:900,
              }}
              padding="4px 0px"
              placeholder="칼로리(kcal)"
              rules={{
                required: '필수 입력 항목 입니다.',
                pattern: {
                  value: /([0-9])/g,
                  message: '숫자를 입력해주세요',
                },
              }}
              style={styles.input}
            />

            <RefTextInput
              name="carbo"
              label="탄수화물(g)"
              ref={carboRef}
              returnKeyType="next"
              autoCapitalize="none"
              onSubmitEditing={() => carboRef.current?.focus()}
              // defaultValue={userId && userId}
              blurOnSubmit={false}
              suffix={{
                isNeedDelete: true,
                // isButton:true,
                // buttonText:'인증요청',
                // timer:900,
              }}
              padding="4px 0px"
              placeholder="탄수화물(g)"
              rules={{
                required: '필수 입력 항목 입니다.',
                pattern: {
                  value: /([0-9])/g,
                  message: '숫자를 입력해주세요',
                },
              }}
              style={styles.input}
            />
            <RefTextInput
              name="protein"
              label="단백질(g)"
              ref={proteinRef}
              returnKeyType="next"
              autoCapitalize="none"
              onSubmitEditing={() => proteinRef.current?.focus()}
              // defaultValue={userId && userId}
              blurOnSubmit={false}
              suffix={{
                isNeedDelete: true,
                // isButton:true,
                // buttonText:'인증요청',
                // timer:900,
              }}
              padding="4px 0px"
              placeholder="단백질(g)"
              rules={{
                required: '필수 입력 항목 입니다.',
                pattern: {
                  value: /([0-9])/g,
                  message: '숫자를 입력해주세요',
                },
              }}
              style={styles.input}
            />
            <RefTextInput
              name="fat"
              label="지방(g)"
              ref={fatRef}
              returnKeyType="next"
              autoCapitalize="none"
              onSubmitEditing={() => fatRef.current?.focus()}
              // defaultValue={userId && userId}
              blurOnSubmit={false}
              suffix={{
                isNeedDelete: true,
                // isButton:true,
                // buttonText:'인증요청',
                // timer:900,
              }}
              padding="4px 0px"
              placeholder="지방(g)"
              rules={{
                required: '필수 입력 항목 입니다.',
                pattern: {
                  value: /([0-9])/g,
                  message: '숫자를 입력해주세요',
                },
              }}
              style={styles.input}
            />
          </InputWrap>
        </KeyboardViewContainer>

        <ButtonWrapper
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0.3)',
            'rgba(255, 255, 255, 0.7)',
            'rgba(255, 255, 255, 0.8048)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 0.95)',
          ]}>
          <ButtonNext
            size="full"
            label="완료"
            text={'BottomButtonSB'}
            disabled={disable}
            onPressEvent={() => {
              form.handleSubmit(handlePress());
            }}
          />
        </ButtonWrapper>
      </Container>
    </FormProvider>
  );
};
export default Pages;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 24,
  },

  buttonContainer: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#424242',
  },
});

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  /* background-color: #000000; */

  padding: 0px 24px;
  padding-top: 40px;
`;

const KeyboardViewContainer = styled(KeyboardAwareScrollView)`
  /* flex: 1; */
  /* padding: 0px 12px; */
  background-color: #ffffff;
  /* background-color: #000000; */
  position: relative;
  /* border: 1px solid black; */
`;

const TitleText = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 24px;
`;

const InputWrap = styled.View`
  /* margin-left: 5px;
  margin-right: 5px; */
`;
const InputTitle = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 8px;
`;

const ButtonWrapper = styled(LinearGradient)`
  position: relative;
  ${() => {
    if (Platform.OS === 'ios') {
      return css`
        bottom: 35px;
      `;
    } else {
      return css`
        bottom: 24px;
        /* bottom: 1px; */
      `;
    }
  }}

  padding:0 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonNext = styled(Button)``;
