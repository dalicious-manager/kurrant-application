import {Text, View, Pressable} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../components/Typography';
import Icon from '../../../assets/icons/Map/info.svg';
import PrivateIcon from '../../../assets/icons/Map/private.svg';
import Button from '../../../components/Button';
import {PAGE_NAME as CompletePage} from '../../Spots/components/Complete';

import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export const PAGE_NAME = 'PRIVATE_INFO_PAGE';
const PrivateInfo = () => {
  const navigation = useNavigation();
  const alarmButton = () => {
    navigation.navigate(CompletePage, {
      data: 'private',
    });
  };
  return (
    <Wrap>
      <View style={{alignItems: 'center'}}>
        <Title>프라이빗 스팟</Title>
        <TitleDsc>
          한 회사 사람들 같이{`\n`}특정 집단 내 사람들끼리 사용하는 스팟
        </TitleDsc>
        <PrivateIcon />
        <Description>
          함께 프라이빗하게 쓰고 싶은 사람들끼리{`\n`}사용할 수 있는 곳으로
          {`\n`}사전에 담당자의 초대가 필요한 스팟이에요.{`\n`}사내 식사 복지도
          진행할 수 있어요.
        </Description>
      </View>
      <Contents>
        <ContentsWrap>
          <Icon />
          <ContentsText>
            해당 스팟은 사내/단체내 담당자의 초대로{`\n`}등록 가능합니다.{`\n`}
            초대는 담당자에게 문의 바랍니다.
          </ContentsText>
        </ContentsWrap>
      </Contents>
      <ButtonWrap>
        <Button
          label="담당자가 초대하면 알림 받기"
          text="BottomButtonSB"
          onPressEvent={alarmButton}
        />
        <Pressable>
          <ButtonText>괜찮아요</ButtonText>
        </Pressable>
      </ButtonWrap>
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
