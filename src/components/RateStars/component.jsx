import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';

const Component = ({ratingInput, width, margin, callback}) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (ratingInput) {
      setRating(ratingInput);
    }
  }, [ratingInput]);

  const extractNumberOnly = str => {
    const onlyNumbersArray = str.match(/[0-9]/g);
    const onlyNumbers = parseInt(str.match(/[0-9]/g)?.join(''));

    let unit = '';
    if (onlyNumbersArray) {
      1;
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
              setRating(1);
              console.log('grey1');
              callback && callback();
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
              setRating(2);
              console.log('grey2');
              callback && callback();
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
              setRating(3);
              console.log('grey3');
              callback && callback();
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
              setRating(4);
              console.log('grey4');
              callback && callback();
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
              setRating(5);
              console.log('grey5');
              callback && callback();
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
              setRating(1);
              console.log('yellow 1');
              callback && callback();
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
              setRating(2);
              console.log('yellow 2');
              callback && callback();
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
              setRating(3);
              console.log('yellow 3');
              callback && callback();
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
              setRating(4);
              console.log('yellow 4');
              callback && callback();
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
              setRating(5);
              console.log('yellow 5');
              callback && callback();
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
