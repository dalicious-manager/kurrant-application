import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useEffect, useRef } from 'react';
import { Animated } from 'react-native';



const useAnimatedHeaderTitle = ({ title,  triggerPoint }) => {

  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (title) {
      navigation.setOptions({
        title
      })
    }
  }, [navigation, title])

  useEffect(() => {
    navigation.setOptions({
      headerStyleInterpolator: () => {
        const opacity = scrollY.interpolate({
          inputRange: [triggerPoint, triggerPoint + 20],
          outputRange: [0, 1]
        });

        return {
          titleStyle: { opacity }
        }
      }
    })
  }, [navigation, scrollY, triggerPoint])

  return { scrollY };
}

export default useAnimatedHeaderTitle;