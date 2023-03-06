import RNEventSource from 'react-native-event-source';
import {useEffect, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import {getStorage, setStorage} from '../utils/asyncStorage';

import {getCheck} from './RestApiTest';

const SseTestOnSpring = () => {
  const [eventSource, setEventSource] = useState('');

  const setSse = async () => {
    const token = await getStorage('token');

    let yo;
    if (token) {
      yo = JSON.parse(token);
    }

    // console.log(yo?.accessToken);

    let eventSourceYo = new RNEventSource(
      'http://13.125.224.194:8882/v1/notification/subscribe',
      // 'http://13.125.224.194:8882/v1/users/me/orders?startDate=2023-02-06&endDate=2023-02-10',
      {
        headers: {
          Authorization: `Bearer ${yo?.accessToken}`,
        },
        withCredentials: true,
      },
    );

    setEventSource(eventSourceYo);
  };

  // getCheck('2023-02-06', '2023-02-10');

  useEffect(() => {
    setSse();
  }, []);
  useEffect(() => {
    return () => {
      console.log(`server closed connection`);
      if (eventSource) eventSource.close();
    };
  }, []);

  if (!eventSource) {
    return (
      <View>
        <Text>이벤트 소스 연결안됨</Text>
      </View>
    );
  }

  console.log('들어옴');
  eventSource.addEventListener('message', e => {
    // console.log(JSON.parse(e.data));
    console.log('addEventLister ' + e.data);
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

  return (
    <View>
      <Text>이벤트 소스 연결됨 ㅋㅋ</Text>
    </View>
  );
};

export default SseTestOnSpring;
