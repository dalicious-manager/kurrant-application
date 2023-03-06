import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import styled, {useTheme} from 'styled-components/native';
import useUserMe from '~biz/useUserMe';
import Arrow from '~assets/icons/Group/arrowDown.svg';
import BottomSheet from '~components/BottomSheet';
import Button from '~components/Button';
import Typography from '~components/Typography';
import Wrapper from '~components/Wrapper';
import {SCREEN_NAME as RegisterCardScreenName} from '~screens/Main/RegisterCard';
import Skeleton from './Skeleton';

export const PAGE_NAME = 'P__MY_PAGE__SELECTED_DEFAULT_CARD';

const Pages = () => {
  const themeApp = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible2, setModalVisible2] = useState(false);

  const navigation = useNavigation();
  const {
    getCardList,
    cardSetting,
    setCardList,
    readableAtom: {cardList, cardSimpleList, isCardListLoading},
  } = useUserMe();
  const onSelectEvent = async (text, id) => {
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
    setModalVisible(true);
  };
  const onSelectOpenModal2 = () => {
    setModalVisible2(true);
  };

  const onPageRegistedCard = () => {
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
    }, []),
  );
  useEffect(() => {
    setSelectMembership(
      Number(
        cardList
          .map(card => {
            console.log(card);
            if (card.defaultType === 2 || card.defaultType === 3)
              return `${card.id}`;
          })
          .join()
          .replace(',', '')
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
        {/* <DefaultCardBox>
                    <Typography text="Body06R" textColor={themeApp.colors.grey[4]}>구매 대표카드</Typography>
                    <SpotView onPress={onSelectOpenModal}>
                        <SpotName>
                        {cardList.map((card)=>{
                            if(card.defaultType ===1 || card.defaultType ===3) return `${card.cardCompany}카드(${card.cardNumber?.toString().slice(-4)})`
                        })?.join().replace(",","").toString().length > 1 ? cardList.map((card)=>{
                            if(card.defaultType ===1 || card.defaultType ===3) return `${card.cardCompany}카드(${card.cardNumber?.toString().slice(-4)})`
                        })?.join().replace(",","").toString() : "선택" }
                        </SpotName>
                        <Arrow/>
                    </SpotView>
                </DefaultCardBox> */}
        <DefaultCardBox>
          <Typography text="Body06R" textColor={themeApp.colors.grey[4]}>
            멤버십 대표카드
          </Typography>
          <SpotView onPress={onSelectOpenModal2}>
            <SpotName>
              {cardList
                .map(card => {
                  if (card.defaultType === 2 || card.defaultType === 3)
                    return `${card.cardCompany}카드(${card.cardNumber
                      ?.toString()
                      .slice(-4)})`;
                })
                ?.join()
                .replace(',', '')
                .toString().length > 1
                ? cardList
                    .map(card => {
                      if (card.defaultType === 2 || card.defaultType === 3)
                        return `${card.cardCompany}카드(${card.cardNumber
                          ?.toString()
                          .slice(-4)})`;
                    })
                    .join()
                    .replace(',', '')
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
        setValue={onSelectEvent}
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
