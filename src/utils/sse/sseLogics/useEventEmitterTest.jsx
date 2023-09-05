import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

const useEvetnEmitterTest = () => {
  let x = new EventEmitter();

  function handler(arg) {
    console.log(
      `event-name has occurred! here is the event data arg=${JSON.stringify(
        arg,
      )}`,
    );
  }

  x.addListener('event-name', handler);

  //   x.emit('event-name', {es6rules: true, mixinsAreLame: true});

  x.removeAllListeners('event-name');

  return;
};
export default useEvetnEmitterTest;
