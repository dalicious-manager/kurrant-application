import {Dimensions, Platform, Text, View} from 'react-native';
import styled, {css} from 'styled-components';

import Button from '../../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import ProgressBar from '~components/ProgressBar7';

import {PAGE_NAME as RegisterInfoPage8PageName} from '../Page8';

import useGetRegisterInfo from '../../../../biz/useRegisterInfo/getRegisterIist/hook';

import {finalRegisterAtom} from '../../store';
import {useAtom} from 'jotai';
import {makeUnselectedFoodIdList} from '../logic';

import TitleBox from '../components/TitleBox';
import ImageBox from '../components/ImageBox.jsx/ImageBox';
import {selectedFoodIdPage7Atom, unselectedFoodIdPage7Atom} from '../store';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import NoPhotosSign from '../components/NoPhotosSign/NoPhotosSign';

import BottomModalWithHalfButton from '~components/BottomModalWithHalfButton';
import LinearGradient from 'react-native-linear-gradient';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE7';

const Pages = () => {
  const [finalRegister, setFinalRegister] = useAtom(finalRegisterAtom);
  const [clickAvaliable, setClickAvaliable] = useState(false);

  const {getFoodImageList, foodImageListPage7, isGetFoodImageLoading} =
    useGetRegisterInfo();

  const [selectedFoodIdPage7, setSelectedFoodIdPage7] = useAtom(
    selectedFoodIdPage7Atom,
  );

  useEffect(() => {
    getFoodImageList();
  }, []);

  // 뒤로 돌아올떄 체크된 그림들 다시 보이게 하기

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (selectedFoodIdPage7.length >= 3) {
      setClickAvaliable(true);
    } else {
      setClickAvaliable(false);
    }
  }, [selectedFoodIdPage7]);

  const navigation = useNavigation();

  const handlePress = () => {
    const unselectedList = makeUnselectedFoodIdList(
      selectedFoodIdPage7,
      foodImageListPage7,
    );

    setFinalRegister({
      ...finalRegister,

      userSelectTestDataList: [
        {
          selectedFoodId: selectedFoodIdPage7.join(','),
          unselectedFoodId: unselectedList.join(','),
        },
      ],
    });

    navigation.navigate(RegisterInfoPage8PageName);
  };

  // skeleton ui 네모

  const skeletonUIImageWidth =
    (Dimensions.get('screen').width - 2 * 24 - 26) / 3;
  const skeletonBorderRadius = 7;

  return (
    <Container
      paddingHorizontal={24}
      styles={{
        position: 'relative',
      }}>
      <ScrollViewWrapper>
        <ScrollViewContainer showsVerticalScrollIndicator={false}>
          <ProgressBar progress={7} />
          <TitleBox
            num={1}
            title={`아래 음식 중 마음에 드는 \n음식 3개를 선택해 주세요`}
          />

          {isGetFoodImageLoading ? (
            <SkeletonWrap>
              <SkeletonPlaceholder
                borderRadius={4}
                flex={1}
                backgroundColor={'white'}>
                <SkeletonPlaceholder.Item>
                  <View style={{flexDirection: 'row'}}>
                    <SkeletonPlaceholder.Item
                      width={skeletonUIImageWidth}
                      height={skeletonUIImageWidth}
                      borderRadius={skeletonBorderRadius}
                      marginBottom={13}
                      marginRight={6.5}
                      // marginLeft={6.5}
                    />
                    <SkeletonPlaceholder.Item
                      width={skeletonUIImageWidth}
                      height={skeletonUIImageWidth}
                      borderRadius={skeletonBorderRadius}
                      marginBottom={13}
                      marginRight={6.5}
                      marginLeft={6.5}
                    />
                    <SkeletonPlaceholder.Item
                      width={skeletonUIImageWidth}
                      height={skeletonUIImageWidth}
                      borderRadius={skeletonBorderRadius}
                      marginBottom={13}
                      // marginRight={6.5}
                      marginLeft={6.5}
                    />
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <SkeletonPlaceholder.Item
                      width={skeletonUIImageWidth}
                      height={skeletonUIImageWidth}
                      borderRadius={skeletonBorderRadius}
                      marginBottom={13}
                      marginRight={6.5}
                      // marginLeft={6.5}
                    />
                    <SkeletonPlaceholder.Item
                      width={skeletonUIImageWidth}
                      height={skeletonUIImageWidth}
                      borderRadius={skeletonBorderRadius}
                      marginBottom={13}
                      marginRight={6.5}
                      marginLeft={6.5}
                    />
                    <SkeletonPlaceholder.Item
                      width={skeletonUIImageWidth}
                      height={skeletonUIImageWidth}
                      borderRadius={skeletonBorderRadius}
                      marginBottom={13}
                      // marginRight={6.5}
                      marginLeft={6.5}
                    />
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <SkeletonPlaceholder.Item
                      width={skeletonUIImageWidth}
                      height={skeletonUIImageWidth}
                      borderRadius={skeletonBorderRadius}
                      marginBottom={13}
                      marginRight={6.5}
                      // marginLeft={6.5}
                    />
                    <SkeletonPlaceholder.Item
                      width={skeletonUIImageWidth}
                      height={skeletonUIImageWidth}
                      borderRadius={skeletonBorderRadius}
                      marginBottom={13}
                      marginRight={6.5}
                      marginLeft={6.5}
                    />
                    <SkeletonPlaceholder.Item
                      width={skeletonUIImageWidth}
                      height={skeletonUIImageWidth}
                      borderRadius={skeletonBorderRadius}
                      marginBottom={13}
                      // marginRight={6.5}
                      marginLeft={6.5}
                    />
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <SkeletonPlaceholder.Item
                      width={skeletonUIImageWidth}
                      height={skeletonUIImageWidth}
                      borderRadius={skeletonBorderRadius}
                      marginBottom={13}
                      marginRight={6.5}
                      // marginLeft={6.5}
                    />
                    <SkeletonPlaceholder.Item
                      width={skeletonUIImageWidth}
                      height={skeletonUIImageWidth}
                      borderRadius={skeletonBorderRadius}
                      marginBottom={13}
                      marginRight={6.5}
                      marginLeft={6.5}
                    />
                    <SkeletonPlaceholder.Item
                      width={skeletonUIImageWidth}
                      height={skeletonUIImageWidth}
                      borderRadius={skeletonBorderRadius}
                      marginBottom={13}
                      // marginRight={6.5}
                      marginLeft={6.5}
                    />
                  </View>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            </SkeletonWrap>
          ) : Array.isArray(foodImageListPage7) &&
            foodImageListPage7.length > 0 ? (
            <>
              <ImageBox
                selectLimit={3}
                foodImageList={foodImageListPage7}
                selectedIdList={selectedFoodIdPage7}
                setSelectedIdList={setSelectedFoodIdPage7}
                callbackWhenOverSelected={() => {
                  setModalVisible(true);
                }}
              />
              <Filler />
            </>
          ) : (
            <NoPhotosSign />
          )}
        </ScrollViewContainer>
      </ScrollViewWrapper>

      <ButtonWrapper
        colors={[
          'rgba(255, 255, 255, 0)',
          'rgba(255, 255, 255, 0.3)',
          'rgba(255, 255, 255, 0.7)',
          'rgba(255, 255, 255, 0.8048)',
          'rgba(255, 255, 255, 0.9)',
          'rgba(255, 255, 255, 0.95)',
        ]}
        useAngle={true}
        angle={180}>
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

      <BottomModalWithHalfButton
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="3개까지만 선택 가능합니다"
        description={' '}
        halfButtonTitle="확인"
        halfButtonType="yellow"
        onPressEventHalf={() => setModalVisible(false)}
      />
    </Container>
  );
};
export default Pages;

const Container = styled.View`
  flex: 1;

  align-items: center;
  background-color: #ffffff;
  position: relative;
`;

const ScrollViewWrapper = styled.View`
  height: 100%;
`;

const ScrollViewContainer = styled.ScrollView`
  width: 100%;

  background-color: #ffffff;
`;

const SkeletonWrap = styled.View``;

const Filler = styled.View`
  width: 100%;

  ${() => {
    if (Platform.OS === 'ios') {
      return css`
        height: 100px;
      `;
    } else {
      return css`
        height: 86px;
      `;
    }
  }}
`;

const ButtonWrapper = styled(LinearGradient)`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;

  bottom: 0px;

  ${() => {
    if (Platform.OS === 'ios') {
      return css`
        height: 91px;
        padding-bottom: 35px;
      `;
    } else {
      return css`
        height: 80px;
        padding-bottom: 24px;
      `;
    }
  }}
`;

const ButtonNext = styled(Button)``;
