import {createContext, useContext} from 'react';
import {SseLogics} from './sseLogics/LogicExport';
import useSse from './sseLogics/useSse';

const SseContext = createContext(SseLogics);

export const useSseContext = () => useContext(SseContext);

export const SseProvider = ({children}) => {
  const {eventSourceMsg} = useSse();

  const dataIn = {eventSourceMsg, SseLogics};

  return <SseContext.Provider value={dataIn}>{children}</SseContext.Provider>;
};
