import styled from 'styled-components';
import Typography from '~components/Typography';

const SelectButton = ({data, setSelectedId, selectedId}) => {
  // data에 id, name, 들어있다

  return (
    <Container
      onPress={() => {
        setSelectedId(data.id);
      }}
      isClicked={selectedId === data.id}>
      <BtnText isClicked={selectedId === data.id}>{data.name}</BtnText>
    </Container>
  );
};

export default SelectButton;

const Container = styled.Pressable`
  width: 124px;
  height: 40px;
  background-color: ${({isClicked, theme}) =>
    isClicked ? theme.colors.grey[2] : theme.colors.grey[8]};
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
`;

const BtnText = styled(Typography).attrs({text: 'BottomButtonSB'})`
  color: ${({isClicked, theme}) => (isClicked ? '#fff' : theme.colors.grey[5])};
  text-align: center;
  justify-content: center;
`;
