import {useEffect, useState} from 'react';
import {Modal, SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import styled from 'styled-components';
import Carousel from 'react-native-reanimated-carousel';
import CarouselImage from './CarouselImage';

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
        <SafeAreaView style={[styles.fill, styles.grey]}>
          <Container>
            <HidePressable onPress={hide}>
              <Text>hide</Text>
            </HidePressable>

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
  //   grey: {backgroundColor: '#5A1EFF'},
  grey: {backgroundColor: '#ffffff'},
});

const ShowPressable = styled.Pressable``;
const HidePressable = styled.Pressable``;
const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;
