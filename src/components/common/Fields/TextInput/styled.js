import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const Wrapper = styled.div`
  flex: 1 0;
`;

export const FormikField = styled.input`
  transition: padding 0.4s;
  background-color: ${Colors.ScrollBar};
  border: 1px solid transparent;
  border-radius: 2px;
  width: 100%;
  padding: 0.75rem 0.5rem;
  margin-bottom: 10px;

  color: ${Colors.IndyWorkWhite_S};

  :hover, :focus {

    border: 1px solid ${Colors.IndyWorkPurple_d};
    color: ${Colors.IndyWorkWhite_d};
  }

  :disabled {
    padding: 0.75rem 0;
    background: transparent;
    border: none;
    font-size: 18px;
    margin-left: 0;
    padding: 0;
    margin-bottom: 24px;
    font-weight: ${props => props.fontWeight ? props.fontWeight : 'normal'};
    resize: none;
    overflow-y: scroll;

    :hover, :focus {
      border: none;
    }

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: transparent;
      font-style: italic !important;
      opacity: 1; /* Firefox */
    }
  }
`;
