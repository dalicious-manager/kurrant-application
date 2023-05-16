import {MySpot, ShareSpot, PrivateSpot} from '../../../assets';
import Songe from '../../../assets/icons/Map/songe.svg';
import SongeMembership from '../../../assets/icons/Map/songeMembership.svg';
import OpenSpot from '../../../assets/icons/Map/openSpot.svg';
import PlusIcon from '../../../assets/icons/Home/plus.svg';
import styled from 'styled-components';
import Typography from '../../../components/Typography';

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

export function alramImage(data) {
  switch (data) {
    case 1:
      return <Songe />;
    case 2:
      return <SongeMembership />;
    case 3:
      return <OpenSpot />;
    case 'private':
      return <Songe />;
  }
}

export function alramTitleText(data) {
  switch (data) {
    case 1:
      return `알림 신청 완료!${`\n`}빨리 오픈해서 알려드릴게요`;
    case 2:
      return `최소 주문 금액 없이${`\n`}한 달 동안 배송비 무료!`;
    case 3:
      return `스팟 설정 완료!`;
    case 4:
      return `스팟 오픈에 최선을 다할게요`;
    case 'private':
      return `알림 신청 완료!`;
  }
}

export function alramDscText(data) {
  switch (data) {
    case 1:
      return `님만을 위한${`\n`}마이스팟 개설에 최선을 다할게요`;
    case 2:
      return (
        <Desc>
          <EmphasisDesc>배송비 절감</EmphasisDesc>과 나만을 위한
          <EmphasisDesc>음식 추천</EmphasisDesc>을{`\n`}받을 수 있는 방법이
          있는데 알아보시겠어요?
        </Desc>
      );
    case 3:
      return (
        <Desc>
          스팟 등록이 안되면{`\n`}
          <EmphasisDesc>서비스 이용에 제한이 있어요</EmphasisDesc>
          {`\n`}
          {`\n`}
          개설 전까지 다른 스팟을{`\n`}
          사용하시겠어요?
        </Desc>
      );
    case 4:
      return `커런트를 이용하기 위한 준비를 마쳤어요.${`\n`}이제 식사를 구매해볼까요?`;
    case 5:
      return (
        <Desc>
          <EmphasisDesc>배송비 절감</EmphasisDesc>과 나만을 위한
          <EmphasisDesc>음식 추천</EmphasisDesc>을{`\n`}받을 수 있는 방법이
          있는데 알아보시겠어요?
        </Desc>
      );
    case 6:
      return `개설되면 배송 스팟 선택할때${`\n`}확인할 수 있어요`;
    case 7:
      return (
        <Desc>
          개설 상황은 <EmphasisDesc>'마이페이지'</EmphasisDesc>에서 확인
          가능해요
          {`\n`}
          {`\n`}개설 되면 <EmphasisDesc>배송 스팟 선택시</EmphasisDesc>
          {`\n`}확인할 수 있어요
        </Desc>
      );
    case 'private':
      return `둘러보러 홈으로 이동할까요?${`\n`}아니면 다른 스팟을 사용해보시겠어요?`;
  }
}

export function alramButtonText(data) {
  switch (data) {
    case 1:
      return `홈으로 가기`;
    case 2:
      return `배송비 절약해볼래요`;
    case 3:
      return `다른 타입 스팟 사용하기`;
    case 4:
      return `식사 구매하기`;
    case 5:
      return `확인했어요`;
    case 'private':
      return `다른 배송 타입 신청`;
  }
}

export function subButtonText(data) {
  switch (data) {
    case 'private':
      return '둘러보기';
  }
  return '다음에 할게요';
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
