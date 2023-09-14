import React, {useEffect, useState} from 'react';
import {Modal, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import styled from 'styled-components';

import RestartIcon from '../../assets/icons/Home/restart.svg';
import XIcon from '../../assets/icons/Home/x.svg';
import {formattedTimer} from '../../utils/dateFormatter';
import Typography from '../Typography';

const QRCodeComponent = ({modal, setModal}) => {
  const [isQRCodeEnabled, setIsQRCodeEnabled] = useState(true);
  const [timer, setTimer] = useState(180);
  const [intervalId, setIntervalId] = useState(null);

  const value = {
    id: 4,
    a: '22',
    b: 2,
    c: 'dd',
  };

  const jsonString = JSON.stringify(value);

  const reloadQRCode = () => {
    setIsQRCodeEnabled(true);
    setTimer(180);
    startTimer();
  };

  const startTimer = () => {
    if (intervalId === null) {
      // 중복 실행 방지
      const id = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 0) {
            setIsQRCodeEnabled(false);
            clearInterval(id);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      setIntervalId(id); // 인터벌 ID 저장
    }
  };

  useEffect(() => {
    if (modal) {
      setIsQRCodeEnabled(true);
      setTimer(180);
      startTimer();
    } else {
      setIsQRCodeEnabled(false);
      if (intervalId !== null) {
        clearInterval(intervalId); // 모달이 닫힐 때 인터벌 클리어
        setIntervalId(null); // 인터벌 ID 초기화
      }
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
      }
    };
  }, [modal, intervalId]);

  return (
    <View>
      <Modal presentationStyle={'fullScreen'} visible={modal}>
        <ModalWrap onPress={() => setModal(false)}>
          <ModalContentWrap>
            <CloseButton onPress={() => setModal(false)}>
              <XIcon />
            </CloseButton>
            <QRView>
              <QRCode
                color={isQRCodeEnabled ? '#1D1C21' : '#F2F2F2'}
                value={jsonString}
                size={196}
                logoBackgroundColor="transparent"
              />
              {!isQRCodeEnabled && (
                <ReStartView onPress={reloadQRCode}>
                  <RestartIcon />
                </ReStartView>
              )}
            </QRView>
            <TimeView>
              {isQRCodeEnabled ? (
                <TimerText>{formattedTimer(timer)}</TimerText>
              ) : (
                <DisabledTimerText>
                  인증 시간이 만료되었습니다.
                </DisabledTimerText>
              )}
            </TimeView>
          </ModalContentWrap>
        </ModalWrap>
      </Modal>
    </View>
  );
};

export default QRCodeComponent;

// 나머지 스타일 및 컴포넌트는 이전과 동일합니다.

const ModalWrap = styled.Pressable`
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0px 24px;
  justify-content: center;
  flex: 1;
`;

const ModalContentWrap = styled.View`
  background-color: white;
  border-radius: 14px;
  height: 327px;
  padding: 66px 65px 65px 65px;
  align-items: center;
`;

const QRView = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
`;
const CloseButton = styled.Pressable`
  position: absolute;
  right: 16px;
  top: 16px;
`;

const TimeView = styled.View`
  margin-top: 8px;
`;

const TimerText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.blue[500]};
`;

const DisabledTimerText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[5]};
`;

const ReStartView = styled.Pressable`
  position: absolute;
`;
