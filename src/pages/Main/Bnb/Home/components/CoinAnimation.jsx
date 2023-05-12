import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Text } from 'react-native';
import { useTheme } from 'styled-components/native';
import Typography from '~components/Typography'
import Sound from 'react-native-sound';


const CoinAnimation = ({isStart,setStart}) => {
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));
  const [opacityValue, setOpacityValue] = useState(new Animated.Value(1));
  const [moveValue, setMoveValue] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  const [textTime , setTextTime] = useState(false);
  
    const themeApp = useTheme();
  useEffect(() => {
    if(isStart)
        startAnimation();
    else {
        spinValue.setValue(0);
        moveValue.setValue({x: 0, y:0 });
    }
  }, [isStart]);

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(moveValue, {
        toValue: { x: 0, y: -70 },
        duration: 300,
        useNativeDriver: false,
      }),
          
    ]).start(() => {
        setTextTime(true)
    //   startAnimation();
    });
    setTimeout(()=>{
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
          setTextTime(false)
        spinValue.setValue(0);
        moveValue.setValue({x: 0, y:0 });
        opacityValue.setValue(1);
        setStart(false)
      //   startAnimation();
      });
    },300)
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
        
        <Animated.View
        style={[styles.coinbox,  { opacity:opacityValue,transform: [ { translateX: moveValue.x }, { translateY: moveValue.y }] }]}
               >
                 <Typography text={'Body06SB'} textColor={themeApp.colors.blue[500]}>{textTime ?'파운더스 포인트 적립!' : ' '}</Typography>
            <Animated.Image
                 style={[styles.coin, { transform: [{ rotateY: spin }] }]}
                source={require('../../../../../assets/images/coin.png')}
            />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex:9999,
    bottom:20,
    position:'absolute',
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
    backgroundColor:'white',
    alignItems:'center',    
  },
});

export default CoinAnimation;