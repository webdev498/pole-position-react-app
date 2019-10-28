import styled from 'styled-components';

export const Container = styled.ul`
  list-style-type: none;
  margin: 0.5em 0 0 0;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Legend = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0.25em 0;
`;

export const Name = styled.span`
  color: white;
  font-size: 1em;
  margin-left: 1em;
`;

const Color = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

export const RedColor = styled(Color)`
  background-color: #e76464;
  border: 1px solid #e76464;
`;

export const GreenColor = styled(Color)`
  background-color: #81bf6c;
  border: 1px solid #81bf6c;
`;

export const BlueColor = styled(Color)`
  background-color: #439ace;
  border: 1px solid #439ace;
`;
