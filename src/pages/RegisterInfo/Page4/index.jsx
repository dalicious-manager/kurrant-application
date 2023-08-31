import {Dimensions, FlatList, Text} from 'react-native';
import styled, {css} from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import ProgressBar from '~components/ProgressBar7';
import Typography from '~components/Typography';

import {PAGE_NAME as RegisterInfoPage5PageName} from '../Page5';

import {finalRegisterAtom} from '../store';
import {useAtom} from 'jotai';
import YesOrNoButton from '../components/button/Page4_5/YesOrNoButton';
import SelectInputBox from '../components/SelectInputBox/SelectInputBox';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheetRegisterInfo2 from '../../../components/BottomSheetRegisterInfo2/component';
import CheckedIcon from '../../../assets/icons/BottomSheet/Checked.svg';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE4';

const dataList = [
  {id: 1, text: '비건'},
  {id: 2, text: '락토 베지터리언'},
  {id: 3, text: '오보 베지테리언'},
  {id: 4, text: '락토 오보 베지테리언'},
  {id: 5, text: '페스코 베지테리언'},
  {id: 6, text: '폴로 베지테리언'},
  {id: 7, text: '플렉시테리언'},
];

const Pages = () => {
  const [clickAvaliable, setClickAvaliable] = useState(false);

  const [finalRegister, setFinalRegister] = useAtom(finalRegisterAtom);

  const [yesOrNo, setYesOrNo] = useState(0);

  const [veganLevel, setBeganLevel] = useState(undefined);

  const [bottomModalOpen, setBottomModalOpen] = useState(false);

  const [showVeganSelect, setShowVeganSelect] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (yesOrNo === 1) {
      setShowVeganSelect(true);
    } else {
      setShowVeganSelect(false);
    }
  }, [yesOrNo, setBottomModalOpen, setShowVeganSelect]);

  useEffect(() => {
    if (yesOrNo === 2) {
      setClickAvaliable(true);
    } else {
      if (veganLevel) {
        setClickAvaliable(true);
      } else {
        setClickAvaliable(false);
      }
    }
  }, [yesOrNo, setClickAvaliable, veganLevel]);

  const handleSelectBottomModal = id => {
    setBeganLevel(id);
  };

  const handlePress = () => {
    if (yesOrNo === 2) {
      setFinalRegister({
        ...finalRegister,
        isVegan: false,
        veganLevel: 0,
      });
    } else {
      setFinalRegister({
        ...finalRegister,
        isVegan: yesOrNo === 1 ? true : false,
        veganLevel: veganLevel,
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

        {showVeganSelect && (
          <Wrap3>
            <SelectInputBox
              placeholder={'채식 정보 입력'}
              value={veganLevel}
              convertData={dataList}
              setValue={setBeganLevel}
              buttonOnClickCallback={() => {
                setBottomModalOpen(true);
              }}
            />
            <VegiInfoImg
              source={require('../../../assets/images/RegisterInfo/VegiTypeInfo.png')}
              resizeMode="contain"
            />
          </Wrap3>
        )}
        <Filler />
      </ScrollViewContainer>
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
        show={bottomModalOpen}
        onDismiss={() => {
          setBottomModalOpen(false);
        }}
        enableBackDropDismiss>
        <BottomSheetChildrenComponent
          title={'채식 정보 입력'}
          data={dataList}
          selected={veganLevel}
          setSelected={handleSelectBottomModal}
          setModalVisible={setBottomModalOpen}
        />
      </BottomSheetRegisterInfo2>
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

const ScrollViewContainer = styled.ScrollView`
  width: 100%;

  background-color: #ffffff;
`;

const Wrap3 = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Filler = styled.View`
  width: 100%;
  height: 40px;
`;

const VegiInfoImg = styled.Image`
  width: 100%;
  height: ${() => `${(Dimensions.get('screen').width - 48) * (336 / 327)}px`};
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
  margin-bottom: 45px;
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
