import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styled from 'styled-components';

import AddressList from './components/AddressList';
import AddressShareSpotList from './components/AddressShareSpotList';
import NoResult from './components/NoResult';
import Location from './Location';
import Search from './Search';
import {PAGE_NAME as ShareSpotMapPage} from './ShareSpotMap';
import {mapApis} from '../../api/map';
import {shareSpotApis} from '../../api/shareSpot';
import Typography from '../../components/Typography';
import {userLocationAtom} from '../../utils/store';

export const PAGE_NAME = 'MAP_SEARCH_RESULT';
const SearchResult = ({route}) => {
  const type = route?.params?.name;
  const navigation = useNavigation();
  const [screen, setScreen] = useState(true); // 검색 결과 유무 전환
  const [data, setData] = useState([]);
  const [initCenter, setInitCenter] = useAtom(userLocationAtom);
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState('');

  const searchPress = async () => {
    if (type === 'mySpot' || type === 'registerSpot') {
      const res = await mapApis.searchObject(text);
      console.log(res, 'res');
      setScreen(false);
      setData(res);
    } else {
      const res = await shareSpotApis.searchShareSpot();
      const filterData = res.data.filter(
        el =>
          el.address.replace(/ /g, '').includes(text.replace(/ /g, '')) ||
          el.jibunAddress.replace(/ /g, '').includes(text.replace(/ /g, '')),
      );
      setScreen(false);
      setData(filterData);
    }
    setFocus(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:
        type === 'mySpot' || type === 'registerSpot'
          ? '주소 검색'
          : '공유 스팟 찾기',
    });
  }, []);
  console.log(type, 'type');
  return (
    <Wrap>
      <View>
        <Search
          setFocus={setFocus}
          focus={focus}
          searchPress={searchPress}
          text={text}
          setText={setText}
        />
      </View>
      <Contents
        onTouchEnd={e => {
          e.stopPropagation();
          type === 'mySpot' || type === 'registerSpot'
            ? navigation.goBack()
            : navigation.navigate(ShareSpotMapPage);
        }}>
        <Location setInitCenter={setInitCenter} />
      </Contents>

      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setFocus(false);
        }}>
        <View style={{flex: 1}}>
          {/* 디폴드화면 */}

          {screen && (
            <ContentWrap>
              <ExampleText>이렇게 검색해보세요</ExampleText>
              <View style={{marginTop: 8}}>
                <Title>・ 도로명 + 건물번호</Title>
                <TitleExample> 예 {')'} 커런트 11길 1</TitleExample>
                <Title>・ 지역명 + 번지</Title>
                <TitleExample> 예 {')'} 커런트 11-1</TitleExample>
                <Title>・ 건물명,아파트명</Title>
                <TitleExample> 예 {')'} 커런트 아파트 111동</TitleExample>
              </View>
            </ContentWrap>
          )}

          {/* 검색 결과 있음 */}
          {!screen && data?.length === 0 ? (
            <NoResult />
          ) : type === 'mySpot' || type === 'registerSpot' ? (
            <AddressList setFocus={setFocus} data={data} type={type} />
          ) : (
            <AddressShareSpotList setFocus={setFocus} data={data} text={text} />
          )}
        </View>
      </TouchableWithoutFeedback>
    </Wrap>
  );
};

export default SearchResult;

const Wrap = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.grey[0]};
`;

const ContentWrap = styled.View`
  height: 100%;
  padding: 32px 24px;
  background-color: ${({theme}) => theme.colors.grey[8]};
`;

const ExampleText = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const Title = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const TitleExample = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  padding-left: 20px;
  margin-bottom: 4px;
`;

const Contents = styled.View`
  border-bottom: 1px solid;
  border-bottom-width: 6px;
  border-color: ${({theme}) => theme.colors.grey[8]};
`;
