import styled from 'styled-components';
import Typography from '~components/Typography';

const SelectButton = ({
  data,
  setSelectedIdList,
  selectedIdList,
  selectLimit = undefined,
  callbackWhenOverSelected = undefined,
}) => {
  // data에 id, name, 들어있다

  return (
    <Container
      onPress={() => {
        if (selectLimit) {
          if (selectedIdList.includes(data.id)) {
            setSelectedIdList([...selectedIdList].filter(v => v !== data.id));
          } else {
            // 4개 이상일 경우
            if (selectedIdList.length >= selectLimit) {
              if (callbackWhenOverSelected) {
                callbackWhenOverSelected();
                return;
              } else {
                return;
              }
            }

            setSelectedIdList([...selectedIdList, data.id]);
          }
        } else {
          if (selectedIdList.includes(data.id)) {
            setSelectedIdList([...selectedIdList].filter(v => v !== data.id));
          } else {
            setSelectedIdList([...selectedIdList, data.id]);
          }
        }
      }}
      isClicked={selectedIdList.includes(data.id)}>
      <BtnText isClicked={selectedIdList.includes(data.id)}>
        {data.name}
      </BtnText>
    </Container>
  );
};

export default SelectButton;

const Container = styled.Pressable`
  background-color: ${({isClicked, theme}) =>
    isClicked ? theme.colors.grey[2] : theme.colors.grey[8]};
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 6px 4px;
  padding: 9px 29px;
  height: 40px;
`;

const BtnText = styled(Typography).attrs({text: 'BottomButtonSB'})`
  color: ${({isClicked, theme}) => (isClicked ? '#fff' : theme.colors.grey[5])};
  text-align: center;
  justify-content: center;
`;
