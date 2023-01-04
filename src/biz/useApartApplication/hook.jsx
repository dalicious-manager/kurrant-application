import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { apartApplicationListAtom, apartApplicationResAtom, isApartApplicationCheckAtom } from './store';



const useApartApplication = () => {

    const [isApartCheck,setApartCheck] = useAtom(isApartApplicationCheckAtom);
    const [isApartRes,setApartRes] = useAtom(apartApplicationResAtom);
    const [isApartApplicationList,setApartApplicationList] = useAtom(apartApplicationListAtom);

    const apartApplication = async (body,option={}) => {
        try {
            //console.log(body,'hook')
            const res = await Fetch.ApartmentApplication({
                ...body
            },
            option
            );
            setApartRes(res.data); // response 저장
            //console.log(res.data)
            return res;

        } catch(err){
            throw err;
        }
    }

    // 신청내역 확인
    const apartApplicationCheck = async(id) =>{
        try {
            const res = await Fetch.ApartmentApplicationCheck(id)
            console.log(res.data.user)
            setApartCheck(res.data)
        } catch(err) {
            throw err
        }
    }

    // 메모 수정
    const apartApplicationMemo = async(body) =>{
        try {
            const res = await Fetch.ApartmentApplicationMemo({
                ...body
            })
            console.log(res)
            return res
        } catch(err) {
            throw err
        }
    }

    const apartApplicationList = async () =>{
        try {
            const res = await Fetch.ApartmentApplicationList();
            console.log(res.data);
            setApartApplicationList(res.data)
        } catch(err){
            console.log(err);
        }
    }

    return {
        apartApplication,
        apartApplicationCheck,
        apartApplicationMemo,
        apartApplicationList,
        isApartApplicationList,
        isApartCheck,
        isApartRes
    }
};



    

export default useApartApplication;