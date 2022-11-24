import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {PAGE_NAME as SignUpPage} from '../../pages/Main/Bnb/SignUp/SelectUserType';
import Button from '../Button';
import TextInput from '../TextInput';

const Component = () => {
  const navigation = useNavigation();
  const labelItems = [
    {label: '회원가입', route: SignUpPage},
    {label: '|', route: null},
    {label: '아이디 찾기', route: null},
    {label: '|', route: null},
    {label: '비밀번호 찾기', route: null},
  ];

  const renderLabels = labelItems.map((labelItem, index) => {
    const handleRoutePress = () => {
      navigation.navigate(labelItem.route ?? '');
    };
    return (
      <TouchableOpacity key={index} onPress={handleRoutePress}>
        <Text style={styles.label}>{labelItem.label}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <TextInput name="email" placeholder="이메일" style={styles.input} />
      <TextInput name="password" placeholder="비밀번호" style={styles.input} />
      <View style={styles.buttonContainer}>
        <Button label="로그인" />
      </View>
      <View style={styles.labelContainer}>{renderLabels}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 24,
  },
  labelContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 64,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#424242',
    marginHorizontal: 4,
  },
});

export default Component;
