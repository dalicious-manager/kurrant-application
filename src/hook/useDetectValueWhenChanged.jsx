import {useEffect, useRef, useState} from 'react';

const useDetectValueWhenDailyFoodIdChanged = initialValue => {
  const [value, setValue] = useState(initialValue);
  const prevValueRef = useRef(initialValue);

  const [isDailyFoodIdChanged, setIsDailyFoodIdChanged] = useState(false);

  useEffect(() => {
    // console.log('initialValue 확인');
    // console.log(initialValue);
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    return () => {
      console.log('디텍트 밸류 끝남');
    };
  }, []);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setIsDailyFoodIdChanged(true);
    } else {
      setIsDailyFoodIdChanged(false);
    }
    prevValueRef.current = value;
  }, [value]);

  return {value, isDailyFoodIdChanged, setValue};
};
export default useDetectValueWhenDailyFoodIdChanged;
