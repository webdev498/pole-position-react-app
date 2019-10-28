import styled from 'styled-components/macro'

export const Grid = styled.div`
  margin: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 75px 1fr;
  grid-template-areas:
    "title"
    "name"
    "entertainers"
    "actions";
  align-items: center;
`;

export const TitleArea = styled.div`
  grid-area: title;
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
`;

export const NameArea = styled.div`
  grid-area: name;
`;

export const EntertainersArea = styled.div`
  grid-area: entertainers;
`;

export const ActionsArea = styled.div`
  grid-area: actions;
  justify-self: end;
  display: flex;
  flex-direction: row;
  & > * {
    margin: 0 10px;
  }
`;