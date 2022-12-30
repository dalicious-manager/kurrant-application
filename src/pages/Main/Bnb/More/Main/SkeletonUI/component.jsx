
import React from 'react';
import { SafeAreaView } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


/**
 * @param {object} props
 * @returns 
 */

const Component = () => {
  return (
    <SafeAreaView>
    <SkeletonPlaceholder borderRadius={4} flex={1} backgroundColor={"white"} >
    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent='space-between' marginHorizontal={24} marginTop={24}>      
      <SkeletonPlaceholder.Item marginBottom={24}>
        <SkeletonPlaceholder.Item width={80} height={20} />
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginTop={10}>
          <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />      
          <SkeletonPlaceholder.Item marginLeft={10} width={100} height={40} />
        </SkeletonPlaceholder.Item>     
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item width={30} height={30} borderRadius={50} />   
    </SkeletonPlaceholder.Item>   
    <SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item width={'100%'} height={56} />
      <SkeletonPlaceholder.Item marginTop={11} width={'100%'} height={56} />
      <SkeletonPlaceholder.Item flexDirection="row" marginTop={11}>
        <SkeletonPlaceholder.Item marginHorizontal={4} flex={1} height={76} />
        <SkeletonPlaceholder.Item marginHorizontal={4} flex={1} height={76} />
        <SkeletonPlaceholder.Item marginHorizontal={4} flex={1} height={76} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item width={'100%'} height={6} marginVertical={12}/>
     <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width={'100%'} height={56} />
        <SkeletonPlaceholder.Item marginTop={2} width={'100%'} height={56} />
        <SkeletonPlaceholder.Item marginTop={2} width={'100%'} height={56} />
        <SkeletonPlaceholder.Item marginTop={2} width={'100%'} height={56} />
        <SkeletonPlaceholder.Item marginTop={2} width={'100%'} height={56} />
        <SkeletonPlaceholder.Item marginTop={2} width={'100%'} height={56} />
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item width={'100%'} height={6} marginVertical={12}/>
 
  </SkeletonPlaceholder>
  </SafeAreaView>
  )
};
 
export default Component;
