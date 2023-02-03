import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import RateStars from '../../../../components/RateStars';
import Typography from '../../../../components/Typography';

export const SCREEN_NAME = 'S_MAIN__CREATE_REVIEW_PAGE_2';

const Screen = () => {
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

          <UploadedPhotosWrap>
            <UploadButton></UploadButton>
          </UploadedPhotosWrap>
        </UploadPhotosWrap>

        <ReviewWrap>
          <Title3>리뷰를 작성해주세요</Title3>

          <ReviewInput
            multiline
            numberOfLines={20}
            maxLength={70}
            placeholder="최소 10자 이상 입력해주세요"></ReviewInput>

          <ShowOnlyToOwnerWrap>
            <CheckBox />
            <Title4>사장님에게만 보이기 </Title4>
          </ShowOnlyToOwnerWrap>
        </ReviewWrap>

        <Warnings>
          작성된 리뷰는 다른 고객분들께 큰 도움이 됩니다. 하지만 상품 및
          서비스와 무관한 리뷰와 사진이 포함되거나 허위 리뷰, 욕설, 비방글은
          제3자의 권리를 침해하는 게시물은 통보없이 삭제될 수 있습니다.
        </Warnings>
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
const UploadedPhotosWrap = styled.View``;
const UploadButton = styled.View`
  width: 80px;
  height: 80px;
  background-color: ${props => props.theme.colors.grey[8]};
  border-radius: 7px;
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
`;
const ShowOnlyToOwnerWrap = styled.View``;
const CheckBox = styled.Pressable`
  width: 24px;
  height: 24px;
  background-color: ${props => props.theme.colors.grey[7]};
  border-radius: 7px;
`;
const Title4 = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.grey[2]};
`;
const Warnings = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-left: 1px;
  margin: 1px 0;
`;
