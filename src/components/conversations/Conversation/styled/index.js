import styled from 'styled-components'
import { Scroll } from '@components/common/styled/Scroll';

export const Grid = styled.div`
  display: grid;
  grid-template-rows: 75px 1fr 60px;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "body"
    "footer";
  height: 100%;
`;

export const HeaderArea = styled.div`
  grid-area: header;
`;

export const BodyArea = styled(Scroll)`
  grid-area: body;
  max-height: 550px;
`;

export const FooterArea = styled.div`
  grid-area: footer;
`;
