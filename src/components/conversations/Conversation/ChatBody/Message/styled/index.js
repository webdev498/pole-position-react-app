import styled from 'styled-components'
import { Colors } from '@statics/Colors';

export const MessageContainer = styled.div`
  position: relative;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 15px;
  margin-top: 5px;
  margin-bottom: ${props => props.hasDate ? '25px' : '5px'};
  margin-left: 15px;
  margin-right: 15px;
  color: white;
  font-size: 1.05rem;
`;

MessageContainer.Pink = styled(MessageContainer)`
  background-color: ${Colors.IndyWorkPink_d};
`;

MessageContainer.Blue = styled(MessageContainer)`
  background-color: ${Colors.IndyWorkBlue_ddd};
`;

export const Date = styled.div`
  position: absolute;
  bottom: -20px;
  right: 0;
  color: ${Colors.IndyWorkGray_d};
  font-size: 0.85rem;
`;
