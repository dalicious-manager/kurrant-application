import styled from 'styled-components';
import Typography from '../../../components/Typography';

const SelectButton = ({data}) => {
  return (
    <Container>
      <BtnText>{}</BtnText>
    </Container>
  );
};

export default SelectButton;

const Container = styled.View``;

const BtnText = styled(Typography).attrs({text: 'BottomButtonSB'})`
  color: ${({theme}) => theme.colors.grey[1]};
  text-align: center;
  justify-content: center;
`;
