import styled, {css} from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import ProgressBar from '~components/ProgressBar7';

import {PAGE_NAME as RegisterInfoPage4PageName} from '../Page4';
import {finalRegisterAtom} from '../store';
import {useAtom} from 'jotai';
import Typography from '~components/Typography';
import ButtonContainer from '../components/button/Page2_3/ButtonContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dimensions, Platform, View} from 'react-native';
import useGetRegisterInfo from '../../../biz/useRegisterInfo/getRegisterIist/hook';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import useKeyboardEvent from '../../../hook/useKeyboardEvent';
import LinearGradient from 'react-native-linear-gradient';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE3';

const Pages = () => {
  const [finalRegister, setFinalRegister] = useAtom(finalRegisterAtom);

  const [value, setValue] = useState(undefined);

  const keyboardStatus = useKeyboardEvent();

  const navigation = useNavigation();

  const {getAlergyList, isGetAlergyLoading, alergyList} = useGetRegisterInfo();

  useEffect(() => {
    getAlergyList();
  }, []);

  const [page3Input, setPage2Input] = useState([]);

  const handlePress = () => {
    // 기타 내용이 있을경우 없을 경우

    if (!value) {
      setFinalRegister({
        ...finalRegister,
        allergyInfo: page3Input.join(','),
      });
    } else {
      setFinalRegister({
        ...finalRegister,
        allergyInfo: page3Input.join(','),
        allergyInfoEtc: value,
      });
    }

    navigation.navigate(RegisterInfoPage4PageName);
  };

  const handleButtonClicked = list => {
    setPage2Input([...list]);
  };

  return (
    <Container>
      <KeyboardViewContainer showsVerticalScrollIndicator={false}>
        <ViewContainer>
          <ProgressBar progress={3} />

          <TitleWrap>
            <Title>알러지 정보</Title>
            <SemiTitle>복수선택이 가능해요</SemiTitle>
          </TitleWrap>
          {isGetAlergyLoading ? (
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
                      width={100}
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
              dataList={alergyList}
              callback={handleButtonClicked}
              marginBottom={'24px'}
              marginLeft={'5px'}
            />
          )}

          <InputWrap>
            <InputTitle>기타 내용(선택)</InputTitle>

            <Input
              style={{
                textAlignVertical: 'top',
              }}
              value={value}
              onChangeText={setValue}
              multiline
              numberOfLines={20}
              placeholder={'추가적으로 다른 알러지가 있다면 알려주세요!'}
            />
          </InputWrap>
        </ViewContainer>
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
          label="다음"
          text={'BottomButtonSB'}
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
  padding: 0px 12px;
  align-items: center;
  background-color: #ffffff;
`;

const KeyboardViewContainer = styled(KeyboardAwareScrollView)`
  background-color: #ffffff;
  position: relative;
`;

const ViewContainer = styled.View`
  width: 100%;

  background-color: #ffffff;

  margin-bottom: 70px;
`;

const SkeletonWrap = styled.View``;

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
  margin-left: 5px;
  width: 100%;
  margin-top: 29px;
  margin-bottom: 24px;
`;
const InputWrap = styled.View`
  margin-left: 5px;
  margin-right: 5px;
`;
const InputTitle = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 8px;
`;
const Input = styled.TextInput`
  border: 1px solid ${props => props.theme.colors.grey[7]};
  padding: 17px 20px;
  height: 168px;
  border-radius: 14px;
`;

const Title = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 8px;
`;
const SemiTitle = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;
