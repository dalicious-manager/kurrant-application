import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components';

import {
  SpotTypeMySpot,
  SpotTypeShareSpot,
  SpotTypePrivateSpot,
  MySpot,
  ShareSpot,
  PrivateSpot,
  SpotComplete,
  SongE,
  SpotOpen,
  MembershipSongE,
} from '../../../assets';
import PlusIcon from '../../../assets/icons/Home/plus.svg';
import OpenSpot from '../../../assets/icons/Map/openSpot.svg';
import Songe from '../../../assets/icons/Map/songe.svg';
import SongeMembership from '../../../assets/icons/Map/songeMembership.svg';
import Typography from '../../../components/Typography';

export function modalImage(data) {
  switch (data) {
    case 1:
      return SpotTypeMySpot;
    case 2:
      return SpotTypeShareSpot;
    case 3:
      return SpotTypePrivateSpot;
  }
}

export function modalTitleText(data) {
  switch (data) {
    case 1:
      return '마이 스팟';
    case 2:
      return '공유 스팟';
    case 3:
      return '프라이빗 스팟';
  }
}

export function modalTitleDscText(data) {
  switch (data) {
    case 1:
      return `상품을 개인의 공간에서${`\n`}직접적으로 수령할 수 있는 스팟`;
    case 2:
      return `공유 오피스, 회사 단지 등${`\n`}다수와 사용하는 스팟`;
    case 3:
      return `한 회사 사람들 같이${`\n`}특정 집단 내 사람들끼리 사용하는 스팟`;
  }
}

export function modalDscText(data) {
  switch (data) {
    case 1:
      return `기존 택배, 음식 배달과 동일하게${`\n`}개인적으로 집, 사무공간 등에서${`\n`}배송받고 싶을 때 사용하는 스팟이에요.`;
    case 2:
      return `개인적으로 사용하는 공간 확보가${`\n`}어려운 경우 근거리에 위치한 장소로${`\n`}직접 픽업하는 스팟이에요.`;
    case 3:
      return `함께 프라이빗하게 쓰고 싶은 사람들끼리${`\n`}사용할 수 있는 곳으로${`\n`}사전에 담당자의 초대가 필요한 스팟이에요.${`\n`}사내 식사 복지도 진행할 수 있어요.`;
  }
}

// complete component
export function alramImage(data) {
  if (
    data === 'usedMembership' ||
    data === 'notUsedMembership' ||
    data === 'noDeliveryNoSpot' ||
    data === 'noAlarmNotUsedMembership' ||
    data === 'noAlarmNotUsedMembership' ||
    data === 'noAlramNoSpot'
  ) {
    return <Image source={SongE} style={{width: 178, height: 149}} />;
  }
  if (data === 'noAlarmUsedMembership') {
    return <Image source={SpotOpen} style={{width: 339, height: 215}} />;
  }
  if (
    data === 'mySpotCompleteNotMembership' ||
    data === 'mySpotCompleteMembership'
  ) {
    return <Image source={SpotComplete} style={{width: 162, height: 149}} />;
  }
  if (data === 'noSpot' || data === 'noDeliveryNoSpotNextUse') {
    return <Image source={MembershipSongE} style={{width: 225, height: 122}} />;
  }
}

export function alramTitleText(data) {
  if (
    data === 'usedMembership' ||
    data === 'notUsedMembership' ||
    data === 'noDeliveryNoSpot'
  ) {
    return `알림 신청 완료!${`\n`}빨리 오픈해서 알려드릴게요`;
  }

  if (
    data === 'mySpotCompleteMembership' ||
    data === 'mySpotCompleteNotMembership'
  ) {
    return `스팟 설정 완료!`;
  }

  if (
    data === 'noAlarmUsedMembership' ||
    data === 'noAlarmNotUsedMembership' ||
    data === 'noAlramNoSpot'
  ) {
    return `스팟 오픈에 최선을 다할게요`;
  }

  if (data === 'noSpot' || data === 'noDeliveryNoSpotNextUse') {
    return `최소 주문 금액 없이${`\n`}한 달 동안 배송비 무료!`;
  }
}

export function alramDscText(data) {
  if (data === 'usedMembership') {
    return `님만을 위한${`\n`}마이스팟 개설에 최선을 다할게요`;
  }

  if (
    data === 'mySpotCompleteNotMembership' ||
    data === 'noAlarmNotUsedMembership' ||
    data === 'notUsedMembership' ||
    data === 'noSpot' ||
    data === 'noDeliveryNoSpotNextUse'
  ) {
    return (
      <Desc>
        <EmphasisDesc>배송비 절감</EmphasisDesc>과 나만을 위한
        <EmphasisDesc> 음식 추천</EmphasisDesc>을{`\n`}받을 수 있는 방법이
        있는데 알아보시겠어요?
      </Desc>
    );
  }

  if (
    data === 'noDeliveryNoSpot' ||
    data === 'noAlramNoSpot' ||
    data === 'noDeliveryNoSpotNextUse'
  ) {
    return (
      <Desc>
        스팟 등록이 안되면{`\n`}
        <EmphasisDesc>서비스 이용에 제한</EmphasisDesc>이 있어요
        {`\n`}
        {`\n`}
        개설 전까지{`\n`}다른 스팟을 사용하시겠어요?
      </Desc>
    );
  }

  if (data === 'noAlarmUsedMembership') {
    return (
      <Desc>
        개설 상황은<EmphasisDesc> '마이페이지'</EmphasisDesc>에서 확인 가능해요
        {`\n`}
        {`\n`}개설 되면<EmphasisDesc> 배송 스팟 선택시</EmphasisDesc>
        {`\n`}확인 할 수 있어요
      </Desc>
    );
  }

  if (data === 'mySpotCompleteMembership') {
    return `커런트를 이용하기 위한 준비를 마쳤어요.${`\n`}이제 식사를 구매해볼까요?`;
  }
}

export function alramButtonText(data) {
  if (data === 'usedMembership') {
    return `홈으로 가기`;
  }

  if (
    data === 'mySpotCompleteNotMembership' ||
    data === 'noAlarmNotUsedMembership' ||
    data === 'notUsedMembership' ||
    data === 'noSpot' ||
    data === 'noDeliveryNoSpotNextUse'
  ) {
    return `배송비 절약해볼래요`;
  }

  if (data === 'noDeliveryNoSpot' || data === 'noAlramNoSpot') {
    return `다른 타입 스팟 사용하기`;
  }

  if (data === 'mySpotCompleteMembership') {
    return `식사 구매하기`;
  }
  if (data === 'noAlarmUsedMembership') {
    return `확인했어요`;
  }
}

export function subButtonText(data) {
  switch (data) {
    case 'private':
      return '둘러보기';
    case 'noAlarmUsedMembership':
      return;
    case 'usedMembership':
      return;
  }
  return '다음에 할게요';
}

// NotDelivery component
export function notDeliveryAlarm(data) {
  switch (data) {
    case 'noSpot':
      return (
        <Desc>
          스팟 등록이 안되면{`\n`}
          <EmphasisDesc>서비스 이용에 제한</EmphasisDesc>이 있어요.{`\n`}
          {`\n`}개설 전 까지{`\n`}다른 스팟을 사용하시겠어요?
        </Desc>
      );
    case 'alramMembership':
      return (
        <Desc>
          개설 상황은<EmphasisDesc> '마이페이지'</EmphasisDesc>에서
          확인가능해요.
        </Desc>
      );
    case 'alramNoMembership':
      return (
        <Desc>
          <EmphasisDesc>배송비 절감</EmphasisDesc>과 나만을 위한
          <EmphasisDesc> 음식 추천</EmphasisDesc>을{`\n`}받을 수 있는 방법이
          있는데 알아보시겠어요?
        </Desc>
      );
  }
}

export function notDeliveryNoAlarm(data) {
  switch (data) {
    case false:
      return (
        <Desc>하지만 곧 오픈해드릴게요.{`\n`}오픈시 알림 보내드릴까요?</Desc>
      );
  }
}

export function notDeliveryNoAlarmButton(data) {
  switch (data) {
    case false:
      return '알림 받기';
    case 'noSpot':
      return '다른 타입 스팟 사용하기';
    case 'alramMembership':
      return '홈으로 가기';
    case 'alramNoMembership':
      return '배송비 절약해볼래요';
  }
}
const EmphasisDesc = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.blue[500]};
  text-align: center;
  margin-top: 24px;
`;

const Desc = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  text-align: center;
  margin-top: 24px;
`;
