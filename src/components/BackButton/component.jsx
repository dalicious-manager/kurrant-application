import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import { MaterialIcons } from '../Icon';

/**
 *
 * @param {object} props
 * @param {'page' | 'modal'} props.mode
 * @param {string} color
 * @param {number[]} margin index 0 : margin-left, index 1 : margin-right
 * @returns
 */
const Component = ({ mode = 'page', color, margin = [0, 0] }) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderContents = {
    page: (
      <React.Fragment>
        <MaterialIcons
          name="arrow-back-ios"
          size={24}
          color={color || theme.colors.neutral[900]}
        />
      </React.Fragment>
    ),
    modal: (
      <MaterialIcons
        name="close"
        size={24}
        color={color || theme.colors.neutral[900]}
      />
    ),
  };

  return (
    <Wrpaper margin={margin} onPress={handleBackPress}>
      {renderContents[mode]}
    </Wrpaper>
  );
};

const Wrpaper = styled.TouchableOpacity`
  margin-left: ${({ margin }) => margin[0]}px;
  margin-right: ${({ margin }) => margin[1]}px;
`;

export default Component;
