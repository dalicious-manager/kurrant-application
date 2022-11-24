import React from "react";
import { SafeAreaView, Text, View } from "react-native";

export const PAGE_NAME = 'P_MAIN__BNB__INDEX_CARD';

const Pages = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>{PAGE_NAME}</Text>
      </View>
    </SafeAreaView>
  )
}

export default Pages;