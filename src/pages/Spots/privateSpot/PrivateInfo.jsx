import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, View, Pressable} from 'react-native';
import styled from 'styled-components';

import SongE from '../../../assets/icons/Map/bottomSongE.svg';
import Icon from '../../../assets/icons/Map/info.svg';
import PrivateIcon from '../../../assets/icons/Map/private.svg';
import BottomModal from '../../../components/BottomModal';
import Button from '../../../components/Button';
import Typography from '../../../components/Typography';
import {PAGE_NAME as CompletePage} from '../../Spots/components/Complete';

export const PAGE_NAME = 'PRIVATE_INFO_PAGE';
const PrivateInfo = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const alarmButton = () => {
    navigation.navigate(CompletePage, {
      data: 'private',
    });
  };
  return (
    <Wrap>
      <View style={{alignItems: 'center'}}>
        <Title>프라이빗 스팟</Title>
        <TitleDsc>특정 단체 내 구성원만 사용하는 스팟</TitleDsc>
        <PrivateIcon />
        <Description>
          회사, 동호회 등 원하는 사람들과 함께{`\n`}프라이빗하게 사용할 수 있는
          곳이에요.{`\n`}일정 인원 수 이상이면 신청 가능하고{`\n`}식사 복지 처럼
          케어를 진행할 수 있어요.
        </Description>
      </View>
      <Contents>
        <ContentsWrap>
          <Icon />
          <ContentsText>
            프라이빗 스팟은 사내/단체 내{`\n`}담당자의 초대로 등록 가능합니다.
            {`\n`}초대는 담당자에게 문의 바랍니다.
          </ContentsText>
        </ContentsWrap>
      </Contents>
      <ButtonWrap>
        <Button
          label="담당자가 초대하면 알림 받기"
          text="BottomButtonSB"
          onPressEvent={openModal}
        />
        <Pressable onPress={() => navigation.goBack()}>
          <ButtonText>뒤로가기</ButtonText>
        </Pressable>
      </ButtonWrap>
      <BottomModal
        image={<SongE />}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={`알림 신청 완료!`}
        description={`둘러보러 홈으로 이동할까요?${`\n`}아니면 다른 스팟을 사용해보시겠어요?`}
        buttonTitle1={'둘러보기'}
        buttonType1="grey7"
        buttonTitle2={'다른 스팟 타입 신청'}
        buttonType2="yellow"
        onPressEvent1={() => {}}
        onPressEvent2={() => {}}
      />
    </Wrap>
  );
};

export default PrivateInfo;

const Wrap = styled.View`
  flex: 1;
  background-color: white;
  padding-top: 56px;
`;
const ContentsWrap = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const Contents = styled.View`
  background-color: #eff2fe;
  border-radius: 14px;
  margin: 24px;
  height: 92px;
  padding: 16px;
`;

const ContentsText = styled(Typography).attrs({text: 'MealCount'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-left: 16px;
`;

const Title = styled(Typography).attrs({text: 'Title02SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
const TitleDsc = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  text-align: center;
  margin-top: 8px;
  margin-bottom: 24px;
`;
const ButtonText = styled(Typography).attrs({text: 'BottomButtonR'})`
  color: ${({theme}) => theme.colors.grey[4]};
  margin-top: 21px;
`;

const Description = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  text-align: center;
  margin-top: 24px;
`;
const ButtonWrap = styled.View`
  margin: 0px 20px;
  align-items: center;
  position: absolute;
  bottom: 51px;
`;
