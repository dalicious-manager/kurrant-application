import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Search from './Search';
import styled from 'styled-components';
import Location from './Location';
import Typography from '../../components/Typography';
import {useCallback, useEffect, useState} from 'react';
import AddressList from './components/AddressList';
import NoResult from './components/NoResult';
import {useAtom} from 'jotai';
import {userLocationAtom} from '../../utils/store';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {mapApis} from '../../api/map';

export const PAGE_NAME = 'MAP_SEARCH_RESULT';
const SearchResult = () => {
  const navigation = useNavigation();
  const [screen, setScreen] = useState(true);
  const [data, setData] = useState([]);
  const [initCenter, setInitCenter] = useAtom(userLocationAtom);
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState('');

  const searchPress = async () => {
    const res = await mapApis.searchObject(text);
    setScreen(false);
    setData(res);
    setFocus(false);
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     setData(null);
  //   }, [data]),
  // );
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
          navigation.goBack();
        }}>
        <Location setInitCenter={setInitCenter} />
      </Contents>

      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setFocus(false);
          console.log('ㄴㄴ');
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
          ) : (
            <AddressList setFocus={setFocus} data={data} />
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
