import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import {useState} from 'react';
import {Alert} from 'react-native';

const useUpdateRegisterInfo = () => {
  // 회원정보 저장의 body 형식

  // {
  //     "breakfastCount": 1,
  //     "midnightSnackCount":2,
  //     "exerciseCount":2,
  //     "drinkCount":0,
  //     "favoriteCountryFood": "한국,일본",
  //     "allergyInfo":"새우,대두,밀,아황산류",
  //     "allergyInfoEtc":"감성돔",
  //     "isVegan": false,
  //     "veganLevel": 0,
  //     "isProtein" : true,
  //     "proteinFrequency":0,
  //     "userDefaultInfo":{
  //         "birthYear":"1995",
  //         "birthMonth":"02",
  //         "birthDay":"07",
  //         "gender": 0,
  //         "country": "대한민국",
  //         "jobType":"연구직 및 공학기술직",
  //         "detailJobType":"정보기술"
  //     },
  //     "userSelectTestDataList": [{
  //         "selectedFoodId":"1,3,5",
  //         "unselectedFoodId":"2,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21"
  //     }, {
  //         "selectedFoodId":"1,2,3",
  //         "unselectedFoodId":"4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21"
  //     }]
  // }

  //   {
  //     breakfastCount: 0,
  //     midnightSnackCount: 1,
  //     exerciseCount: 0,
  //     drinkCount: 1,
  //     favoriteCountryFood: "중국,멕시코,프랑스,인도",
  //     allergyInfo: "우유,호두",
  //     isVegan: true,
  //     veganLevel: 3,
  //     isProtein: true,
  //     proteinFrequency: 2,
  //     userDefaultInfo: {
  //       birthYear: "2018",
  //       birthMonth: "04",
  //       birthDay: "24",
  //       gender: 1,
  //       country: "대한민국",
  //       jobType: "경영·사무·금융·보험직",
  //       detailJobType: "경영"
  //     },
  //     useSelectTextDataList: [
  //       {
  //         selectedFoodId: [
  //           1,
  //           2,
  //           3
  //         ],
  //         unselectedFoodId: []
  //       },
  //       {
  //         selectedFoodId: [
  //           1,
  //           2,
  //           3
  //         ],
  //         unselectedFoodId: []
  //       },
  //       {
  //         selectedFoodId: [
  //           1,
  //           2,
  //           3
  //         ],
  //         unselectedFoodId: []
  //       },
  //       {
  //         selectedFoodId: [
  //           1,
  //           2,
  //           3
  //         ],
  //         unselectedFoodId: []
  //       }
  //     ]
  //   }

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const updateRegisterInfo = async body => {
    try {
      setIsUpdateLoading(true);
      const fetchRes = await Fetch.updateRegisterInfo({
        ...body,
      });

      return fetchRes;
    } catch (err) {
      console.log('updateRegisterInfo 에러나옴');
      // 일단 에러를 띄운다 여기서 어떻게 에러처리할 것인지 생각해보기
      Alert.alert('회원정보 입력 실패');
      throw err;
    } finally {
      setIsUpdateLoading(false);
    }
  };

  return {isUpdateLoading, updateRegisterInfo};
};

export default useUpdateRegisterInfo;
