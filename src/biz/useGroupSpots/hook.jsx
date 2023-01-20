import {useAtom} from 'jotai';


import * as Fetch from './Fetch';    
import { applicationListAtom, groupSpotDetailAtom, userGroupSpotListAtom } from './store';
    
const useGroupSpots = () => {

    const [isApplicationList,setApplicationList] = useAtom(applicationListAtom); // 아파트 + 기업
    const [isUserGroupSpotCheck,setUserGroupSpotCheck] = useAtom(userGroupSpotListAtom); // 유저가 속한 그룹 스팟 조회
    const [isDetailSpot,setDetailSpot] = useAtom(groupSpotDetailAtom); // 그룹별 스팟 상세 조회

       // 그룹/스팟 신청 목록 조회 (아파트 + 기업)
       const applicationList = async () => {
        try {
            const res = await Fetch.ApplicationList();

            setApplicationList(res.data)
        } catch(err){
            console.log(err);
        }
    }
        // 유저가 속한 그룹 스팟 조회
        const userGroupSpotCheck = async () => {
            try {
                const res = await Fetch.GroupSpotCheck();
                
                setUserGroupSpotCheck(res.data)
            } catch(err){
                console.log(err)
            }
        }

         // 유저 그룹 설정
         const userGroupAdd = async (body) => {
            try {
                const res = await Fetch.UserGroupAdd({
                    ...body
                });
                console.log(res)
            } catch(err){
                console.log(err)
            }
        }

        // 그룹별 스팟 상세 조회

        const groupSpotDetail = async (id) => {
            try {
                const res = await Fetch.GroupDetail(id);
                
                setDetailSpot(res.data)
            }catch (err){
                throw err
            }
        }

        // 유저 스팟 등록

        const userSpotRegister = async (body) => {
            try {
                const res = await Fetch.SpotRegister({
                    ...body
                })
                
                return res;
            } catch(err){
                throw err;
            }
        }

        // 그룹 탈퇴

        const userWithdrawGroup = async (body) => {
            try {
                const res  = await Fetch.WithdrawGroup({
                    ...body
                })
                
                return res;
            } catch(err){
                console.log(err)
            }
            
        }

    return {
        applicationList,
        userGroupSpotCheck,
        userGroupAdd,
        groupSpotDetail,
        userSpotRegister,
        userWithdrawGroup,
        isApplicationList,
        isUserGroupSpotCheck,
        isDetailSpot,
        setDetailSpot
    }
}

export default useGroupSpots;