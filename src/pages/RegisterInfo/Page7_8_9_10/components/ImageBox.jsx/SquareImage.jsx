import {Dimensions, StyleSheet, View} from 'react-native';
import styled from 'styled-components';

import CheckCircleGreenIcon from '~assets/icons/CheckCircleGreenIcon.svg';

const SquareImage = ({
  remainder,
  imageUrl,
  foodId,
  selectLimit,
  selectedIdList,
  setSelectedIdList,
  callbackWhenOverSelected = undefined,
}) => {
  const onCheck = true;

  const handlePress = () => {
    if (selectLimit) {
      if (selectedIdList.includes(foodId)) {
        setSelectedIdList([...selectedIdList].filter(v => v !== foodId));
      } else {
        // 3개 이상일 경우
        if (selectedIdList.length >= selectLimit) {
          if (callbackWhenOverSelected) {
            callbackWhenOverSelected();
            return;
          } else {
            return;
          }
        }

        setSelectedIdList([...selectedIdList, foodId]);
      }
    } else {
      if (selectedIdList.includes(foodId)) {
        setSelectedIdList([...selectedIdList].filter(v => v !== foodId));
      } else {
        setSelectedIdList([...selectedIdList, foodId]);
      }
    }
  };

  return (
    <Container
      onCheck={selectedIdList.includes(foodId)}
      remainder={remainder}
      onPress={() => {
        handlePress();
      }}>
      <PhotoImage
        onCheck={selectedIdList.includes(foodId)}
        source={{uri: imageUrl}}
      />

      {selectedIdList.includes(foodId) && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'black',
            opacity: 0.5,
            borderRadius: 7,
          }}
        />
      )}

      {selectedIdList.includes(foodId) && (
        <CheckCircleGreenIcon style={{position: 'absolute'}} />
      )}
    </Container>
  );
};
export default SquareImage;
const Container = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

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

const AbsoluteView = styled.View`
  position: absolute;
`;

const PhotoImage = styled.Image`
  width: 100%;
  height: 100%;

  border-radius: 7px;
`;
