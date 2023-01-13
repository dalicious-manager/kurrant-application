import React from "react";
import { SafeAreaView, View } from "react-native";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Component = () => {
    return (
        
            <View flex={1} >
                <SkeletonPlaceholder borderRadius={4} backgroundColor={"white"} >
                    <SkeletonPlaceholder.Item marginLeft={24} marginRight={24} borderRadius={10}  >
                        <SkeletonPlaceholder.Item marginTop={16} width={'20%'} height={30} />                       
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
                
            </View>
       
    )

}

export default Component;