import {Text} from 'react-native';
import styled from 'styled-components';

import Button from '../../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import ProgressBar from '~components/ProgressBar7';

import {PAGE_NAME as RegisterInfoFinishPageName} from '../../Finish';
// import {PAGE_NAME as RegisterInfoPage10PageName} from '../Page10';

import useGetRegisterInfo from '../../../../biz/useRegisterInfo/getRegisterIist/hook';

import {finalRegisterAtom} from '../../store';
import {useAtom} from 'jotai';
import {getUnselectedFoodIdList} from '../logic';

import TitleBox from '../components/TitleBox';
import ImageBox from '../components/ImageBox.jsx/ImageBox';

import {
  selectedFoodIdPage10Atom,
  selectedFoodIdPage7Atom,
  selectedFoodIdPage8Atom,
  selectedFoodIdPage9Atom,
  unselectedFoodIdPage7Atom,
  unselectedFoodIdPage8Atom,
  unselectedFoodIdPage9Atom,
} from '../store';
import useUpdateRegisterInfo from '../../../../biz/useRegisterInfo/useUpdateRegisterInfo/hook';

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

  // 뒤로 돌아올떄 체크된 그림들 다시 보이게 하기

  // useEffect(() => {
  //   console.log(selectedFoodIdPage10);
  // }, [selectedFoodIdPage10]);

  useEffect(() => {
    if (selectedFoodIdPage10.length >= 3) {
      setClickAvaliable(true);
    } else {
      setClickAvaliable(false);
    }
  }, [selectedFoodIdPage10]);

  const navigation = useNavigation();

  // useEffect(() => {
  //   console.log(finalRegister);
  // }, [finalRegister]);

  const handlePress = async () => {
    // const handlePress = () => {
    // page7일떄, page8일떄
    // selecteedIdList비우기, final에 데이터 집어넣기, 다음 컴포넌트로 넘어가기

    const unselectedList = getUnselectedFoodIdList(
      selectedFoodIdPage10,
      foodImageListPage10,
    );

    // 최종 제출

    console.log('최종 제출 확인하기');

    console.log({
      ...finalRegister,

      userSelectTestDataList: [
        ...finalRegister.userSelectTestDataList,
        {
          selectedFoodId: selectedFoodIdPage10.join(','),
          unselectedFoodId: unselectedList.join(','),
        },
      ],
    });

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
    //     isBegan: true,
    //     beganLevel: 2,
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

    navigation.navigate(RegisterInfoFinishPageName);
  };

  //

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
          />
        ) : (
          <Text>선택 가능한 음식 사진이 없습니다 관리자에게 문의해주세요</Text>
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
