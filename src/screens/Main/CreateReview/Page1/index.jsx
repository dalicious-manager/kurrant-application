import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {SCREEN_NAME as CreateReviewPage2ScreenName} from '../Page2';

export const SCREEN_NAME = 'S_MAIN__CREATE_REVIEW_PAGE_1';

const Screens = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>create review1 </Text>
      <Pressable
        onPress={() => {
          navigation.navigate(CreateReviewPage2ScreenName);
        }}>
        <Text>go to page2</Text>
      </Pressable>
    </View>
  );
};

export default Screens;
