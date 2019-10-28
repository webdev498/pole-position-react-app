import styled from 'styled-components/macro'

import { Colors } from '@statics/Colors'

export const Grid = styled.div`
  display: grid;
  grid-template-rows: 40px;
  grid-template-columns: 1fr;
  grid-template-areas:
    "filters"
    "actions"
    "select";
  @media screen and (min-width: 768px) {
    grid-template-rows: 40px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "select actions filters";
  }
`;

export const SelectArea = styled.div`
  grid-area: select;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }
`;

export const ActionsArea = styled.div`
  grid-area: actions;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-self: center;
`;

export const FiltersArea = styled.div`
  grid-area: filters;
  justify-self: center;
  align-self: center;
  @media screen and (min-width: 768px) {
    justify-self: right;
  }
`;

export const Text = styled.div`
  color: white;
  font-size: 1rem;
  text-transform: uppercase;
`;

export const Number = styled.span`
  color: ${Colors.IndyWorkPurpleNew};
  font-weight: bold;
  margin: 0 0.5rem;
`;