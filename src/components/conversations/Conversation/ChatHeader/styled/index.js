import styled from 'styled-components'

import { Colors } from '@statics/Colors'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${Colors.IndyWorkNavBar};
  height: 75px;
`;

export const UserArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const UserPhoto = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 5px 10px;
`;

export const UserName = styled.div`
  font-size: 1rem;
  color: white;
  font-weight: bold;
`;

export const MenuArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;
