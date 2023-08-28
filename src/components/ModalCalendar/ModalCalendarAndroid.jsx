import DatePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components/native';

import Typography from '~components/Typography';

/**
 * @param {object} props
 * @param {boolean} props.modalVisible
 * @param {function} props.setModalVisible
 * @param {object} props.calendarProps
 * @returns
 */

const ModalCalendarAndroid = props => {
  const {
    modalVisible,

    calendarProps,
  } = props;

  return (
    <>
      {modalVisible && (
        <DatePicker
          value={calendarProps?.selected}
          display="spinner"
          onChange={(event, date) => {
            calendarProps.onChange(
              event,
              date,
              calendarProps.setModal,
              calendarProps.setSelected,
            );
          }}
          locale="ko-KR"
        />
      )}
    </>
  );
};

export default ModalCalendarAndroid;
