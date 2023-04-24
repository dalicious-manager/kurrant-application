import {Text} from 'react-native';
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
import {getUnselectedFoodIdList} from '../logic';

import TitleBox from '../components/TitleBox';
import ImageBox from '../components/ImageBox.jsx/ImageBox';
import {selectedFoodIdPage9Atom, unselectedFoodIdPage8Atom} from '../store';

// import TitleBox from '../components/TitleBox';
// import {
//   selectedFoodIdPage10Atom,
//   selectedFoodIdPage7Atom,
//   selectedFoodIdPage8Atom,
//   selectedFoodIdPage9Atom,
// } from '../../Page7/store';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE9';

const Pages = () => {
  const [finalRegister, setFinalRegister] = useAtom(finalRegisterAtom);
  const [clickAvaliable, setClickAvaliable] = useState(false);

  const {getFoodImageList, foodImageList} = useGetRegisterInfo();

  const [selectedFoodIdPage9, setSelectedFoodIdPage9] = useAtom(
    selectedFoodIdPage9Atom,
  );

  const [unselectedFoodIdPage8, setUnselectedFoodIdPage8] = useAtom(
    unselectedFoodIdPage8Atom,
  );

  useEffect(() => {
    getFoodImageList();
  }, []);

  // 뒤로 돌아올떄 체크된 그림들 다시 보이게 하기

  // useEffect(() => {
  //   console.log(selectedFoodIdPage9);
  // }, [selectedFoodIdPage9]);

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
    // page7일떄, page8일떄
    // selecteedIdList비우기, final에 데이터 집어넣기, 다음 컴포넌트로 넘어가기

    const unselectedList = getUnselectedFoodIdList(
      selectedFoodIdPage9,
      foodImageList,
    );

    // setUnselectedFoodIdPage8(unselectedList);

    // setFinalRegister({
    //   ...finalRegister,
    //   selectedFoodId: [...finalRegister.selectedFoodId, ...selectedFoodIdPage9],
    //   unselectedFoodId: [...finalRegister.unselectedFoodId, ...unselectedList],
    // });

    setFinalRegister({
      ...finalRegister,

      useSelectTextDataList: [
        ...finalRegister.useSelectTextDataList,
        {selectedFoodId: selectedFoodIdPage9, unselectedFoodId: unselectedList},
      ],
    });

    navigation.navigate(RegisterInfoPage10PageName);
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
          num={3}
          title={`아래 음식 중 마음에 드는 \n음식 3개를 선택해 주세요`}
        />

        <ImageBox
          selectLimit={3}
          foodImageList={foodImageList}
          selectedIdList={selectedFoodIdPage9}
          setSelectedIdList={setSelectedFoodIdPage9}
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
