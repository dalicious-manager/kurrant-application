import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import Arrow from '~assets/icons/Group/arrowDown.svg';
import useUserMe from '~biz/useUserMe';
import BottomSheet from '~components/BottomSheet';
import Button from '~components/Button';
import Typography from '~components/Typography';
import Wrapper from '~components/Wrapper';
import {SCREEN_NAME as RegisterCardScreenName} from '~screens/Main/RegisterCard';

import Skeleton from './Skeleton';
import {registCardAtom} from '../../../../../../../atoms/store';
import Toast from '../../../../../../../components/Toast';

export const PAGE_NAME = 'P__MY_PAGE__SELECTED_DEFAULT_CARD';

const Pages = ({route}) => {
  const params = route?.params;
  const themeApp = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [isCard, setIsCard] = useAtom(registCardAtom);
  const [modalVisible2, setModalVisible2] = useState(false);
  const toast = Toast();
  const navigation = useNavigation();
  const {
    getCardList,
    cardSetting,
    setCardList,
    readableAtom: {cardList, cardSimpleList, isCardListLoading},
  } = useUserMe();
  const [selectDefault, setSelectDefault] = useState(0);
  const onSelectEvent = async id => {
    setSelectDefault(id);
    const req = {
      cardId: id,
      defaultType: 1,
    };
    await cardSetting(req);
  };
  const [selectMemebership, setSelectMembership] = useState(0);
  const onSelectEvent2 = async id => {
    setSelectMembership(id);
    const req = {
      cardId: id,
      defaultType: 2,
    };
    await cardSetting(req);
  };
  const onSelectOpenModal = () => {
    if (cardList.length > 0) {
      setModalVisible(true);
    } else {
      Alert.alert('결제카드', '등록된 카드가 없어요 \n카드를 등록하시겠어요?', [
        {
          text: '취소',
          onPress: async () => {},
          style: 'destructive',
        },
        {
          text: '확인',
          onPress: () => {
            onPageRegistedCard();
          },
        },
      ]);
    }
  };
  const onSelectOpenModal2 = () => {
    if (cardList.length > 0) {
      setModalVisible2(true);
    } else {
      Alert.alert(
        '멤버십카드',
        '등록된 카드가 없어요 \n카드를 등록하시겠어요?',
        [
          {
            text: '취소',
            onPress: async () => {},
            style: 'destructive',
          },
          {
            text: '확인',
            onPress: () => {
              onPageRegistedCard();
            },
          },
        ],
      );
    }
  };

  const onPageRegistedCard = () => {
    setIsCard(1);
    navigation.navigate(RegisterCardScreenName);
  };
  // useEffect(()=>{
  //     const getData  = async()=>{
  //         await getCardList();
  //     }
  //     getData();
  // },[]);
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        await getCardList();
      };
      if (params?.isRegist) {
        toast.toastEvent();
        navigation.setParams({
          isRegist: false,
        });
      }
      getData();
      navigation.setOptions({
        tabBarLabelStyle: {
          fontSize: 15,
          lineHeight: 21,
          fontFamily: 'Pretendard-SemiBold',
        },
      });
      return () => {
        navigation.setOptions({
          tabBarLabelStyle: {
            fontSize: 15,
            lineHeight: 21,
            fontFamily: 'Pretendard-Regular',
          },
        });
      };
    }, [params?.isRegist]),
  );
  useEffect(() => {
    setSelectMembership(
      Number(
        cardList
          .map(card => {
            if (card.defaultType === 2 || card.defaultType === 3)
              return `${card.id}`;
          })
          .join()
          ?.replace(',', '')
          .toString(),
      ),
    );
  }, [cardList]);
  // if(isCardListLoading){
  //     return <Skeleton />
  // }
  return (
    <Wrapper paddingTop={24} paddingHorizontal={24}>
      <CardRegisteredBox>
        <RegisteredTitleBox>
          <Typography text="Title04SB" textColor={themeApp.colors.grey[2]}>
            <Typography text="Title04SB" textColor={themeApp.colors.blue[500]}>
              대표카드
            </Typography>
            를 선택해 주세요
          </Typography>
        </RegisteredTitleBox>
        <DefaultCardBox>
          <Typography text="Body06R" textColor={themeApp.colors.grey[4]}>
            구매 대표카드
          </Typography>
          <SpotView onPress={onSelectOpenModal}>
            <SpotName>
              {cardList
                .map(card => {
                  if (card.defaultType === 1 || card.defaultType === 3)
                    return `${card.cardCompany}(${card.cardNumber
                      ?.toString()
                      .slice(-4)})`;
                })
                ?.join()
                ?.replace(/,/g, '')
                .toString().length > 1
                ? cardList
                    .map(card => {
                      if (card.defaultType === 1 || card.defaultType === 3)
                        return `${card.cardCompany}(${card.cardNumber
                          ?.toString()
                          .slice(-4)})`;
                    })
                    ?.join()
                    ?.replace(/,/g, '')
                    .toString()
                : '선택'}
            </SpotName>
            <Arrow />
          </SpotView>
        </DefaultCardBox>
        <DefaultCardBox>
          <Typography text="Body06R" textColor={themeApp.colors.grey[4]}>
            멤버십 대표카드
          </Typography>
          <SpotView onPress={onSelectOpenModal2}>
            <SpotName>
              {cardList
                .map(card => {
                  if (card.defaultType === 2 || card.defaultType === 3)
                    return `${card.cardCompany}(${card.cardNumber
                      ?.toString()
                      .slice(-4)})`;
                })
                ?.join()
                ?.replace(/,/g, '')
                .toString().length > 1
                ? cardList
                    .map(card => {
                      if (card.defaultType === 2 || card.defaultType === 3)
                        return `${card.cardCompany}(${card.cardNumber
                          ?.toString()
                          .slice(-4)})`;
                    })
                    .join()
                    ?.replace(/,/g, '')
                    .toString()
                : '선택'}
            </SpotName>
            <Arrow />
          </SpotView>
        </DefaultCardBox>
      </CardRegisteredBox>
      <ButtonBox>
        <Button
          label="결제수단 추가"
          icon="plus"
          onPressEvent={onPageRegistedCard}
        />
      </ButtonBox>
      <BottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="구매 대표카드"
        data={cardSimpleList}
        selected={selectDefault}
        setSelected={onSelectEvent}
        height={200}
      />
      <BottomSheet
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
        title="멤버십 대표카드"
        data={cardSimpleList}
        selected={selectMemebership}
        setSelected={onSelectEvent2}
        // setValue={onSelectEvent2}
        height={200}
      />
      <toast.ToastWrap message={'결제카드가 추가됐어요'} icon={'checked'} />
    </Wrapper>
  );
};

export default Pages;

const CardRegisteredBox = styled.View``;

const RegisteredTitleBox = styled.View`
  margin-bottom: 6px;
`;
const ButtonBox = styled.View`
  position: absolute;
  bottom: 35px;
  align-items: center;
  justify-content: center;
  left: 24px;
`;
const DefaultCardBox = styled.View`
  margin-top: 24px;
`;

const SpotView = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 17px 24px;
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  border-radius: 14px;
  width: 100%;
  margin-top: 8px;
`;
const SpotName = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
