import {DefaultProfile} from '../../../assets';
import mSleep from '../../../helpers/mSleep';

import {fetchJson} from '../../../utils/fetch';

export async function getReviewOrderMeal() {
  const fetchRes = await fetchJson(
    `/users/me/reviews`,

    'GET',
  );

  return fetchRes;
}

export async function deleteReview(id) {
  // const fetchRes = await

  const fetchRes = await fetchJson(
    `/users/me/reviews/delete?id=${id}`,

    'PATCH',
  );
  return fetchRes;
}

export async function writtenReviewMockData() {
  await mSleep(3000);

  return {
    writtenReviewList: [
      {
        id: 1,
        // writtenDate: new Date(Date.now()),
        writtenDate: '2022. 02. 11',
        makersName: '폴어스',
        foodName: '리코타 치즈 샐러드',
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
        foodName: '랄랄라 삼겹살 초코 돈까스',
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
      {
        id: 3,
        // writtenDate: new Date(Date.now()),
        writtenDate: '2021. 10. 1',
        makersName: '국밥',
        foodName: '랄랄라 국밥 방어회',
        option: '소오스~ 소스',
        rating: 3.5,
        reviewText: '랄랄라~~랄랄라~~랄랄라~~랄랄라~~ ',
        adminReview: undefined,
      },
    ],
  };
}
