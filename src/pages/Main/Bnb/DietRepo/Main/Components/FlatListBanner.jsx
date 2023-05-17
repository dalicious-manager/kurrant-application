import styled from 'styled-components';

import Typography from '~components/Typography';

const FlatListBanner = ({todayTotalCal, nutritionList}) => {
  return (
    <>
      <FlatListHeader>
        <FlatListHeaderWrap1>
          <Wrap1Text1>오늘 먹었어요</Wrap1Text1>
          <Wrap1Text2>{todayTotalCal}kcal</Wrap1Text2>
        </FlatListHeaderWrap1>
        <FlatListHeaderWrap2>
          {nutritionList.map((v, i) => {
            return (
              <Wrap3 key={i}>
                <Lable>{v.lable}</Lable>
                <Amount>{v.amount}g</Amount>
              </Wrap3>
            );
          })}
        </FlatListHeaderWrap2>
      </FlatListHeader>
    </>
  );
};
export default FlatListBanner;

const FlatListHeader = styled.View`
  background-color: ${({theme}) => theme.colors.blue[100]};
  border-radius: 7px;
  padding: 16px;
  margin-top: 16px;
  margin-bottom: 25px;
`;
const FlatListHeaderWrap1 = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;
const Wrap1Text1 = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-right: 8px;
`;

const Wrap1Text2 = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme}) => theme.colors.blue[500]};
`;
const FlatListHeaderWrap2 = styled.View`
  flex-direction: row;
`;
const Wrap3 = styled.View`
  flex-direction: row;
  align-items: center;

  margin-right: 24px;
`;
const Lable = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme}) => theme.colors.grey[4]};
  margin-right: 8px;
`;
const Amount = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
