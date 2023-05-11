import {Image, Pressable, Text, View} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../components/Typography';
import {NotDeliveryIcon} from '../../../assets';
import Button from '../../../components/Button';
import Close from '../../../assets/icons/Map/close20.svg';
import {useNavigation} from '@react-navigation/native';
import {PAGE_NAME as CompletePage} from '../components/Complete';

export const PAGE_NAME = 'MY_SPOT_NOT_DELIVERY';
const NotDelivery = () => {
  const navigation = useNavigation();

  const NoAlarm = () => {
    navigation.navigate(CompletePage);
  };
  return (
    <Wrap>
      <CloseButton>
        <Close />
      </CloseButton>
      <Contents>
        <Title>아직 배송 가능 지역이 아니에요</Title>
        <Image source={NotDeliveryIcon} style={{width: 162, height: 149}} />
        <Desc>하지만 곧 오픈해드릴게요.{`\n`}오픈시 알림 보내드릴까요?</Desc>
      </Contents>
      <ButtonWrap>
        <Button label="알림 받기" />
        <Pressable onPress={NoAlarm}>
          <ButtonText>괜찮아요</ButtonText>
        </Pressable>
      </ButtonWrap>
    </Wrap>
  );
};

export default NotDelivery;

const Wrap = styled.View`
  //justify-content: center;
  background-color: white;
  flex: 1;
`;

const Title = styled(Typography).attrs({text: 'Title02SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 24px;
`;
const Desc = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  margin-top: 24px;
`;

const Contents = styled.View`
  align-items: center;
  margin-top: 204px;
`;

const ButtonText = styled(Typography).attrs({text: 'BottomButtonR'})`
  color: ${({theme}) => theme.colors.grey[4]};
  margin-top: 21px;
`;

const ButtonWrap = styled.View`
  margin: 0px 20px;
  align-items: center;
  position: absolute;
  bottom: 51px;
`;

const CloseButton = styled.Pressable`
  width: 24px;
  height: 24px;

  align-items: center;
  justify-content: center;
  position: absolute;
  left: 24px;
  top: 52px;
`;
