import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import useUserMe from '~biz/useUserMe';

import BottomSheet from '~components/BottomSheet/component';
import Button from '~components/Button';
import Typography from '~components/Typography';
import Wrapper from "~components/Wrapper";
import { SCREEN_NAME as RegisterCardScreenName} from '~screens/Main/RegisterCard/';
import RegisteredBox from './RegisteredBox';
import Check from '~components/Check';
import Form from '~components/Form';
import { useForm } from 'react-hook-form';
import { Dimensions, ScrollView } from 'react-native';

export const PAGE_NAME = "P__MEMBERSHIP__PAYMENT_MANAGE";
const windowHeight = Dimensions.get('window').height;
const Pages = ()=>{
    const themeApp = useTheme();
    const [modalVisible, setModalVisible]=useState(false);
    const data=[
        {id:0,text:'신용/체크카드'},
        // {id:1,text:'은행 계좌'},
    ]
    const agreeCheck = useForm();
    const navigation = useNavigation();
    const {getCardList,cardSetting,setSelectMembershipCard,readableAtom:{cardList,selectMembershipCard}} = useUserMe();
    const [selectNowCard ,setNowCard] = useState(selectMembershipCard)
    const onSelectEvent=()=>{
        navigation.navigate(RegisterCardScreenName,{
            defaultType:2
        })
    }
    const onSelectComplateEvent=async()=>{;
        if(agreeCheck.watch(agreeCheck).agreeCheck){
            await onSelectCard(selectNowCard[0]?.id)
        }
        setSelectMembershipCard(selectNowCard);
        navigation.goBack()
    }
    const onSelectCard = async(id)=>{
        const req ={
            "cardId": id,
            "defaultType": 2
        }
        await cardSetting(req);        
    }
    useEffect(()=>{
        const getData  = async()=>{
            await getCardList();
        }
        getData();
    },[])
    return(
        <Wrapper paddingTop={24} >
            <InfoBox>
                <InfoText text={'CaptionR'} textColor={themeApp.colors.grey[4]}>매월/매년 결제일자 마다 선택하신 결제 수단으로 자동결제가 이루어집니다.{'\n'}결제수단 삭제는 <InfoTextEffect text={'CaptionR'} textColor={themeApp.colors.grey[4]}>마이페이지&gt;결제수단 관리</InfoTextEffect>에서 가능합니다.</InfoText>
            </InfoBox>
            <CardRegisteredBox>
                <RegisteredTitleBox >
                    <Typography text='Title04SB' textColor={themeApp.colors.grey[2]}><Typography text='Title04SB' textColor={themeApp.colors.blue[500]}>결제카드</Typography>를 선택해 주세요</Typography>
                    <RegisterCardButton onPress={onSelectEvent}>
                        <Typography text="Button10SB" textColor={themeApp.colors.grey[3]}>
                            신규 카드 등록
                        </Typography>
                    </RegisterCardButton>
                </RegisteredTitleBox>
                {cardList?.length > 0 ? <CardListView>
                    {cardList.map((v)=>{
                        return (
                            <RegiteredView key={v.id} onPress={()=>setNowCard([v])}>
                                <RegisteredBox cardName={`${v.cardCompany}카드`}  cardNumber={v.cardNumber} isMembership={v.defaultType === 2 || v.defaultType===3} isDefault={false} isSelected={v.id === selectNowCard[0]?.id}/>
                            </RegiteredView>
                        )
                    })}
                    
                    </CardListView>
                    :<NonCard>
                        <Typography text="Body05R" textColor={themeApp.colors.grey[5]}>아직 등록된 결제 수단이 없어요</Typography>
                    </NonCard>
                    }
            </CardRegisteredBox>
            
            <ButtonBox>
                <FormWrap>
                    <Form form={agreeCheck}>
                        <Check name="agreeCheck" value={true}>
                            <Label text='Body06R'>기본 결제수단으로 사용</Label>
                        </Check>
                    </Form>
                </FormWrap>
                <Button
                    label='선택 완료' 
                    onPressEvent={onSelectComplateEvent}
                />
            </ButtonBox>
            <BottomSheet 
                modalVisible={modalVisible} setModalVisible={setModalVisible} title="결제수단 추가" data={data} setValue={onSelectEvent} height={200}/>
        </Wrapper>
    )
}

export default Pages;

const CardRegisteredBox = styled.View`
    padding-left: 4px;
    padding-right: 4px;
`
const RegisteredTitleBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
    padding-left: 24px;
    padding-right: 24px;
`
const RegiteredView = styled.Pressable`
    margin-top: 6px;
    margin-bottom: 6px;
`
const InfoBox = styled.View`
    margin-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
`
const InfoText = styled(Typography)`
`
const Label = styled(Typography)`
  color: ${({theme}) => theme.colors.grey[4]};
`;
const InfoTextEffect = styled(Typography)`
    text-decoration: underline;
`
const ButtonBox = styled.View`
    padding-left: 20px;
    padding-right: 20px;
    position: absolute;
    bottom:35px;
    justify-content: center;
    background-color: white;
    height: 115px;
`
const CardListView = styled(ScrollView)`
    margin-bottom: 290px;
    padding-left: 24px;
    padding-right: 24px;
`
const FormWrap = styled.View`
    margin-top: 18px;
    margin-bottom: 0px;
`;
const RegisterCardButton = styled.Pressable`
    border-radius :100px;
    border: 1px solid ${({theme})=> theme.colors.grey[7]};
    padding: 6.5px 16px;
`
const NonCard = styled.View`
    height: ${windowHeight/2}px;
    justify-content: center;
    align-items: center;
`