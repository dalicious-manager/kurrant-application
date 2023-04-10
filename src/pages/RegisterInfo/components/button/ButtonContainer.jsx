import styled from 'styled-components';
import SelectButton from './SelectButton';
import {useEffect, useState} from 'react';

const ButtonContainer = ({dataList, selectLimit, callback = () => {}}) => {
  const [selectedIdList, setSelectedIdList] = useState([]);

  useEffect(() => {
    callback(selectedIdList);
  }, [selectedIdList]);

  // 4개 이상일 경우 더이상 선택하는 것을 못하게 막는다

  return (
    <Container>
      <ButtonWrap>
        {dataList.map(v => {
          return (
            <SelectButton
              key={v.id}
              selectedIdList={selectedIdList}
              setSelectedIdList={setSelectedIdList}
              selectLimit={selectLimit}
              data={v}
            />
          );
        })}
      </ButtonWrap>
    </Container>
  );
};

export default ButtonContainer;

const Container = styled.View``;

const ButtonWrap = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
`;
