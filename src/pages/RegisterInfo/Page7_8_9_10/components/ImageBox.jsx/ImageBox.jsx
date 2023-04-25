import {Dimensions} from 'react-native';
import styled from 'styled-components';
import SquareImage from './SquareImage';

const ImageBox = ({
  foodImageList,
  selectedIdList,
  setSelectedIdList,
  selectLimit = 0,
  callbackWhenOverSelected = undefined,
}) => {
  return (
    <Container>
      {foodImageList.map((v, i) => {
        return (
          <SquareImage
            key={v.foodId}
            remainder={i % 3}
            foodId={v.foodId}
            imageUrl={v.imageUrl}
            selectLimit={selectLimit}
            selectedIdList={selectedIdList}
            setSelectedIdList={setSelectedIdList}
            callbackWhenOverSelected={callbackWhenOverSelected}
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
