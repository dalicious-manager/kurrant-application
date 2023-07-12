import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import styled from 'styled-components';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

const phoneWidth = Dimensions.get('window').width;
const CarouselImage = ({img, firstClickedImageIndex, setIndex, index}) => {
  const [imgHandledArray, setImgHandledArray] = useState([]);

  // 판별해서 배열에 넣어주고 해야겠다

  const heightRate = 7 / 10;

  // 1. promise
  const getImageSize = imageUrl => {
    return new Promise((resolve, reject) => {
      Image.getSize(
        imageUrl,
        (width, height) => {
          Image.getSize(imageUrl, (width, height) => {
            if (width > height) {
              // 비율 구하기

              resolve([
                imageUrl,
                (imageStyle = {
                  // height: 282,
                  height: phoneWidth * (height / width),
                }),
              ]);
            } else if (width < height) {
              resolve([
                imageUrl,
                (imageStyle = {
                  // height: 563,
                  height: Dimensions.get('screen').height * heightRate,
                }),
              ]);
            } else {
              resolve([
                imageUrl,
                (imageStyle = {
                  height: phoneWidth,
                }),
              ]);
            }
          });
        },
        error => {
          reject(error);
        },
      );
    });
  };

  useEffect(() => {
    Promise.all(
      img.map(v => {
        return getImageSize(v);
      }),
    ).then(v => {
      setImgHandledArray(v);
    });
  }, [img, setImgHandledArray]);

  // index 가 바뀌면 swipe되게 하기

  const carouselRef = useRef(null);

  const handleScroll = index => {
    // 이미지가 한개뿐이면 스크롤을 막는다

    carouselRef.current.scrollTo({
      index: index,
      animated: true,
    });
  };

  useEffect(() => {
    handleScroll(index);
  }, [index]);

  return (
    <View>
      <GestureHandlerRootView
        style={
          {
            // flex: 1,
            // position: 'absolute',
            // bottom: 0,
            // left: 0,
            // height: '100%',
            // width: '100%',
          }
        }>
        <Carousel
          // loop={img?.length !== 1}
          loop
          enabled={img.length > 1}
          // index가 바뀔때 위의 화면을 바꾸게 하고 싶으면 ref의 current scrollTo를 이용하면된다
          ref={carouselRef}
          width={phoneWidth}
          // height={563}
          height={Dimensions.get('screen').height * heightRate}
          data={imgHandledArray}
          scrollAnimationDuration={600}
          // autoplay={true}, autoPlayInterval={null} : 자동으로 카루셀 되는거 막기
          // autoplay={img.length < 2 ? true : false}
          autoplay={true}
          autoPlayInterval={null}
          onSnapToItem={index => {
            // setActiveIndex

            // 이미지가 한개일때는 카루셀 막기

            setIndex(index);
          }}
          defaultIndex={firstClickedImageIndex}
          renderItem={({item}) => {
            return (
              <Container>
                <MyView>
                  <MealImage
                    source={{
                      uri: `${item[0]}`,
                    }}
                    style={item[1]}
                  />

                  {/* <MyFastImage
                  source={{
                    uri: `${item[0]}`,
                    priority: FastImage.priority.high,
                  }}
                  style={item[1]}>
                  <FilterImage
                    colors={[
                      'rgba(0, 0, 0, 0.45)',
                      'rgba(7, 7, 8, 0.25)',
                      'rgba(255, 255, 255, 0)',
                      'rgba(255, 255, 255, 0) ',
                    ]}
                  />
                </MyFastImage> */}
                </MyView>
              </Container>
            );
          }}
        />
      </GestureHandlerRootView>
    </View>
  );
};

export default CarouselImage;

const ModalImage = styled.Image``;

const MealImage = styled.Image`
  /* width: 100%;
  height: 100%; */

  /* ${({}) => {}} */

  /* width: 100%; */
  /* max-height: 33%; */

  border-radius: 2.5px;
`;

const FilterImage = styled(LinearGradient)`
  max-width: ${phoneWidth}px;
  height: 380px;
`;

const Container = styled.View`
  align-items: center;

  height: 100%;
  /* border: 1px solid white; */
`;

const MyView = styled.View`
  width: 100%;
  /* height: 100%; */
  margin: auto;
`;

const MyFastImage = styled(FastImage)``;
