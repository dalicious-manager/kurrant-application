import {useAtom} from 'jotai';

import { setStorage } from '../../utils/asyncStorage';
import * as Fetch from './Fetch';
import { apartApplicationListAtom, apartApplicationResAtom, apartSearchAtom, applicationListAtom, isApartApplicationCheckAtom, isApartApplicationLoadingAtom } from './store';



const useApartApplication = () => {

    const [isApartCheck,setApartCheck] = useAtom(isApartApplicationCheckAtom);
    const [isApartRes,setApartRes] = useAtom(apartApplicationResAtom);
    const [isApartSearch,setApartSearch] = useAtom(apartSearchAtom);
    const [isApartLoading,setApartLoading] = useAtom(isApartApplicationLoadingAtom);

    const apartApplication = async (body,option={}) => {
        try {
            //console.log(body,'hook')
            const res = await Fetch.ApartmentApplication({
                ...body
            },
            option
            );
            
            return res;

        } catch(err){
            throw err;
        }
    }

    // 신청내역 조회
    const apartApplicationCheck = async(id) =>{
        try {
            setApartLoading(true)
            const res = await Fetch.ApartmentApplicationCheck(id)
            
            setApartCheck(res.data)
        } catch(err) {
            throw err
        } finally {
            setApartLoading(false)
        }
    }

    // 메모 수정
    const apartApplicationMemo = async(body,id) =>{
        
        try {
            const res = await Fetch.ApartmentApplicationMemo({
                ...body
            },
                id
            )
            console.log(res)
            return res
        } catch(err) {
            throw err
        }
    }

    // 아파트 검색
    const apartSearch = async () => {
        try {
            const res = await Fetch.ApartmentSearch();
            
            setApartSearch(res.data)
        } catch(err){
            console.log(err)
        }
    }

    // 유저 아파트 스팟 등록
    const apartmentRegisterSpot = async (id,body) => {
        try {
            const res = await Fetch.ApartmentRegisterSpot(id,{
                ...body
            })
            console.log(res.data)
            return res
        } catch(err){
            console.log(err)
        }
    }

    return {
        apartApplication,
        apartApplicationCheck,
        apartApplicationMemo,
        apartSearch,
        apartmentRegisterSpot,
        isApartCheck,
        isApartRes,
        isApartSearch,
        isApartLoading,
        setApartCheck
    }
};



    

export default useApartApplication;