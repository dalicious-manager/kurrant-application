import { addDays, eachWeekOfInterval, subDays,eachDayOfInterval} from 'date-fns';

export const dates = eachWeekOfInterval(
    {
     start: subDays(new Date(), 7), // 지난주
     end: addDays(new Date(), 21), // 다음주
    },
    {
     weekStartsOn:1, // 일요일부터 시작
    }
).reduce((acc,cur) =>{
    const allDays = eachDayOfInterval({
        start: cur,
        end: addDays(cur,6)
    });
    acc.push(allDays);
    return acc;
},[]);
