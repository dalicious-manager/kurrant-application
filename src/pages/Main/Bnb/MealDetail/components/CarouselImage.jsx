import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import styled from 'styled-components';

const width = Dimensions.get('window').width;
const CarouselImage = ({img}) => {
  return (
    <View>
      <Carousel
        loop={img?.length !== 1}
        width={width}
        height={380}
        autoPlay={true}
        data={img}
        scrollAnimationDuration={2000}
        // onSnapToItem={index => console.log('current index:', index)}
        renderItem={({item}) => (
          <View>
            <FastImage
              source={{
                uri: `${item}`,
                priority: FastImage.priority.high,
              }}
              style={{
                maxWidth: width,
                height: 380,
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
        )}
      />
    </View>
  );
};

export default CarouselImage;

const FilterImage = styled(LinearGradient)`
  max-width: ${width}px;
  height: 380px;
`;