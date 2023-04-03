import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import styled from 'styled-components';

const phoneWidth = Dimensions.get('window').width;
const CarouselImage = ({img, firstClickedImageIndex, setIndex}) => {
  const [imgHandledArray, setImgHandledArray] = useState([]);

  // 판별해서 배열에 넣어주고 해야겠다

  //   useEffect(() => {
  //     console.log(img);

  //     img.forEach(v => {
  //       let imageStyle;

  //       Image.getSize(
  //         v,
  //         (width, height) => {
  //           if (width > height) {
  //             console.log(`width: ${width} height: ${height}`);

  //             imageStyle = {
  //               maxWidth: phoneWidth,
  //               height: 282,
  //             };
  //             setImgHandledArray([...imgHandledArray, [v, imageStyle]]);
  //           } else if (width < height) {
  //             console.log(`width: ${width} height: ${height}`);
  //             imageStyle = {
  //               maxWidth: phoneWidth,
  //               height: 563,
  //             };
  //             setImgHandledArray([...imgHandledArray, [v, imageStyle]]);
  //           } else {
  //             console.log(`width: ${width} height: ${height}`);

  //             imageStyle = {
  //               maxWidth: phoneWidth,
  //               height: phoneWidth,
  //             };
  //             setImgHandledArray([...imgHandledArray, [v, imageStyle]]);
  //           }
  //         },
  //         error => {
  //           console.error(error);
  //         },
  //       );
  //     });
  //   }, [img]);

  // 1. promise
  const getImageSize = imageUrl => {
    return new Promise((resolve, reject) => {
      Image.getSize(
        imageUrl,
        (width, height) => {
          Image.getSize(imageUrl, (width, height) => {
            if (width > height) {
              //   console.log(`width: ${width} height: ${height}`);
              resolve([imageUrl, 'horizontal']);
            } else if (width < height) {
              //   console.log(`width: ${width} height: ${height}`);
              resolve([imageUrl, 'vertical']);
            } else {
              //   console.log(`width: ${width} height: ${height}`);
              resolve([imageUrl, 'square']);
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
      console.log('프로미스 올 써보기');
      console.log(v);

      setImgHandledArray(v);
    });
  }, [img, setImgHandledArray]);

  //   const handleDimension = imgArray => {
  //     imgArray.forEach(v => {
  //       Image.getSize(v, (width, height) => {
  //         if (width > height) {
  //           console.log(`width: ${width} height: ${height}`);

  //           return 'horizontal';
  //         } else if (width < height) {
  //           console.log(`width: ${width} height: ${height}`);

  //           return 'vertical';
  //         } else {
  //           console.log(`width: ${width} height: ${height}`);

  //           return 'square';
  //         }
  //       });
  //     });
  //   };

  //   useEffect(() => {
  //     console.log(handleDimension(img));
  //   }, [img]);

  return (
    <View>
      <Carousel
        loop={img?.length !== 1}
        width={phoneWidth}
        height={563}
        // autoPlay={true}
        data={imgHandledArray}
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
