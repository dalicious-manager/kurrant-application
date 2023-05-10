import {MySpot, ShareSpot, PrivateSpot} from '../../../assets';

export function modalImage(data) {
  switch (data) {
    case 1:
      return MySpot;
    case 2:
      return ShareSpot;
    case 3:
      return PrivateSpot;
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
