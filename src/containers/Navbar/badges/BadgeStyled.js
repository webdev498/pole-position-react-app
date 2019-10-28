import Styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const Circle = Styled.div`
  background-color: ${Colors.IndyWorkRed};
  border-radius: 25px;
  font-size: 11px;
  width: 25px;
  text-align: center;
  color: white !important;
`;

export const RedCircle = Styled(Circle)`
  background-color: ${Colors.IndyWorkRed};
`;

export const PurpleCircle = Styled(Circle)`
  background-color: ${Colors.IndyWorkPurpleNew};
`;

export const GreenCircle = Styled(Circle)`
  background-color: ${Colors.IndyWorkGreen};
`;
