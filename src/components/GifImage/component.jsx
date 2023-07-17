import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import styled from 'styled-components/native';

const GifContainer = styled(View)`
  flex: 1;
  ${props => props.style}
`;

const GifImage = ({source, style}) => {
  return (
    <GifContainer style={style}>
      <WebView
        source={{
          html: `<img src="${source}" alt="gif" style="width: 100%; height: 100%;" />`,
        }}
        javaScriptEnabled
        style={styles.webView}
      />
    </GifContainer>
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});

export default GifImage;
