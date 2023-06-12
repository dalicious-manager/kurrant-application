import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React from 'react';
import {View, Text, Image} from 'react-native';
import styled from 'styled-components';

import {DeliveryImage} from '../../../assets';
import useUserInfo from '../../../biz/useUserInfo/hook';
import Button from '../../../components/Button';
import Typography from '../../../components/Typography';
import {mySpotRootAtom} from '../../../utils/store';
import {PAGE_NAME as ModalPage} from '../components/Complete';

export const PAGE_NAME = 'MY_SPOT_DELIVERY';
const Delivery = ({route}) => {
  //console.log(route, 'route');
  const [fromRoot, setFromRoot] = useAtom(mySpotRootAtom);
  const navigation = useNavigation();
  const mySpotName = route?.params?.mySpotName;
  const address = route?.params?.address;
  const name = route?.params?.name;
  const addressData = address?.includes(null);
  const useAddress = addressData ? address.split('null')[0] : address;

  const {isUserInfo} = useUserInfo();

  const confirmButton = () => {
    if (isUserInfo?.isMembership) {
      navigation.navigate(ModalPage, {
        type: 'mySpotCompleteMembership',
      });
    } else {
      navigation.navigate(ModalPage, {
        type: 'mySpotCompleteNotMembership',
      });
    }
  };

  const spotName =
    mySpotName !== null ? mySpotName : fromRoot === 0 ? useAddress : name;
  return (
    <Wrap>
      <HeaderView>
        <Title>스팟 주소</Title>
        <SpotName>{spotName}</SpotName>
        <SpotAddress>{useAddress}</SpotAddress>
      </HeaderView>
      <Border />
      <Contents>
        <ContentsText>
          커런트 음식을{'\n'}위에 설정하신 주소로 예약 배송해드려요.{'\n'}
          주문하실때 배송 받을 시간을 정해주세요.
        </ContentsText>
        <Image source={DeliveryImage} style={{width: 339, height: 289}} />
      </Contents>
      <ButtonWrap>
        <Button label="확인했어요" onPressEvent={confirmButton} />
      </ButtonWrap>
    </Wrap>
  );
};

export default Delivery;

const Wrap = styled.View`
  background-color: white;
  flex: 1;
`;

const Title = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin: 16px 0px;
`;
const SpotName = styled(Typography).attrs({text: 'Body06SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 2px;
`;
const SpotAddress = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const HeaderView = styled.View`
  margin: 8px 24px 24px 24px;
`;
const Border = styled.View`
  height: 6px;
  background-color: ${({theme}) => theme.colors.grey[8]};
`;

const Contents = styled.View`
  align-items: center;
  margin-top: 40px;
`;
const ContentsText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[3]};
  text-align: center;
  margin-bottom: 32px;
`;

const ButtonWrap = styled.View`
  margin: 0px 24px;
  position: absolute;
  bottom: 35px;
`;
