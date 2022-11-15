import React, {useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

import Typography from '../../../../../components/Typography';
const TabBar = ({state, descriptors, navigation, position}) => {
  const appTheme = useTheme();
  return (
    <TabBarContainer>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const title = options?.title ?? '';

        const isFocused = state.index === index;

        const handleTitlePress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const animationContainerStyles = {
          borderBottomColor: isFocused
            ? appTheme.colors.purple[500]
            : appTheme.colors.neutral[0],
        };
        const animationTypographyStyles = {
          color: isFocused
            ? appTheme.colors.purple[500]
            : appTheme.colors.neutral[400],
        };

        return (
          <TabBarTitleContainer
            style={animationContainerStyles}
            onPress={handleTitlePress}
            key={index}>
            <Typography
              variant="h600"
              weight="B"
              style={animationTypographyStyles}>
              {title}
            </Typography>
          </TabBarTitleContainer>
        );
      })}
    </TabBarContainer>
  );
};

const TabBarContainer = styled.View`
  width: 100%;
  max-width: 131px;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto 24px;
`;

const TabBarTitleContainer = styled.TouchableOpacity`
  padding-bottom: 8px;
  border-bottom-width: 2px;
`;

export default TabBar;
