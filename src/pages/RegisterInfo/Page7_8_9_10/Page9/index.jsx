import {Dimensions, Text, View} from 'react-native';
import styled from 'styled-components';

import Button from '../../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import ProgressBar from '~components/ProgressBar7';

import {PAGE_NAME as RegisterInfoFinishPageName} from '../../Finish';
import {PAGE_NAME as RegisterInfoPage10PageName} from '../Page10';

import useGetRegisterInfo from '../../../../biz/useRegisterInfo/getRegisterIist/hook';

import {finalRegisterAtom} from '../../store';
import {useAtom} from 'jotai';
import {makeUnselectedFoodIdList} from '../logic';

import TitleBox from '../components/TitleBox';
import ImageBox from '../components/ImageBox.jsx/ImageBox';
import {selectedFoodIdPage9Atom, unselectedFoodIdPage8Atom} from '../store';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import NoPhotosSign from '../components/NoPhotosSign/NoPhotosSign';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE9';

const Pages = () => {
  const [finalRegister, setFinalRegister] = useAtom(finalRegisterAtom);
  const [clickAvaliable, setClickAvaliable] = useState(false);

  const {getFoodImageList, foodImageListPage9} = useGetRegisterInfo();

  const [selectedFoodIdPage9, setSelectedFoodIdPage9] = useAtom(
    selectedFoodIdPage9Atom,
  );

  useEffect(() => {
    getFoodImageList();
  }, []);

  // 뒤로 돌아올떄 체크된 그림들 다시 보이게 하기

  useEffect(() => {
    if (selectedFoodIdPage9.length >= 3) {
      setClickAvaliable(true);
    } else {
      setClickAvaliable(false);
    }
  }, [selectedFoodIdPage9]);

  const navigation = useNavigation();

  // useEffect(() => {
  //   console.log(finalRegister);
  // }, [finalRegister]);

  const handlePress = () => {
    const unselectedList = makeUnselectedFoodIdList(
      selectedFoodIdPage9,
      foodImageListPage9,
    );

    setFinalRegister({
      ...finalRegister,

      userSelectTestDataList: [
        ...finalRegister.userSelectTestDataList,
        {
          selectedFoodId: selectedFoodIdPage9.join(','),
          unselectedFoodId: unselectedList.join(','),
        },
      ],
    });

    navigation.navigate(RegisterInfoPage10PageName);
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
          num={3}
          title={`아래 음식 중 마음에 드는 \n음식 3개를 선택해 주세요`}
        />

        {Array.isArray(foodImageListPage9) && foodImageListPage9.length > 0 ? (
          <ImageBox
            selectLimit={3}
            foodImageList={foodImageListPage9}
            selectedIdList={selectedFoodIdPage9}
            setSelectedIdList={setSelectedFoodIdPage9}
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
          // <Text>선택 가능한 음식 사진이 없습니다 관리자에게 문의해주세요</Text>
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
