import {Alert, FlatList, Platform, ScrollView, Text} from 'react-native';
import styled, {css} from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import Typography from '~components/Typography';

import ProgressBar from '~components/ProgressBar7';

import {PAGE_NAME as RegisterInfoPage7PageName} from '../Page7_8_9_10/Page7';

import SelectInputBox from '../components/SelectInputBox/SelectInputBox';
import ModalCalendar from '../../../components/ModalCalendar/ModalCalendar';
import {toStringByFormatting} from '../../../utils/dateFormatter';
import useGetRegisterInfo from '../../../biz/useRegisterInfo/getRegisterIist/hook';
import {finalRegisterAtom} from '../store';
import {useAtom} from 'jotai';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheetRegisterInfo2 from '../../../components/BottomSheetRegisterInfo2/component';

import CheckedIcon from '../../../assets/icons/BottomSheet/Checked.svg';
import {Dimensions} from 'react-native';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE6';

const Pages = () => {
  const [clickAvaliable, setClickAvaliable] = useState(false);

  const [finalRegister, setFinalRegister] = useAtom(finalRegisterAtom);

  // 바텀 팝업 버튼들
  const [birthdayModal, setBirthdayModal] = useState(false);
  const [isConfirmPress, setIsConfirmPress] = useState(false);

  const [genderModal, setGenderModal] = useState(false);
  const [countryModal, setCountryModal] = useState(false);
  const [jobTypeModal, setJobTypeModal] = useState(false);
  const [detailJobTypeModal, setDetailJobTypeModal] = useState(false);

  const [birthday, setBirthday] = useState(undefined);
  const [birthdayDateFormat, setBirthdayDateFormat] = useState(new Date());

  const [gender, setGender] = useState(undefined);

  const [country, setCountry] = useState(undefined);

  const [jobType, setJobType] = useState(undefined);

  const [detailJobType, setDetailJobType] = useState(undefined);

  const navigation = useNavigation();

  const {
    getJobList,
    getDetailJobList,
    getCountryList,

    jobList,
    detailJobList,
    countryList,
  } = useGetRegisterInfo();

  useEffect(() => {
    getCountryList();
    getJobList();
  }, []);

  useEffect(() => {
    getDetailJobList(jobType);
    setDetailJobType(undefined);
  }, [jobType]);

  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      if (!birthdayModal && isMount && isConfirmPress) {
        setBirthday(toStringByFormatting(birthdayDateFormat, '. '));
      }
    }
  }, [birthdayDateFormat, birthdayModal]);

  useEffect(() => {
    if (birthday && gender && country && jobType && detailJobType) {
      setClickAvaliable(true);
    } else {
      setClickAvaliable(false);
    }
  }, [birthday, gender, country, jobType, detailJobType, setClickAvaliable]);

  const handleConfirmPress = (setModal, setSelected) => {
    setSelected(birthdayDateFormat);
    setModal(false);
    setIsConfirmPress(true);
  };

  const handleOnChangeDate = (event, date, setModal, setSelected) => {
    if (Platform.OS === 'android') {
      setModal(false);

      if (event.type === 'set') {
        setBirthday(toStringByFormatting(date, '. '));
      }
    }

    if (Platform.OS === 'ios') {
      setSelected(date);
    }
  };

  const handleSelectJobType = id => {
    setJobType(id);
  };

  const handlePress = () => {
    const birthYear = birthday.split('. ')[0];
    const birthMonth = birthday.split('. ')[1];
    const birthDay = birthday.split('. ')[2];

    const pickJob = jobType => {
      return jobList.find(v => v.id === jobType)?.text;
    };

    setFinalRegister({
      ...finalRegister,
      userDefaultInfo: {
        birthYear,
        birthMonth,
        birthDay,
        gender: gender === '남자' ? 1 : 2,
        country,

        jobType: pickJob(jobType),
        detailJobType,
      },
    });

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
        <SelectInputBox
          placeholder={'성별'}
          value={gender}
          setValue={setGender}
          buttonOnClickCallback={() => {
            setGenderModal(true);
          }}
        />
        <SelectInputBox
          placeholder={'국적'}
          value={country}
          setValue={setCountry}
          buttonOnClickCallback={() => {
            setCountryModal(true);
          }}
        />
        <Wrap1>
          <Wrap2>
            <SelectInputBox
              placeholder={'직종 분류'}
              value={jobType}
              convertData={jobList}
              setValue={setJobType}
              buttonOnClickCallback={() => {
                setJobTypeModal(true);
              }}
              containerCss="margin-right: 5.5px;"
            />
          </Wrap2>

          <Wrap2>
            <SelectInputBox
              placeholder={'상세 직종'}
              value={detailJobType}
              setValue={setDetailJobType}
              buttonOnClickCallback={() => {
                if (!jobType) {
                  Alert.alert('직종 분류를 먼저 선택해주세요');
                } else {
                  setDetailJobTypeModal(true);
                }
              }}
              containerCss="margin-left: 5.5px;"
            />
          </Wrap2>
        </Wrap1>
      </ContentContainer>

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
          label="다음"
          text={'BottomButtonSB'}
          disabled={!clickAvaliable}
          onPressEvent={() => {
            handlePress();
          }}
        />
      </ButtonWrapper>

      {/* <Bottom */}

      <BottomSheetRegisterInfo2
        show={genderModal}
        onDismiss={() => {
          setGenderModal(false);
        }}
        enableBackDropDismiss>
        <BottomSheetChildrenComponent
          title={'성별'}
          data={[
            {id: '남자', text: '남자'},
            {id: '여자', text: '여자'},
          ]}
          selected={gender}
          setSelected={setGender}
          setModalVisible={setGenderModal}
        />
      </BottomSheetRegisterInfo2>

      <BottomSheetRegisterInfo2
        show={countryModal}
        onDismiss={() => {
          setCountryModal(false);
        }}
        enableBackDropDismiss>
        <BottomSheetChildrenComponent
          title={'국적'}
          data={countryList}
          selected={country}
          setSelected={setCountry}
          setModalVisible={setCountryModal}
        />
      </BottomSheetRegisterInfo2>

      <BottomSheetRegisterInfo2
        show={jobTypeModal}
        onDismiss={() => {
          setJobTypeModal(false);
        }}
        enableBackDropDismiss>
        <BottomSheetChildrenComponent
          title={'직종 분류'}
          data={jobList}
          selected={jobType}
          setSelected={handleSelectJobType}
          jobList={jobList}
          setModalVisible={setJobTypeModal}
        />
      </BottomSheetRegisterInfo2>

      <BottomSheetRegisterInfo2
        show={detailJobTypeModal}
        onDismiss={() => {
          setDetailJobTypeModal(false);
        }}
        enableBackDropDismiss>
        <BottomSheetChildrenComponent
          title={'상세 직종'}
          data={detailJobList}
          selected={detailJobType}
          setSelected={setDetailJobType}
          setModalVisible={setDetailJobTypeModal}
        />
      </BottomSheetRegisterInfo2>
      <ModalCalendar
        modalVisible={birthdayModal}
        setModalVisible={setBirthdayModal}
        calendarProps={{
          selected: birthdayDateFormat,

          onChange: handleOnChangeDate,

          confirm: handleConfirmPress,

          setModal: setBirthdayModal,

          setSelected: setBirthdayDateFormat,
        }}></ModalCalendar>
    </Container>
  );
};
export default Pages;

const Container = styled.View`
  flex: 1;
  padding: 0px 24px;
  align-items: center;
  background-color: #ffffff;
`;

const ContentContainer = styled.View`
  flex: 1;
  width: 100%;

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
      `;
    }
  }}

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonNext = styled(Button)``;

const Wrap1 = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Wrap2 = styled.View`
  width: 50%;
  display: flex;
  flex-direction: column-reverse;
`;

const BottomSheetChildrenComponent = ({
  title,
  data,
  setSelected,
  setModalVisible,
  selected,
}) => {
  return (
    <>
      <>
        <BottomSheetTitleView>
          <BottomSheetTitle>{title}</BottomSheetTitle>
          {/* {false && <BottomSheetDecs>랄랄라</BottomSheetDecs>} */}
        </BottomSheetTitleView>

        <FlatList
          data={data}
          scrollEnabled={true}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ContentItemContainer
              onPress={() => {
                setSelected(item.id);

                setTimeout(() => {
                  setModalVisible(false);
                }, 250);
              }}>
              {selected === item.id ? (
                <ContentItemBox>
                  <ContentItemText>{item.text}</ContentItemText>
                  <CheckedIcon />
                </ContentItemBox>
              ) : (
                <ContentItemText>{item.text}</ContentItemText>
              )}
            </ContentItemContainer>
          )}
        />
      </>
    </>
  );
};

const BottomSheetTitleView = styled.View`
  width: 100%;
  padding: 0px 24px;
`;
const BottomSheetTitle = styled(Typography).attrs({text: 'Title03SB'})`
  margin-bottom: 6px;
`;

const BottomSheetDecs = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const ContentItemContainer = styled.Pressable`
  width: ${Dimensions.get('screen').width}px;
  height: 60px;
  padding: 19px 24px;
  padding-left: 40px;
`;

const ContentItemBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ContentItemText = styled(Typography).attrs({text: 'Body05R'})``;
