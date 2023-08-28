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

// const Overlay = styled.View`
//   position: relative;
//   flex: 1;
//   justify-content: flex-end;
//   background-color: rgba(0, 0, 0, 0.4);
// `;
// const Background = styled.View`
//   flex: 1;
// `;

// const AnimatedView = styled(Animated.View)`
//   align-items: center;
//   background-color: white;
//   padding-bottom: 56px;
// `;
// export const IosButton = styled.Pressable`
//   width: 100%;
//   flex-direction: row;
//   justify-content: space-between;
//   padding: 8px 20px;
//   background-color: #f5f5f5;
//   z-index: 999;
// `;

// export const Cancel = styled(Typography).attrs({text: 'Body05R'})`
//   color: ${({theme}) => theme.colors.grey[4]};
// `;

// export const Confirm = styled(Typography).attrs({text: 'Body05R'})`
//   color: ${({theme}) => theme.colors.blue[500]};
// `;

export default ModalCalendarAndroid;
