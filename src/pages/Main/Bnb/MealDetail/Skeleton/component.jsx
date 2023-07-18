import React from 'react';
import {SafeAreaView, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Component = () => {
  return (
    <View>
      {/* <SkeletonPlaceholder backgroundColor={'white'}>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={'100%'} height={378} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder> */}
      <SkeletonPlaceholder backgroundColor={'#efefef'}>
        <SkeletonPlaceholder.Item
          marginLeft={24}
          marginRight={24}
          borderRadius={14}>
          <SkeletonPlaceholder.Item marginTop={16} width={100} height={22} />
          <SkeletonPlaceholder.Item marginTop={16} width={300} height={40} />
          <SkeletonPlaceholder.Item
            marginTop={16}
            width={'100%'}
            height={100}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default Component;
