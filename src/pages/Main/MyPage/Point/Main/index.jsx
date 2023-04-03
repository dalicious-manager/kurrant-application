import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../../../components/Typography';
import Button from './components/Button';
import TextLable from '../../../../../components/TextButton';
import ArrowRight from '../../../../../assets/icons/Arrow/arrowRight.svg';
import {useGetPointList} from '../../../../../hook/usePoint';

export const PAGE_NAME = 'P__MY_PAGE__POINT';
const Pages = () => {
  const {data: pointList} = useGetPointList();
  const [touch, setTouch] = useState([0]);
  const tempPlus = 0;
  const tempMinus = 1;
  console.log(pointList);
  return (
    <Wrapper>
      <PointWrap>
        <AvailablePoint>사용가능한 포인트</AvailablePoint>
        <PointTextWrap>
          <PointText>
            230,000<WonText>원</WonText>
          </PointText>
        </PointTextWrap>
      </PointWrap>
      <BorderBar />
      <ButtonWrap>
        <Button touch={touch} setTouch={setTouch} />
      </ButtonWrap>
      {/* 포인트 없을때 VIEW */}
      {/* <Wrap
        style={{
          alignItems: 'center',
          justifyContents: 'center',
          marginTop: '70%',
        }}>
        <NodataText>포인트 내역이 없어요</NodataText>
      </Wrap> */}
      {touch[0] === 0 && (
        <Wrap>
          <Contents>
            <DateWrap>
              <DateText>03월 21일 화 ・ 리뷰 작성</DateText>
              <DetailButton>
                <TextLable label="상세보기" size="label13R" type="grey5" />
                <ArrowIcon />
              </DetailButton>
            </DateWrap>
            <InnerContents>
              <TitleWrap>
                <TitleText numberOfLines={2} ellipsizeMode="tail">
                  [라이브 볼] 모모의 픽 4
                </TitleText>
              </TitleWrap>
              <BalanceWrap>
                <PriceText status={tempPlus}>+1,000원</PriceText>
                <Balance>잔액 232,000원</Balance>
              </BalanceWrap>
            </InnerContents>
          </Contents>
          <Contents>
            <DateWrap>
              <DateText>03월 21일 화 ・ 리뷰 작성</DateText>
              <DetailButton>
                <TextLable label="상세보기" size="label13R" type="grey5" />
                <ArrowIcon />
              </DetailButton>
            </DateWrap>
            <InnerContents>
              <TitleWrap>
                <TitleText numberOfLines={2} ellipsizeMode="tail">
                  [라이브 볼] 하와이 새우와 오징어 샐러드 하와이 새우와 오징어
                  샐러드외 몇개
                </TitleText>
              </TitleWrap>
              <BalanceWrap>
                <PriceText status={tempMinus}>-1,000원</PriceText>
                <Balance>잔액 232,000원</Balance>
              </BalanceWrap>
            </InnerContents>
          </Contents>
          <Contents>
            <DateWrap>
              <DateText>03월 21일 화 ・ 리뷰 작성</DateText>
              <DetailButton>
                <TextLable label="상세보기" size="label13R" type="grey5" />
                <ArrowIcon />
              </DetailButton>
            </DateWrap>
            <InnerContents>
              <TitleWrap>
                <TitleText numberOfLines={2} ellipsizeMode="tail">
                  [라이브 볼] 하와이 새우와 오징어 샐러드 하와이 새우와 오징어
                  샐러드외 몇개
                </TitleText>
              </TitleWrap>
              <BalanceWrap>
                <PriceText status={tempMinus}>-1,000원</PriceText>
                <Balance>잔액 232,000원</Balance>
              </BalanceWrap>
            </InnerContents>
          </Contents>
          <Contents>
            <DateWrap>
              <DateText>03월 21일 화 ・ 리뷰 작성</DateText>
              <DetailButton>
                <TextLable label="상세보기" size="label13R" type="grey5" />
                <ArrowIcon />
              </DetailButton>
            </DateWrap>
            <InnerContents>
              <TitleWrap>
                <TitleText numberOfLines={2} ellipsizeMode="tail">
                  [라이브 볼] 하와이 새우와 오징어 샐러드 하와이 새우와 오징어
                  샐러드외 몇개
                </TitleText>
              </TitleWrap>
              <BalanceWrap>
                <PriceText status={tempMinus}>-1,000원</PriceText>
                <Balance>잔액 232,000원</Balance>
              </BalanceWrap>
            </InnerContents>
          </Contents>
          <Contents>
            <DateWrap>
              <DateText>03월 21일 화 ・ 리뷰 작성</DateText>
              <DetailButton>
                <TextLable label="상세보기" size="label13R" type="grey5" />
                <ArrowIcon />
              </DetailButton>
            </DateWrap>
            <InnerContents>
              <TitleWrap>
                <TitleText numberOfLines={2} ellipsizeMode="tail">
                  [라이브 볼] 하와이 새우와 오징어 샐러드 하와이 새우와 오징어
                  샐러드외 몇개
                </TitleText>
              </TitleWrap>
              <BalanceWrap>
                <PriceText status={tempMinus}>-1,000원</PriceText>
                <Balance>잔액 232,000원</Balance>
              </BalanceWrap>
            </InnerContents>
          </Contents>
          <Contents>
            <DateWrap>
              <DateText>03월 21일 화 ・ 리뷰 작성</DateText>
              <DetailButton>
                <TextLable label="상세보기" size="label13R" type="grey5" />
                <ArrowIcon />
              </DetailButton>
            </DateWrap>
            <InnerContents>
              <TitleWrap>
                <TitleText numberOfLines={2} ellipsizeMode="tail">
                  [라이브 볼] 하와이 새우와 오징어 샐러드 하와이 새우와 오징어
                  샐러드외 몇개
                </TitleText>
              </TitleWrap>
              <BalanceWrap>
                <PriceText status={tempMinus}>-1,000원</PriceText>
                <Balance>잔액 232,000원</Balance>
              </BalanceWrap>
            </InnerContents>
          </Contents>
        </Wrap>
      )}
    </Wrapper>
  );
};

export default Pages;

const Wrapper = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.grey[0]};
`;

const BorderBar = styled.View`
  width: 100%;
  height: 6px;
  background-color: ${({theme}) => theme.colors.grey[8]};
`;

const Wrap = styled.View`
  margin: 0px 24px 50px 24px;
`;

const AvailablePoint = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const PointWrap = styled.View`
  margin: 30px 24px 24px 24px;
  flex-direction: row;
  justify-content: space-between;
`;

const PointText = styled(Typography).attrs({text: 'Title02SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const WonText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  position: absolute;
  bottom: 2px;
`;

const PointTextWrap = styled.View`
  flex-direction: row;
`;

const Contents = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.grey[8]};
  padding: 24px 0px;
`;

const DateText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const TitleText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const DateWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const ArrowIcon = styled(ArrowRight)`
  color: ${({theme}) => theme.colors.grey[5]};
  margin-left: 4px;
`;

const DetailButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

const PriceText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme, status}) =>
    status === 0 ? theme.colors.blue[500] : theme.colors.red[500]};
`;

const TitleWrap = styled.View`
  flex-direction: row;
  width: 70%;
`;

const Balance = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[5]};
`;

const BalanceWrap = styled.View`
  align-items: flex-end;
  width: 30%;
`;

const InnerContents = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const ButtonWrap = styled.View`
  margin: 8px 24px 0px 24px;
`;

const NodataText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[5]};
`;
