import styled from 'styled-components';
import {SkinnyArrowDown} from '../../../../components/Icon';

import Typography from '~components/Typography';

const SelectInputBox = ({
  placeholder,
  convertData = [],
  setValue,
  value,
  width = '100%',
  buttonOnClickCallback,
  containerCss = '',
}) => {
  // 값 고르기

  const convertDataYes = (value, convertData) => {
    let ko;

    convertData.forEach(v => {
      if (v.id === value) {
        ko = v.text;
      }
    });

    return ko;
  };

  return (
    <Container
      containerCss={containerCss}
      onPress={() => {
        buttonOnClickCallback();
      }}
      width={width}>
      {value && (
        <Head>
          <HeadText>{placeholder}</HeadText>
        </Head>
      )}
      <Container2>
        <DataValue numberOfLines={1} ellipsizeMode="tail" isValue={!!value}>
          {value
            ? convertData.length > 0
              ? convertDataYes(value, convertData)
              : value
            : placeholder}
        </DataValue>
        <BottomModalPressable
          onPress={() => {
            buttonOnClickCallback();
          }}>
          <SkinnyArrowDown width={'12px'} height={'8px'} />
        </BottomModalPressable>
      </Container2>
    </Container>
  );
};
export default SelectInputBox;

const Container = styled.Pressable`
  width: ${({width}) => width};

  border-bottom-color: ${({theme}) => theme.colors.grey[8]};
  border-bottom-width: 1px;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  ${({containerCss}) => containerCss}
`;
const Container2 = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 6px;
  padding-right: 10px;

  justify-content: space-between;
`;

const Head = styled.View`
  width: 100%;
  margin-bottom: 3px;
`;

const HeadText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const DataValue = styled(Typography).attrs({text: 'InputText'})`
  color: ${({isValue, theme}) =>
    isValue ? theme.colors.grey[2] : theme.colors.grey[5]};

  margin-right: 7px;
`;

const BottomModalPressable = styled.Pressable``;
