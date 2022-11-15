import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
// TODO:
// Padding
// padding toggle props 추가
// padding style 추가

/**
 *
 * @param {object} props
 * @param {number} props.paddingVertical
 * @param {number} props.paddingTop
 * @param {object} props.children
 */

const Component = ({
  children,
  styles,
  paddingHorizontal = 0,
  paddingTop = 0,
  ...rest
}) => {
  return (
    <Wrap
      style={styles}
      paddingHorizontal={paddingHorizontal}
      paddingTop={paddingTop}>
      <SafeAreaView>{children}</SafeAreaView>
    </Wrap>
  );
};

const Wrap = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.neutral[0]};
  padding: ${({paddingTop}) => paddingTop}px
    ${({paddingHorizontal}) => paddingHorizontal}px 0;
`;

export default Component;
