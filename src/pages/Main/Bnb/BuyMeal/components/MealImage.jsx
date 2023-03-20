import {ImageBackground, View} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../../../components/Typography';
import AIicon from '../../../../../assets/icons/BuyMeal/ai.svg';
import {AIbackground} from '../../../../../assets';
import CartIcon from '../../../../../assets/icons/BuyMeal/cartBlur.svg';
import FastImage from 'react-native-fast-image';
const MealImage = ({status, image, onPressEvent, isAddMeal, rank}) => {
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
            <FastImage
              source={{
                uri: `${image}`,
                priority: FastImage.priority.high,
              }}
              style={{
                width: 114,
                height: 114,
                borderRadius: 7,
              }}
            />

            {status === 1 && (
              <CartIconWrap
                disabled={isAddMeal}
                onPress={() => {
                  onPressEvent();
                }}>
                <CartIcon />
              </CartIconWrap>
            )}
          </MealImageWrap>
        </ImageBackground>
      ) : (
        <View>
          {(status === 2 || status === 6) && <BlurView />}
          <FastImage
            source={{
              uri: `${image}`,
              priority: FastImage.priority.high,
            }}
            style={{
              width: 114,
              height: 114,
              borderRadius: 7,
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
  border-radius: 7px;
  left: 0px;
  background-color: #ffffffcc;
  z-index: 999;
`;
