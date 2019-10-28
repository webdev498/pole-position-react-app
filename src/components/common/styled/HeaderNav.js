import styled, { css } from 'styled-components';
import { MdViewList, MdViewComfy } from 'react-icons/md';

import { Colors } from '@statics/Colors';

export const Container = styled.div`
  display: flex;
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
