import React from 'react';

import styled from 'styled-components';

const Component = ({}) => {
  return (
    <Container>
      <OnlyForMakersText>메이커스에게만 보이는 리뷰에요.</OnlyForMakersText>
    </Container>
  );
};

export default Component;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 12px;
`;

const OnlyForMakersText = styled(Typography).attrs({text: 'Body06SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-left: 6px;
`;

// const AdminImageWrap = styled.View`
//   width: 30px;
//   height: 30px;

//   border-radius: ${() => {
//     const radius = (30 * 50) / 100;
//     return `
//        ${radius}px`;
//   }};
//   background-color: ${props => props.theme.colors.grey[8]};
//   overflow: hidden;
//   justify-content: center;
//   align-items: center;
//   margin-right: 4px;
// `;

// const AdminImage = styled.Image`
//   width: 60%;
//   height: 60%;
// `;

// const MessageWrap = styled.View`
//   margin-left: 4px;
//   background-color: ${props => props.theme.colors.grey[8]};
//   border-radius: 7px;
//   padding: 16px;
//   flex: 1;
// `;
// const TitleWrap = styled.View`
//   flex-direction: row;
//   align-items: center;
//   margin-bottom: 12px;
// `;

// const WrittenDate = styled(Typography).attrs({text: 'SmallLabel'})`
//   color: ${props => props.theme.colors.grey[4]};
//   margin-left: 6px;
// `;

// const Message = styled(Typography).attrs({text: 'Body06R'})`
//   color: ${props => props.theme.colors.grey[2]};
//   margin-left: 6px;
// `;
