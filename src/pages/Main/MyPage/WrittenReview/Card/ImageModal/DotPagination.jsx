import {useEffect} from 'react';
import {View} from 'react-native';
import styled, {useTheme} from 'styled-components';

const DotPagination = ({index, totalLength, setIndex}) => {
  let thisArray = [];
  const theme = useTheme();

  for (let i = 0; i < totalLength; i++) {
    thisArray.push(true);
  }

  const handleDotPress = i => {
    console.log('잘 눌린다');

    setIndex(i);
  };

  return (
    <Container>
      {thisArray.map((v, i) => {
        if (i === index) {
          return <Dot color={'white'} onPress={() => handleDotPress(i)} />;
        } else {
          return (
            <Dot
              color={theme.colors.grey[3]}
              onPress={() => handleDotPress(i)}
            />
          );
        }
      })}
    </Container>
  );
};
export default DotPagination;

const Container = styled.View`
  width: 80px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Dot = styled.Pressable`
  border-radius: 4px;
  width: 8px;
  height: 8px;
  background-color: ${({color}) => color};
  margin: 0 4px;
`;
