import {View, Text, Dimensions} from 'react-native';
import styled from 'styled-components';

import Icon from '../../../assets/icons/Map/info.svg';
import Typography from '../../../components/Typography';
import {height} from '../../../theme';

const WIDTH = Dimensions.get('screen').width;
const Info = ({onPressEvent}) => {
  return (
    <MapInfo onPress={onPressEvent}>
      <Contents>
        <Wrap>
          <Icon />
          <ContentsText>지도를 움직여 위치를 설정하세요!</ContentsText>
        </Wrap>
      </Contents>
    </MapInfo>
  );
};

export default Info;

const MapInfo = styled.Pressable`
  background-color: rgba(0, 0, 0, 0.7);
  flex: 1;
  width: ${WIDTH}px;
`;

const Wrap = styled.View`
  flex-direction: row;
  align-items: center;

  justify-content: center;
`;
const Contents = styled.View`
  background-color: #eff2fe;
  border-radius: 14px;
  margin: 149px 51px 0px 51px;
  height: 79px;
  padding: 18px 16px;
`;

const ContentsText = styled(Typography).attrs({text: 'Body06SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-left: 16px;
`;
