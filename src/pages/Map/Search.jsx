import {View, Text, TextInput} from 'react-native';
import styled from 'styled-components';
import FindIcon from '../../assets/icons/Map/find.svg';
import DeleteIcon from '../../assets/icons/Map/delete.svg';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useState} from 'react';

const Search = ({focus, setFocus, searchPress, text, setText}) => {
  const deleteButton = () => {
    setText('');
    console.log('누름');
  };

  return (
    <Wrap>
      <Icon />
      <Input
        value={text}
        onChangeText={text => setText(text)}
        onSubmitEditing={searchPress}
        autoFocus={true}
        focus={focus}
        placeholder="지번, 도로명, 건물명으로 검색"
        placeholderTextColor="#88888E"
        onFocus={() => setFocus(true)}
      />

      {(focus || text !== '') && (
        <DeleteButton onPress={deleteButton}>
          <DeleteIcon />
        </DeleteButton>
      )}
    </Wrap>
  );
};

export default Search;

const Wrap = styled.View`
  padding: 0px 24px;

  margin-top: 8px;
`;

const Input = styled.TextInput`
  background-color: ${({theme}) => theme.colors.grey[8]};
  padding: ${({focus}) => (focus ? '11px 27px' : '11px 28px')};
  border-radius: 8px;
  height: 44px;
  font-size: 14px;
  font-family: 'Pretendard-Regular';
  color: ${({theme}) => theme.colors.grey[2]};
  align-items: center;
  border: ${({focus}) => (focus ? '2px solid #3478F6' : '#F5F5F5')};
  box-sizing: border-box;
`;

const Icon = styled(FindIcon)`
  position: absolute;
  bottom: 14px;
  left: 32px;
  z-index: 1;
`;

const DeleteButton = styled.Pressable`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 32px;
  bottom: 6px;
  align-items: flex-end;
  justify-content: center;
`;
