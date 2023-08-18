import styled from 'styled-components';
import {Shadow} from 'react-native-shadow-2';
import Typography from '~components/Typography';

const OrderSelectController = ({
  keyword,
  orderFilter,
  setOrderFilter,
  setShowSelectList,
}) => {
  return (
    <WrapWrapView isOn={Array.isArray(keyword) && keyword.length > 0}>
      <ShadowWrap startColor="rgba(0, 0, 0, 0.03)" distance={14}>
        <FilterSelecterWrap>
          <FilterSelecterPressable
            onPress={() => {
              setOrderFilter(0);

              setShowSelectList(false);
            }}>
            <SelectorText isClicked={orderFilter === 0}>베스트 순</SelectorText>
          </FilterSelecterPressable>
          <FilterSelecterPressable
            isTopBorder={true}
            onPress={() => {
              setOrderFilter(1);

              setShowSelectList(false);
            }}>
            <SelectorText isClicked={orderFilter === 1}>최신 순</SelectorText>
            <></>
          </FilterSelecterPressable>
          <FilterSelecterPressable
            isTopBorder={true}
            onPress={() => {
              setOrderFilter(2);

              setShowSelectList(false);
            }}>
            <SelectorText isClicked={orderFilter === 2}>
              리뷰 추천순
            </SelectorText>
          </FilterSelecterPressable>
        </FilterSelecterWrap>
      </ShadowWrap>
    </WrapWrapView>
  );
};
export default OrderSelectController;

const WrapWrapView = styled.View`
  position: absolute;
  /* top: 215px; */
  /* top: ${({isOn}) => (isOn ? '215px' : '175px')}; */
  top: ${({isOn}) => (isOn ? '640px' : '600px')};
  left: 30px;
  z-index: 3;
  /* border: 1px solid black; */
`;

const ShadowWrap = styled(Shadow)`
  border-radius: 7px;
`;

const FilterSelecterWrap = styled.View`
  width: ${() => {
    if (Platform.OS === 'android') {
      return `86px`;
    }
    return `84px`;
  }};
  background-color: #ffffff;
  flex-direction: column;
  align-items: center;
  border-radius: 7px;
`;
const FilterSelecterPressable = styled.Pressable`
  flex: 1;
  width: 100%;

  justify-content: center;
  padding: 12px;

  ${({isTopBorder, theme}) => {
    if (isTopBorder) {
      return `
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: ${theme.colors.grey[8]};
    `;
    }
  }}
  ${({isBottomBorder, theme}) => {
    if (isBottomBorder) {
      return `
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${theme.colors.grey[8]};  `;
    }
  }}
`;

const SelectorText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme, isClicked}) =>
    isClicked ? theme.colors.grey[2] : theme.colors.grey[5]};
`;
