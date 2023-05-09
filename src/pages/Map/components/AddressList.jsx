import {Text, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../components/Typography';

const AddressList = ({setFocus}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setFocus(false);
      }}>
      <Wrap>
        <Contents>
          <Name>스파크플러스 시청점</Name>
          <Address>서울 중구 남대문로9길 40 스파크플러스 시청점</Address>
        </Contents>
        <Contents>
          <Name>스파크플러스 시청점</Name>
          <Address>서울 중구 남대문로9길 40 스파크플러스 시청점</Address>
        </Contents>
        <Contents>
          <Name>스파크플러스 시청점</Name>
          <Address>서울 중구 남대문로9길 40 스파크플러스 시청점</Address>
        </Contents>
        <Contents>
          <Name>스파크플러스 시청점</Name>
          <Address>서울 중구 남대문로9길 40 스파크플러스 시청점</Address>
        </Contents>
        <Contents>
          <Name>스파크플러스 시청점</Name>
          <Address>서울 중구 남대문로9길 40 스파크플러스 시청점</Address>
        </Contents>
      </Wrap>
    </TouchableWithoutFeedback>
  );
};

export default AddressList;

const Wrap = styled.ScrollView`
  background-color: white;
  flex: 1;
`;

const Contents = styled.View`
  padding: 16px 0px 16px 24px;
  border-bottom: solid;
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.colors.grey[8]};
`;

const Name = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const Address = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[5]};
`;
