import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React from 'react';
import {useState} from 'react';
import {useCallback} from 'react';
import {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {ActivityIndicator} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import Toast from '~components/Toast';
import Wrapper from '~components/Wrapper';

import useUserMe from '../../../../../../biz/useUserMe';
import {getStorage, setStorage} from '../../../../../../utils/asyncStorage';
import {formattedDate} from '../../../../../../utils/dateFormatter';
import ListBox from '../../ListBox';
import {PAGE_NAME as MarketingAgreePageName} from '../MarketingAgree';
export const PAGE_NAME = 'P__MY_PAGE__NOTIFICATION_SETTING2';
const Pages = () => {
  const form = useForm();
  const {
    alarmLookup,
    alarmSetting,
    setAlarm,
    setAgree,
    readableAtom: {alarm, isAlarmSettingLoading, agree},
  } = useUserMe();
  const navigation = useNavigation();
  const [toggleData, setToggleData] = useState([]);

  const {watch} = form;
  const themeApp = useTheme();
  const toast = Toast();
  const toast2 = Toast();
  const toast3 = Toast();

  const alarmAgree = useCallback(async () => {
    const marketingAlarm = watch('marketingAlarm');
    const orderAlarm = watch('orderAlarm');
    await alarmSetting({
      isMarketingAlarmAgree: marketingAlarm,
      isOrderAlarmAgree: orderAlarm,
      isMarketingInfoAgree: false,
    });
    setAgree(marketingAlarm || orderAlarm);
    if (marketingAlarm && orderAlarm) {
      toast.toastEvent();
    } else if (!marketingAlarm && !orderAlarm) {
      toast.toastEvent();
    } else {
      toast2.toastEvent();
    }
    // await getAlarm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const alarmAgree3 = useCallback(async () => {
    const marketingAlarm = watch('marketingAlarm');
    const orderAlarm = watch('orderAlarm');
    await alarmSetting({
      isMarketingAlarmAgree: marketingAlarm,
      isOrderAlarmAgree: orderAlarm,
      isMarketingInfoAgree: false,
    });
    setAgree(marketingAlarm || orderAlarm);
    if (marketingAlarm && orderAlarm) {
      toast.toastEvent();
    } else if (!marketingAlarm && !orderAlarm) {
      toast.toastEvent();
    } else {
      toast3.toastEvent();
    }
    // await getAlarm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getAlarm = useCallback(async () => {
    const result = await alarmLookup();
    setToggleData([
      {
        isToggle: true,
        toggleName: 'marketingAlarm',
        toggleEvent: name => alarmAgree(name),
      },
      {
        isToggle: true,
        toggleName: 'orderAlarm',
        toggleEvent: name => alarmAgree(name),
      },
      {
        isToggle: true,
        toggleName: 'marketingAgree',
        toggleEvent: name => alarmAgree(name),
      },
    ]);
    setAlarm({
      marketingAgreedDateTime: result.data.marketingAgreedDateTime,
      isMarketingInfoAgree: result.data.marketingAgree,
      isMarketingAlarmAgree: result.data.marketingAlarm,
      isOrderAlarmAgree: result.data.orderAlarm,
    });
    setAgree(result.data.marketingAlarm || result.data.orderAlarm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isLoading = isAlarmSettingLoading;
  useEffect(() => {
    const getData = async () => {
      await getAlarm();
      const checked = await getStorage('isMarketing');
      if (checked === 'true' || checked === 'false') {
        toast.toastEvent();
        await setStorage('isMarketing', '');
      }
    };
    getData();
  }, []);

  return (
    <Wrapper paddingTop={24}>
      <FormProvider {...form}>
        <ListBox
          title="혜택 및 소식 알림"
          toggle={toggleData[0]}
          toggleAgree={alarm.isMarketingAlarmAgree}
          isArrow={false}
        />
        <ListBox
          title="주문 알림"
          toggle={toggleData[1]}
          toggleAgree={alarm.isOrderAlarmAgree}
          isArrow={false}
        />
        <ListBox
          title="마케팅 정보 수신 동의"
          description={agree ? '동의함' : '철회함'}
          onPressEvent={() => {
            navigation.navigate(MarketingAgreePageName, {
              alarm: alarm,
            });
          }}
        />
      </FormProvider>
      <toast.ToastWrap
        message={`${formattedDate(new Date(), '년월일')}\n${
          agree
            ? '커런트 마케팅 정보 수신에 동의했어요.'
            : '커런트 마케팅 정보 수신 동의를 철회했어요.'
        }`}
        isBottom={true}
      />
      <toast2.ToastWrap
        message={`${formattedDate(new Date(), '년월일')}\n${
          watch('marketingAlarm')
            ? '혜택 및 소식 알림 정보 수신에 동의했어요.'
            : '혜택 및 소식 정보 수신 동의를 철회했어요.'
        }`}
        isBottom={true}
      />
      <toast3.ToastWrap
        message={`${formattedDate(new Date(), '년월일')}\n${
          watch('orderAlarm')
            ? '주문 알림 정보 수신에 동의했어요.'
            : '주문 알림 정보 수신 동의를 철회했어요.'
        }`}
        isBottom={true}
      />
      {isLoading && (
        <LoadingBox>
          <ActivityIndicator
            size={'large'}
            color={themeApp.colors.yellow[500]}
          />
        </LoadingBox>
      )}
    </Wrapper>
  );
};

export default Pages;

const LoadingBox = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
  opacity: 0.8;
`;
