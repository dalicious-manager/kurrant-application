import React from "react";
import { SafeAreaView, View } from "react-native";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Component = () => {
    return (
        <SafeAreaView flex={1}>
            <View flex={1} marginTop={128}>
                <SkeletonPlaceholder borderRadius={4} flex={1} backgroundColor={"white"} >
                    <SkeletonPlaceholder.Item marginLeft={24} marginRight={24} borderRadius={14} >
                        <SkeletonPlaceholder.Item width={200} height={35} />
                        <SkeletonPlaceholder.Item marginTop={16} width={'100%'} height={64} />
                        <SkeletonPlaceholder.Item marginTop={16} width={'100%'} height={128} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
            </View>
        </SafeAreaView>
    )

}

export default Component;