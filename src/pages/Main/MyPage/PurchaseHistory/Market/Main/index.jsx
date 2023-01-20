import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { SafeAreaView, Text, View } from "react-native";


export const PAGE_NAME = 'P_MAIN__MARKET__HISTORY';

const Pages = () => {
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
        navigation.setOptions({
            tabBarLabelStyle:{fontSize:15,lineHeight:21,fontFamily:'Pretendard-SemiBold',}
        })
      return () => {
        navigation.setOptions({
            tabBarLabelStyle:{fontSize:15,lineHeight:21,fontFamily: 'Pretendard-Regular',}
        })
    }
    }, [])
  );
  return (
    <SafeAreaView>
      <View>
        <Text>{PAGE_NAME}</Text>
      </View>
    </SafeAreaView>
  )
}

export default Pages;