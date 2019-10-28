import styled from 'styled-components/macro';
import { Row, Flex } from '@common/styled/Flex';
import { Colors } from '@statics/Colors';

const InputRow = styled(Row)`
  margin: 1em 0;
`;

const Icon = styled(Flex)`
  flex: 0;
  margin: 1em 0;
  align-self: flex-start;
`;

const InputContainer = styled(Flex)`
  margin: 1em;
  width: 350px;
`;

const Text = styled.span`
  font-size: 1em;
  color: white;
`;

const FormText = styled.span`
  font-size: 1.15em;
  color: ${Colors.IndyWorkLightPurple};
`;

export const NewEvent = {
  InputRow,
  Icon,
  InputContainer,
  Text,
  FormText,
};