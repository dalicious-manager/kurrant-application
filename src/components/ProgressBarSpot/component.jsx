import React from 'react';
import styled from 'styled-components/native';

import ProgressOne from '../../assets/icons/ProgressbarSpot/first.svg'
import ProgressFour from '../../assets/icons/ProgressbarSpot/last.svg'
import ProgressTwo from '../../assets/icons/ProgressbarSpot/second.svg'
import ProgressThir from '../../assets/icons/ProgressbarSpot/third.svg'

/** 예시 */


/**
 *
 * @param {object} props
 * @param {number} props.progress
 * @returns
 */
const Component = ({progress}) => {
  const ProgressIcon = ()=>{
    if(progress === 1)
      return <ProgressOne />
    else if(progress === 2)
      return <ProgressTwo />
    else if(progress === 3)
      return <ProgressThir />
    else if(progress === 4)
      return <ProgressFour />
  }
  return(
    <ProgressContainer>
      <ProgressIcon />
    </ProgressContainer>
  )
};

const ProgressContainer = styled.View`
  margin-right:12px;
  justify-content: center;
  align-items: center;
`

export default Component;
