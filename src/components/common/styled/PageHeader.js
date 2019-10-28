import styled, { css } from 'styled-components'
import { MdViewList, MdViewComfy } from 'react-icons/md'

import { Colors } from '@statics/Colors'

export const Container = styled.div`
  display: grid;
  grid-template-rows: 50px 50px;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "title buttons"
    "filter icons";
  align-items: center;
  @media screen and (min-width: 768px) {
    grid-template-rows: 75px;
    grid-template-columns: auto 1fr 1fr auto;
    grid-template-areas: "title buttons icons filter";
  }
`;

export const TitleArea = styled.div`
  grid-area: title;
  font-size: 2rem;
  color: white;
  font-weight: bold;
`;

export const ButtonsArea = styled.div`
  grid-area: buttons;
  display: flex;
  flex-direction: row;
`;

export const IconsArea = styled.div`
  grid-area: icons;
  justify-self: right;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FilterArea = styled.div`
  grid-area: filter;
`;

const iconStyles = css`
  cursor: pointer;
  :hover {
    & * {
      color: ${Colors.IndyWorkPurpleNew};
    }
  }
`;

export const ListViewIcon = styled(MdViewList)`
  margin: 0 0.25em 0 0.25em;
  ${iconStyles}
`;

export const GridViewIcon = styled(MdViewComfy)`
  margin: 0 0.75em 0 0.25em;
  ${iconStyles}
`;

export const VerticalSpacer = styled.div`
  border-left: 1px solid ${Colors.IndyWorkGray_d};
  height: 24px;
  margin: 0 1.5rem;
`;
