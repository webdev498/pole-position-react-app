import styled, { css } from 'styled-components'
import { MdMoreHoriz, MdTune } from 'react-icons/md'

import { Colors } from '@statics/Colors'
import { WhiteCheckBox } from '@common/styled/WhiteCheckBox'

export const Wrapper = styled.div`
  position: relative;
`;

const menuPosition = css`
  ${props => props.right ? (
    'left: 0;'
  ) : (
    'right: 0;'
  )}
`;

const arrowPosition = css`
  ${props => props.right ? (
    'left: 12%;'
  ) : (
    'right: 3%;'
  )}
`;

export const List = styled.ul`
  display: ${props => props.hide ? 'none' : 'block'};
  position: absolute;
  margin: 0;
  padding: 0;
  list-style-type: none;
  top: 30px;
  ${menuPosition}
  width: 160px;
  border-radius: 4px;
  background-color: ${Colors.IndyWorkPurple_d};
  z-index: 15;

  & > li {
    color: white;
    cursor: pointer;
    padding: 0.75em 1em;
    font-size: 1.1em;
    transition: font-size 0.2s;
    border-radius: 4px;
    :not(:last-child) {
      border-bottom: 1px solid ${Colors.IndyWorkNavBar};
    }
    :hover {
      font-size: 1.25em;
      background-color: ${Colors.IndyWorkPurple_l};
    }
  }

  /* Arrow Styling */
  ::after {
    bottom: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(76, 86, 128, 0);
    border-bottom-color: ${Colors.IndyWorkPurple_d};
    border-width: 7px;
    margin-left: -7px;
    ${arrowPosition}
  }
`;

export const MoreButton = styled(MdMoreHoriz)`
  cursor: pointer;
  :hover {
    & * {
      color: white;
    }
  }
`;

export const FilterButton = styled(MdTune)`
  cursor: pointer;

  :hover {
    & * {
      color: ${Colors.IndyWorkPurpleNew};
    }
  }
`;

export const CheckBoxWrapper = styled.div`
  cursor: pointer;
  user-select: none;
  width: 50px;
  height: 30px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  :hover {
    background-color: ${Colors.ScrollBar};
    opacity: 0.8;
    border: 1px solid ${Colors.IndyWorkGray_d};
    border-radius: 2px;
  }
`;

export const CheckBoxButton = styled(WhiteCheckBox)`
  margin: 0;
`;

export const Text = styled.div`
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  ::after {
    content: '\\25BE';
  }
`;
