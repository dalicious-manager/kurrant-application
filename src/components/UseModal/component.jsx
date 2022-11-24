import React, { useCallback, useState } from "react";
import styled from 'styled-components/native';

import Button from "../Button";
import Typography from "../Typography";

const Component = () => {
  const [isOpen, setOpen] = useState(true);

  const open = useCallback(() => {
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const ModalWrapper = useCallback(({ title, content }) => (
    <Modal transparent={true} visiable={isOpen}>
      <Wrap>
        <Wrapper>
          <TitleWrap>
            <Title>{title}</Title>
          </TitleWrap>
          <ContentWrap>
            <Content>{content}</Content>
          </ContentWrap>
          <Button label={'다음'} onPress={close} />
        </Wrapper>
      </Wrap>
    </Modal>

  ), [isOpen, close]);

  return { ModalWrapper, close, open };
}

const Modal = styled.Modal`
  flex: 1;
`;

const Wrap = styled.View`
  flex: 1;
`;

const Wrapper = styled.View`
justify-content: center;
align-items: center;
  border: 1px solid red;
  width: 320px;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
`;
const TitleWrap = styled.View``;
const ContentWrap = styled.View``;

const Title = styled(Typography).attrs({ variant: 'h800', weight: 'B', align: 'center' })``;
const Content = styled(Typography).attrs({ variant: 'h600', align: 'center' })``;

export default Component;