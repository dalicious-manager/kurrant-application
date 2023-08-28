import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Easing, Pressable} from 'react-native';
import {Animated, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

import styled, {useTheme} from 'styled-components';

import {percentStringToNum} from '../../utils/stringFormatter';
import {Portal} from 'react-native-paper';
import {Platform} from 'react-native';

const headerHeight = Platform.OS === 'android' ? 34 : 28;
const BottomSheetHandleWidth = 30;
const BackgroundOpacity = 0.68;
const pageY = 91;

const BottomSheetRegisterInfo2 = ({
  show,
  onDismiss,
  children,
  enableBackDropDismiss,
}) => {
  const appTheme = useTheme();

  const height = Dimensions.get('window').height - pageY;

  const contentHeightMin = height * 0.16;

  const offPoint = height * 0.18;

  const deviceWidth = Dimensions.get('window').width;

  const snapPoints = useMemo(() => ['40%', '85%'], []);

  const [snapPoint, setSnapPoint] = useState(
    snapPoints.map(v => percentStringToNum(v))[0],
  );

  const bottomDepth = (height - contentHeightMin) * (1 - snapPoint);

  const contentHeight = (height - contentHeightMin) * snapPoint + headerHeight;

  /////////////

  const bottomDepthRef = useRef(new Animated.Value(-height)).current;

  const backgroundOpacityRef = useRef(new Animated.Value(0.68)).current;

  const moveBottomSheetWithAnimationTo = useCallback(toValue => {
    return Animated.timing(bottomDepthRef, {
      toValue: toValue,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    });
  }, []);
  const changeBottomSheetBackgroundTo = useCallback(toValue => {
    return Animated.timing(backgroundOpacityRef, {
      toValue: toValue,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
  }, []);

  const [open, setOpen] = useState(show);

  useEffect(() => {
    if (show) {
      setOpen(show);
      moveBottomSheetWithAnimationTo(-bottomDepth).start();

      changeBottomSheetBackgroundTo(BackgroundOpacity).start();
    } else {
      changeBottomSheetBackgroundTo(0).start();
      moveBottomSheetWithAnimationTo(-height).start(() => {
        setOpen(false);
      });
    }
  }, [show]);

  const onGesture = e => {
    if (e.nativeEvent.translationY > 0) {
      // console.log('아래로 pan(drag)');
    } else {
      // console.log('위로 pan(drag)');
    }

    bottomDepthRef.setValue(-e.nativeEvent.translationY - bottomDepth);
  };

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 0) {
      moveBottomSheetWithAnimationTo(-bottomDepth).start();
    }
  }, [count]);

  const onGestureEnd = e => {
    const y = e.nativeEvent.translationY;

    if (bottomDepth + y > height - offPoint) {
      moveBottomSheetWithAnimationTo(-height).start(() => {
        onDismiss();
      });
    } else {
      const yValue = height - bottomDepth - contentHeightMin - y;

      const snapPointsPoints = snapPoints
        .map(v => percentStringToNum(v))
        .map(v => Math.abs(yValue - (height - contentHeightMin) * v));

      const result = snapPointsPoints.reduce(
        (a, c) => (a > c ? c : a),
        snapPointsPoints[0],
      );

      let index = snapPointsPoints.findIndex(v => v === result);

      setCount(prev => prev + 1);
      setSnapPoint(snapPoints.map(v => percentStringToNum(v))[index]);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <Pressable
        onPress={enableBackDropDismiss ? onDismiss : undefined}
        style={[styles.backDrop]}>
        <Animated.View
          style={[
            {
              flex: 1,
              backgroundColor: `#000`,

              opacity: backgroundOpacityRef,
            },
          ]}></Animated.View>
      </Pressable>

      <Animated.View
        style={[
          styles.root,
          {
            height: height,

            bottom: bottomDepthRef,
            shadowOffset: {height: -3},
          },
          styles.common,
        ]}>
        <GestureHandlerRootView>
          <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
            <HeaderView
              style={[
                styles.header,
                // styles.common,
                // {shadowOffset: {height: 3}},
              ]}>
              <BottomSheetHandle
                style={{
                  width: BottomSheetHandleWidth,
                  height: 4,
                  borderRadius: 2.5,
                  position: 'absolute',
                  top: 9,

                  left: (deviceWidth - BottomSheetHandleWidth) / 2,
                  zIndex: 1,
                  backgroundColor: appTheme.colors.grey[2],
                }}
              />
            </HeaderView>
          </PanGestureHandler>
        </GestureHandlerRootView>
        <Content style={[{height: contentHeight}]}>{children}</Content>
      </Animated.View>
    </Portal>
  );
};
export default BottomSheetRegisterInfo2;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    overflow: 'hidden',
  },
  header: {
    height: headerHeight,
    backgroundColor: '#fff',
  },
  common: {
    shadowColor: '000',
    shadowOffset: {
      //   height: -3,
      width: 0,
    },
    shadowOpacity: 0.24,

    shadowRadius: 4,
    elevation: 3,
  },
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    // flex: 1,
    zIndex: 1,
    // backgroundColor: 'rgba(0,0,0,0.68)',
  },
});

const AnimatedView = styled(Animated.View)`
  /* border: 1px solid black; */
  background-color: azure;
`;

const BackPressable = styled.View`
  /* border: 1px solid black; */
`;

const HeaderView = styled.View`
  /* border: 1px solid black; */
`;

const BottomSheetHandle = styled.View``;

const Content = styled.View`
  /* border: 1px solid black; */
  /* padding-bottom: 61px; */
`;
