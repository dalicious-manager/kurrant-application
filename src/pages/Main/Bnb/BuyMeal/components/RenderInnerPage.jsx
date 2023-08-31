import React from 'react';
import {Dimensions} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import BuyMealPage from './BuyMealPage';
const {width} = Dimensions.get('screen');
const RenderInnerPage = props => {
  return (
    <GestureHandlerRootView style={{flex: 1, width: width}}>
      <BuyMealPage {...props} />
    </GestureHandlerRootView>
  );
};

export default React.memo(RenderInnerPage);
