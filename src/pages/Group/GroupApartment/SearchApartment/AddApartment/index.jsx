import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, Text, View, Alert} from 'react-native';
import styled from 'styled-components';

import Apart from '../../../../../assets/icons/Group/apartImg.svg';
import Corp from '../../../../../assets/icons/Group/corpImg.svg';
import useGroupSpots from '../../../../../biz/useGroupSpots/hook';
import Button from '../../../../../components/Button';
import Typography from '../../../../../components/Typography';
import {PAGE_NAME as MyGroupListPageName} from '../../../GroupManage/index';

export const PAGE_NAME = 'P__GROUP__APARTMENT__SEARCH__ADD';

const Pages = ({route}) => {
  const navigation = useNavigation();
  const {userGroupAdd} = useGroupSpots();

  const data = route.params.data;

  const addOwnGroup = async id => {
    try {
      const res = await userGroupAdd({
        id: id,
      });

      navigation.navigate(MyGroupListPageName);
    } catch (err) {
      Alert.alert('메세지', '등록 가능한 그룹의 개수를 초과했습니다.', [
        {
          text: '확인',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };
  return (
    <Wrap>
      <Group>스팟명</Group>
      <View>{data.spotType === 0 ? <Corp /> : <Apart />}</View>
      <ApartName>{data.name}</ApartName>
      <Address>{data.address}</Address>
      {data.spotType === 0 && (
        <InfoWrap>
          <Info>
            <Title>🚩프라이빗 스팟 안내</Title>
            <InfoContent>해당 스팟은 프라이빗 스팟으로</InfoContent>
            <InfoContent>
              사내/단체내 담당자의 초대로 등록 가능합니다.
            </InfoContent>
          </Info>
        </InfoWrap>
      )}
      <ButtonWrap>
        {data.spotType !== 0 ? (
          <Button
            label="내 스팟에 추가"
            onPressEvent={() => addOwnGroup(data.id)}
          />
        ) : (
          <Button label="뒤로가기" onPressEvent={() => navigation.goBack()} />
        )}
      </ButtonWrap>
    </Wrap>
  );
};

export default Pages;

const Wrap = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.grey[0]};
  align-items: center;
`;

const ButtonWrap = styled.View`
  position: absolute;
  margin: 0px 20px;
  bottom: 35px;
`;

const Group = styled(Typography).attrs({text: 'Title04R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-top: 40px;
  margin-bottom: 48px;
`;

const ApartName = styled(Typography).attrs({text: 'LargeTitle'})`
  color: ${({theme}) => theme.colors.grey[1]};
  margin-top: 24px;
`;

const Address = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-top: 4px;
`;

const Title = styled(Typography).attrs({text: 'Body06SB'})`
  color: #3478f6;
`;

const Info = styled.View`
  background-color: #eff2fe;
  border-radius: 14px;
  padding: 12px 0px 12px 24px;
`;

const InfoWrap = styled.View`
  width: 100%;
  padding: 0px 24px;
  margin-top: 24px;
`;

const InfoContent = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;
