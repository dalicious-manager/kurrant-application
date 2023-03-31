import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import styled from 'styled-components';

const phoneWidth = Dimensions.get('window').width;
const CarouselImage = ({img, firstClickedImageIndex, setIndex}) => {
  const [imageHeight, setImageHeight] = useState([]);

  // 판별해서 배열에 넣어주고 해야겠다

  useEffect(() => {
    console.log(img);

    const yo = img.map(v => {
      let imageStyle;

      Image.getSize(
        v,
        (width, height) => {
          if (width > height) {
            console.log(`width: ${width} height: ${height}`);

            imageStyle = {
              maxWidth: phoneWidth,
              height: 282,
            };
            setImageHeight([...imageHeight, [v, imageStyle]]);
          } else if (width < height) {
            console.log(`width: ${width} height: ${height}`);
            imageStyle = {
              maxWidth: phoneWidth,
              height: 563,
            };
            setImageHeight([...imageHeight, [v, imageStyle]]);
          } else {
            console.log(`width: ${width} height: ${height}`);

            imageStyle = {
              maxWidth: phoneWidth,
              height: phoneWidth,
            };
            setImageHeight([...imageHeight, [v, imageStyle]]);
          }
        },
        error => {
          console.error(error);
        },
      );
    });

    console.log(yo);
  }, [img]);

  return (
    <View>
      <Carousel
        loop={img?.length !== 1}
        width={phoneWidth}
        height={563}
        // autoPlay={true}
        data={imageHeight}
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

          return (
            <View>
              <FastImage
                source={{
                  uri: `${item[0]}`,
                  priority: FastImage.priority.high,
                }}
                // style={imageStyle}
                style={item[1]}>
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
