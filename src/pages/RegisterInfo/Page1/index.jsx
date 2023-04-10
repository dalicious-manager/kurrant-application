import {Text} from 'react-native';
import styled from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

import ProgressBar from '~components/ProgressBar7';

import {PAGE_NAME as RegisterInfoPage2PageName} from '../Page2';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE1';

const Pages = () => {
  //   const [clickAvaliable, setClickAvaliable] = useState(false);

  const navigation = useNavigation();

  const handlePress = () => {
    console.log('ㅗㅑ');
    navigation.navigate(RegisterInfoPage2PageName);
  };

  return (
    <Container
      paddingHorizontal={20}
      styles={{
        position: 'relative',
      }}>
      <ProgressBar progress={1} />
      <Text>레지스터 인포 page1</Text>

      <ButtonNext
        size="full"
        label="다음"
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
