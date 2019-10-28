import styled from 'styled-components/macro'
import { Dropdown } from 'semantic-ui-react'

import { Colors } from '@statics/Colors'

export const Combobox = styled(Dropdown)`
  background-color: transparent !important;
  color: white !important;
  border: 1px solid ${Colors.IndyWorkPurple_d} !important;
  font-size: 1.1rem !important;
  & input {
    color: white !important;
  }
`;