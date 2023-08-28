import React from 'react';
import styled from 'styled-components/native';

import ProgressOne from '../../assets/icons/ProgressBar7/ProgressOne.svg';
import ProgressTwo from '../../assets/icons/ProgressBar7/ProgressTwo.svg';
import ProgressThree from '../../assets/icons/ProgressBar7/ProgressThree.svg';
import ProgressFour from '../../assets/icons/ProgressBar7/ProgressFour.svg';
import ProgressFive from '../../assets/icons/ProgressBar7/ProgressFive.svg';
import ProgressSix from '../../assets/icons/ProgressBar7/ProgressSix.svg';
import ProgressSeven from '../../assets/icons/ProgressBar7/ProgressSeven.svg';

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
    else if (progress === 3) return <ProgressThree />;
    else if (progress === 4) return <ProgressFour />;
    else if (progress === 5) return <ProgressFive />;
    else if (progress === 6) return <ProgressSix />;
    else if (progress >= 7) return <ProgressSeven />;
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
