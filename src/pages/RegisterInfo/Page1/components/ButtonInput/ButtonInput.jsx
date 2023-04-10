import styled from 'styled-components';

// import Typography from '../../../../components/Typography';
// import Typography from '~components/Typography';
import Typography from '../../../../../components/Typography';
import SelectButton from './SelectButton';
import {useEffect, useState} from 'react';
import {Text} from 'react-native';

const ButtonInput = ({title, dataList, callback}) => {
  const [selectedId, setSelectedId] = useState(undefined);

  useEffect(() => {
    callback(selectedId);
  }, [selectedId]);

  return (
    <Container>
      <TitleText>{title}</TitleText>
      <ButtonWrap>
        {dataList.map(v => {
          return (
            <SelectButton
              key={v.id}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              data={v}
            />
          );
        })}
      </ButtonWrap>
    </Container>
  );
};

export default ButtonInput;

const Container = styled.View`
  width: 100%;
  margin-bottom: 24px;
`;

const ButtonWrap = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  width: 280px;
  height: 100px;
`;

const TitleText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 10px;
`;
