import styled from 'styled-components';
import {SkinnyArrowDown} from '../../../../../components/Icon';

const SelectInputBox = ({
  placeholder,
  setValue,
  value,
  width = '100%',
  buttonOnClickCallback,
}) => {
  return (
    <Container width={width}>
      <Input
        style={{
          textAlignVertical: 'top',
        }}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
      />
      <BottomModalPressable
        onPress={() => {
          buttonOnClickCallback();
        }}>
        <SkinnyArrowDown width={'12px'} height={'8px'} />
      </BottomModalPressable>
    </Container>
  );
};
export default SelectInputBox;

const Container = styled.View`
  width: ${({width}) => width};
  padding-bottom: 6px;
  border-bottom-color: ${({theme}) => theme.colors.grey[8]};
  border-bottom-width: 1px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Input = styled.TextInput``;

const BottomModalPressable = styled.Pressable``;
