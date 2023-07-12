import React from 'react';
import styled from 'styled-components/native';

import ProgressFive from '../../assets/icons/Progressbar/fifthBar.svg';
import ProgressOne from '../../assets/icons/Progressbar/firstBar.svg';
import ProgressFour from '../../assets/icons/Progressbar/fourthBar.svg';
import ProgressTwo from '../../assets/icons/Progressbar/secondBar.svg';
import ProgressThir from '../../assets/icons/Progressbar/thirdBar.svg';

/** 예시 */

/**
 *
 * @param {object} props
 * @param {number} props.progress
 * @returns
 */
const Component = ({progress}) => {
  const ProgressIcon = () => {
    if (progress === 1) return <ProgressOne />;
    else if (progress === 2) return <ProgressTwo />;
    else if (progress === 3) return <ProgressThir />;
    else if (progress === 4) return <ProgressFour />;
    else if (progress >= 5) return <ProgressFive />;
  };
  return (
    <ProgressContainer>
      <ProgressIcon />
    </ProgressContainer>
  );
};

const ProgressContainer = styled.View`
  margin-top: 15px;
  justify-content: center;
  align-items: center;
`;

export default Component;
