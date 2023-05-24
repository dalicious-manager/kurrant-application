/* eslint-disable import/order */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect} from 'react';
import styled, {useTheme} from 'styled-components/native';

import Button from '~components/Button';
import Typography from '~components/Typography';
import Wrapper from '~components/Wrapper';

import useFAQ from '../../../../../biz/useFAQ';
import ListBox from '../ListBox';
export const PAGE_NAME = 'P__MY_PAGE__FAQ__LIST';
import {FAQListDetailPageName} from '../FAQListDetailPage';
const Pages = ({route}) => {
  const themeApp = useTheme();
  const {page} = route?.params;
  const {
    readableAtom: {FAQ},
  } = useFAQ();
  const navigation = useNavigation();
  const list = FAQ.filter(v => {
    return v.titleNo === page;
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${list[0].title}`,
    });
  }, [navigation]);

  console.log(list);
  return (
    <Wrapper paddingTop={13}>
      <TitleBox>
        <Typography text={'Title02SB'} textColor={themeApp.colors.grey[2]}>
          {list[0].title}
        </Typography>
      </TitleBox>
      {list[0].question &&
        list.map(v => {
          return (
            <ListBox
              key={v.id}
              title={v.question}
              onPressEvent={() => {
                navigation.navigate(FAQListDetailPageName, {
                  FAQData: v,
                });
              }}
            />
          );
        })}
    </Wrapper>
  );
};

export default Pages;

const TitleBox = styled.View`
  padding: 13px 24px;
  margin-bottom: 7px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const TitleBtnBox = styled.View`
  min-width: 106px;
  max-width: 110px;
  margin-left: 82px;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
