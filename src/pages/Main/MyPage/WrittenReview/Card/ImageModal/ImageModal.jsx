import {useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView as View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import styled from 'styled-components';

import ReviewCarouselImage from './ReviewCarouselImage';
import {SmallXVectorIcon} from '../../../../../../components/Icon';
import DotPagination from './DotPagination';

// https://www.youtube.com/watch?v=Nw1St1h5Ylc&t=81s 여기서 베낌

const ImageModal = ({
  visible,
  setVisible,
  imageLocation,
  firstClickedImageIndex,
}) => {
  const [index, setIndex] = useState(0);

  const hide = () => setVisible(false);

  // 현재 페이지 인덱스 알기

  useEffect(() => {
    setIndex(firstClickedImageIndex);
  }, [firstClickedImageIndex]);

  return (
    <>
      <Modal visible={visible} animationType="fade" onRequestClose={hide}>
        {/* <SafeAreaView style={[styles.fill, styles.black]}> */}

        {/* <StatusBar backgroundColor="white" /> */}
        <StatusBar backgroundColor="white" barStyle="light-content" />
        <View style={[styles.fill, styles.black]}>
          <Container>
            <PressableContainer>
              <HidePressable onPress={hide}>
                <SmallXVectorIcon size="15" />
              </HidePressable>
            </PressableContainer>

            <ReviewCarouselImage
              img={imageLocation}
              firstClickedImageIndex={firstClickedImageIndex}
              setIndex={setIndex}
              index={index}
            />

            <DotPagination
              setIndex={setIndex}
              index={index}
              totalLength={imageLocation?.length}
            />
          </Container>
        </View>
      </Modal>
    </>
  );
};
export default ImageModal;

const styles = StyleSheet.create({
  fill: {flex: 1},
  // grey: {backgroundColor: '#5A1EFF'},
  black: {backgroundColor: '#1E1E1E'},
  // grey: {backgroundColor: '#ffffff'},
});

const ShowPressable = styled.Pressable``;
const HidePressable = styled.Pressable`
  width: 30px;
  height: 30px;
  justify-content: center;
  margin-left: -10px;
`;
const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  position: relative;
`;
const PressableContainer = styled.View`
  width: 100%;

  flex-direction: row;
  padding: 0 28px;
`;
