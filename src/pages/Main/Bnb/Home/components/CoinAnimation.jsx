import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Animated, Vibration} from 'react-native';
import Sound from 'react-native-sound';
import styled, {css} from 'styled-components/native';
import {useTheme} from 'styled-components/native';
import Typography from '~components/Typography';

const CoinAnimation = ({isStart, setStart, coinSound}) => {
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));
  const [opacityValue, setOpacityValue] = useState(new Animated.Value(1));
  const [moveValue, setMoveValue] = useState(
    new Animated.ValueXY({x: 0, y: 0}),
  );
  const [textTime, setTextTime] = useState(false);

  Sound.setCategory('Playback');

  // Load the sound file 'whoosh.mp3' from the app bundle
  // See notes below about preloading sounds within initialization code below.
  const playSound = () => {
    if (coinSound) {
      coinSound.play();
    }
  };
  const themeApp = useTheme();
  useEffect(() => {
    if (isStart) {
      startAnimation();
    } else {
      spinValue.setValue(0);
      moveValue.setValue({x: 0, y: 0});
    }
  }, [isStart]);

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(moveValue, {
        toValue: {x: 0, y: -70},
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setTextTime(true);
      Vibration.vibrate();
      playSound();
      //   startAnimation();
    });
    setTimeout(() => {
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setTextTime(false);
        spinValue.setValue(0);
        moveValue.setValue({x: 0, y: 0});
        opacityValue.setValue(1);
        setStart(false);
        //   startAnimation();
      });
    }, 300);
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.coinbox,
          {
            opacity: opacityValue,
            transform: [{translateX: moveValue.x}, {translateY: moveValue.y}],
          },
        ]}>
        <PointTextBox textTime={textTime}>
          <Typography text={'CaptionR'} textColor={themeApp.colors.grey[2]}>
            {textTime ? '+ 80 포인트' : ''}
          </Typography>
        </PointTextBox>
        <Animated.Image
          style={[styles.coin, {transform: [{rotateY: spin}]}]}
          source={require('../../../../../assets/images/coin.png')}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
    bottom: 20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coin: {
    width: 40,
    height: 40,
  },
  coinbox: {
    width: 150,
    height: 20,
    alignItems: 'center',
  },
});

export default CoinAnimation;

const PointTextBox = styled.View`
  ${({textTime}) =>
    textTime &&
    css`
      background-color: '#FDC800';
      padding: 3px 10px;
      border-radius: 50px;
    `}
`;
