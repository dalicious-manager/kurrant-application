// import {Text} from 'react-native';
// import styled from 'styled-components';

// import Button from '../../../../components/Button';
// import {useNavigation} from '@react-navigation/native';
// import {useEffect, useState} from 'react';

// import ProgressBar from '~components/ProgressBar7';

// import {PAGE_NAME as RegisterInfoFinishPageName} from '../../Finish';
// import TitleBox from './components/TitleBox';
// import useGetRegisterInfo from '../../../../biz/useRegisterInfo/getRegisterIist/hook';
// import ImageBox from './components/ImageBox.jsx/ImageBox';
// import {finalRegisterAtom} from '../../store';
// import {useAtom} from 'jotai';
// import {getUnselectedFoodIdList} from '../logic';
// // import {
// //   selectedFoodIdPage10Atom,
// //   selectedFoodIdPage7Atom,
// //   selectedFoodIdPage8Atom,
// //   selectedFoodIdPage9Atom,
// // } from '../../Page7/store';

// export const PAGE_NAME = 'P__REGISTER_INFO_PAGE9';

// const Pages = () => {
//   const [finalRegister, setFinalRegister] = useAtom(finalRegisterAtom);
//   const [clickAvaliable, setClickAvaliable] = useState(false);

//   const {getFoodImageList, foodImageList} = useGetRegisterInfo();

//   const [selectedIdList, setSelectedIdList] = useState([]);

//   useEffect(() => {
//     getFoodImageList();
//   }, []);

//   useEffect(() => {
//     if (selectedIdList.length >= 3) {
//       setClickAvaliable(true);
//     } else {
//       setClickAvaliable(false);
//     }
//   }, [selectedIdList]);

//   const navigation = useNavigation();

//   useEffect(() => {
//     console.log(finalRegister);
//   }, [finalRegister]);

//   const handlePress = () => {
//     console.log('ㅗㅑ');

//     // page7일떄, page8일떄
//     // selecteedIdList비우기, final에 데이터 집어넣기, 다음 컴포넌트로 넘어가기

//     const unselectedList = getUnselectedFoodIdList(
//       selectedIdList,
//       foodImageList,
//     );

//     if (pageNow === 7) {
//       setFinalRegister({
//         ...finalRegister,

//         selectedFoodId: selectedIdList.join(', '),
//         unselectedFoodId: unselectedList.join(', '),
//       });
//       setSelectedIdList([]);
//     } else if (pageNow === 8) {
//     } else if (pageNow === 9) {
//     } else if (pageNow === 10) {
//     }

//     if (pageNow < 10) {
//       navigation.navigate(PAGE_NAME, {
//         page: pageNow + 1,
//       });
//     } else {
//       navigation.navigate(RegisterInfoFinishPageName);
//     }
//   };

//   //

//   return (
//     <Container
//       paddingHorizontal={24}
//       styles={{
//         position: 'relative',
//       }}>
//       <ScrollViewContainer showsVerticalScrollIndicator={false}>
//         <ProgressBar progress={7} />
//         <TitleBox
//           num={
//             pageNow === 7
//               ? 1
//               : pageNow === 8
//               ? 2
//               : pageNow === 9
//               ? 3
//               : pageNow === 10
//               ? 4
//               : 5
//           }
//           title={`아래 음식 중 마음에 드는 \n음식 3개를 선택해 주세요`}
//         />

//         <ImageBox
//           selectLimit={3}
//           foodImageList={foodImageList}
//           selectedIdList={selectedIdList}
//           setSelectedIdList={setSelectedIdList}
//         />
//       </ScrollViewContainer>
//       <ButtonNext
//         size="full"
//         label="다음"
//         text={'BottomButtonSB'}
//         // disabled={!clickAvaliable}
//         onPressEvent={() => {
//           handlePress();
//         }}
//       />
//     </Container>
//   );
// };
// export default Pages;

// const Container = styled.View`
//   flex: 1;
//   /* padding: 35px 20px; */
//   /* padding: 15px 20px; */
//   align-items: center;
//   background-color: #ffffff;
// `;

// const ScrollViewContainer = styled.ScrollView`
//   width: 100%;
//   /* height: 90%; */
//   background-color: #ffffff;
// `;

// const ButtonNext = styled(Button)`
//   position: relative;
//   bottom: 35px;
// `;
