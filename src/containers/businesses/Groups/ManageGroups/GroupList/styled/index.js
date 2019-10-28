import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import { Colors } from '@statics/Colors'

export const PaginationContainer = styled.div`
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fit, 215px);
  grid-template-rows: repeat(auto-fit, 300px);
  cursor: pointer;
`;

export const Group = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(215px, 1fr) 60px 40px;
  grid-template-areas:
    "members"
    "name"
    "more";
  border-radius: 4px;
  :hover {
    background-color: ${Colors.ScrollBar};
  }
`;

export const MembersArea = styled.div`
  grid-area: members;
  background-color: ${Colors.IndyWorkNavBar};
`;

export const ImageList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const ImgContainer = styled.li`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 5px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

export const ImgOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
`;

export const NameArea = styled.div`
  grid-area: name;
  align-self: center;
`;

export const NameLink = styled(Link)`
  font-size: 1.25rem;
  color: white;
  font-weight: bold;
  :hover {
    color: white;
    text-decoration: underline;
  }
`;

export const MoreArea = styled.div`
  grid-area: more;
  justify-self: end;
  align-self: center;
  color: gray;
  font-size: .9rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;
