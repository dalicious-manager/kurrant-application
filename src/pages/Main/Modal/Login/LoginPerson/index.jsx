import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {View, StyleSheet} from 'react-native';

import ButtonSns from '../../../../../components/ButtonSns';
import Login from '../../../../../components/Login';
export const PAGE_NAME = 'P_LOGIN__MODAL__PERSON_LOGIN';

const Pages = () => {
  const form = useForm();
  return (
    <View style={styles.container}>
      <FormProvider {...form}>
        <Login />
      </FormProvider>
      <View style={styles.buttonContainer}>
        <ButtonSns type_sns="kakao" />
        <ButtonSns type_sns="apple" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    height: 105,
  },
});

export default Pages;
