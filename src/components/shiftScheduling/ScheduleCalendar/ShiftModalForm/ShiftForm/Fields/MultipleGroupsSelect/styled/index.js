import styled from 'styled-components'
import { Dropdown } from 'semantic-ui-react'

import { Colors } from '@statics/Colors'

export const Combobox = styled(Dropdown)`
  background: ${Colors.ScrollBar} !important;
  color: white !important;
  border: none !important;
  :hover {
    border: none !important;
  }

  & div.menu {
    background-color: ${Colors.ScrollBar} !important;
    border: 1px solid ${Colors.IndyWorkGray_d} !important;
    color: white !important;
  }
  
  & div.message {
    color: white !important;
  }

  & div.item {
    color: white !important;
    border: none !important;
  }

  & a.label {
    color: ${Colors.IndyWorkPurpleNew} !important;
    border: 1px solid ${Colors.IndyWorkPurpleNew} !important;
    background: none !important;
  }
`;
