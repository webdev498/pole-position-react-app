import styled from 'styled-components'
import { CalendarViewConstants } from '@statics/Constants'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 425px;
  grid-template-rows: 50px 80vh;
  grid-template-areas: ${props =>
    props.viewLayout === CalendarViewConstants.DAY
      ? "'header header' 'full-calendar small-calendar'"
      : "'header header' 'full-calendar full-calendar'"};
`;

export const HeaderArea = styled.div`
  grid-area: header;
`;

export const FullCalendarArea = styled.div`
  grid-area: full-calendar;
`;

export const SmallCalendarArea = styled.div`
  display: ${props =>
    props.viewLayout === CalendarViewConstants.DAY
      ? 'block'
      : 'none'};
  grid-area: small-calendar;
  margin: 30px;
`;
