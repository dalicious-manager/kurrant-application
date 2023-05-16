const useComponentSize = () => {
  const [size, setSize] = useState(0);
  const onLayout = useCallback(event => {
    const {width, height, x, y} = event.nativeEvent.layout;
    setSize({width, height, x, y});
  }, []);

  return [size, onLayout];
};

export default useComponentSize;
