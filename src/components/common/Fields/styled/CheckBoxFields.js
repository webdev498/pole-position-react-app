import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const Wrapper = styled.div`
  display: block;
  flex: 1 0;
`;

export const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 30px;
  margin: 0 0 6px;
  font-weight: normal;
  font-size: 16px;
  cursor: ${props => props.isActive ? 'pointer' : 'default'};
  user-select: none;
  color: ${props =>
    props.isActive ? Colors.IndyWorkGray_d : Colors.IndyWorkWhite_d};

  input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;

    :checked:disabled ~ .checkmark {
      background-color: transparent;
    }

    :checked ~ .checkmark {
      background-color: ${Colors.IndyWorkPurple_l};

      :after {
        display: block;
      }
    }
  }

  :hover input ~ .checkmark {
    background-color: ${props => props.isActive ? '#ccc' : 'transparent'};
  }

  .checkmark:after {
    left: 5px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

export const Checkbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const CheckMark = styled.span`
  position: absolute;
  top: 3px;
  left: 0;
  height: 16px;
  width: 16px;
  border-radius: 3px;
  background-color: ${props =>
    props.isActive ? Colors.IndyWorkPurple_d : 'transparent'};
  border: solid 1px ${props =>
    props.isActive ? Colors.IndyWorkPurple_l : Colors.IndyWorkPurple_l};

  :after {
    content: '';
    position: absolute;
    display: none;
    border-radius: 3px;
  }
`;
