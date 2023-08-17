import {Text, View} from 'react-native';
import styled, {css} from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import ProgressBar from '~components/ProgressBar7';

import {PAGE_NAME as RegisterInfoPage3PageName} from '../Page3';
import {finalRegisterAtom} from '../store';
import {useAtom} from 'jotai';
import Typography from '~components/Typography';
import ButtonContainer from '../components/button/Page2_3/ButtonContainer';
import useGetRegisterInfo from '../../../biz/useRegisterInfo/getRegisterIist/hook';

import BottomModalWithHalfButton from '~components/BottomModalWithHalfButton';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import LinearGradient from 'react-native-linear-gradient';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE2';

const Pages = () => {
  const [clickAvaliable, setClickAvaliable] = useState(false);

  const [finalRegister, setFinalRegister] = useAtom(finalRegisterAtom);

  const {getCountryFoodList, isGetCountryFoodLoading, countryFoodList} =
    useGetRegisterInfo();

  useEffect(() => {
    getCountryFoodList();
  }, []);

  const navigation = useNavigation();

  const [page2Input, setPage2Input] = useState([]);
  // alertModal 4개 이상 선택하려고 하면 하지마라고 알려주기
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (page2Input.length > 0 && page2Input.length <= 4) {
      setClickAvaliable(true);
    } else {
      setClickAvaliable(false);
    }
  }, [page2Input]);

  const handlePress = () => {
    setFinalRegister({
      ...finalRegister,
      favoriteCountryFood: page2Input.join(','),
    });

    navigation.navigate(RegisterInfoPage3PageName);
  };

  const handleButtonClicked = list => {
    setPage2Input([...list]);
  };

  return (
    <Container
      paddingHorizontal={20}
      styles={{
        position: 'relative',
      }}>
      <ScrollViewContainer showsVerticalScrollIndicator={false}>
        <ProgressBar progress={2} />

        <TitleWrap>
          <Title>좋아하는 나라 음식</Title>
          <SemiTitle>최대 4개까지 선택이 가능해요</SemiTitle>
        </TitleWrap>

        {isGetCountryFoodLoading ? (
          <SkeletonWrap>
            <SkeletonPlaceholder
              borderRadius={4}
              flex={1}
              backgroundColor={'white'}>
              <SkeletonPlaceholder.Item
                marginLeft={24}
                marginRight={24}
                borderRadius={14}>
                <View style={{flexDirection: 'row'}}>
                  <SkeletonPlaceholder.Item
                    width={80}
                    height={40}
                    borderRadius={14}
                    marginTop={6}
                    marginBottom={6}
                    marginRight={4}
                    // marginLeft={4}
                  />
                  <SkeletonPlaceholder.Item
                    width={100}
                    height={40}
                    borderRadius={14}
                    marginTop={6}
                    marginBottom={6}
                    marginRight={4}
                    marginLeft={4}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <SkeletonPlaceholder.Item
                    width={110}
                    height={40}
                    borderRadius={14}
                    marginTop={6}
                    marginBottom={6}
                    marginRight={4}
                    // marginLeft={4}
                  />
                  <SkeletonPlaceholder.Item
                    width={70}
                    height={40}
                    borderRadius={14}
                    marginTop={6}
                    marginBottom={6}
                    marginRight={4}
                    marginLeft={4}
                  />
                  <SkeletonPlaceholder.Item
                    width={100}
                    borderRadius={14}
                    height={40}
                    marginTop={6}
                    marginBottom={6}
                    // marginRight={4}
                    marginLeft={4}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <SkeletonPlaceholder.Item
                    width={60}
                    height={40}
                    borderRadius={14}
                    marginTop={6}
                    marginBottom={6}
                    marginRight={4}
                    // marginLeft={4}
                  />
                  <SkeletonPlaceholder.Item
                    width={80}
                    height={40}
                    borderRadius={14}
                    marginTop={6}
                    marginBottom={6}
                    marginRight={4}
                    marginLeft={4}
                  />
                  <SkeletonPlaceholder.Item
                    width={80}
                    borderRadius={14}
                    height={40}
                    marginTop={6}
                    marginBottom={6}
                    // marginRight={4}
                    marginLeft={4}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <SkeletonPlaceholder.Item
                    width={60}
                    height={40}
                    borderRadius={14}
                    marginTop={6}
                    marginBottom={6}
                    marginRight={4}
                    // marginLeft={4}
                  />
                  <SkeletonPlaceholder.Item
                    width={60}
                    height={40}
                    borderRadius={14}
                    marginTop={6}
                    marginBottom={6}
                    marginRight={4}
                    marginLeft={4}
                  />
                  <SkeletonPlaceholder.Item
                    width={80}
                    borderRadius={14}
                    height={40}
                    marginTop={6}
                    marginBottom={6}
                    marginRight={4}
                    marginLeft={4}
                  />
                  <SkeletonPlaceholder.Item
                    width={100}
                    borderRadius={14}
                    height={40}
                    marginTop={6}
                    marginBottom={6}
                    // marginRight={4}
                    marginLeft={4}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <SkeletonPlaceholder.Item
                    width={200}
                    height={40}
                    borderRadius={14}
                    marginTop={6}
                    marginBottom={6}
                    marginRight={4}
                    // marginLeft={4}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <SkeletonPlaceholder.Item
                    width={200}
                    height={40}
                    borderRadius={14}
                    marginTop={6}
                    marginBottom={6}
                    marginRight={4}
                    // marginLeft={4}
                  />
                </View>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </SkeletonWrap>
        ) : (
          <ButtonContainer
            dataList={countryFoodList}
            callback={handleButtonClicked}
            selectLimit={4}
            callbackWhenOverSelected={() => {
              setModalVisible(true);
            }}
          />
        )}
      </ScrollViewContainer>

      <BottomModalWithHalfButton
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="4개 국가까지만 선택 가능합니다"
        description={' '}
        halfButtonTitle="확인"
        halfButtonType="yellow"
        onPressEventHalf={() => setModalVisible(false)}
      />

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
    </Container>
  );
};
export default Pages;

const Container = styled.View`
  flex: 1;

  padding: 15px 20px;
  padding-bottom: 0px;
  position: relative;
  align-items: center;
  background-color: #ffffff;
`;

const ScrollViewContainer = styled.ScrollView`
  width: 100%;

  background-color: #ffffff;
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

const SkeletonWrap = styled.View``;

const RowView = styled.View`
  display: flex;
  flex-direction: row;
  border: 1px solid black;
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

const sampleDataList = [
  {id: 1, name: '한국'},
  {id: 2, name: '중국'},
  {id: 3, name: '인도네시아'},
  {id: 4, name: '한국'},
  {id: 5, name: '중국s'},
  {id: 6, name: '인도네아'},
  {id: 7, name: '인도sss네시아'},
  {id: 8, name: '한'},
  {id: 9, name: '중s국s'},
  {id: 10, name: '인도네아'},
];
