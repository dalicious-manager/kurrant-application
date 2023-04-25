import {Dimensions, Text, View} from 'react-native';
import styled from 'styled-components';

import Button from '../../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import ProgressBar from '~components/ProgressBar7';

import {PAGE_NAME as RegisterInfoFinishPageName} from '../../Finish';
import {PAGE_NAME as RegisterInfoPage9PageName} from '../Page9';

import useGetRegisterInfo from '../../../../biz/useRegisterInfo/getRegisterIist/hook';

import {finalRegisterAtom} from '../../store';
import {useAtom} from 'jotai';
import {makeUnselectedFoodIdList} from '../logic';

import TitleBox from '../components/TitleBox';
import ImageBox from '../components/ImageBox.jsx/ImageBox';
import {selectedFoodIdPage8Atom, unselectedFoodIdPage8Atom} from '../store';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import NoPhotosSign from '../components/NoPhotosSign/NoPhotosSign';
import BottomModal from '~components/BottomModal';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE8';

const Pages = () => {
  const [finalRegister, setFinalRegister] = useAtom(finalRegisterAtom);
  const [clickAvaliable, setClickAvaliable] = useState(false);

  const {getFoodImageList, foodImageListPage8} = useGetRegisterInfo();

  const [selectedFoodIdPage8, setSelectedFoodIdPage8] = useAtom(
    selectedFoodIdPage8Atom,
  );

  useEffect(() => {
    getFoodImageList();
  }, []);

  // 뒤로 돌아올떄 체크된 그림들 다시 보이게 하기

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (selectedFoodIdPage8.length >= 3) {
      setClickAvaliable(true);
    } else {
      setClickAvaliable(false);
    }
  }, [selectedFoodIdPage8]);

  const navigation = useNavigation();

  const handlePress = () => {
    // page7일떄, page8일떄
    // selecteedIdList비우기, final에 데이터 집어넣기, 다음 컴포넌트로 넘어가기

    const unselectedList = makeUnselectedFoodIdList(
      selectedFoodIdPage8,
      foodImageListPage8,
    );

    setFinalRegister({
      ...finalRegister,

      userSelectTestDataList: [
        ...finalRegister.userSelectTestDataList,
        {
          selectedFoodId: selectedFoodIdPage8.join(','),
          unselectedFoodId: unselectedList.join(','),
        },
      ],
    });

    navigation.navigate(RegisterInfoPage9PageName);
  };

  // ui가 없을 경우 3초정도 skieleton을 보여주고 없다고 얘기해야 된다

  const [isDataListNull, setIsDataListNull] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsDataListNull(true);
    }, 3000);
  }, []);

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
      <ScrollViewContainer showsVerticalScrollIndicator={false}>
        <ProgressBar progress={7} />
        <TitleBox
          num={2}
          title={`아래 음식 중 마음에 드는 \n음식 3개를 선택해 주세요`}
        />
        {Array.isArray(foodImageListPage8) && foodImageListPage8.length > 0 ? (
          <ImageBox
            selectLimit={3}
            foodImageList={foodImageListPage8}
            selectedIdList={selectedFoodIdPage8}
            setSelectedIdList={setSelectedFoodIdPage8}
            callbackWhenOverSelected={() => {
              setModalVisible(true);
            }}
          />
        ) : isDataListNull ? (
          <NoPhotosSign />
        ) : (
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

      <BottomModal
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
  /* padding: 35px 20px; */
  /* padding: 15px 20px; */
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
  bottom: 35px;
`;

const SkeletonWrap = styled.View``;
