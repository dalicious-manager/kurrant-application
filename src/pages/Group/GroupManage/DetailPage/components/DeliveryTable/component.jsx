import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import Typography from '~components/Typography';
const Table = styled.View`
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  border-radius: 8px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const Cell = styled.View`
  flex: 3;
  border-right-width: 1px;
  border-bottom-width: ${({isLast}) => (!isLast ? '1px' : '0px')};
  border-color: ${({theme}) => theme.colors.grey[7]};
  flex-wrap: nowrap;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
`;
const Cell22 = styled.View`
  width: 100%;
  padding: 8px;
  padding-left: 16px;
  padding-right: 16px;
  border-bottom-width: ${({isLast}) => (!isLast ? '1px' : '0px')};
  border-color: ${({theme}) => theme.colors.grey[7]};
  flex-wrap: nowrap;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
`;

const Cell3 = styled.View`
  flex: 4;
  border-right-width: 1px;
  border-bottom-width: ${({isLast}) => (!isLast ? '1px' : '0px')};
  border-color: ${({theme}) => theme.colors.grey[7]};
  flex-wrap: nowrap;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
`;
const Cell2 = styled.View`
  flex: 4;
  border-bottom-width: ${({isLast}) => (!isLast ? '1px' : '0px')};
  border-color: ${({theme}) => theme.colors.grey[7]};
  padding: 8px;
  flex-wrap: nowrap;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
`;
const CellText = styled(Typography)`
  white-space: nowrap;
  flex-wrap: nowrap;
`;
export default function Component({mealInfo}) {
  const themeApp = useTheme();
  console.log(mealInfo);
  return (
    <Table>
      <Row>
        <Cell>
          <CellText text="SmallLabelR" textColor={themeApp.colors.grey[4]}>
            배송시간
          </CellText>
        </Cell>
        <Cell3>
          <CellText text="SmallLabelR" textColor={themeApp.colors.grey[4]}>
            주문마감
          </CellText>
        </Cell3>
        <Cell2>
          <CellText text="SmallLabelR" textColor={themeApp.colors.grey[4]}>
            멤버십할인마감
          </CellText>
        </Cell2>
      </Row>
      {mealInfo?.map((meal, idx) => {
        return (
          <Row key={idx}>
            <Cell isLast={mealInfo?.length - 1 === idx}>
              {meal?.deliveryTimes?.map((time, i) => {
                return (
                  <Cell22
                    key={i + time}
                    isLast={meal.deliveryTimes?.length - 1 === i}>
                    <CellText
                      text="SmallLabelR"
                      textColor={themeApp.colors.grey[2]}>
                      {time}
                    </CellText>
                  </Cell22>
                );
              })}
            </Cell>
            <Cell3 isLast={mealInfo?.length - 1 === idx}>
              <CellText text="SmallLabelR" textColor={themeApp.colors.grey[2]}>
                {meal.lastOrderTime}
              </CellText>
            </Cell3>
            <Cell2 isLast={mealInfo?.length - 1 === idx}>
              <CellText text="SmallLabelR" textColor={themeApp.colors.grey[2]}>
                {meal.membershipBenefitTime}
              </CellText>
            </Cell2>
          </Row>
        );
      })}
    </Table>
  );
}
