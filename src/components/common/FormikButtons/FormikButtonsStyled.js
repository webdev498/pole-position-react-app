import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const ButtonRow = styled.div`
  display: flex;
  margin-bottom: 40px;
  button:first-child {
    margin-right: 24px;
  }
`;

export const Filled = styled.button`
  transition: background-color 0.4s;
  background-color: transparent;
  text-transform: uppercase;
  padding: 10px 0;
  width: 120px;
  border-radius: 2px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  color: ${Colors.IndyWorkWhite_d};

  :disabled {
    cursor: not-allowed;
    border-color: ${Colors.IndyWorkGray_d};
    color: ${Colors.IndyWorkGray_d};
  }

  :hover:not(:disabled) {
    background-color: ${Colors.IndyWorkLightPurple};
    color: ${Colors.IndyWorkWhite_d};
  }
`;

export const Inverted = styled.button`
  transition: background-color 0.4s;
  align-self: center;
  background-color: transparent;
  border-width: 1px;
  text-transform: uppercase;
  font-size: 12px;
  border-radius: 2px;
  padding: 8px 16px;
  cursor: pointer;
  border-style: solid;

  :disabled {
    cursor: not-allowed;
  }

  :hover:not(:disabled) {
    color: ${Colors.IndyWorkWhite_d};
  }
`;

export const FilledBlue = styled(Filled)`
  background-color: ${Colors.WebBusinessBlue_l};

  :hover:not(:disabled) {
    background-color: ${Colors.WebBusinessBlue_l};
  }
`;

export const FilledGreen = styled(Filled)`
  background-color: ${Colors.IndyWorkGreen_ll};

  :hover:not(:disabled) {
    background-color: ${Colors.IndyWorkGreen_d};
    color: ${Colors.IndyWorkWhite_d};
  }

  :disabled {
    background-color: ${Colors.IndyWorkGreen_d};
    color: ${Colors.IndyWorkWhite_d};
  }
`;

export const FilledRed = styled(Filled)`
  background-color: ${Colors.IndyWorkRed_l};

  :hover:not(:disabled) {
    background-color: ${Colors.IndyWorkRed_l_50};
    color: ${Colors.IndyWorkWhite_d};
  }

  :disabled {
    background-color: ${Colors.IndyWorkRed_l_50};
    color: ${Colors.IndyWorkWhite_d};
  }
`;

export const InvertedRed = styled(Inverted)`
  color: ${Colors.IndyWorkRed};
  border-color: ${Colors.IndyWorkRed};

  :hover:not(:disabled) {
    background-color: ${Colors.IndyWorkRed};
  }
`;

export const InvertedGreen = styled(Inverted)`
  color: ${Colors.IndyWorkGreen};
  border-color: ${Colors.IndyWorkGreen};

  :hover:not(:disabled) {
    background-color: ${Colors.IndyWorkGreen};
  }
`;

export const InvertedPurlple = styled(Inverted)`
  color: ${Colors.IndyWorkPurpleNew};
  border-color: ${Colors.IndyWorkPurpleNew};

  :hover:not(:disabled) {
    background-color: ${Colors.IndyWorkPurpleNew};
  }
`;
