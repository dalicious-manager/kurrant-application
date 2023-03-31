import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import styled from 'styled-components';

const phoneWidth = Dimensions.get('window').width;
const CarouselImage = ({img, firstClickedImageIndex, setIndex}) => {
  //   const [imageHeight, setImageHeight] = useState(380);

  // 판별해서 배열에 넣어주고 해야겠다

  return (
    <View>
      <Carousel
        loop={img?.length !== 1}
        width={phoneWidth}
        height={563}
        // autoPlay={true}
        data={img}
        scrollAnimationDuration={600}
        // autoplay={true}, autoPlayInterval={null} : 자동으로 카루셀 되는거 막기
        autoplay={true}
        autoPlayInterval={null}
        onSnapToItem={index => {
          // setActiveIndex
          setIndex(index);
          console.log('current index:', index);
        }}
        defaultIndex={firstClickedImageIndex}
        renderItem={({item}) => {
          // 이미지가 가로인가 세로인가 판별하기 ( )

          let imageStyle = {};

          console.log(item);
          Image.getSize(
            item,
            (width, height) => {
              if (width > height) {
                console.log(`width: ${width} height: ${height}`);

                imageStyle = {
                  maxWidth: phoneWidth,
                  height: 282,
                };
              } else if (width < height) {
                console.log(`width: ${width} height: ${height}`);
                imageStyle = {
                  maxWidth: phoneWidth,
                  height: 563,
                };
              } else {
                console.log(`width: ${width} height: ${height}`);

                imageStyle = {
                  maxWidth: phoneWidth,
                  height: phoneWidth,
                };
              }
            },
            error => {
              console.error(error);
            },
          );

          console.log(imageStyle);

          return (
            <View>
              <FastImage
                source={{
                  uri: `${item}`,
                  priority: FastImage.priority.high,
                }}
                // style={imageStyle}
                style={{
                  maxWidth: 120,
                  height: 60,
                }}>
                <FilterImage
                  colors={[
                    'rgba(0, 0, 0, 0.45)',
                    'rgba(7, 7, 8, 0.25)',
                    'rgba(255, 255, 255, 0)',
                    'rgba(255, 255, 255, 0) ',
                  ]}
                />
              </FastImage>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CarouselImage;

const FilterImage = styled(LinearGradient)`
  max-width: ${phoneWidth}px;
  height: 380px;
`;
