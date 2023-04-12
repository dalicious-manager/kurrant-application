import styled from 'styled-components';
import Typography from '~components/Typography';

const YesOrNoButton = ({data, setSelectedId, selectedId, width = '124px'}) => {
  // data에 id, name, 들어있다

  return (
    <Container
      onPress={() => {
        setSelectedId(data.id);
      }}
      width={width}
      isClicked={selectedId === data.id}>
      <BtnText isClicked={selectedId === data.id}>{data.name}</BtnText>
    </Container>
  );
};

export default YesOrNoButton;

const Container = styled.Pressable`
  width: ${({width}) => width};
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
