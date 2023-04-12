import styled from 'styled-components';
import {SkinnyArrowDown} from '../../../../../components/Icon';

import Typography from '~components/Typography';

const SelectInputBox = ({
  placeholder,
  setValue,
  value,
  width = '100%',
  buttonOnClickCallback,
}) => {
  return (
    <Container width={width}>
      <DataValue isValue={!!value}>{value ? value : placeholder}</DataValue>

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
  padding-right: 10px;

  border-bottom-color: ${({theme}) => theme.colors.grey[8]};
  border-bottom-width: 1px;

  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: space-between;
`;

const DataValue = styled(Typography).attrs({text: 'InputText'})`
  color: ${({isValue, theme}) =>
    isValue ? theme.colors.grey[2] : theme.colors.grey[5]};
`;

const BottomModalPressable = styled.Pressable``;
