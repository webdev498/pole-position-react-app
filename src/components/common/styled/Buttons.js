import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const Default = styled.button`
  transition: background-color 0.4s;
  background-color: transparent;
  margin: ${props => props.margin || '0.55rem'};
  padding: ${props => props.padding || '0 0.65rem'};
  border-radius: ${props => props.round ? '100px' : '4px'};
  min-width: 6rem;
  height: 2rem;
  font-size: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  border: 1px solid ${Colors.IndyWorkLightPurple};
  color: ${Colors.IndyWorkLightPurple};

  :disabled {
    cursor: not-allowed;
    border-color: ${Colors.IndyWorkGray_d};
    color: ${Colors.IndyWorkGray_d};
  }

  :hover:not(:disabled) {
    background-color: ${Colors.IndyWorkLightPurple};
    color: ${Colors.IndyWorkBlack_d};
    font-weight: 600;
  }
`;

export const Green = styled(Default)`
  border: 1px solid ${Colors.IndyWorkGreen_d};
  color: ${Colors.IndyWorkGreen_d};
  :hover:not(:disabled) {
    background-color: ${Colors.IndyWorkGreen_d};
    color: white;
  }
`;

Green.Filled = styled(Default)`
  background-color: ${Colors.IndyWorkGreen_ll};
  color: white;
  border: none;

  :hover:not(:disabled) {
    background-color: ${Colors.IndyWorkGreen_d};
    color: white;
    font-weight: 600;
  }
`;

export const Red = styled(Default)`
  background-color: ${Colors.IndyWorkRed_l};
  color: white;
  border: none;

  :hover:not(:disabled) {
    background-color: ${Colors.IndyWorkRed};
    color: white;
    font-weight: 600;
  }
`;

export const LightPurple = styled(Default)`
  border: 1px solid ${Colors.IndyWorkPurpleNew};
  color: ${Colors.IndyWorkPurpleNew};
  :hover:not(:disabled) {
    background-color: ${Colors.IndyWorkPurpleNew};
    color: white;
  }
`;

LightPurple.Filled = styled(Default)`
  background-color: ${Colors.IndyWorkPurpleNew};
  color: white;
  border: none;

  :hover:not(:disabled) {
    background-color: ${Colors.IndyWorkPurpleNew};
    color: white;
    font-weight: 600;
  }

  :disabled {
    background-color: transparent;
    color: ${Colors.IndyWorkGray_d};
    border: 1px solid ${Colors.IndyWorkGray_d};
  }
`;

export const Pink = styled(Default)`
  border: 1px solid ${Colors.WorkerPink};
  color: ${Colors.WorkerPink};
  :hover:not(:disabled) {
    background-color: ${Colors.WorkerPink};
    color: white;
  }
`;

Pink.Filled = styled(Default)`
  background-color: ${Colors.WorkerPink};
  color: white;
  border: none;

  :hover:not(:disabled) {
    background-color: ${Colors.WorkerPink};
    color: white;
    font-weight: 600;
  }

  :disabled {
    background-color: transparent;
    color: ${Colors.IndyWorkGray_d};
    border: 1px solid ${Colors.IndyWorkGray_d};
  }
`;
