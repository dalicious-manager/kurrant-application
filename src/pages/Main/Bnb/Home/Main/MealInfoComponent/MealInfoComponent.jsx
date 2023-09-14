import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Shadow} from 'react-native-shadow-2';
import Sound from 'react-native-sound';
import {useQueryClient} from 'react-query';
import styled, {css} from 'styled-components';

import Typography from '../../../../../../components/Typography';
import {useConfirmOrderState} from '../../../../../../hook/useOrder';
// import {PAGE_NAME as reviewPage} from '../../../../../../screens/Main/Review/CreateReview/Page1';
import {PAGE_NAME as CreateReviewPage1PageName} from '../../../../../../pages/Main/MyPage/Review/CreateReview/Page1';
import {formattedMealFoodStatus} from '../../../../../../utils/statusFormatter';
import useDietRepoMutation from '../../../DietRepo/useDietRepoMutation';
import useGetDietRepo from '../../../DietRepo/useGetDietRepo';
import {PAGE_NAME as MealMainPageName} from '../../../Meal/Main';
import CoinAnimation from '../../components/CoinAnimation';
import useSse from '../../../../../../utils/sse/sseLogics/useSse';

const MealInfoComponent = ({
  m,
  meal,
  mockStatus,
  dailyFoodId,
  loadCoinSound,
  coinSound,
}) => {
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);
  const navigation = useNavigation();
  // const {dietRepoMainRefetch} = useGetDietRepo();
  const {addMeal} = useDietRepoMutation();
  const {mutateAsync: orderState} = useConfirmOrderState();
  const [startAni, setStartAni] = useState(false);

  // sseType3

  const {sseHistoryRefetch} = useSse();

  const deliveryConfirmPress = async () => {
    await orderState({id: meal.id});
    setDeliveryConfirmed(true);
  };
  const queryClient = useQueryClient();

  const goToReviewPage = (id, image, name) => {
    navigation.navigate(CreateReviewPage1PageName, {
      orderItemId: id,
      imageLocation: image,
      foodName: name,
      resetNavigate: true,
    });
  };

  return (
    <>
      <MealInfoWrapper>
        <Shadow
          style={
            (meal.orderStatus === 10 || meal.orderStatus === 11) && {
              borderRadius: 14,
              marginBottom: 12,
            }
          }
          startColor={
            (meal.orderStatus === 10 || meal.orderStatus === 11) && '#5A1EFF20'
          }
          distance={(meal.orderStatus === 10 || meal.orderStatus === 11) && 10}>
          <MealInfoWrap
            onPress={() =>
              navigation.navigate(MealMainPageName, {
                isToday: true,
              })
            }>
            <MealInfo>
              <FastImage
                source={{
                  uri: `${meal.image}`,
                  priority: FastImage.priority.high,
                }}
                style={{
                  width: 64,
                  height: 64,
                  borderTopLeftRadius: 14,
                  borderBottomLeftRadius: 14,
                }}
              />

              <MealText>
                <View style={{width: '80%', overflow: 'hidden'}}>
                  <DiningType>
                    {m.diningType + ' ' + meal.deliveryTime}
                  </DiningType>
                  <View>
                    <MealTxt numberOfLines={1} ellipsizeMode="tail">
                      {meal.name}
                    </MealTxt>
                  </View>
                </View>
                <MealCount>
                  <GreyTxt status={meal.orderStatus}>
                    {(meal.orderStatus === 10 ||
                      meal.orderStatus === 6 ||
                      meal.orderStatus === 9) &&
                      formattedMealFoodStatus(meal.orderStatus)}
                  </GreyTxt>

                  <GreyTxt>{meal.count}개</GreyTxt>
                </MealCount>
              </MealText>
            </MealInfo>
          </MealInfoWrap>
        </Shadow>
        {(meal.orderStatus === 10 || meal.orderStatus === 11) && (
          <OrderStatusWrap>
            <CommentText>
              {meal.orderStatus === 11
                ? '식사 맛있게 하셨나요?'
                : meal.orderStatus === 10 &&
                  '배송완료! 메뉴 확인후 수령하셨나요?'}
            </CommentText>

            <ConfirmPressable
              disabled={startAni}
              startAni={startAni}
              onPress={() => {
                if (meal.orderStatus === 10) {
                  setStartAni(true);
                  deliveryConfirmPress();
                  addMeal([
                    {dailyFoodId},
                    () => {
                      queryClient.invalidateQueries({
                        queryKey: ['dietRepo', 'main'],
                      });
                      queryClient.invalidateQueries('userInfo');

                      // sseType3 : 홈에서 '배송완료! 메뉴 확인후... '누르면 refetch하게 하기
                      sseHistoryRefetch();

                      // dietRepoMainRefetch();
                    },
                  ]);
                } else {
                  goToReviewPage(meal.id, meal.image, meal.name);
                }
              }}>
              <ConfirmText>
                {meal.orderStatus === 11
                  ? '맛 평가하기'
                  : meal.orderStatus === 10 && '네, 확인했어요'}
              </ConfirmText>
              {startAni && (
                <CoinAnimation
                  isStart={startAni}
                  loadCoinSound={loadCoinSound}
                  coinSound={coinSound}
                  setStart={setStartAni}
                />
              )}
            </ConfirmPressable>
          </OrderStatusWrap>
        )}
      </MealInfoWrapper>
    </>
  );
};

export default MealInfoComponent;

const Display = css`
  flex-direction: row;
  align-items: center;
`;

const MealInfoWrapper = styled.View`
  margin-bottom: 16px;
`;

const MealInfo = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MealInfoWrap = styled.Pressable`
  ${Display};
  max-height: 64px;
  border-radius: 14px;
  background-color: ${props => props.theme.colors.grey[0]};
  padding: 16px;
  justify-content: space-between;
  padding-left: 0px;
`;

const OrderStatusWrap = styled.View`
  align-items: center;
  z-index: 999;
`;
const CommentText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[1]};
  margin-bottom: 4px;
`;
const ConfirmPressable = styled.Pressable`
  background-color: ${({theme, startAni}) =>
    startAni ? theme.colors.grey[5] : theme.colors.purple[500]};
  border-radius: 999px;
  height: 28px;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
`;
const ConfirmText = styled(Typography).attrs({text: 'Button09SB'})`
  color: white;
`;

const MealCount = styled.View`
  /* align-self: flex-end; */
  justify-content: flex-end;
  align-items: flex-end;
  position: absolute;
  right: 0px;
`;

const MealText = styled.View`
  padding-left: 16px;
  flex-direction: row;
  flex: 1;
  //justify-content: space-between;
  position: relative;
`;

const DiningType = styled(Typography).attrs({text: 'CaptionSB'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const MealTxt = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const GreyTxt = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme, status}) =>
    status === 9 ? theme.colors.blue[500] : theme.colors.grey[5]};
`;
