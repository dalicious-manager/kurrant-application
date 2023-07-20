import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components';

import Typography from '~components/Typography';

const EllipsizedTextByCharLength = ({textContent, maxLength}) => {
  const shouldTruncate = textContent.length > maxLength;
  const truncatedText = shouldTruncate
    ? textContent.substring(0, maxLength) + '...'
    : textContent;

  return (
    <View>
      <TextText
        numberOfLines={1}
        ellipsizeMode={shouldTruncate ? 'tail' : 'clip'}>
        {truncatedText}
      </TextText>
    </View>
  );
};

export default EllipsizedTextByCharLength;

const TextText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin: 1px 0;
  /* margin-left: 1px; */

  /* flex: 1; */
  /* border: 1px solid black; */
  /* max-width: 182px; */
  /* ${({maxWidth}) => {
    if (maxWidth) {
      return `max-width: ${maxWidth}px`;
    }
  }} */
`;
