import faIR from 'date-fns/esm/locale/fa-IR/index.js';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import styled, {useTheme} from 'styled-components';
import Button from '../../../../components/Button';
import {CheckIcon} from '../../../../components/Icon';
import RateStars from '../../../../components/RateStars';
import Typography from '../../../../components/Typography';
import UploadPhoto from '../../../../components/UploadPhoto';

export const SCREEN_NAME = 'S_MAIN__CREATE_REVIEW_PAGE_2';

const Screen = () => {
  const [photosArray, setPhotosArray] = useState([]);

  const [checked, setChecked] = useState(false);
  const themeApp = useTheme();
  return (
    <>
      <Container>
        <SatisfactionTitle>
          <Title1>만족도를 알려주세요</Title1>
          <RateStars width="160px" margin="2px" />
        </SatisfactionTitle>

        <UploadPhotosWrap>
          <Title2Wrap>
            <Title2> 사진 업로드 0/5 </Title2>
            <NotMandatory>(선택)</NotMandatory>
          </Title2Wrap>

          <PhotosScrollViewWrap
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
              <UploadPhoto
                width="80px"
                height="80px"
                photosArray={photosArray}
                setPhotosArray={setPhotosArray}
              />
              {!!photosArray.length &&
                photosArray.map((value, index) => {
                  return <PhotoImage key={index} source={{uri: value}} />;
                })}
            </View>
          </PhotosScrollViewWrap>
        </UploadPhotosWrap>

        <ReviewWrap>
          <Title3>리뷰를 작성해주세요</Title3>

          <ReviewInput
            multiline
            numberOfLines={20}
            maxLength={70}
            placeholder="최소 10자 이상 입력해주세요"></ReviewInput>

          <ShowOnlyToOwnerWrap>
            <CheckBox
              checked={checked}
              onPress={() => {
                setChecked(!checked);
              }}>
              <CheckIcon
                style={{width: 15, height: 10}}
                // size={36}
                color={'#ffffff'}
              />
            </CheckBox>
            <Title4>사장님에게만 보이기 </Title4>
          </ShowOnlyToOwnerWrap>
        </ReviewWrap>

        <Warnings>
          작성된 리뷰는 다른 고객분들께 큰 도움이 됩니다. 하지만 상품 및
          서비스와 무관한 리뷰와 사진이 포함되거나 허위 리뷰, 욕설, 비방글은
          제3자의 권리를 침해하는 게시물은 통보없이 삭제될 수 있습니다.
        </Warnings>

        {/* <Button /> */}

        <Button
          // label={buttonTitle2}
          size="full"
          label="완료"
          // type={buttonType2}
          text={'Button09SB'}
          style={{position: 'fixed'}}
        />
      </Container>
    </>
  );
};

export default Screen;

const Container = styled.ScrollView`
  width: 100%;
  /* height: 20%; */
  background-color: #ffffff;
  padding: 0 24px;
  padding-top: 24px;
`;

const SatisfactionTitle = styled.View`
  margin-bottom: 58px;
`;
const Title1 = styled(Typography).attrs({text: 'Title03SB'})`
  color: #33334a;
  margin-bottom: 14px;
`;

const UploadPhotosWrap = styled.View`
  margin-bottom: 56px;
`;
const PhotosScrollViewWrap = styled.ScrollView`
  /* display: flex; */
  flex-direction: row;
`;

const PhotoImage = styled.Image`
  width: 80px;
  height: 80px;
  margin: 0 8px;
`;

const Title2Wrap = styled.View`
  display: flex;
  flex-direction: row;
`;
const Title2 = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-bottom: 12px;
`;
const NotMandatory = styled(Typography).attrs({text: 'Title03R'})`
  color: ${props => props.theme.colors.grey[5]};
`;

const ReviewWrap = styled.View``;
const Title3 = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-bottom: 12px;
`;
const ReviewInput = styled.TextInput`
  border: 1px solid ${props => props.theme.colors.grey[7]};
  padding: 17px 20px;
  height: 168px;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: justify;

  margin-bottom: 19px;
`;
const ShowOnlyToOwnerWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;
const CheckBox = styled.Pressable`
  width: 24px;
  height: 24px;
  background-color: ${props => {
    if (props.checked) {
      return props.theme.colors.grey[2];
    } else {
      return props.theme.colors.grey[7];
    }
  }};
  border-radius: 7px;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`;
const Title4 = styled(Typography).attrs({text: 'Body06R                  '})`
  color: ${props => props.theme.colors.grey[2]};
`;
const Warnings = styled(Typography).attrs({text: ' CaptionR'})`
  color: ${props => props.theme.colors.grey[4]};
`;
