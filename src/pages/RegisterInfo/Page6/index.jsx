import {Text} from 'react-native';
import styled from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';

import Typography from '~components/Typography';
import BottomSheet from '~components/BottomSheet';
import ProgressBar from '~components/ProgressBar7';

import {PAGE_NAME as RegisterInfoPage7PageName} from '../Page7';

import RefTextInput from '~components/RefTextInput';
import SelectInputBox from './components/SelectInputBox/SelectInputBox';
import ModalCalendar from '../../../components/ModalCalendar/ModalCalendar';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE6';

const Pages = () => {
  //   const [clickAvaliable, setClickAvaliable] = useState(false);

  // 바텀 팝업 버튼들
  const [birthdayModal, setBirthdayModal] = useState(false);
  const [genderModal, setGenderModal] = useState(undefined);
  const [countryModal, setCountryModal] = useState('');
  const [jobTypeModal, setJobTypeModal] = useState('');
  const [detailJobTypeModal, setDetailJobTypeModal] = useState('');

  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [jobType, setJobType] = useState('');
  const [detailJobType, setDetailJobType] = useState('');

  const navigation = useNavigation();

  // 생년월일

  const handleConfirmPress = setModal => {
    setModal(false);
  };

  useEffect(() => {
    console.log('버스데이');
    console.log(birthday);
  }, [birthday]);

  const handleOnChangeDate = (__, date, _, setSelected) => {
    setSelected(date);
  };

  const handlePress = () => {
    console.log('ㅗㅑ');
    navigation.navigate(RegisterInfoPage7PageName);
  };

  return (
    <Container
      paddingHorizontal={20}
      styles={{
        position: 'relative',
      }}>
      <ContentContainer>
        <ProgressBar progress={6} />

        <TitleWrap>
          <Title>기본정보</Title>
        </TitleWrap>

        <SelectInputBox
          placeholder={'생년월일'}
          value={birthday}
          setValue={setBirthday}
          buttonOnClickCallback={() => {
            setBirthdayModal(true);
          }}
        />
      </ContentContainer>

      <ButtonNext
        size="full"
        label="다음"
        text={'BottomButtonSB'}
        // disabled={!clickAvaliable}
        onPressEvent={() => {
          handlePress();
        }}
      />

      {/* <Bottom */}
      {/* <BottomSheet
        modalVisible={birthdayModal}
        setModalVisible={setBirthdayModal}
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
        selected={birthday}
        setSelected={setBirthday}
        // setValue={onSelectEvent2}
        height={200}
      /> */}
      <ModalCalendar
        modalVisible={birthdayModal}
        setModalVisible={setBirthdayModal}
        calendarProps={{
          selected: birthday,

          onChange: handleOnChangeDate,

          confirm: handleConfirmPress,

          setModal: setBirthdayModal,

          setSelected: setBirthday,
        }}></ModalCalendar>
    </Container>
  );
};
export default Pages;

const Container = styled.View`
  flex: 1;
  padding: 35px 24px;
  align-items: center;
  background-color: #ffffff;
`;

const ContentContainer = styled.View`
  flex: 1;
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

const ButtonNext = styled(Button)`
  position: relative;
  bottom: 20px;
`;
