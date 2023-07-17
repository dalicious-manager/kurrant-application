import {useAtom} from 'jotai';
import {checkSseType3Atom} from '../sseLogics/store';
import useSse from '../sseLogics/useSse';
import {useEffect} from 'react';
import {totalReviewWaitListAtom} from '../../../biz/useReview/useReviewWait/store';

const useSseType3 = () => {
  const {sseType3, confirmSseIsRead} = useSse();

  const [checkSseType3, setCheckSseType3] = useAtom(checkSseType3Atom);
  const [total] = useAtom(totalReviewWaitListAtom);
  useEffect(() => {
    console.log('checkSseType3 확인하기 ');
    console.log(checkSseType3);
  }, [checkSseType3]);

  useEffect(() => {
    // if (!checkSseType3) return;

    console.log('sseType3 보낼지 말지 판단하기 ');

    if (total <= 0) {
      // 서버에 read했다고보내기
      // setCheckType3 false로 바꾸기
      console.log('sseType3 읽었다고 올림 ');
      confirmSseIsRead(3);

      setCheckSseType3(false);
    }
  }, [checkSseType3]);

  return;
};
export default useSseType3;
