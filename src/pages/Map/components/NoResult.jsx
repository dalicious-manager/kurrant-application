import {View, Text} from 'react-native';
import styled from 'styled-components';

import Icon from '../../../assets/icons/Map/noResult.svg';
import Typography from '../../../components/Typography';

const NoResult = () => {
  return (
    <Wrapper>
      <Wrap>
        <Icons />
        <InnerText>
          검색결과가 없어요{`\n`}지번, 도로명, 건물명으로{`\n`}다시 검색해주세요
        </InnerText>
      </Wrap>
    </Wrapper>
  );
};

export default NoResult;

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
`;

const Icons = styled(Icon)`
  margin-bottom: 24px;
`;

const InnerText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[5]};
  text-align: center;
`;

const Wrap = styled.View`
  margin-top: 115px;
  align-items: center;
`;
