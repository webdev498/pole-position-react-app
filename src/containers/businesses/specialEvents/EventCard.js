import React from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import {
  MdLocationOn,
  MdAccessTime,
  MdInsertComment,
  MdCreate,
  MdGroup
} from 'react-icons/md';
import defaultScene from '@assets/default_scene.jpg';
import { Card } from './styled/Card';
import { Scroll } from '@common/styled/Scroll';
import { Button } from '@common/styled/Button';
import { Routes } from '@statics/Routes';

const propTypes = {
  event: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  onEventSelect: PropTypes.func.isRequired,
  businessTimeZone: PropTypes.string.isRequired
};

const EventCard = ({
  event,
  active,
  onEventSelect,
  businessTimeZone
}) => {
  const { start_time, end_time, photo, id, title, description, reach } = event;
  const startTime = moment
    .tz(start_time, businessTimeZone)
    .format('MMM Do YYYY HH:mm');
  const endTime = moment
    .tz(end_time, businessTimeZone)
    .format('MMM Do YYYY HH:mm');
  return (
    <Card.Container active={active}>
      <Card.Header to={Routes.viewEvent.createPath(id)}>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>(0/100) Filled</Card.Subtitle>
      </Card.Header>
      <Card.Media>
        <Card.Image src={photo ? photo : defaultScene} alt={title} />
      </Card.Media>
      <Card.Body>
        <Scroll>
          <Card.InfoContainer>
            <Card.InfoIcon>
              <MdAccessTime size="18" color="white" />
            </Card.InfoIcon>
            <Card.InfoText>
              {startTime} - {endTime}
            </Card.InfoText>
          </Card.InfoContainer>
          <Card.InfoContainer>
            <Card.InfoIcon>
              <MdLocationOn size="18" color="white" />
            </Card.InfoIcon>
            <Card.InfoText>
              Reach up to {reach} miles
            </Card.InfoText>
          </Card.InfoContainer>
          <Card.InfoContainer>
            <Card.InfoIcon>
              <MdInsertComment size="18" color="white" />
            </Card.InfoIcon>
            <Card.InfoText>
                {description}
            </Card.InfoText>
          </Card.InfoContainer>
        </Scroll>
      </Card.Body>
      <Card.Footer>
        <Card.Action to={Routes.viewEvent.createPath(id)}>
          <Button>
            <MdGroup size="18" />
            Applications
          </Button>
        </Card.Action>
        <Button onClick={() => onEventSelect(id)}>
          <MdCreate size="18" />
          Edit
        </Button>
      </Card.Footer>
    </Card.Container>
  );
};

EventCard.propTypes = propTypes;

export { EventCard };