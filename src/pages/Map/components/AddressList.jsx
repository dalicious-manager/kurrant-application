import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import styled from 'styled-components';

import {mapApis} from '../../../api/map';
import Typography from '../../../components/Typography';
import {PAGE_NAME as DetailAddressPage} from '../../Spots/mySpot/DetailAddress';
import {PAGE_NAME as ApplySpot} from '../../Spots/shareSpot/ApplySpot';

const AddressList = ({setFocus, data, type}) => {
  const navigation = useNavigation();

  const onPress = async (name, address, x, y) => {
    const res = await mapApis.getRoadAddress(x, y);
    const jibunRes = await mapApis.getAddress(address);
    console.log(name, 'nameㅗㅗㅗㅗㅗㅗ');
    if (type === 'registerSpot') {
      navigation.navigate(ApplySpot, {
        address: name,
        roadAddress: address,
        jibunAddress: jibunRes,
        center: {latitude: Number(y), longitude: Number(x)},
        zipcode: res.zipcode,
        showAddress: true,
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
          // const nameChart = el.title.split('<b>')[1].split('</b>');
          // const name = nameChart[0] + nameChart[1];
          const last = data[data.length - 1];
          const lastArr = el === last;

          return (
            <Contents
              key={idx}
              lastArr={lastArr}
              onPress={() => {
                onPress(el.place_name, el.road_address_name, el.x, el.y);
              }}>
              <Name>{el.place_name}</Name>
              <Address>
                {el.road_address_name} {el.place_name}
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
