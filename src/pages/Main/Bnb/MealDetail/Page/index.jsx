import React from "react";
import { SafeAreaView, Text, View } from "react-native"

export const PAGE_NAME = 'MEAL_DEATAIL_INFORMATION_PAGE';
const Pages = () =>{
    return (
        <SafeAreaView>
            <View>
                <Text>알레르기 유발 물질 표시 대상</Text>
                <Text>계란, 우유, 땅콩, 계란, 우유, 땅콩, 계란, 우유, 땅콩</Text>
            </View>
            <View>
                <Text>원산지 정보</Text>
                
            </View>
        </SafeAreaView>
    )
}

export default Pages;