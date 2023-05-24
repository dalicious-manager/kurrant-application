import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styled, {useTheme} from 'styled-components/native';

import EmailIcon from '../../assets/icons/email.svg';
import PasswordIcon from '../../assets/icons/password.svg';
import {PAGE_NAME as FindIdPageName} from '../../pages/Main/Login/FindUser/FindId';
import {PAGE_NAME as FindPasswordPageName} from '../../pages/Main/Login/FindUser/FindPassword';
import Typography from '../Typography';

/**
 *
 * @param {object} props
 * @returns
 */

const Component = () => {
  const navigation = useNavigation();
  const themeApp = useTheme();
  const labelItems = [
    {
      label: '아이디(이메일)을 잊어버렸어요',
      route: FindIdPageName,
      icon: 'email',
    },
    {
      label: '비밀번호를 잊어버렸어요',
      route: FindPasswordPageName,
      icon: 'password',
    },
  ];

  const renderLabels = labelItems.map((labelItem, index) => {
    const handleRoutePress = () => {
      navigation.navigate(labelItem.route ?? '');
    };
    const Icon = () => {
      switch (labelItem.icon) {
        case 'email':
          return <EmailIcon />;

        case 'password':
          return <PasswordIcon />;
      }
    };
    return (
      <Wrapper key={index} onPress={handleRoutePress}>
        <IconWrap>
          <Icon />
        </IconWrap>
        <Typography text={'Body05R'} textColor={themeApp.colors.grey[2]}>
          {labelItem.label}
        </Typography>
      </Wrapper>
    );
  });
  return <RegisterLabel>{renderLabels}</RegisterLabel>;
};

export default Component;

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  padding-top: 17px;
  padding-bottom: 17px;
  border-radius: 14px;
  border: ${({theme}) => `1px solid ${theme.colors.grey[7]}`};
  align-items: center;
  margin: 8px 24px;
  box-sizing: border-box;
`;
const RegisterLabel = styled.View``;

const IconWrap = styled.View`
  align-items: flex-start;
  margin-left: 16px;
  margin-right: 16px;
`;
