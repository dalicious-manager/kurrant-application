import React from 'react';
import {FlatList, Text, View} from 'react-native';
import styled from 'styled-components';
import {DefaultProfile} from '../../../../assets';
import Card from './Card';
import NoOrder from '../NoOrder';

export const PAGE_NAME = 'P_MAIN__MYPAGE__WRITTENREVIEW';

const Pages = () => {
  const ReviewList = [
    {
      id: 1,
      // writtenDate: new Date(Date.now()),
      writtenDate: '2022. 02. 11',
      makersName: '폴어스',
      menuName: '리코타 치즈 샐러드',
      option: '꼬치소스',
      rating: 4,
      reviewText:
        '예전보다 짠맛이 적어서 좋습니다! 맛있긴 했는데 젓가락 끝이 썩어있었어요 ㅠㅠ 한 입 먹고 맛이 쓰길래 왜지? 예전보다 짠맛이 적어서 좋습니다! 맛있긴 했는데 젓가락 끝이 썩어있었어요 ㅠㅠ 한 입 먹고 맛이 쓰길래 왜지? 어있었어요 ㅠㅠ 한 입 먹고 맛이 쓰길래 왜지? ㅠ 한 입 먹고 맛이 쓰길래',
      adminReview: {
        pngLink: DefaultProfile,
        adminName: '일품만찬',
        writtenDate: '2022.02.19 작성',
        message:
          '다음에는 더 맛있는 메뉴를준비해보겠습니다. 이용해주셔서 다시한번 감사드리고 새해에는 더더더더더복 많이 받으세요 사랑합니다.',
      },
    },
    {
      id: 2,
      // writtenDate: new Date(Date.now()),
      writtenDate: '2021. 12. 11',
      makersName: '랄랄라',
      menuName: '랄랄라 삼겹살 초코 돈까스',
      option: '꼬치고기 소스',
      rating: 5,
      reviewText: '참신하고 예술성있는 시도 인것 같습니다 ',
      adminReview: {
        pngLink: DefaultProfile,
        adminName: '조재신',
        writtenDate: '2022.02.19 작성',
        message:
          '다음에는 더 맛있는 메뉴를준비해보겠습니다. 이용해주셔서 다시한번 감사드리고 새해에는 더더더더더복 많이 받으세요 사랑합니다.',
      },
    },
  ];

  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      {!!ReviewList.length ? (
        <FlatList
          data={ReviewList}
          scrollEnabled={true}
          renderItem={({item}) => {
            return (
              <View>
                <Card
                  makersName={item.makersName}
                  menuName={item.menuName}
                  writtenDate={item.writtenDate}
                  option={item.option}
                  rating={item.rating}
                  reviewText={item.reviewText}
                  adminReview={item.adminReview}
                />
              </View>
            );
          }}
        />
      ) : (
        <NoOrder
          isArrayEmpty={!ReviewList.length}
          message={`아직 작성한 리뷰가 없어요.`}
        />
      )}
    </Container>
  );
};

export default Pages;

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 24px 25px;
  background-color: #ffffff;
`;
