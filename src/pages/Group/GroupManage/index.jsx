import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import styled from 'styled-components';

import useApartApplication from '../../../biz/useApartApplication/hook';
import useGroupSpots from '../../../biz/useGroupSpots/hook';
import BottomSheetSpot from '../../../components/BottomSheetSpot';
import Button from '../../../components/Button';
import Typography from '../../../components/Typography';
import {setStorage} from '../../../utils/asyncStorage';
import {PAGE_NAME as ApartRegisterSpotPageName} from '../GroupApartment/SearchApartment/AddApartment/DetailAddress';
import {PAGE_NAME as GroupManageDetailPageName} from '../GroupManage/DetailPage';
export const PAGE_NAME = 'P__GROUP__MANAGE';
const Pages = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const {
    userGroupSpotCheck,
    isUserGroupSpotCheck,
    groupSpotDetail,
    userSpotRegister,
  } = useGroupSpots();

  const [selected, setSelected] = useState();

  const modalOpen = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    async function LoadList() {
      await userGroupSpotCheck();
    }
    LoadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goSpotRegisterPage = async id => {
    try {
      const res = await userSpotRegister({
        id: id,
      });

      if (res.data === null) {
        navigation.navigate(ApartRegisterSpotPageName, {id: id});
      } else {
        await setStorage('spotStatus', '0');

        navigation.navigate(GroupManageDetailPageName);
      }
    } catch (err) {
      Alert.alert('스팟 가입', err?.toString()?.replace('error: ', ''));
    }
  };
  return (
    <SafeView>
      <Wrap>
        <MyGroup>내 스팟</MyGroup>
        <Contents showsVerticalScrollIndicator={false}>
          <GroupNameView>
            {isUserGroupSpotCheck?.spotListResponseDtoList?.length !== 0 &&
              isUserGroupSpotCheck?.spotListResponseDtoList?.map((el, idx) =>
                el.spots.map(v => (
                  <View key={v.spotId}>
                    <GroupName>{el.clientName ?? v.spotName}</GroupName>
                  </View>
                )),
              )}
          </GroupNameView>
        </Contents>
      </Wrap>
      <ButtonWrap>
        <Button label="스팟 선택" onPressEvent={modalOpen} />
      </ButtonWrap>
      <BottomSheetSpot
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="스팟 선택"
        data={isUserGroupSpotCheck.spotListResponseDtoList}
        selected={selected}
        setSelected={setSelected}
        onPressEvent={id => {
          goSpotRegisterPage(id);
        }}
      />
    </SafeView>
  );
};

export default Pages;

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.grey[0]};
`;
const Wrap = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 80px;
`;
const ButtonWrap = styled.View`
  margin: 0px 24px;
  position: absolute;
  bottom: 35px;
`;

const MyGroup = styled(Typography).attrs({text: 'Title04R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 24px;
`;
const GroupName = styled(Typography).attrs({text: 'LargeTitle'})`
  color: ${({theme}) => theme.colors.grey[1]};
  margin-bottom: 24px;
`;

const GroupNameView = styled.View`
  align-items: center;
`;

const Contents = styled.ScrollView`
  max-height: 550px;
`;
