import styled from 'styled-components/macro'

import { Colors } from '@statics/Colors'

export const Title = styled.div`
  font-size: 0.9rem;
  color: ${Colors.IndyWorkPurpleNew};
  text-transform: uppercase;
`;

export const Text = styled.div`
  font-size: 1rem;
  color: white;
`;

export const StyleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const LocationSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputWrapper = styled.div`
  margin: 0.25rem 0.5rem;
`;