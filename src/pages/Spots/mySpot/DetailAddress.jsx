import {View, Text, Keyboard} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../components/Typography';
import {FormProvider, useForm} from 'react-hook-form';
import SpotTextInput from '../../../components/SpotTextInput';
import Icon from '../../../assets/icons/Map/map.svg';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {PAGE_NAME as MySpotMapPage} from '../../Map/MySpotMap';
import {PAGE_NAME as NotDeliveryPage} from '../../Spots/mySpot/NotDelivery';

export const PAGE_NAME = 'MY_SPOT_DETAIL';
const DetailAddress = ({route}) => {
  const navigation = useNavigation();
  const center = route?.params?.center; // 좌표
  const address = route?.params?.address; // 지번 주소
  const roadAddress = route?.params?.roadAddress; // 도로명 주소
  const showAddress = route?.params?.showAddress; // true면 지번주소로 넘어온거
  const zipcode = route?.params?.zipcode;

  const form = useForm({
    mode: 'all',
  });

  const {
    formState: {errors},
    watch,
    handleSubmit,
    setValue,
  } = form;

  const detailAddress = watch('detailAddress');
  const nickNameAddress = watch('nickNameAddress');

  const onSaveAddress = () => {
    const data = {
      detail: detailAddress,
      nickName: nickNameAddress,
    };
    console.log(data);
    navigation.navigate(NotDeliveryPage);
  };

  return (
    <Wrap onPress={() => Keyboard.dismiss()}>
      <SpotName>{showAddress ? address : roadAddress}</SpotName>
      <AddressWrap>
        <Label>
          <LabelText>도로명</LabelText>
        </Label>
        <Address>{roadAddress}</Address>
      </AddressWrap>
      <InputWrap>
        <FormProvider {...form}>
          <SpotTextInput
            label="상세 주소 입력"
            name="detailAddress"
            placeholder="예. 3층 / 302호"
          />
          <SpotTextInput
            label="주소 별명 입력"
            name="nickNameAddress"
            placeholder="예. 우리 집 / 회사"
            style={{paddingTop: 24}}
          />
        </FormProvider>
      </InputWrap>
      <CheckMapWrap
        onPress={() =>
          navigation.navigate(MySpotMapPage, {
            center: center,
          })
        }>
        <Icon />
        <CheckMapText>지도에서 위치 확인</CheckMapText>
      </CheckMapWrap>
      <ButtonWrap>
        <Button
          label="주소 저장"
          onPressEvent={form.handleSubmit(onSaveAddress)}
        />
      </ButtonWrap>
    </Wrap>
  );
};

export default DetailAddress;

const Wrap = styled.Pressable`
  flex: 1;
  background-color: white;
  padding: 24px 24px 0px 24px;
`;

const SpotName = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const Address = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const Label = styled.View`
  background-color: ${({theme}) => theme.colors.grey[8]};
  padding: 3px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-right: 8px;
`;

const AddressWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;
const LabelText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const InputWrap = styled.View`
  margin-top: 25px;
`;

const CheckMapWrap = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
`;
const CheckMapText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[2]};
  padding-left: 9px;
`;

const ButtonWrap = styled.View`
  position: absolute;
  bottom: 35px;

  left: 20px;
`;
