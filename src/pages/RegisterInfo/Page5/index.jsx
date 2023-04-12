import {Text} from 'react-native';
import styled from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import ProgressBar from '~components/ProgressBar7';

import {PAGE_NAME as RegisterInfoPage6PageName} from '../Page6';
import Typography from '~components/Typography';
import YesOrNoButton from '../components/button/Page4_5/YesOrNoButton';
import {finalRegisterAtom} from '../store';
import {useAtom} from 'jotai';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE5';

const Pages = () => {
  //   const [clickAvaliable, setClickAvaliable] = useState(false);

  const navigation = useNavigation();
  const [finalRegister, setFinalRegister] = useAtom(finalRegisterAtom);
  const [clickAvaliable, setClickAvaliable] = useState(false);
  // yes: 1 no: 2
  const [yesOrNo, setYesOrNo] = useState(0);
  // 두번째 아이디
  const [proteinFrequency, setProteinFrequency] = useState(undefined);
  // const [secondQuestionOpen, setSecondQuestionOpen] = useState(false)

  // yesOrNo값이 1이면 secondQu

  ///

  useEffect(() => {
    if (yesOrNo === 2) {
      // 아니오거나
      setClickAvaliable(true);
    } else {
      // 예 이고 beganLeve이 있을떄 열림

      if (proteinFrequency) {
        setClickAvaliable(true);
      } else {
        setClickAvaliable(false);
      }
    }

    // if(){

    // }
  }, [yesOrNo, setClickAvaliable, proteinFrequency]);

  const handlePress = () => {
    if (yesOrNo === 2) {
      // began

      console.log({
        ...finalRegister,
        isProtein: false,
        proteinFrequency: 0,
      });
      setFinalRegister({
        ...finalRegister,
        isProtein: false,
        proteinFrequency: 0,
      });
    } else {
      console.log({
        ...finalRegister,
        isProtein: true,
        proteinFrequency: proteinFrequency,
      });

      setFinalRegister({
        ...finalRegister,
        isProtein: yesOrNo === 1 ? true : false,
        proteinFrequency: proteinFrequency,
      });
    }

    navigation.navigate(RegisterInfoPage6PageName);
  };

  return (
    <Container
      paddingHorizontal={20}
      styles={{
        position: 'relative',
      }}>
      <ScrollViewContainer showsVerticalScrollIndicator={false}>
        <ProgressBar progress={5} />

        <TitleWrap>
          <Title>프로틴 정보</Title>
          <SemiTitle>평소 프로틴 관련 제품을 따로 섭취하시나요?</SemiTitle>
        </TitleWrap>

        <ButtonContainer>
          {[
            {id: 1, name: '예'},
            {id: 2, name: '아니요'},
          ].map((v, i) => {
            return (
              <YesOrNoButton
                key={i}
                data={v}
                selectedId={yesOrNo}
                setSelectedId={setYesOrNo}
              />
            );
          })}
        </ButtonContainer>

        {yesOrNo === 1 && (
          <>
            <TitleWrap>
              <Title>프로틴 섭취 빈도</Title>
              {/* <SemiTitle>평소 프로틴 관련 제품을 따로 섭취하시나요?</SemiTitle> */}
            </TitleWrap>

            <ButtonContainer>
              {[
                {id: 1, name: '주 1~2회'},
                {id: 2, name: '주 3~5회'},
                {id: 3, name: '주 6~7회'},
              ].map((v, i) => {
                return (
                  <YesOrNoButton
                    key={i}
                    data={v}
                    width={'103px'}
                    selectedId={proteinFrequency}
                    setSelectedId={setProteinFrequency}
                  />
                );
              })}
            </ButtonContainer>
          </>
        )}
      </ScrollViewContainer>
      <ButtonNext
        size="full"
        label="다음"
        text={'BottomButtonSB'}
        disabled={!clickAvaliable}
        onPressEvent={() => {
          handlePress();
        }}
      />
    </Container>
  );
};
export default Pages;

const Container = styled.View`
  flex: 1;
  padding: 35px 20px;
  align-items: center;

  background-color: #ffffff;
`;

const ScrollViewContainer = styled.ScrollView`
  width: 100%;
  /* height: 90%; */
  background-color: #ffffff;
`;

const TitleWrap = styled.View`
  width: 100%;
  margin-top: 29px;
  margin-bottom: 24px;
`;
const Title = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 8px;
`;
const SemiTitle = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ButtonNext = styled(Button)`
  position: relative;
  bottom: 20px;
`;
