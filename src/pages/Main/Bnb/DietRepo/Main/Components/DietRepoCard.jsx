import {Alert, Pressable, Text} from 'react-native';
import styled from 'styled-components';
import Typography from '~components/Typography';

// import MainLogoPng from '~assets/images/logo/main-logo.png';

import {Line} from 'react-native-svg';
import useDietRepoMutation from '../../useDietRepoMutation';

const DietRepoCard = ({item1 = undefined, item2 = undefined, date}) => {
  // console.log('아이템 2');
  // console.log(item2);

  const {deleteMeal, addMeal} = useDietRepoMutation(date);

  return (
    <Container>
      <CardContentBox>
        <ImagePressable
          onPress={() => {
            // e.stopPropagation();
          }}>
          <MealImage
            source={
              item1?.imgLocation || item2?.imageLocation
                ? {
                    uri: item1?.imgLocation || item2?.imageLocation,
                  }
                : require('../../../../../../assets/images/logo/main-logo.png')
            }
          />
        </ImagePressable>

        <MetadataWrap>
          <SmallRowWrap>
            <RestaurentNameText>
              {'['}
              {item1?.title || item2?.makersName}
              {']'}
            </RestaurentNameText>
            <MenuNameWrap>
              {!!item1 && !item2 ? (
                <MenuNameText numberOfLines={1} ellipsizeMode="tail">
                  {item1?.foodName || item2?.foodName}
                </MenuNameText>
              ) : (
                <MenuNameText>
                  {item1?.foodName || item2?.foodName}
                </MenuNameText>
              )}

              {!!item1 && !item2 && (
                <TotalCalText> · {item1?.calorie}kcal</TotalCalText>
              )}
            </MenuNameWrap>
          </SmallRowWrap>

          <MainWrap4>
            {!!item1 && !item2 ? (
              <MainWrap5>
                <MainWrap6>
                  <MainText6>탄수화물</MainText6>
                  <MainText6>{item1?.carbohydrate}g</MainText6>
                </MainWrap6>
                <MainWrap6>
                  <MainText6>단백질</MainText6>
                  <MainText6>{item1?.protein}g</MainText6>
                </MainWrap6>
                <MainWrap6>
                  <MainText6>지방</MainText6>
                  <MainText6>{item1?.fat}g</MainText6>
                </MainWrap6>
              </MainWrap5>
            ) : (
              <AddMealWrap5>
                <AddMealText6>{item2?.spotName}</AddMealText6>
                <MainText6>{item2?.count}개</MainText6>
              </AddMealWrap5>
            )}

            <ButtonWrap>
              <ReviewFormWriteButton
                onPress={() => {
                  if (item1 && item1?.reportId) {
                    Alert.alert(
                      '식단 제거',
                      `${item1?.foodName}을 식단에서 제거시키시겠습니까? `,
                      [
                        {
                          text: '취소',
                          onPress: () => {
                            console.log('cancel pressed');
                          },
                        },
                        {
                          text: '제거',
                          onPress: () => {
                            try {
                              deleteMeal(item1?.reportId);
                            } catch (err) {
                              console.log(err);
                            }
                          },
                          style: 'destructive',
                        },
                      ],
                    );
                  } else if (item2 && item2?.dailyFoodId) {
                    Alert.alert(
                      '식단 추가',
                      `${item2?.foodName}을(를) 식단에서 추가하시겠습니까? `,
                      [
                        {
                          text: '취소',
                          onPress: () => {
                            console.log('cancel pressed');
                          },
                        },
                        {
                          text: '추가',
                          onPress: () => {
                            try {
                              addMeal({dailyFoodId: item2?.dailyFoodId});
                            } catch (err) {
                              console.log(err);
                            }
                          },
                          style: 'cancel',
                        },
                      ],
                    );
                  }
                }}>
                <TextText> {!!item1 && !item2 ? '제거' : '식사 추가'}</TextText>
              </ReviewFormWriteButton>
            </ButtonWrap>
          </MainWrap4>
        </MetadataWrap>
      </CardContentBox>

      {/* <Line style={{marginBottom: 24}} /> */}
      <GreyThinLine />
    </Container>
  );
};
export default DietRepoCard;

const Container = styled.View`
  width: 100%;

  /* 
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({theme}) => theme.colors.grey[8]}; */

  /* padding-top: 24px; */
  /* padding-bottom: 24px; */
  /* border: 1px solid black; */
`;

const CardContentBox = styled.View`
  width: 100%;
  display: flex;
  flex-flow: row;
  height: 114px;
`;
const ImagePressable = styled.Pressable``;
const MealImage = styled.Image`
  width: 114px;
  height: 114px;
  border-radius: 7.5px;
`;

const MetadataWrap = styled.View`
  flex: 1;
  height: 100%;

  padding: 0 16px;
  display: flex;
  /* justify-content: space-between; */
`;

const SmallRowWrap = styled.View``;

const RestaurentNameText = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${props => props.theme.colors.grey[4]};
  margin-left: 1px;
  margin: 1px 0;
`;

const MenuNameText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin: 1px 0;
  margin-left: 1px;

  max-width: 142px;
`;

const MenuNameWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MainWrap4 = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

const MainWrap5 = styled.View``;
const MainWrap6 = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const MainText6 = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.grey[5]};
`;

const AddMealWrap5 = styled.View``;
const AddMealText6 = styled(Typography).attrs({text: 'Button10R'})`
  color: ${props => props.theme.colors.grey[5]};
`;

const TotalCalText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const ButtonWrap = styled.View`
  height: 100%;
  flex-direction: column-reverse;
`;

const ReviewFormWriteButton = styled.Pressable`
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 77px;
  /* line-height: 32px; */
  border: 1px solid ${props => props.theme.colors.grey[7]};
  height: 32px;
  border-radius: 16px;
`;

const TextText = styled(Typography).attrs({text: 'Button10SB'})`
  color: ${props => props.theme.colors.grey[3]};
`;

const GreyThinLine = styled.View`
  width: 100%;
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 1px;
  margin-top: 24px;
  margin-bottom: 24px;
`;
