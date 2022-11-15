import React, {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {ActivityIndicator, Text} from 'react-native';
import styled from 'styled-components';

import useBanner from '../biz/useBanner';
import AlamRow from '../components/AlamRow';
import BidRow from '../components/BidRow';
import ButtonSns from '../components/ButtonSns';
import FileUpload from '../components/FileUpload';
import Star from '../components/Icon/_components/Star';
import NotiBar from '../components/NotiBar';
import OrderBookRow from '../components/OrderBookRow';
import Search from '../components/Search';
import Select from '../components/Select';

export const PAGE_NAME = 'P_MAIN__BNB__SELL';

const Pages = () => {
  const {readableAtom: bannerReadableAtom, findBanners} = useBanner();
  const {isLoading: bannerIsLoading} = bannerReadableAtom;
  const form = useForm();

  useEffect(() => {
    async function loadBanners() {
      await findBanners();
    }

    loadBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (bannerIsLoading) {
    return (
      <Wrap>
        <ActivityIndicator />
      </Wrap>
    );
  }

  const bidRowInfoSell = {
    left: {
      top: '[1]',
      bottom: '-500,792',
      unit: 'KRW',
    },
    right: {
      currentValue: 477.733,
      maxValue: 500.0,
    },
  };

  const bidRowInfoBuy = {
    left: {
      top: 0.00000375,
      bottom: 122,
      unit: 'KRW',
    },
    right: {
      currentValue: 477.733,
      total: 500.0,
    },
  };

  return (
    <Wrap>
      <Wrapper showsVerticalScrollIndicator={false}>
        <Text>hello world</Text>
        <FormProvider {...form}>
          <Search />
          <Select name="test" vaebase lue="[KR] 대한민국 KOREA" />
          <AlamRow />
          <Star name={'star1'} interests={true} />
          <Star name={'star2'} interests={false} />
        </FormProvider>
        <NotiBar
          category="공지"
          message="[거래]라이트코인(LTC)거래지원 종료 안내(06/20 10.00)"
        />
        <OrderBookRow
          type="selling"
          count={0.00000375}
          amount={122}
          unit="KRW"
          graphMaxValue={150}
          graphCurrentValue={145.508}
        />
        <OrderBookRow
          type="buying"
          count={0.00000375}
          amount={122}
          unit="KRW"
          graphMaxValue={150}
          graphCurrentValue={72.254}
        />
        <BidRow type="selling" visual="graph" info={bidRowInfoSell} />
        <BidRow type="buying" visual="graph" info={bidRowInfoSell} />
        <BidRow type="selling" visual="percentage" info={bidRowInfoBuy} />
        <BidRow type="buying" visual="percentage" info={bidRowInfoBuy} />
      </Wrapper>
      <ButtonSns
        onPress={() => {
          console.log(' 보여라 콘솔 ');
        }}
      />
      <FileUpload />
    </Wrap>
  );
};
2;
const Wrap = styled.SafeAreaView`
  background-color: ${({theme}) => theme.colors.neutral[0]};
`;
const Wrapper = styled.ScrollView``;

export default Pages;
