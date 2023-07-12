import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Alert,
  SafeAreaView,
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components';

import XIcon from './icon/x.svg';
import Typography from '../Typography';

const windowWidth = Dimensions.get('window').width;

const Component = ({text, title}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Wrap>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <InnerWrap style={styles.container}>
          <IconWrap
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <XIcon />
          </IconWrap>
          <View>
            <TextType>{text}</TextType>
          </View>
        </InnerWrap>
      </Modal>
      <TitleWrap onPress={() => setModalVisible(true)}>
        <Text>{title}</Text>
      </TitleWrap>
    </Wrap>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: '#343337',
        shadowOpacity: 0.5,
        shadowOffset: {
          height: 1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
export default Component;

const Wrap = styled.View``;
const TitleWrap = styled.Pressable``;
const InnerWrap = styled.View`
  background-color: #fff;
  padding: 12px 16px;
  position: absolute;
  top: 600px;
  border-radius: 7px;
  margin: 0px 24px;
  /* width:80%; */
  padding-right: 40px;
`;

const TextType = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const IconWrap = styled.Pressable`
  position: absolute;
  right: 10px;
  top: 12px;
  width: 15px;
  height: 15px;
`;
