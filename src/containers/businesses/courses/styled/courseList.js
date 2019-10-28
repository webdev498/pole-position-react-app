import styled from 'styled-components';
import { Colors } from '@statics/Colors';

export const CourseList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const Course = styled.li`
  width: 100%;
  margin: 0.5em 0;
  padding: 1em;
  display: flex;
  color: white;
  border-radius: 3px;
  transition: 0.3s;
  cursor: pointer;
  border: 3px solid ${props => props.active ? Colors.IndyWorkPurpleNew : 'transparent'};
  :hover {
    border: 3px solid ${props => props.active ? Colors.IndyWorkPurpleNew : Colors.WebBusinessBlue_d};
  }
`;

export const CourseLink = styled.a`
  margin: 0 2rem 0 0;
  text-align: center;
  position: relative;
  text-decoration: none;
  cursor: pointer;
`;

export const ItemCol = styled.div`
  margin: 0 0.5em;
  min-width: 100px;
`;

export const CourseThumbnail = styled.img`
  width: 100px;
  height: 75px;
`;

export const CourseLinkSpan = styled.span`
  color: white;
  display: flex;
  background-color: rgba(0,0,0,.7);
  justify-content: center;
`;

export const CourseTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  align-self: center;
`;

export const CourseDescription = styled.div`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;
