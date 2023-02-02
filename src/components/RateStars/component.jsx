import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';

const Component = ({rating, width, margin}) => {
  const extractNumberOnly = str => {
    const onlyNumbersArray = str.match(/[0-9]/g);
    const onlyNumbers = parseInt(str.match(/[0-9]/g)?.join(''));

    let unit = '';
    if (onlyNumbersArray) {
      unit = str
        .split('')
        .filter(x => !onlyNumbersArray.includes(x))
        .join('');
    }

    return {onlyNumbers, unit};
  };

  const {onlyNumbers: onlyNumbersWidth, unit: unitWidth} =
    extractNumberOnly(width);
  const {onlyNumbers: onlyNumbersMargin, unit: unitMargin} =
    extractNumberOnly(margin);

  const widthWithoutMargin = onlyNumbersWidth - 10 * onlyNumbersMargin;

  const widthAndHeight = `${widthWithoutMargin / 5}${unitWidth}`;

  return (
    <>
      <Container>
        <GreyStarDiv>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={onlyNumbersMargin}
            unitMargin={unitMargin}
            onPress={() => {
              console.log('grey1');
            }}>
            <StarIconImage
              source={require('../../assets/images/StarRating/GreyStar.png')}
              resizeMode="contain"
            />
          </StarPressable>

          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={onlyNumbersMargin}
            unitMargin={unitMargin}
            onPress={() => {
              console.log('grey2');
            }}>
            <StarIconImage
              source={require('../../assets/images/StarRating/GreyStar.png')}
              resizeMode="contain"
            />
          </StarPressable>

          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={onlyNumbersMargin}
            unitMargin={unitMargin}
            onPress={() => {
              console.log('grey3');
            }}>
            <StarIconImage
              source={require('../../assets/images/StarRating/GreyStar.png')}
              resizeMode="contain"
            />
          </StarPressable>

          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={onlyNumbersMargin}
            unitMargin={unitMargin}
            onPress={() => {
              console.log('grey4');
            }}>
            <StarIconImage
              source={require('../../assets/images/StarRating/GreyStar.png')}
              resizeMode="contain"
            />
          </StarPressable>

          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={onlyNumbersMargin}
            unitMargin={unitMargin}
            onPress={() => {
              console.log('grey5');
            }}>
            <StarIconImage
              source={require('../../assets/images/StarRating/GreyStar.png')}
              resizeMode="contain"
            />
          </StarPressable>
        </GreyStarDiv>

        <YellowStarDiv
          rating={rating}
          width={onlyNumbersWidth}
          unit={unitWidth}>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={onlyNumbersMargin}
            unitMargin={unitMargin}
            onPress={() => {
              console.log('yellow 1');
            }}>
            <StarIconImage
              source={require('../../assets/images/StarRating/YellowStar.png')}
              resizeMode="contain"
            />
          </StarPressable>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={onlyNumbersMargin}
            unitMargin={unitMargin}
            onPress={() => {
              console.log('yellow 2');
            }}>
            <StarIconImage
              source={require('../../assets/images/StarRating/YellowStar.png')}
              resizeMode="contain"
            />
          </StarPressable>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={onlyNumbersMargin}
            unitMargin={unitMargin}
            onPress={() => {
              console.log('yellow 3');
            }}>
            <StarIconImage
              source={require('../../assets/images/StarRating/YellowStar.png')}
              resizeMode="contain"
            />
          </StarPressable>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={onlyNumbersMargin}
            unitMargin={unitMargin}
            onPress={() => {
              console.log('yellow 4');
            }}>
            <StarIconImage
              source={require('../../assets/images/StarRating/YellowStar.png')}
              resizeMode="contain"
            />
          </StarPressable>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={onlyNumbersMargin}
            unitMargin={unitMargin}
            onPress={() => {
              console.log('yellow 5');
            }}>
            <StarIconImage
              source={require('../../assets/images/StarRating/YellowStar.png')}
              resizeMode="contain"
            />
          </StarPressable>
        </YellowStarDiv>
      </Container>
    </>
  );
};

export default Component;

const Container = styled.View`
  display: flex;
  position: relative;
`;

const GreyStarDiv = styled.View`
  display: flex;
  position: relative;
  flex-direction: row;
`;

const YellowStarDiv = styled.View`
  display: flex;
  flex-direction: row;
  width: ${({rating, width, unit}) => `${(rating / 5) * width}${unit}`};
  overflow: hidden;

  position: absolute;
  left: 0;
  top: 0;
`;
const StarPressable = styled.Pressable`
  width: ${({width}) => width};
  height: ${({height}) => height};
  flex: 0 0 auto;
  margin: ${({margin, unitMargin}) => `${margin}${unitMargin}`};

  justify-content: center;
`;

const StarIconImage = styled.Image`
  width: 100%;
  height: 100%;
`;
