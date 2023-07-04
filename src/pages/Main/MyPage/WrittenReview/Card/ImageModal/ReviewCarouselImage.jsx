import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import styled from 'styled-components';

const phoneWidth = Dimensions.get('window').width;
const ReviewCarouselImage = ({
  img,
  firstClickedImageIndex,
  setIndex,
  index,
}) => {
  const [imgHandledArray, setImgHandledArray] = useState([]);

  // 판별해서 배열에 넣어주고 해야겠다

  const heightRate = 7 / 10;

  // 1. promise
  const getImageSize = imageUrl => {
    let imageStyle;
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
                height,
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
      <GestureHandlerRootView style={{flex: 1}}>
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
                    heightRate={heightRate}
                    height={item[1].height}
                    source={{
                      uri: `${item[0]}`,
                    }}
                    style={item[1]}
                  />
                </MyView>
              </Container>
            );
          }}
        />
      </GestureHandlerRootView>
    </View>
  );
};

export default ReviewCarouselImage;

const MealImage = styled.Image`
  /* margin-top: 20px; */

  margin-top: ${({heightRate, height}) => {
    const yo = Dimensions.get('screen').height * heightRate;

    return `${(yo - height) / 2}px`;
  }};

  border-radius: 2.5px;
`;

const Container = styled.View`
  align-items: center;

  height: 100%;
  /* border: 1px solid white; */
`;

const MyView = styled.View`
  width: 100%;
`;
