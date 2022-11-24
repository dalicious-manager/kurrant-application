import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';

import Login from '../../../../../components/Login';
export const PAGE_NAME = 'P_LOGIN__MODAL__CORPERATION_LOGIN';

const Pages = () => {
  const form = useForm();

  return (
    <View style={styles.container}>
      <FormProvider {...form}>
        <Login />
      </FormProvider>
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
});

export default Pages;
