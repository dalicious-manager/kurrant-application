import React from "react";
import { SafeAreaView, View } from "react-native";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Component = () => {
    return (
        
            <View flex={1}>
                <SkeletonPlaceholder borderRadius={4} backgroundColor={"white"} flex={1}>
                    <SkeletonPlaceholder.Item marginLeft={24} marginRight={24} borderRadius={14}  >
                        <SkeletonPlaceholder.Item marginTop={24} marginBottom={8} width={'100%'} height={40} />
                        <SkeletonPlaceholder.Item marginTop={24} width={'100%'} height={80} />
                        <SkeletonPlaceholder.Item marginTop={24} width={'100%'} height={80} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
            </View>
       
    )

}

export default Component;