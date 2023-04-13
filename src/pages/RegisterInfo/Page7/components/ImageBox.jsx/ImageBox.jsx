import {Dimensions} from 'react-native';
import styled from 'styled-components';

const ImageBox = ({foodImageList}) => {
  console.log(foodImageList);

  const foodImageListSample = [...foodImageList, ...foodImageList];

  return (
    <Container>
      {foodImageListSample.map((v, i) => {
        if (i === 5) {
          return;
        }

        return (
          <PhotoImage
            key={v.foodId}
            remainder={i % 3}
            source={{uri: v.imageUrl}}
          />
        );
      })}
    </Container>
  );
};

export default ImageBox;

const Container = styled.View`
  /* border: 1px solid black; */
  display: flex;
  flex-flow: row;
  flex: 1;
  flex-wrap: wrap;
`;

const PhotoImage = styled.Image`
  width: ${() => {
    const yes = Dimensions.get('screen').width - 2 * 24;

    return `${(yes - 26) / 3}px`;
  }};
  height: ${() => {
    const yes = Dimensions.get('screen').width - 2 * 24;

    return `${(yes - 26) / 3}px`;
  }};

  /* border: 1px solid black; */

  border-radius: 7px;

  margin-bottom: 13px;

  ${({remainder}) => {
    if (remainder === 0) {
      return `margin-right: 6.5px;`;
    } else if (remainder === 1) {
      return `
      
      margin-right: 6.5px;
        margin-left: 6.5px;
        `;
    } else {
      return `margin-left: 6.5px;`;
    }
  }}
`;
