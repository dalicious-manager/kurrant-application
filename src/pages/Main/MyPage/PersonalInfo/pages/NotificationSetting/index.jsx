import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {useCallback} from 'react';
import {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {ActivityIndicator, Alert} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import Toast from '~components/Toast';
import Wrapper from '~components/Wrapper';

import {
  useGetAlramSetting,
  useSetAlramSetting,
} from '../../../../../../hook/useAlram';
import ListBox from '../../ListBox';
export const PAGE_NAME = 'P__MY_PAGE__NOTIFICATION_SETTING';
const Pages = () => {
  const form = useForm();

  const {data: alramData, isSuccess} = useGetAlramSetting();

  const themeApp = useTheme();

  if (!isSuccess) {
    return (
      <LoadingBox>
        <ActivityIndicator size={'large'} color={themeApp.colors.yellow[500]} />
      </LoadingBox>
    );
  }

  return (
    <Wrapper paddingTop={24}>
      <FormProvider {...form}>
        {alramData?.data &&
          alramData?.data.length > 0 &&
          alramData?.data?.map((s, i) => {
            return (
              <ListBox
                key={i}
                title={s.condition}
                toggle={s}
                toggleAgree={s.isActive}
                isArrow={false}
              />
            );
          })}
        {/* <ListBox
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
        /> */}
      </FormProvider>
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
