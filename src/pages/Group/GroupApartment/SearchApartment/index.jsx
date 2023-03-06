import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Keyboard, Pressable} from 'react-native';
import styled from 'styled-components/native';

import Search from '../../../../assets/icons/Group/search.svg';
import SearchArrow from '../../../../assets/icons/Group/searchArrow.svg';
import useApartApplication from '../../../../biz/useApartApplication/hook';
import RefTextInput from '../../../../components/RefTextInput';
import Typography from '../../../../components/Typography';
import {PAGE_NAME as AddpartmentPageName} from '../SearchApartment/AddApartment';

export const PAGE_NAME = 'P__GROUP__APARTMENT__SEARCH';
const Pages = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [touch, setTouch] = useState();
  const {apartSearch, isApartSearch} = useApartApplication();

  const form = useForm({
    mode: 'all',
  });

  const {
    formState: {errors},
    watch,
    handleSubmit,
  } = form;

  const searchChk = watch('apartName');

  const handleChange = e => {
    setSearchTerm(e.nativeEvent.text);
  };

  const filtered = isApartSearch?.filter(itemList => {
    return itemList.name.includes(searchTerm);
  });

  useEffect(() => {
    async function LoadList() {
      await apartSearch();
    }
    LoadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrap>
      <FormProvider {...form}>
        <KeyDismiss onPress={() => Keyboard.dismiss()}>
          <Container>
            <SearchIcon />

            <RefTextInput
              label="단체명/장소명"
              name="apartName"
              placeholder="단체명/장소명"
              padding="4px 8px 4px 30px"
              onChange={e => handleChange(e)}
            />
          </Container>

          <ResultScrollView>
            {searchTerm !== '' &&
              filtered.map(el => {
                return (
                  <ResultView key={el.id}>
                    <Pressable
                      onPress={() => {
                        setTouch(el.id);
                        navigation.navigate(AddpartmentPageName, {data: el});
                      }}>
                      {el.name.includes(searchTerm) ? (
                        <ApartName>
                          {el.name.split(searchTerm)[0]}
                          <SearchText>{searchTerm}</SearchText>
                          {el.name.split(searchTerm)[1]}
                        </ApartName>
                      ) : (
                        <ApartName>{el.name}</ApartName>
                      )}
                      <ApartAddress>{el.address}</ApartAddress>
                    </Pressable>
                    <SearchArrow />
                  </ResultView>
                );
              })}
          </ResultScrollView>

        </KeyDismiss>
      </FormProvider>
    </Wrap>
  );
};

export default Pages;

const Wrap = styled.View`
  background-color: ${({theme}) => theme.colors.grey[0]};
  flex: 1;
`;
const KeyDismiss = styled.Pressable`
  flex: 1;
`;
const Container = styled.View`
  margin: 0px 24px;
  margin-top: 72px;
  position: relative;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  bottom: 6px;
  z-index: 99;
`;

const ResultView = styled.View`
  margin: 8px 28px 8px 56px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;
const ResultScrollView = styled.ScrollView``;

const ApartName = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const ApartAddress = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[5]};
`;

const SearchText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.blue[500]};
`;
