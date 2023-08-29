import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

import {BespinMembershipImage} from '../../../assets';
import useMembership from '../../../biz/useMembership';
import Button from '../../../components/Button';
import {useGetUserInfo} from '../../../hook/useUserInfo';
import {PAGE_NAME as MembershipJoinPageName} from '../MembershipJoin';

export const PAGE_NAME = 'P__MEMBERSHIP__INTRO';
const {width} = Dimensions.get('screen');
const Pages = ({route}) => {
  const params = route.params;
  console.log(params);
  const [height, setHeight] = useState(0);
  const [isImageLoading, setImageLoading] = useState(false);
  const [eventSpotLoading, setEventSpotLoading] = useState(false);
  const {
    data: {data: isUserInfo},
    isLoading: isUserInfoLoading,
  } = useGetUserInfo();
  const {
    getMembershipHistory,
    readableAtom: {membershipHistory},
  } = useMembership();
  const navigation = useNavigation();
  useEffect(() => {
    const resizeImage = async () => {
      setImageLoading(true);
      await Image.getSize(
        params.isFounders
          ? 'https://admin.dalicious.co/img/foundersmembership.png'
          : 'https://admin.dalicious.co/img/kurrantmembership.png',
        (w, h) => {
          setHeight(h * (width / w));
        },
      );
      setImageLoading(false);
    };
    resizeImage();
  }, []);
  //베스핀 글로벌 체크
  useEffect(() => {
    const getHistory = async () => {
      setEventSpotLoading(true);
      await getMembershipHistory();
      setEventSpotLoading(false);
    };
    getHistory();
  }, [isUserInfo]);
  if (isImageLoading || isUserInfoLoading || eventSpotLoading) {
    return <ActivityIndicator size={'large'} />;
  }
  return (
    <Container>
      <ScrollView>
        <FastImage
          style={{width: width, height: height - 100}}
          source={
            isUserInfo?.email.includes('@bespinglobal.com') &&
            membershipHistory.length < 1
              ? BespinMembershipImage
              : {
                  uri: params.isFounders
                    ? 'https://admin.dalicious.co/img/foundersmembership.png'
                    : 'https://admin.dalicious.co/img/kurrantmembership.png',
                  priority: FastImage.priority.high,
                }
          }
        />
        <ButtonSame>
          {/* <Button type='yellow' label="멤버십 가입하기"  onPressEvent={()=>{
                    navigation.navigate(MembershipJoinPageName);
                  }}/> */}
          <View style={{width: width, height: 150}} />
        </ButtonSame>
      </ScrollView>
      <ButtonContainer>
        <Button
          type="yellow"
          label="멤버십 가입하기"
          onPressEvent={() => {
            navigation.navigate(MembershipJoinPageName);
          }}
        />
      </ButtonContainer>
    </Container>
  );
};

export default Pages;

const Container = styled.View`
  width: ${width}px;
  background-color: white;
`;

const ButtonSame = styled.View`
  margin-bottom: 24px;
  margin-left: 20px;
  margin-right: 20px;
`;
const ButtonContainer = styled.View`
  position: absolute;
  z-index: 2;
  bottom: 35px;
  padding-left: 20px;
  padding-right: 20px;
`;
