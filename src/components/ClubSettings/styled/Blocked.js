import styled from 'styled-components/macro';
import { Colors } from '@statics/Colors';

const Blocked = {};

Blocked.Container = styled.div`
  height: 75vh;
`;

Blocked.List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

Blocked.Item = styled.li`
  margin: 1em 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

Blocked.ImageContainer = styled.div`
  width: 100px;
  height: 100px;
`;

Blocked.Image = styled.img`
  width: 100px;
  height: 100px;
`;

Blocked.NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

Blocked.Name = styled.div`
  color: ${Colors.IndyWorkLightPurple};
  font-size: 1em;
  font-weight: bold;
  margin: 1em;
`;

export { Blocked };