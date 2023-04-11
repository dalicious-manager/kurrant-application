import {Text} from 'react-native';
import styled from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';

import {PAGE_NAME as RegisterInfoPage1PageName} from '../Page1';
import {PAGE_NAME as RegisterInfoPage2PageName} from '../Page2';
import {PAGE_NAME as RegisterInfoPage3PageName} from '../Page3';
import {PAGE_NAME as RegisterInfoPage4PageName} from '../Page4';

export const PAGE_NAME = 'P__REGISTER_INFO_START';

const Pages = () => {
  //   const [clickAvaliable, setClickAvaliable] = useState(false);

  const navigation = useNavigation();

  const handlePress = () => {
    console.log('ㅗㅑ');
    // navigation.navigate(RegisterInfoPage1PageName);
    navigation.navigate(RegisterInfoPage4PageName);
  };

  return (
    <Container
      paddingHorizontal={20}
      styles={{
        position: 'relative',
      }}>
      <Text>레지스터 인포 시작</Text>

      <ButtonNext
        size="full"
        label="회원 정보 입력하기"
        text={'BottomButtonSB'}
        // disabled={!clickAvaliable}
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
  padding: 35px 20px;
  align-items: center;
  justify-content: space-between;
`;

const ButtonNext = styled(Button)`
  /* position: absolute; */
  /* bottom: 35px; */
`;
