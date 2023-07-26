import React, {useState} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import styled from 'styled-components';

import {LoadingIcon} from '../../../../../assets';

const width = Dimensions.get('window').width;
const CarouselImage = ({img, setImgScroll, detailFetching}) => {
  return (
    <GestureHandlerRootView
      style={{flex: 1}}
      onTouchMove={() => {
        setImgScroll(false);
      }}>
      <Carousel
        enabled={img?.length !== 1}
        loop={img?.length !== 1}
        width={width}
        height={380}
        autoPlay={true}
        data={img}
        onSnapToItem={index => setImgScroll(true)}
        scrollAnimationDuration={2500}
        renderItem={({item}) => (
          <View>
            {!detailFetching ? (
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
            ) : (
              <FastImage
                source={LoadingIcon}
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
            )}
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
};

export default CarouselImage;

const FilterImage = styled(LinearGradient)`
  max-width: ${width}px;
  height: 380px;
`;
