import styled from 'styled-components/macro'

import { Colors } from '@statics/Colors'

export const Container = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: 20px 20px 10px;
  grid-gap: 5px 10px;
  grid-template-areas:
    "thumbnail name"
    "thumbnail location"
    "link link";
`;

export const Name = styled.div`
  grid-area: name;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Location = styled.div`
  grid-area: location;
  font-size: 0.75rem;
  font-weight: normal;
  color: ${Colors.IndyWorkGray_d};
  text-transform: uppercase;
`;

export const Link = styled.a`
  grid-area: link;
  font-size: 0.75rem;
  font-weight: normal;
  color: ${Colors.IndyWorkPurpleNew};
  text-transform: uppercase;
  text-decoration: underline;
  cursor: pointer;
`;

export const Thumbnail = styled.div`
  grid-area: thumbnail;
`;

export const Img = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 6px;
`;