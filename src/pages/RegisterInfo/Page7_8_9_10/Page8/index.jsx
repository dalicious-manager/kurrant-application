import {Text} from 'react-native';
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
import {getUnselectedFoodIdList} from '../logic';

import TitleBox from '../components/TitleBox';
import ImageBox from '../components/ImageBox.jsx/ImageBox';
import {selectedFoodIdPage8Atom, unselectedFoodIdPage8Atom} from '../store';

// import TitleBox from '../components/TitleBox';
// import {
//   selectedFoodIdPage10Atom,
//   selectedFoodIdPage7Atom,
//   selectedFoodIdPage8Atom,
//   selectedFoodIdPage9Atom,
// } from '../../Page7/store';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE8';

const Pages = () => {
  const [finalRegister, setFinalRegister] = useAtom(finalRegisterAtom);
  const [clickAvaliable, setClickAvaliable] = useState(false);

  const {getFoodImageList, foodImageList} = useGetRegisterInfo();

  const [selectedFoodIdPage8, setSelectedFoodIdPage8] = useAtom(
    selectedFoodIdPage8Atom,
  );
  const [unselectedFoodIdPage8, setUnselectedFoodIdPage8] = useAtom(
    unselectedFoodIdPage8Atom,
  );

  useEffect(() => {
    getFoodImageList();
  }, []);

  // 뒤로 돌아올떄 체크된 그림들 다시 보이게 하기

  useEffect(() => {
    console.log(selectedFoodIdPage8);
  }, [selectedFoodIdPage8]);

  useEffect(() => {
    if (selectedFoodIdPage8.length >= 3) {
      setClickAvaliable(true);
    } else {
      setClickAvaliable(false);
    }
  }, [selectedFoodIdPage8]);

  const navigation = useNavigation();

  useEffect(() => {
    console.log(finalRegister);
  }, [finalRegister]);

  const handlePress = () => {
    console.log('ㅗㅑ');

    // page7일떄, page8일떄
    // selecteedIdList비우기, final에 데이터 집어넣기, 다음 컴포넌트로 넘어가기

    const unselectedList = getUnselectedFoodIdList(
      selectedFoodIdPage8,
      foodImageList,
    );

    setUnselectedFoodIdPage8(unselectedList);

    // setFinalRegister({
    //   ...finalRegister,
    //   selectedFoodId: [...finalRegister.selectedFoodId, ...selectedFoodIdPage8],
    //   unselectedFoodId: [...finalRegister.unselectedFoodId, ...unselectedList],
    // });

    navigation.navigate(RegisterInfoPage9PageName);
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
          num={2}
          title={`아래 음식 중 마음에 드는 \n음식 3개를 선택해 주세요`}
        />

        <ImageBox
          selectLimit={3}
          foodImageList={foodImageList}
          selectedIdList={selectedFoodIdPage8}
          setSelectedIdList={setSelectedFoodIdPage8}
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
