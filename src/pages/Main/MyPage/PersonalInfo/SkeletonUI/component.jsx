import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styled, {useTheme} from 'styled-components/native';
import ArrowRightIcon from '~assets/icons/Arrow/arrowRight.svg';
import Typography from '~components/Typography';

/**
 * @param {object} props
 * @returns
 */

const Component = () => {
  return (
    <SafeAreaView>
      <SkeletonPlaceholder borderRadius={4} flex={1} backgroundColor={'white'}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          marginHorizontal={24}
          marginTop={24}>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item width={160} height={20} />
            <SkeletonPlaceholder.Item marginTop={10} width={100} height={20} />
            <SkeletonPlaceholder.Item marginTop={10} width={250} height={20} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width={'100%'}
          height={6}
          marginVertical={24}
        />
        <SkeletonPlaceholder.Item width={100} height={20} marginLeft={24} />
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          marginHorizontal={24}
          marginTop={9}>
          <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
          <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
          <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
          <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
          <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width={'100%'}
          height={6}
          marginVertical={12}
        />
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={'100%'} height={56} />
          <SkeletonPlaceholder.Item marginTop={2} width={'100%'} height={56} />
          <SkeletonPlaceholder.Item marginTop={2} width={'100%'} height={56} />
          <SkeletonPlaceholder.Item marginTop={2} width={'100%'} height={56} />
          <SkeletonPlaceholder.Item marginTop={2} width={'100%'} height={56} />
          <SkeletonPlaceholder.Item marginTop={2} width={'100%'} height={56} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width={'100%'}
          height={6}
          marginVertical={12}
        />
        <SkeletonPlaceholder.Item marginHorizontal={24}>
          <SkeletonPlaceholder.Item width={80} height={20} />
          <SkeletonPlaceholder.Item width={80} marginTop={24} height={20} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </SafeAreaView>
  );
};

export default Component;
