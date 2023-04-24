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

  const {getFoodImageList, foodImageList} = useGetRegisterInfo();

  const {isUpdateLoading, updateRegisterInfo} = useUpdateRegisterInfo();

  /// 최종 제풀

  // const [selectedFoodIdPage7, setSelectedFoodIdPage7] = useAtom(
  //   selectedFoodIdPage7Atom,
  // );

  // const [selectedFoodIdPage8, setSelectedFoodIdPage8] = useAtom(
  //   selectedFoodIdPage8Atom,
  // );

  // const [selectedFoodIdPage9, setSelectedFoodIdPage9] = useAtom(
  //   selectedFoodIdPage9Atom,
  // );

  const [selectedFoodIdPage10, setSelectedFoodIdPage10] = useAtom(
    selectedFoodIdPage10Atom,
  );

  // const [unselectedFoodIdPage7, setUnselectedFoodIdPage7] = useAtom(
  //   unselectedFoodIdPage7Atom,
  // );
  // const [unselectedFoodIdPage8, setUnselectedFoodIdPage8] = useAtom(
  //   unselectedFoodIdPage8Atom,
  // );
  // const [unselectedFoodIdPage9, setUnselectedFoodIdPage9] = useAtom(
  //   unselectedFoodIdPage9Atom,
  // );

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
    // page7일떄, page8일떄
    // selecteedIdList비우기, final에 데이터 집어넣기, 다음 컴포넌트로 넘어가기

    const unselectedList = getUnselectedFoodIdList(
      selectedFoodIdPage10,
      foodImageList,
    );

    // 최종 제출

    console.log('최종 제출 확인하기');

    // console.log({
    //   ...finalRegister,
    //   selectedFoodId: [
    //     ...selectedFoodIdPage7,
    //     ...selectedFoodIdPage8,
    //     ...selectedFoodIdPage9,
    //     ...selectedFoodIdPage10,
    //   ].join(', '),
    //   unselectedFoodId: [
    //     ...unselectedFoodIdPage7,
    //     ...unselectedFoodIdPage8,
    //     ...unselectedFoodIdPage9,
    //     ...unselectedList,
    //   ].join(', '),
    // });

    // setFinalRegister({
    //   ...finalRegister,
    //   selectedFoodId: [
    //     ...selectedFoodIdPage7,
    //     ...selectedFoodIdPage8,
    //     ...selectedFoodIdPage9,
    //     ...selectedFoodIdPage10,
    //   ].join(', '),
    //   unselectedFoodId: [
    //     ...unselectedFoodIdPage7,
    //     ...unselectedFoodIdPage8,
    //     ...unselectedFoodIdPage9,
    //     ...unselectedList,
    //   ].join(', '),
    // });

    setFinalRegister({
      ...finalRegister,

      useSelectTextDataList: [
        ...finalRegister.useSelectTextDataList,
        {
          selectedFoodId: selectedFoodIdPage10,
          unselectedFoodId: unselectedList,
        },
      ],
    });

    const response = await updateRegisterInfo({
      ...finalRegister,

      useSelectTextDataList: [
        ...finalRegister.useSelectTextDataList,
        {
          selectedFoodId: selectedFoodIdPage10,
          unselectedFoodId: unselectedList,
        },
      ],
    });

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

        <ImageBox
          selectLimit={3}
          foodImageList={foodImageList}
          selectedIdList={selectedFoodIdPage10}
          setSelectedIdList={setSelectedFoodIdPage10}
        />
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
