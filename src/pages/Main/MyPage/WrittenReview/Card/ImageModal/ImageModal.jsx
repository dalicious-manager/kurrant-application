import {useEffect, useState} from 'react';
import {Modal, SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import styled from 'styled-components';
import Carousel from 'react-native-reanimated-carousel';
import CarouselImage from './CarouselImage';
import {SmallXVectorIcon, XVectorIcon} from '../../../../../../components/Icon';

// https://www.youtube.com/watch?v=Nw1St1h5Ylc&t=81s 여기서 베낌

const ImageModal = ({
  visible,
  setVisible,
  imageLocation,
  firstClickedImageIndex,
}) => {
  const [index, setIndex] = useState(0);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  // 현재 페이지 인덱스 알기

  useEffect(() => {
    setIndex(firstClickedImageIndex);
  }, [firstClickedImageIndex]);

  return (
    <>
      <Modal visible={visible} animationType="fade" onRequestClose={hide}>
        <SafeAreaView style={[styles.fill, styles.black]}>
          <Container>
            <PressableContainer>
              <HidePressable onPress={hide}>
                <SmallXVectorIcon size="15" />
              </HidePressable>
            </PressableContainer>

            <CarouselImage
              img={imageLocation}
              firstClickedImageIndex={firstClickedImageIndex}
              setIndex={setIndex}
            />

            <Text>{index}</Text>
          </Container>
        </SafeAreaView>
      </Modal>
    </>
  );
};
export default ImageModal;

const styles = StyleSheet.create({
  fill: {flex: 1},
  grey: {backgroundColor: '#5A1EFF'},
  black: {backgroundColor: '#1E1E1E'},
  // grey: {backgroundColor: '#ffffff'},
});

const ShowPressable = styled.Pressable``;
const HidePressable = styled.Pressable``;
const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;
const PressableContainer = styled.View`
  width: 100%;
  /* background-color: aquamarine; */

  flex-direction: row;
  padding: 0 28px;
`;
