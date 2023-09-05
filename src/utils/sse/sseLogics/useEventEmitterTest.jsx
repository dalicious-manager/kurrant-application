import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

const useEvetnEmitterTest = () => {
  // 1. 이벤트 객체 생성하기
  let x = new EventEmitter();

  function handler(arg) {
    console.log(
      `event-name has occurred! here is the event data arg=${JSON.stringify(
        arg,
      )}`,
    );
  }
  // 2. 이벤트 객체에 이벤트 등록하기
  x.addListener('event-name', handler);

  // 3. 이벤트 객체에 등록된 이벤트를 실행시키기
  x.emit('event-name', {es6rules: true, mixinsAreLame: true});

  // 4. 이벤트를 모두 제거해주기
  x.removeAllListeners();

  return;
};
export default useEvetnEmitterTest;
