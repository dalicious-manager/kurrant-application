import {useAtom} from 'jotai';
import {checkSseType3Atom} from '../sseLogics/store';

import {useEffect} from 'react';
import {totalReviewWaitListAtom} from '../../../biz/useReview/useReviewWait/store';
import useSse from '../sseLogics/useSse';
import mSleep from '../../../helpers/mSleep';

const useSseType3 = () => {
  const [checkSseType3, setCheckSseType3] = useAtom(checkSseType3Atom);
  const [total] = useAtom(totalReviewWaitListAtom);

  const {confirmSseIsRead} = useSse();

  useEffect(() => {
    if (!checkSseType3) return;

    // console.log('sseType3 보낼지 말지 판단하기 ');
    (async () => {
      // await mSleep(300);

      if (total <= 0) {
        // 서버에 read했다고보내기
        // setCheckType3 false로 바꾸기
        console.log('total이 0이기 때문에 sseType3 읽었다고 올림 ');
        await confirmSseIsRead({type: 3});
      } else {
        console.log(`total값 = ${total}, total이 0보다 큰 수라 안 보냄`);
      }
      setCheckSseType3(false);
    })();
  }, [checkSseType3]);

  return;
};
export default useSseType3;
