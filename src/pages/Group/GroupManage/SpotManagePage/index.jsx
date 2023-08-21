import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {useTheme} from 'styled-components/native';

import SpotBox from './components/SpotBox';
import SpotListBox from './components/SpotListBox';
import Arrow from '../../../../assets/icons/Group/arrowDown.svg';
import useGroupSpots from '../../../../biz/useGroupSpots/hook';
import BottomSheetSpot from '../../../../components/BottomSheetSpot';
import Toast from '../../../../components/Toast';
import Typography from '../../../../components/Typography';
import {
  useGetSpotsManageList,
  useGroupSpotDetail,
  useGroupSpotList,
} from '../../../../hook/useSpot';
import {useGetUserInfo} from '../../../../hook/useUserInfo';
import {PAGE_NAME as SpotTypePage} from '../../../Spots/SpotType';
import {PAGE_NAME as ApartRegisterSpotPageName} from '../../GroupApartment/SearchApartment/AddApartment/DetailAddress';
const WIDTH = Dimensions.get('screen').width;
export const PAGE_NAME = 'P__GROUP__MANAGE__SPOT_MANAGE';
const Pages = ({route}) => {
  const toast = Toast();
  const themeApp = useTheme();
  const from = route?.params?.from;
  const navigation = useNavigation();
  const {userSpotRegister} = useGroupSpots();
  const {data: userSpotManageList} = useGetSpotsManageList();
  const {data: isUserGroupSpotCheck} = useGroupSpotList();

  const {
    data: {data: isUserInfo},
    refetch: userInfoRefetch,
  } = useGetUserInfo();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState();
  //const [groupState,setGroupState] = useState();
  const modalOpen = () => {
    setModalVisible(true);
  };

  const spotId = isUserInfo?.spotId;
  const {data: userGroupSpotDetail, refetch: detailRefetch} =
    useGroupSpotDetail(spotId);

  const anotherSpot = async id => {
    try {
      const res = await userSpotRegister({id: id});
      if (res.data === null) {
        navigation.navigate(ApartRegisterSpotPageName, {id: id});
      } else {
        toast.toastEvent();
      }
    } catch (error) {
      Alert.alert('유저 스팟 가입', error?.toString()?.replace('error: ', ''));
    }
  };

  useEffect(() => {
    if (from === 'shareSpotMap') {
      setModalVisible(true);
    }
  }, [from]);
  useFocusEffect(
    useCallback(() => {
      if (spotId === null) {
        setModalVisible(true);
      }
    }, [spotId]),
  );

  const renderItem = useCallback(({item}) => {
    return <SpotListBox item={item} />;
  }, []);
  const keyExtractor = useCallback(item => item.groupId.toString(), []);
  useEffect(() => {
    if (spotId) detailRefetch();
  }, [detailRefetch, spotId]);
  return (
    // <SafeView>
    <Wrap>
      <TitleWrap>
        <SpotBox type="my" spotCount={userSpotManageList?.data?.mySpotCount} />
        <SpotBox
          type="share"
          spotCount={userSpotManageList?.data?.shareSpotCount}
        />
        <SpotBox
          type="private"
          spotCount={userSpotManageList?.data?.privateSpotCount}
        />
      </TitleWrap>
      <Line />
      <SpotDetailBox>
        <Typography text="Body06R" textColor={themeApp.colors.grey[4]}>
          스팟 선택
        </Typography>
        <SpotView onPress={modalOpen}>
          <SpotName>
            {isUserInfo?.spotId !== null
              ? userGroupSpotDetail?.data?.spotName || '스팟을 선택해 주세요'
              : '스팟을 선택해 주세요'}
          </SpotName>
          <Arrow />
        </SpotView>
        <Typography text="Body06R" textColor={themeApp.colors.grey[4]}>
          스팟 리스트
        </Typography>
        <SpotListWrap
          data={userSpotManageList?.data?.groups}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SpotDetailBox>
      <BottomSheetSpot
        userSpotId={spotId}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="스팟 선택"
        data={isUserGroupSpotCheck?.data?.spotListResponseDtoList}
        selected={selected}
        setSelected={setSelected}
        onPressEvent={id => {
          anotherSpot(id);
        }}
      />

      <toast.ToastWrap message={'스팟이 설정됐어요'} icon={'checked'} />
      <BottomContainer>
        <AddSpotWrap onPress={() => navigation.navigate(SpotTypePage)}>
          <AddSpotText>다른 스팟 신청/추가</AddSpotText>
        </AddSpotWrap>
      </BottomContainer>
    </Wrap>
    // </SafeView>
  );
};

export default Pages;

const Wrap = styled.View`
  background-color: ${({theme}) => theme.colors.grey[0]};
  flex: 1;
  //align-items: center;
  width: ${WIDTH}px;
`;

const TitleWrap = styled.View`
  flex-direction: row;
  padding-top: 24px;
  padding-bottom: 18px;
  justify-content: center;
`;
const Line = styled.View`
  height: 6px;
  background-color: ${({theme}) => theme.colors.grey[8]};
`;
const SpotDetailBox = styled.View`
  padding: 24px;
  flex: 1;
  margin-bottom: 102px;
`;
// const SpotListWrap = styled.ScrollView``;
const SpotListWrap = styled.FlatList``;

const SpotView = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: ${({theme}) => theme.colors.grey[0]};
  border-radius: 14px;
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  width: 100%;
  margin-bottom: 32px;
  margin-top: 8px;
`;

const AddSpotWrap = styled.Pressable`
  margin-top: 24px;
`;

const BottomContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  position: absolute;
  background-color: white;
  padding-top: 24px;
  padding-bottom: 56px;
  bottom: 0px;
`;
const SpotName = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const AddSpotText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[3]};
  text-decoration: underline;
  text-decoration-color: ${({theme}) => theme.colors.grey[3]};
`;
