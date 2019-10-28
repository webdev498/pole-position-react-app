import styled from 'styled-components'

import { Colors } from '@statics/Colors'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const Label = styled.div`
  margin: 0 5px;
  color: white;
  font-size: 0.75rem;
  text-transform: uppercase;
`;

export const Block = styled.div`
  margin: 0 5px;
  width: 20px;
  height: 20px;
  border-right: none;
  border-top: none;
  border-bottom: none;
  border-left: 4px solid;
`;

Block.Red = styled(Block)`
  border-color: ${Colors.IndyWorkRed_l};
  background-color: ${Colors.IndyWorkRed_l_50};
`;

Block.Purple = styled(Block)`
  border-color: ${Colors.IndyWorkPurpleNew};
  background-color: ${Colors.IndyWorkPurpleNew_50};
`;

Block.Green = styled(Block)`
  border-color: ${Colors.IndyWorkGreen_ll};
  background-color: ${Colors.IndyWorkGreen_ll_50};
`;
