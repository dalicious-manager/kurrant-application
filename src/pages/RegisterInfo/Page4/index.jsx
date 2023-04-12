import {Text} from 'react-native';
import styled from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import ProgressBar from '~components/ProgressBar7';
import Typography from '~components/Typography';

import {PAGE_NAME as RegisterInfoPage5PageName} from '../Page5';
import SelectButton from './components/button/SelectButton';

import BottomSheet from '~components/BottomSheet';
import {finalRegisterAtom} from '../store';
import {useAtom} from 'jotai';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE4';

const Pages = () => {
  const [clickAvaliable, setClickAvaliable] = useState(false);

  const [finalRegister, setFinalRegister] = useAtom(finalRegisterAtom);

  const [yesOrNo, setYesOrNo] = useState(0);

  const [beganLevel, setBeganLevel] = useState(undefined);

  const [bottomModalOpen, setBottomModalOpen] = useState(false);

  const navigation = useNavigation();

  // 예: 일떄는 채식주의자 유형 필요함, 아니오:

  //모달 열기
  useEffect(() => {
    console.log(yesOrNo);

    if (yesOrNo === 1) {
      setBottomModalOpen(true);
    } else {
      setBottomModalOpen(false);
    }
  }, [yesOrNo, setBottomModalOpen]);

  // 버튼 열리기

  useEffect(() => {
    console.log('ㅛ내ㅛ내ㅛ내');
    console.log(yesOrNo);

    if (yesOrNo === 2) {
      // 아니오거나
      setClickAvaliable(true);
    } else {
      // 예 이고 beganLeve이 있을떄 열림

      if (beganLevel) {
        setClickAvaliable(true);
      } else {
        setClickAvaliable(false);
      }
    }

    // if(){

    // }
  }, [yesOrNo, setClickAvaliable, beganLevel]);

  const handleSelectBottomModal = id => {
    setBeganLevel(id);
  };

  const handlePress = () => {
    console.log('ㅗㅑ');

    // 예 일때 아니오일떄

    if (yesOrNo === 2) {
      // began

      console.log({
        ...finalRegister,
        isBegan: false,
        beganLevel: 0,
      });
      setFinalRegister({
        ...finalRegister,
        isBegan: false,
        beganLevel: 0,
      });
    } else {
      console.log({
        ...finalRegister,
        isBegan: true,
        beganLevel: beganLevel,
      });

      setFinalRegister({
        ...finalRegister,
        isBegan: yesOrNo === 1 ? true : false,
        beganLevel: beganLevel,
      });
    }

    navigation.navigate(RegisterInfoPage5PageName);
  };

  return (
    <Container
      paddingHorizontal={20}
      styles={{
        position: 'relative',
      }}>
      <ScrollViewContainer showsVerticalScrollIndicator={false}>
        <ProgressBar progress={4} />

        <TitleWrap>
          <Title>채식 정보</Title>
          <SemiTitle>평소에 채식을 하시나요?</SemiTitle>
        </TitleWrap>

        {beganLevel && <Text>{beganLevel}</Text>}

        <ButtonContainer>
          {[
            {id: 1, name: '예'},
            {id: 2, name: '아니요'},
          ].map((v, i) => {
            return (
              <SelectButton
                key={i}
                data={v}
                selectedId={yesOrNo}
                setSelectedId={setYesOrNo}
              />
            );
          })}
        </ButtonContainer>
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
      {/* <Bottom */}
      <BottomSheet
        modalVisible={bottomModalOpen}
        setModalVisible={setBottomModalOpen}
        title="채식 정보 입력"
        data={[
          {id: 1, text: '비건'},
          {id: 2, text: '락토 베지터리언'},
          {id: 3, text: '오보 베지테리언'},
          {id: 4, text: '락토 오보 베지테리언'},
          {id: 5, text: '페스코 베지테리언'},
          {id: 6, text: '폴로 베지테리언'},
          {id: 7, text: '플렉시테리언'},
        ]}
        selected={beganLevel}
        setSelected={handleSelectBottomModal}
        // setValue={onSelectEvent2}
        height={200}
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

const ButtonNext = styled(Button)`
  position: relative;
  bottom: 20px;
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
