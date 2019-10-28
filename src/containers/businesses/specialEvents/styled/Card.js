import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors } from '@statics/Colors';

const MediaHeight = 200;
const HeaderHeight = 105;
const BodyHeight = 200;
const FooterHeight = 75;
const CardHeight = HeaderHeight + MediaHeight + BodyHeight + FooterHeight;

const CardWidth = 300;
const BorderSize = 4;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: ${BorderSize}px solid ${props => props.active ? Colors.IndyWorkLightPurple : 'transparent'};
  border-radius: 6px;
  margin: 3em 1em 2em 1em;
  width: ${CardWidth + (2 * BorderSize)}px;
  height: ${CardHeight}px;
`;

const Header = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 6px 6px 0 0;
  width: ${CardWidth}px;
  height: ${HeaderHeight}px;
  min-height: ${HeaderHeight}px;
  background-color: ${Colors.IndyWorkNavBar};
  padding: 17px;
  text-decoration: none;
  :hover {
    background-color: ${Colors.IndyWorkPaneDivider};
  }
`;

const Media = styled.div`
  position: relative;
  width: ${CardWidth}px;
  height: ${MediaHeight}px;
  min-height: ${MediaHeight}px;
  max-height: ${MediaHeight}px;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: auto;
  min-width: 100%;
  transform: translate(-50%, -50%);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: ${CardWidth}px;
  height: ${BodyHeight}px;
  min-height: ${BodyHeight}px;
  max-height: ${BodyHeight}px;
  background-color: ${Colors.IndyWorkNavBar};
  padding: 20px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-top: 1px solid ${Colors.IndyWorkPaneDivider};
  width: ${CardWidth}px;
  background-color: ${Colors.IndyWorkNavBar};
  height: ${FooterHeight}px;
  border-radius: 0 0 6px 6px;
`;

const Action = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${Colors.IndyWorkLightPurple};
`;

const Title = styled.span`
  transition: 0.4s;
  font-size: 1.6em;
  color: white;
  font-weight: 600;
  margin-bottom: 0.25em;
  ${Header}:hover & {
    font-size: 1.7em;
    color: ${Colors.IndyWorkLightPurple};
  }
`;

const Subtitle = styled.span`
  font-size: 1.15em;
  color: white;
  font-weight: 500;
  margin-bottom: 0.25em;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 10px;
`;

const InfoIcon = styled.div`
  flex: 5;
  align-self: flex-start;
`;

const InfoText = styled.span`
  flex: 95;
  font-size: 1.05em;
  color: white;
  margin-left: 10px;
  overflow: hidden;
`;

export const Card = {
  Container,
  Header,
  Media,
  Image,
  Body,
  Footer,
  Action,
  Title,
  Subtitle,
  InfoContainer,
  InfoIcon,
  InfoText,
};
