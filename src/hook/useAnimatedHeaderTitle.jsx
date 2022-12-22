import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useEffect, useRef } from 'react';
import { Animated } from 'react-native';


const useAnimatedHeaderTitle = ({ title,  triggerPoint }) => {

  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (title) {
      navigation.setOptions({
        headerTransparent: true,
            headerStyle: {
                backgroundColor:`${scrollY < 150 ? 'transparent' : 'white'}`
              },
            headerTitle:`${scrollY > 150 ? '타이틀': ''}`,
        title
      })
    }
  }, [navigation, scrollY, title])

  useEffect(() => {
    navigation.setOptions({
      

          
      headerStyleInterpolator: () => {
        const opacity = scrollY.interpolate({
          inputRange: [triggerPoint, triggerPoint + 20],
          outputRange: [0, 1]
        });

        return {
          headerStyle: { opacity }
        }
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, scrollY])

  return { scrollY };
}

export default useAnimatedHeaderTitle;