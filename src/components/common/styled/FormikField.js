import styled from 'styled-components';

import { Colors } from '@statics/Colors';

export const FormikField = styled.input`
  transition: padding 0.4s;
  background-color: ${Colors.ScrollBar};
  border: 1px solid transparent;
  border-radius: 2px;
  color: ${Colors.IndyWorkWhite_S};
  width: 100%;
  padding: 0.75rem 0.5rem;
  margin-bottom: 10px;
  :hover, :focus {
    border: 1px solid ${Colors.IndyWorkPurple_d};
    color: ${Colors.IndyWorkWhite_d};
  }
  :disabled {
    padding: 0.75rem 0;
    background: transparent;
    border: none;
    font-size: 18px;
    font-weight: ${props => props.fontWeight ? props.fontWeight : 'normal'};
    margin-left: 0;
    padding: 0;
    margin-bottom: 24px;
    :hover, :focus {
      border: none;
    }
    resize: none;
    overflow-y: scroll;
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: transparent;
      opacity: 1; /* Firefox */
    }
  }
  /* textarea styles */
  resize: none;
  font-size: 16px;
  ::-webkit-scrollbar {
    width: 3px;
    height: 1px;
    background: ${Colors.ScrollBar};
  }
  ::-webkit-scrollbar-thumb {
    background: ${Colors.ScrollBarThumb};
  }
`;

