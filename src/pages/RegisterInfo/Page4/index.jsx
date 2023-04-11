import {Text} from 'react-native';
import styled from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import ProgressBar from '~components/ProgressBar7';
import Typography from '~components/Typography';

import {PAGE_NAME as RegisterInfoPage5PageName} from '../Page5';
import SelectButton from './components/button/SelectButton';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE4';

const Pages = () => {
  const [clickAvaliable, setClickAvaliable] = useState(false);

  const [selectedId, setSelectedId] = useState(0);
  const [bottomModalOpen, setBottomModalOpen] = useState(false);

  const navigation = useNavigation();

  // 예: 일떄는 채식주의자 유형 필요함, 아니오:

  useEffect(() => {
    console.log(selectedId);
  }, [selectedId]);

  const handlePress = () => {
    console.log('ㅗㅑ');
    navigation.navigate(RegisterInfoPage5PageName);
  };

  const thisId = 1;
  const handleSelectBottomModal = id => {
    console.log('여기여');
    console.log(id);
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

        <ButtonContainer>
          {[
            {id: 1, name: '예'},
            {id: 2, name: '아니요'},
          ].map((v, i) => {
            return (
              <SelectButton
                data={v}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
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
          {id: 3, text: '락토 베지터리언'},
        ]}
        selected={thisId}
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
