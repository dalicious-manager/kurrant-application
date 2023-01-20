import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import { FAQAtom,FAQTitleAtom, isGetFAQLoadingAtom} from './store';

const useFAQ = () => {
    const [FAQ ,setFAQ] =useAtom(FAQAtom);
    const [FAQTitle ,setTitleFAQ] =useAtom(FAQTitleAtom);
    const [isGetFAQLoading,setGetFAQLoading] = useAtom(isGetFAQLoadingAtom);
        
    const getFAQ = async () => {
    
        try {
            setGetFAQLoading(true)
            const res = await Fetch.getFAQ();
            console.log(res.data)
            const FAQList = res.data?.filter(
                (arr, index, callback) => index === callback.findIndex(t => t.titleNo === arr.titleNo)
              );
            setTitleFAQ(FAQList);
            setFAQ(res.data);
            
        } catch (err) {
            throw err;
        } finally {
            setGetFAQLoading(false)
        }
    };

    return {
        getFAQ,
        readableAtom:{
            FAQ,
            FAQTitle,
            isGetFAQLoading,
        }
    }
};




export default useFAQ;