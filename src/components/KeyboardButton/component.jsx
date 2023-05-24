import React from 'react';
import {View} from 'react-native';

import Button from '../Button';

/**
 * @param {object} props
 * @param {boolean} props.isKeyboardActivate
 * @param {boolean} props.disabled
 * @param {string} props.label
 * @param {function} props.onPressEvent
 * @returns
 */

const Component = ({
  isKeyboardActivate = false,
  disabled = false,
  label = '',
  onPressEvent = () => {
    console.log('버튼을 누르셨습니다.');
  },
}) => {
  return (
    <View>
      {isKeyboardActivate ? (
        <Button
          type="login"
          size="login"
          label={label}
          disabled={disabled}
          onPressEvent={onPressEvent}
        />
      ) : null}
    </View>
  );
};

export default Component;
