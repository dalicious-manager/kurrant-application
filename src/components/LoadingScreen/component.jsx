import {ActivityIndicator} from 'react-native';
import styled from 'styled-components';

const Component = () => {
  return (
    <LoadingScreen>
      <ActivityIndicator size={'large'} />
    </LoadingScreen>
  );
};

export default Component;

const LoadingScreen = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;

  background-color: white;

  opacity: 0.6;
`;
