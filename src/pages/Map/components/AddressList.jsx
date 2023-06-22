import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React from 'react';
import {Text, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import styled from 'styled-components';

import {mapApis} from '../../../api/map';
import Typography from '../../../components/Typography';
import {mySpotRootAtom} from '../../../utils/store';
import {PAGE_NAME as DetailAddressPage} from '../../Spots/mySpot/DetailAddress';
import {PAGE_NAME as ApplySpot} from '../../Spots/shareSpot/ApplySpot';

const AddressList = ({setFocus, data, type}) => {
  const navigation = useNavigation();
  const [fromRoot, setFromRoot] = useAtom(mySpotRootAtom); // 어느 경로로 왔는지 0 : 지도에서 1: 검색 리스트에서

  const onPress = async (name, address, x, y) => {
    const res = await mapApis.getRoadAddress(x, y);
    const jibunRes = await mapApis.getAddress(address);

    if (type === 'registerSpot') {
      navigation.navigate(ApplySpot, {
        address: name,
        roadAddress: address,
        jibunAddress: jibunRes,
        center: {latitude: Number(y), longitude: Number(x)},
        zipcode: res.zipcode,
        showAddress: true,
        type: 'registerSpot',
        from: 'application',
      });
    } else {
      navigation.navigate(DetailAddressPage, {
        address: name,
        roadAddress: address,
        jibunAddress: jibunRes,
        center: {latitude: Number(y), longitude: Number(x)},
        zipcode: res.zipcode,
        showAddress: true,
      });
    }

    // console.log(name, address, x, y);
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setFocus(false);
      }}>
      <Wrap>
        {data?.map((el, idx) => {
          const last = data[data.length - 1];
          const lastArr = el === last;
          console.log(el);
          return (
            <Contents
              key={idx}
              lastArr={lastArr}
              onPress={() => {
                onPress(
                  el.place_name ? el.place_name : el.address_name,
                  el.road_address_name
                    ? el.road_address_name
                    : el.address_name
                    ? el.address_name
                    : el.road_address.address_name,
                  el.x,
                  el.y,
                );
                setFromRoot(1);
              }}>
              <Name>{el.place_name ?? el.address_name}</Name>
              <Address>
                {el.road_address_name ?? el.road_address.address_name}{' '}
                {el.place_name}
              </Address>
            </Contents>
          );
        })}
      </Wrap>
    </TouchableWithoutFeedback>
  );
};

export default AddressList;

const Wrap = styled.ScrollView`
  background-color: white;
  flex: 1;
`;

const Contents = styled.Pressable`
  padding: 16px 0px 16px 24px;
  border-bottom: solid;
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.colors.grey[8]};
  margin-bottom: ${({lastArr}) => (lastArr ? '66px' : '0px')};
`;

const Name = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const Address = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[5]};
`;
