import * as sseAtoms from './store';
import {useAtom} from 'jotai';
import {useQuery, useMutation} from 'react-query';
import {fetchJson} from '../../fetch';

const useSse = () => {
  const [sseType1, setSseType1] = useAtom(sseAtoms.sseType1Atom);
  const [sseType2, setSseType2] = useAtom(sseAtoms.sseType2Atom);
  const [sseType3, setSseType3] = useAtom(sseAtoms.sseType3Atom);
  const [sseType4, setSseType4] = useAtom(sseAtoms.sseType4Atom);
  const [sseType5, setSseType5] = useAtom(sseAtoms.sseType5Atom);
  const [sseType6, setSseType6] = useAtom(sseAtoms.sseType6Atom);
  const [sseType7, setSseType7] = useAtom(sseAtoms.sseType7Atom);
  const [sseType8, setSseType8] = useAtom(sseAtoms.sseType8Atom);
  //
  // sse 전체 이력 조회
  // const [sseHistory, setSseHistory] = useState([]);

  const {data: sseHistory, refetch: sseHistoryRefetch} = useQuery(
    ['sse', 'notification'],
    async ({queryKey}) => {
      const response = await fetchJson(
        `/notification`,

        'GET',
      );

      return response?.data;

      // setSseHistory(response.data);
    },
    {
      // enabled: false,
    },
  );

  // sse 알림 읽었다고 서버에 보내주기
  const {mutate: confirmSseIsRead} = useMutation(
    async data => {
      const response = await fetchJson('/notification/read', 'PUT', {
        body: JSON.stringify(data),
      });

      return [response, data];
    },
    {
      onSuccess: data => {
        const messageType = data[1];

        switch (messageType) {
          case 1:
            // type: 1 전체공지 (여긴 아직하면 안 됨)
            console.log('sse 알림읽기 성공 message type 1 (전체공지)');
            setSseType1({});
            sseHistoryRefetch();
            break;
          case 2:
            // type: 2 스팟공지 (프론트 구현중)
            console.log('sse 알림읽기 성공 message type 2 (스팟공지)');
            setSseType2({});
            sseHistoryRefetch();
            break;
          case 3:
            // type: 3 구매후기 (완료)
            console.log('sse 알림읽기 성공 message type 3 (구매후기)');
            setSseType3({});
            sseHistoryRefetch();

            break;
          case 4:
            // type: 4 마감시간
            console.log('sse 알림읽기 성공 message type 4 (마감시간)');
            setSseType4({});
            sseHistoryRefetch();
            break;
          case 5:
            // type: 5 다음주 식사 구매하셨나요? (완료)
            console.log(
              'sse 알림읽기 성공 message type 5 (다음주 식사 구매하셨나요?)',
            );
            // console.log({});
            setSseType5({});
            sseHistoryRefetch();
            break;
          case 6:
            // type: 6 알림관련 (완료)
            console.log('sse 알림읽기 성공 message type 6 (알림관련)');
            // console.log({});
            setSseType6({});
            sseHistoryRefetch();
            break;
          case 7:
            // type: 7 그룹
            console.log('sse 알림읽기 성공 message type 7 (그룹)');
            // console.log({});
            setSseType7({});
            sseHistoryRefetch();
            break;
          case 8:
            // type: 8 댓글 (완료)
            console.log('sse 알림읽기 성공 message type 8 (댓글)');
            // console.log({});
            setSseType8({});
            sseHistoryRefetch();
            break;
          default:
            break;
        }
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
      },
    },
  );

  return {
    sseType1,
    sseType2,
    sseType3,
    sseType4,
    sseType5,
    sseType6,
    sseType7,
    sseType8,
    confirmSseIsRead,
    sseHistory,
    sseHistoryRefetch,
  };
};

export default useSse;
