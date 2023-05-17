import {Pressable, Text} from 'react-native';
import styled from 'styled-components';
import Typography from '~components/Typography';

// import MainLogoPng from '~assets/images/logo/main-logo.png';

import {Line} from 'react-native-svg';

const DietRepoCard = ({type, item}) => {
  return (
    <Container>
      <CardContentBox>
        <ImagePressable
          onPress={() => {
            // e.stopPropagation();
          }}>
          <MealImage
            source={require('../../../../../../assets/images/logo/main-logo.png')}
            // source={{
            //   uri: imageLocation,
            // }}
          />
        </ImagePressable>

        <MetadataWrap>
          <SmallRowWrap>
            <RestaurentNameText>
              {'['}
              브라운 돈까스
              {']'}
            </RestaurentNameText>
            <MenuNameWrap>
              <MenuNameText numberOfLines={1} ellipsizeMode="tail">
                정식 돈까스 정식 돈까스 정식 돈까스
              </MenuNameText>
              <TotalCalText> · 2200kcal</TotalCalText>
            </MenuNameWrap>
          </SmallRowWrap>
          <Wrap4>
            <Wrap5>
              <Wrap6>
                <Text6>탄수화물</Text6>
                <Text6>40g</Text6>
              </Wrap6>
              <Wrap6>
                <Text6>단백질</Text6>
                <Text6>40g</Text6>
              </Wrap6>
              <Wrap6>
                <Text6>지방</Text6>
                <Text6>40g</Text6>
              </Wrap6>
            </Wrap5>

            <ButtonWrap>
              <ReviewFormWriteButton onPress={() => {}}>
                <TextText>제거</TextText>
              </ReviewFormWriteButton>
            </ButtonWrap>
          </Wrap4>
        </MetadataWrap>
      </CardContentBox>

      <Line />
    </Container>
  );
};
export default DietRepoCard;

const Container = styled.View`
  width: 100%;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({theme}) => theme.colors.grey[8]};

  padding-top: 24px;
  padding-bottom: 24px;
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

const Wrap4 = styled.View`
  flex-direction: row;
  justify-content: space-between;

  flex: 1;
`;

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

const Wrap5 = styled.View`
  /* border: 1px solid black; */
`;
const Wrap6 = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Text6 = styled(Typography).attrs({text: 'CaptionR'})`
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
