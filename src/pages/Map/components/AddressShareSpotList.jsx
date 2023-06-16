import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import styled from 'styled-components';

import Typography from '../../../components/Typography';
import {PAGE_NAME as ShareSpotMapPage} from '../ShareSpotMap';

const AddressShareSpotList = ({data, setFocus, text}) => {
  const navigation = useNavigation();

  const onPress = (lat, long, id) => {
    navigation.navigate(ShareSpotMapPage, {
      location: {
        latitude: lat,
        longitude: long,
      },
      id: id,
    });
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

          return (
            <Contents
              key={idx}
              lastArr={lastArr}
              onPress={() => {
                onPress(Number(el.latitude), Number(el.longitude), el.id);
              }}>
              <Name>{el.name}</Name>
              <Address>{el.address}</Address>
            </Contents>
          );
        })}
      </Wrap>
    </TouchableWithoutFeedback>
  );
};

export default AddressShareSpotList;
const Wrap = styled.ScrollView`
  background-color: white;
  flex: 1;
`;

const Contents = styled.Pressable`
  padding: 16px 24px 16px 24px;
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
