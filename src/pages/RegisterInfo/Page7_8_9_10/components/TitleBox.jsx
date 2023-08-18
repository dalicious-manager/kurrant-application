import styled from 'styled-components';

import Typography from '~components/Typography';

import NumberYellowCircle1 from '../../../../assets/icons/NumberYellowCircle/NumberYellowCircle1.svg';
import NumberYellowCircle2 from '../../../../assets/icons/NumberYellowCircle/NumberYellowCircle2.svg';
import NumberYellowCircle3 from '../../../../assets/icons/NumberYellowCircle/NumberYellowCircle3.svg';
import NumberYellowCircle4 from '../../../../assets/icons/NumberYellowCircle/NumberYellowCircle4.svg';

const TitleBox = ({num, title}) => {
  const NumIcon = () => {
    if (num === 1) return <NumberYellowCircle1 />;
    else if (num === 2) return <NumberYellowCircle2 />;
    else if (num === 3) return <NumberYellowCircle3 />;
    else if (num >= 4) return <NumberYellowCircle4 />;
  };

  return (
    <Container>
      <NumWrap>
        <NumIcon />
      </NumWrap>

      <TitleText>{title}</TitleText>
    </Container>
  );
};
export default TitleBox;

const Container = styled.View`
  margin-top: 28px;
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
`;

const NumWrap = styled.View`
  margin-right: 4px;
  margin-top: 4px;
`;

const TitleText = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
