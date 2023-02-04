import RNEventSource from 'react-native-event-source';
import {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {getStorage, setStorage} from '../utils/asyncStorage';

const SseTestOnSpring = () => {
  const [data, setData] = useState('');
  const [eventSourceYo, setEventSourceYo] = useState('');
  let eventSource;

  const setSse = async () => {
    const token = await getStorage('token');
    setData(token);
    eventSource = new RNEventSource(
      'http://13.125.224.194:8882/v1/notification/subscribe',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      },
    );
  };

  useEffect(() => {
    setSse();
  }, []);

  // 동기적으로 실행해보기 : 실패
  //   const token = getStorage('token');

  //   const eventSource = useMemo(() => {
  //     new RNEventSource('http://13.125.224.194:8882/v1/notification/subscribe', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       withCredentials: true,
  //     });
  //   }, []);

  console.log(eventSource);

  if (!eventSource) return;

  console.log('들어옴');
  eventSource.addEventListener('message', e => {
    // console.log(JSON.parse(e.data));
    console.log('addEventLister' + e.data);
  });
  eventSource.onopen = event => {
    console.log(event);
    console.log('hi i am open');
  };
  eventSource.onmessage = e => {
    console.log('오 성공? ㅋㅋ');
    // console.log(JSON.parse(e.data));
    console.log(e.data);
    // console.log("onmessage" + e.data);
    // setMessages([...messages, event.data]);
  };
  eventSource.onerror = () => {
    // setMessages([...messages, "Server closed connection"]);
    console.log(`server closed connection`);
    eventSource.close();
  };

  useEffect(() => {
    return () => {
      console.log(`server closed connection`);
      //   eventSource.close();
    };
  }, []);

  return <View></View>;
};

export default SseTestOnSpring;
