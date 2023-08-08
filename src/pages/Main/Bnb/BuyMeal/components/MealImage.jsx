import React from 'react';
import {ImageBackground, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled, {useTheme} from 'styled-components';

import {AIbackground} from '../../../../../assets';
import AIicon from '../../../../../assets/icons/BuyMeal/ai.svg';
import CartIcon from '../../../../../assets/icons/BuyMeal/cartBlur.svg';
import CheckCart from '../../../../../assets/icons/MealCart/checkCart.svg';
import Typography from '../../../../../components/Typography';
import {formattedWeekDate} from '../../../../../utils/dateFormatter';

const MealImage = ({
  status,
  image,
  onPressEvent,
  isAddMeal,
  rank,
  dailyFoodId,
  orderFoodList = [],
  cartFoodList = [],
  lastOrderTime,
}) => {
  const themeApp = useTheme();

  return (
    <>
      {rank === 1 ? (
        <ImageBackground
          source={AIbackground}
          resizeMode="cover"
          style={{width: 130, height: 146, marginRight: -8}}>
          <AIrecommend>
            <AIicon />
            <AItext>오늘의 픽</AItext>
          </AIrecommend>
          <MealImageWrap>
            {(status === 2 || status === 6) && <BlurView />}
            {!(status === 2 || status === 6) &&
            orderFoodList.includes(dailyFoodId) ? (
              <OrderView>
                <Typography
                  textColor={themeApp.colors.grey[0]}
                  text="SmallLabel">
                  주문 상품
                </Typography>
              </OrderView>
            ) : (
              !(status === 2 || status === 6) &&
              !orderFoodList.includes(dailyFoodId) && (
                <OrderView style={{backgroundColor: '#1D1C2180'}}>
                  <Typography
                    textColor={themeApp.colors.grey[0]}
                    text="SmallLabel">
                    {lastOrderTime} 마감
                  </Typography>
                </OrderView>
              )
            )}
            <FastImage
              source={{
                uri: `${image}`,
                priority: FastImage.priority.high,
              }}
              style={{
                width: 114,
                height: 114,
                borderRadius: 14,
              }}
            />

            {status === 1 && (
              <CartIconWrap
                disabled={isAddMeal}
                onPress={() => {
                  onPressEvent();
                }}>
                <CartIcon />
                {cartFoodList.includes(dailyFoodId) && (
                  <CheckWrap>
                    <CheckCart />
                  </CheckWrap>
                )}
              </CartIconWrap>
            )}
          </MealImageWrap>
        </ImageBackground>
      ) : (
        <View>
          {(status === 2 || status === 6) && <BlurView />}
          {!(status === 2 || status === 6) &&
          orderFoodList.includes(dailyFoodId) ? (
            <OrderView>
              <Typography textColor={themeApp.colors.grey[0]} text="SmallLabel">
                주문 상품
              </Typography>
            </OrderView>
          ) : (
            !(status === 2 || status === 6) &&
            !orderFoodList.includes(dailyFoodId) && (
              <OrderView style={{backgroundColor: '#1D1C2180'}}>
                <Typography
                  textColor={themeApp.colors.grey[0]}
                  text="SmallLabel">
                  {lastOrderTime} 마감
                </Typography>
              </OrderView>
            )
          )}
          <FastImage
            source={{
              uri: `${image}`,
              priority: FastImage.priority.high,
            }}
            style={{
              width: 114,
              height: 114,
              borderRadius: 14,
            }}
            r
          />

          {status === 1 && (
            <CartIconWrap
              disabled={isAddMeal}
              onPress={() => {
                onPressEvent();
              }}>
              <CartIcon />
              {cartFoodList.includes(dailyFoodId) && (
                <CheckWrap>
                  <CheckCart />
                </CheckWrap>
              )}
            </CartIconWrap>
          )}
        </View>
      )}
    </>
  );
};

export default MealImage;

const AItext = styled(Typography).attrs({text: 'CaptionSB'})`
  color: ${({theme}) => theme.colors.purple[500]};
  margin-left: 3px;
`;

const AIrecommend = styled.View`
  flex-direction: row;
  margin-left: 7px;
  margin-top: 2px;
`;

const MealImageWrap = styled.View`
  //height:107px;
  position: absolute;
  bottom: 8px;
  right: 8px;
`;
const CheckWrap = styled.View`
  position: absolute;
  top: 2px;
  right: 4px;
`;

const CartIconWrap = styled.Pressable`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

const BlurView = styled.View`
  position: absolute;
  width: 114px;
  height: 114px;
  border-radius: 14px;
  left: 0px;
  background-color: #ffffffcc;
  z-index: 999;
`;
const OrderView = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 114px;
  height: 24px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  left: 0px;
  background: #3478f6cc;
  z-index: 999;
`;
