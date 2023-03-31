import {useState} from 'react';
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
  //   const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  console.log('이미지 로케이션');
  console.log(imageLocation);
  console.log(imageLocation?.length);

  //   Image.getSize(
  //     'https://your-image-url.com/image.jpg',
  //     (width, height) => {
  //       if (width > height) {
  //         console.log('Image is horizontal');
  //       } else {
  //         console.log('Image is vertical');
  //       }
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   );

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
            />
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
});

const ShowPressable = styled.Pressable``;
const HidePressable = styled.Pressable``;
const Container = styled.View`
  align-items: center;
`;
