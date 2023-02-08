import {useAtom} from 'jotai';

import { setStorage } from '../../utils/asyncStorage';
import * as Fetch from './Fetch';
import { corpApplicationListAtom, isCorpApplicationLoadingAtom } from './store';


const useCorporationApplication = () => {

    const [isCorpCheck,setCorpCheck] = useAtom(corpApplicationListAtom);
    const [isCorpLoading,setCorpLoading] = useAtom(isCorpApplicationLoadingAtom);


    // 기업 그룹 스팟 개설 신청
    const corpApplication = async (body,option={}) => {
        try {
            
            const res = await Fetch.CorporationApplication({
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
    const corpApplicationCheck = async (id) => {
        try {
            setCorpLoading(true)
            const res = await Fetch.CorporationApplicationCheck(id);
            
            setCorpCheck(res.data)
        } catch(err) {
            console.log(err)
        } finally{
            setCorpLoading(false)
        }
    }

    // 메모 수정
    const corporationApplicationMemo = async(body,id) =>{
        try {
            const res = await Fetch.CorporationApplicationMemo({
                ...body
            },
                id
            )
            return res
        } catch(err) {
            throw err
        }
    }
    return {
        corpApplication,
        corpApplicationCheck,
        corporationApplicationMemo,
        isCorpCheck,
        setCorpCheck
    }
}

export default useCorporationApplication;