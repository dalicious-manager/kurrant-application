import styled from 'styled-components';

import YellowStarIcon from '../../assets/icons/StarRating/YellowStar.svg';
import GreyStarIcon from '../../assets/icons/StarRating/GreyStar.svg';

import YellowStar from '../../assets/images/StarRating/YellowStar.png';

const StarRating = ({rating, width, margin}) => {
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
    <Container>
      <GreyStarDiv>
        {/* <IconWrapper
          width={widthAndHeight}
          height={widthAndHeight}
          margin={onlyNumbersMargin}
          unitMargin={unitMargin}>
          <GreyStarIcon resizeMode="contain" />
        </IconWrapper>
        <IconWrapper
          width={widthAndHeight}
          height={widthAndHeight}
          margin={onlyNumbersMargin}
          unitMargin={unitMargin}>
          <GreyStarIcon resizeMode="contain" />
        </IconWrapper>
        <IconWrapper
          width={widthAndHeight}
          height={widthAndHeight}
          margin={onlyNumbersMargin}
          unitMargin={unitMargin}>
          <GreyStarIcon resizeMode="contain" />
        </IconWrapper>
        <IconWrapper
          width={widthAndHeight}
          height={widthAndHeight}
          margin={onlyNumbersMargin}
          unitMargin={unitMargin}>
          <GreyStarIcon resizeMode="contain" />
        </IconWrapper>
        <IconWrapper
          width={widthAndHeight}
          height={widthAndHeight}
          margin={onlyNumbersMargin}
          unitMargin={unitMargin}>
          <GreyStarIcon resizeMode="contain" />
        </IconWrapper> */}
      </GreyStarDiv>

      <YellowStarDiv rating={rating} width={onlyNumbersWidth} unit={unitWidth}>
        <IconWrapper
          width={widthAndHeight}
          height={widthAndHeight}
          margin={onlyNumbersMargin}
          unitMargin={unitMargin}>
          {/* <YellowStarIcon resizeMode="contain" /> */}

          <StarIconImage
            // source={{uri: '../../assets/images/StarRating/YellowStar.png'}}
            source={require('../../assets/images/StarRating/YellowStar.png')}
            resizeMode="contain"
          />
        </IconWrapper>
      </YellowStarDiv>
    </Container>
  );
};
export default StarRating;

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

const IconWrapper = styled.View`
  width: ${({width}) => width};
  height: ${({height}) => height};
  flex: 0 0 auto;
  margin: ${({margin, unitMargin}) => `${margin}${unitMargin}`};
  border: 1px solid black;
  justify-content: center;
`;

const StarIconImage = styled.Image``;
