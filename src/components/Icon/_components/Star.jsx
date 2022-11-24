import React, {useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import styled from 'styled-components/native';

import {AntDesignIcon} from '..';

/**
 *
 * @param {object} props
 * @param {string} props.name not required
 * @param {boolean} props.interests
 * @returns
 */

const Component = ({name, interests}) => {
  const {control, watch} = useFormContext();

  const [starState, setStarState] = useState(interests);

  const getStarType = starState ? 'star' : 'staro';
  const getStarColor = starState ? '#ffb900' : '#a9acae';

  return (
    <Controller
      name={name || 'myInterests'}
      control={control}
      defaultValue={interests}
      render={({field: {onChange}}) => {
        const onPressEvent = () => {
          onChange(!starState), setStarState(!starState);
        };
        return (
          <StarWrap onPress={onPressEvent}>
            <AntDesignIcon name={getStarType} size={20} color={getStarColor} />
          </StarWrap>
        );
      }}
    />
  );
};

export default Component;

const StarWrap = styled.Pressable``;
