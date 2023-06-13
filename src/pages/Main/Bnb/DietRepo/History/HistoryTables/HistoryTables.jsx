import styled from 'styled-components';
import Typography from '~components/Typography';
import {extractMonthAndDateFromDate2} from '../../logic';
import {toStringByFormatting} from '../../../../../../utils/dateFormatter';

const HistoryTables = ({data}) => {
  return (
    <Container>
      {data.map((v, i) => {
        return (
          <TableSingle key={i}>
            {/* <DateText>05.08</DateText> */}
            <DateText>{`${extractMonthAndDateFromDate2(v.date, '-')[0]}.${
              extractMonthAndDateFromDate2(v.date, '-')[1]
            }`}</DateText>
            <Wrap1>
              <Wrap2>
                <Wrap3>
                  <Label>칼로리</Label>
                  <ValueWrap>
                    <Value>{v.calorie}</Value>
                    <Unit>kcal</Unit>
                  </ValueWrap>
                </Wrap3>
                <Wrap3>
                  <Label>단백질</Label>
                  <ValueWrap>
                    <Value>{v.protein}</Value>
                    <Unit>g</Unit>
                  </ValueWrap>
                </Wrap3>
              </Wrap2>
              <Wrap2>
                <Wrap3>
                  <Label>탄수화물</Label>
                  <ValueWrap>
                    <Value>{v.carbohydrate}</Value>
                    <Unit>g</Unit>
                  </ValueWrap>
                </Wrap3>
                <Wrap3>
                  <Label>지방</Label>
                  <ValueWrap>
                    <Value>{v.fat}</Value>
                    <Unit>g</Unit>
                  </ValueWrap>
                </Wrap3>
              </Wrap2>
            </Wrap1>
          </TableSingle>
        );
      })}
    </Container>
  );
};

export default HistoryTables;

const Container = styled.View`
  width: 100%;
`;

const TableSingle = styled.View`
  padding: 24px 0px;
  width: 100%;
  /* height: 80px; */

  flex-direction: row;

  align-items: center;

  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.grey[8]};
`;

const DateText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-right: 24px;
`;

const Wrap1 = styled.View`
  flex: 1;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Wrap2 = styled.View`
  width: 130px;

  align-items: center;
`;

const Wrap3 = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid black; */
  margin-bottom: 4px;
`;

const Label = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const ValueWrap = styled.View`
  flex-direction: row;

  justify-content: space-between;
`;

const Value = styled(Typography).attrs({text: 'Body06SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-right: 4px;
`;
const Unit = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
