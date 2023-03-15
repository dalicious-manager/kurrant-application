import {createContext, useContext, useEffect, useState} from 'react';
import {SseLogics} from './sseLogics/LogicExport';
import useSse from './sseLogics/useSse';

const SseContext = createContext(SseLogics);

export const useSseContext = () => useContext(SseContext);

export const SseProvider = ({children}) => {
  console.log('sse provider에서 렌더링이 계속 발생함');

  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);
  const {eventSourceMsg} = useSse();
  // const {eventSourceMsg} = isMount ? useSse() : {eventSourceMsg: undefined};

  const dataIn = {eventSourceMsg, SseLogics};

  return <SseContext.Provider value={dataIn}>{children}</SseContext.Provider>;
};
