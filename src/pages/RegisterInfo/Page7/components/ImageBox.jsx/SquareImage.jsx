import styled from 'styled-components';

const SquareImage = ({uri}) => {
  return (
    <Container>
      <PhotoImage source={{uri: item.uri}} />
    </Container>
  );
};

const Container = styled.View``;

const PhotoImage = styled.Image`
  width: 80px;
  height: 80px;
  margin: 0 8px;
  border-radius: 7px;
`;
