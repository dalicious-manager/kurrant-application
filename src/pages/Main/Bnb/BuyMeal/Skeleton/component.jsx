import React from "react";
import { SafeAreaView, View } from "react-native";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Component = () => {
    return (
        
            <View flex={1}>
                <SkeletonPlaceholder borderRadius={4} backgroundColor={"white"} >
                    <SkeletonPlaceholder.Item marginLeft={24} marginRight={24} borderRadius={14}  >
                        <SkeletonPlaceholder.Item marginTop={16} width={'100%'} height={128} />
                        <SkeletonPlaceholder.Item marginTop={16} width={'100%'} height={128} />
                        <SkeletonPlaceholder.Item marginTop={16} width={'100%'} height={128} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
            </View>
       
    )

}

export default Component;