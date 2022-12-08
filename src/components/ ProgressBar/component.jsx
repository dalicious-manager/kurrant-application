import React from 'react';
import styled, {useTheme} from 'styled-components/native';

import ProgressFive from '../../../../../assets/icons/Progressbar/fifthBar.svg'
import ProgressOne from '../../../../../assets/icons/Progressbar/firstBar.svg'
import ProgressFour from '../../../../../assets/icons/Progressbar/fourthBar.svg'
import ProgressTwo from '../../../../../assets/icons/Progressbar/secondBar.svg'
import ProgressThir from '../../../../../assets/icons/Progressbar/thirdBar.svg'

/** 예시 */
const mock = {
  type: '지정가',
  date: new Date(),
  message: '지정가 도달',
  detailMessage: '비트코인 17,121.000 도달',
};

/**
 *
 * @param {object} props
 * @param {'지정가'|'보유자산'|'체결'} props.type
 * @param {string} props.message
 * @param {string} props.detailMessage
 * @param {string} props.date
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
    else if(progress >= 5)
      return <ProgressFive />
  }
  return(
    <ProgressContainer>
      <ProgressIcon />
    </ProgressContainer>
  )
};

const ProgressContainer = styled.View`
  margin-top: 15px;
  justify-content: center;
  align-items: center;
`

export default Component;
