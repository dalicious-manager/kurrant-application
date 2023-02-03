import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';
import {splitNumberAndUnit} from '../../utils/splitNumberAndUnit';

const Component = ({
  ratingInput = 0,
  width = '80px',
  margin = '1px',
  callback,
}) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (ratingInput) {
      setRating(ratingInput);
    }
  }, [ratingInput]);

  const {number: widthNum, unit: unitWidth} = splitNumberAndUnit(width);
  const {number: marginNum, unit: unitMargin} = splitNumberAndUnit(margin);

  const widthWithoutMargin = widthNum - 10 * marginNum;

  const widthAndHeight = `${widthWithoutMargin / 5}${unitWidth}`;

  return (
    <>
      <Container>
        <GreyStarDiv>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={marginNum}
            unitMargin={unitMargin}
            onPress={() => {
              setRating(1);
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
            margin={marginNum}
            unitMargin={unitMargin}
            onPress={() => {
              setRating(2);

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
            margin={marginNum}
            unitMargin={unitMargin}
            onPress={() => {
              setRating(3);

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
            margin={marginNum}
            unitMargin={unitMargin}
            onPress={() => {
              setRating(4);

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
            margin={marginNum}
            unitMargin={unitMargin}
            onPress={() => {
              setRating(5);

              callback && callback();
            }}>
            <StarIconImage
              source={require('../../assets/images/StarRating/GreyStar.png')}
              resizeMode="contain"
            />
          </StarPressable>
        </GreyStarDiv>

        <YellowStarDiv rating={rating} width={widthNum} unit={unitWidth}>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={marginNum}
            unitMargin={unitMargin}
            onPress={() => {
              setRating(1);

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
            margin={marginNum}
            unitMargin={unitMargin}
            onPress={() => {
              setRating(2);

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
            margin={marginNum}
            unitMargin={unitMargin}
            onPress={() => {
              setRating(3);

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
            margin={marginNum}
            unitMargin={unitMargin}
            onPress={() => {
              setRating(4);

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
            margin={marginNum}
            unitMargin={unitMargin}
            onPress={() => {
              setRating(5);

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
