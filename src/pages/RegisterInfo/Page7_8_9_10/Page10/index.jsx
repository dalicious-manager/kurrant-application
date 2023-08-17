import {Dimensions, Platform, Text, View} from 'react-native';
import styled, {css} from 'styled-components';

import Button from '../../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import ProgressBar from '~components/ProgressBar7';

import {PAGE_NAME as RegisterInfoFinishPageName} from '../../Finish';

import useGetRegisterInfo from '../../../../biz/useRegisterInfo/getRegisterIist/hook';

import {finalRegisterAtom} from '../../store';
import {useAtom} from 'jotai';
import {makeUnselectedFoodIdList} from '../logic';

import TitleBox from '../components/TitleBox';
import ImageBox from '../components/ImageBox.jsx/ImageBox';

import {selectedFoodIdPage10Atom} from '../store';
import useUpdateRegisterInfo from '../../../../biz/useRegisterInfo/useUpdateRegisterInfo/hook';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import NoPhotosSign from '../components/NoPhotosSign/NoPhotosSign';

import BottomModalWithHalfButton from '~components/BottomModalWithHalfButton';
import LinearGradient from 'react-native-linear-gradient';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE10';

const Pages = () => {
  const [finalRegister, setFinalRegister] = useAtom(finalRegisterAtom);
  const [clickAvaliable, setClickAvaliable] = useState(false);

  const {getFoodImageList, foodImageListPage10} = useGetRegisterInfo();

  const {isUpdateLoading, updateRegisterInfo} = useUpdateRegisterInfo();

  /// 최종 제풀

  const [selectedFoodIdPage10, setSelectedFoodIdPage10] = useAtom(
    selectedFoodIdPage10Atom,
  );

  useEffect(() => {
    getFoodImageList();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  // 뒤로 돌아올떄 체크된 그림들 다시 보이게 하기

  useEffect(() => {
    if (selectedFoodIdPage10.length >= 3) {
      setClickAvaliable(true);
    } else {
      setClickAvaliable(false);
    }
  }, [selectedFoodIdPage10]);

  const navigation = useNavigation();

  const handlePress = async () => {
    const unselectedList = makeUnselectedFoodIdList(
      selectedFoodIdPage10,
      foodImageListPage10,
    );

    // 최종 제출

    await updateRegisterInfo({
      ...finalRegister,

      userSelectTestDataList: [
        ...finalRegister.userSelectTestDataList,
        {
          selectedFoodId: selectedFoodIdPage10.join(','),
          unselectedFoodId: unselectedList.join(','),
        },
      ],
    });

    // 아래와 같이 보내면 성공된다

    // const response = await updateRegisterInfo(
    //   {
    //     drinkCount: 1,
    //     breakfastCount: 0,
    //     midnightSnackCount: 1,
    //     exerciseCount: 1,
    //     favoriteCountryFood: '한국,일본,스페인',
    //     allergyInfo: '우유,밀,새우',
    //     allergyInfoEtc: 'Sdsdg',
    //     isVegan: true,
    //     veganLevel: 2,
    //     isProtein: true,
    //     proteinFrequency: 2,
    //     userDefaultInfo: {
    //       birthYear: '2022',
    //       birthMonth: '04',
    //       birthDay: '24',
    //       gender: 1,
    //       country: '대한민국',
    //       jobType: '경영·사무·금융·보험직',
    //       detailJobType: '경영',
    //     },
    //     userSelectTestDataList: [
    //       {
    //         selectedFoodId: '1,2,3',
    //         unselectedFoodId: '',
    //       },
    //       {
    //         selectedFoodId: '1,2,3',
    //         unselectedFoodId: '',
    //       },
    //       {
    //         selectedFoodId: '1,2,3',
    //         unselectedFoodId: '',
    //       },
    //       {
    //         selectedFoodId: '1,2,3',
    //         unselectedFoodId: '',
    //       },
    //     ],
    //   },
    //   {},
    // );

    //
    const succeeded = {
      allergyInfo: '우유,복숭아',
      allergyInfoEtc: '나 까다로운 사람이야~!',
      veganLevel: 3,
      breakfastCount: 3,
      drinkCount: 1,
      exerciseCount: 1,
      favoriteCountryFood: '중국',
      isVegan: true,
      isProtein: true,
      midnightSnackCount: 1,
      proteinFrequency: 2,
      userDefaultInfo: {
        birthDay: '17',
        birthMonth: '08',
        birthYear: '1993',
        country: '대한민국',
        detailJobType: '경영',
        gender: 1,
        jobType: '경영·사무·금융·보험직',
      },
      userSelectTestDataList: [
        {
          selectedFoodId: '1,2,4',
          unselectedFoodId: '3,5,6,7,8,9,10,11,12,13,14',
        },
        {selectedFoodId: '6,11,24', unselectedFoodId: '5,10'},
        {selectedFoodId: '3,8,6', unselectedFoodId: '4,5,9'},
      ],
    };
    //
    const failed = {
      allergyInfo: '',
      veganLevel: 0,
      breakfastCount: 0,
      drinkCount: 1,
      exerciseCount: 1,
      favoriteCountryFood: '한국',
      isVegan: false,
      isProtein: false,
      midnightSnackCount: 1,
      proteinFrequency: 0,
      userDefaultInfo: {
        birthDay: '17',
        birthMonth: '08',
        birthYear: '1998',
        country: '대한민국',
        detailJobType: '공학기술',
        gender: 1,
        jobType: '경영·사무·금융·보험직',
      },
      userSelectTestDataList: [
        {
          selectedFoodId: '1,2,4',
          unselectedFoodId: '3,5,6,7,8,9,10,11,12,13,14',
        },
        {selectedFoodId: '5,11,6', unselectedFoodId: '10,24'},
        {selectedFoodId: '4,6,8', unselectedFoodId: '3,5,9'},
        {selectedFoodId: '9,10,11', unselectedFoodId: '8,19'},
      ],
    };

    const failed2 = {
      allergyInfo: '',
      veganLevel: 0,
      breakfastCount: 1,
      drinkCount: 1,
      exerciseCount: 1,
      favoriteCountryFood: '중국',
      isVegan: false,
      isProtein: false,
      midnightSnackCount: 0,
      proteinFrequency: 0,
      userDefaultInfo: {
        birthDay: '17',
        birthMonth: '08',
        birthYear: '2007',
        country: '대한민국',
        detailJobType: '공학기술',
        gender: 1,
        jobType: '경영·사무·금융·보험직',
      },
      userSelectTestDataList: [
        {
          selectedFoodId: '1,5,7',
          unselectedFoodId: '2,3,4,6,8,9,10,11,12,13,14',
        },
        {selectedFoodId: '5,10,24', unselectedFoodId: '6,11'},
        {selectedFoodId: '3,4,8', unselectedFoodId: '5,6,9'},
        {selectedFoodId: '8,9,11', unselectedFoodId: '10,19'},
      ],
    };

    navigation.navigate(RegisterInfoFinishPageName);
  };

  const [isDataListNull, setIsDataListNull] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsDataListNull(true);
    }, 3000);
  }, []);

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
          num={4}
          title={`아래 음식 중 마음에 드는 \n음식 3개를 선택해 주세요`}
        />

        {Array.isArray(foodImageListPage10) &&
        foodImageListPage10.length > 0 ? (
          <ImageBox
            selectLimit={3}
            foodImageList={foodImageListPage10}
            selectedIdList={selectedFoodIdPage10}
            setSelectedIdList={setSelectedFoodIdPage10}
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
`;

const ScrollViewContainer = styled.ScrollView`
  width: 100%;
  background-color: #ffffff;
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

const SkeletonWrap = styled.View``;
