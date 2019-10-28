import styled from 'styled-components/macro'

export const Container = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Message = styled.div`
  width: 60%;
`;

Message.Left = styled(Message)`
  align-self: flex-start;
`;

Message.Right = styled(Message)`
  align-self: flex-end;
`;