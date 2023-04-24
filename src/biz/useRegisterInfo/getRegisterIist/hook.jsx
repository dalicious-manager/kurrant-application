import {useAtom} from 'jotai';
import {useState} from 'react';

import * as Fetch from './Fetch';
import {
  makeArrayOfIdAndName,
  makeArrayOfIdAndText,
  makeYo,
} from '../../../pages/RegisterInfo/logic';

const useGetRegisterInfo = () => {
  const [countryFoodList, setCountryFoodList] = useState([]);
  const [alergyList, setAlergyList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [detailJobList, setDetailJobList] = useState([]);
  const [countryList, setCountryList] = useState([]);

  //
  const [foodImageListPage7, setFoodImageListPage7] = useState([]);
  const [foodImageListPage8, setFoodImageListPage8] = useState([]);
  const [foodImageListPage9, setFoodImageListPage9] = useState([]);
  const [foodImageListPage10, setFoodImageListPage10] = useState([]);

  // 음식나라 조회

  const getCountryFoodList = async () => {
    try {
      const res = await Fetch.getCountryFoodList();
      setCountryFoodList(makeArrayOfIdAndName(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  // 알러지정보
  const getAlergyList = async () => {
    try {
      const res = await Fetch.getAlergyList();
      setAlergyList(makeArrayOfIdAndName(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  // 국가 전체 조회
  const getCountryList = async () => {
    try {
      const res = await Fetch.getCountryList();
      setCountryList(makeArrayOfIdAndText(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  // 직종 조회

  const getJobList = async () => {
    try {
      const res = await Fetch.getJobList();

      setJobList(makeYo(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  // 상세 직종 조회
  const getDetailJobList = async id => {
    try {
      const res = await Fetch.getDetailJobList(id);

      setDetailJobList(makeArrayOfIdAndText(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  // 음식 이미지 조회

  const getFoodImageList = async () => {
    try {
      const res = await Fetch.getFoodImageList();

      // foodIds 배열 형식을 바꿔주어야됨

      const convertObjToArr = obj => {
        return Object.entries(obj).map(v => {
          return {
            foodId: v[0],
            imageUrl: v[1],
          };
        });
      };

      res.data.forEach(v => {
        if (v.page === 1) {
          setFoodImageListPage7(convertObjToArr(v.foodIds));
        } else if (v.page === 2) {
          setFoodImageListPage8(convertObjToArr(v.foodIds));
        } else if (v.page === 3) {
          setFoodImageListPage9(convertObjToArr(v.foodIds));
        } else if (v.page === 4) {
          setFoodImageListPage10(convertObjToArr(v.foodIds));
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getCountryFoodList,
    getAlergyList,
    getJobList,
    getDetailJobList,
    getCountryList,
    getFoodImageList,
    countryFoodList,
    alergyList,
    jobList,
    detailJobList,
    countryList,
    foodImageListPage7,
    foodImageListPage8,
    foodImageListPage9,
    foodImageListPage10,
  };
};

export default useGetRegisterInfo;
