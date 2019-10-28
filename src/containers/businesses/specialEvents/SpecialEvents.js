import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { GoCalendar } from 'react-icons/go';
import {
  CreateEvent,
  IndexEvents,
  DeleteEvent,
  UpdateEvent
} from '@networking/EventsCalls';
import { EventCard } from './EventCard';
import { LoadingEvents } from '@components/specialEvents/LoadingEvents';
import { Content } from '@common/styled/Content';
import { Error } from '@common/styled/Error';
import { RightPane } from '@common/RightPane';
import { Scroll } from '@common/styled/Scroll';
import { Button } from '@common/styled/Button';
import { Row, Col } from '@common/styled/Flex';
import { Title } from '@common/styled/Title';
import { Colors } from '@statics/Colors';
import { EventForm } from './EventForm';
import { LargeMessage } from './styled/LargeMessage';
import { authTokenSelector } from '@selectors/Auth';
import { businessSelector } from '@selectors/Business';

class SpecialEvents extends React.Component {
  static propTypes = {
    authToken: PropTypes.string.isRequired,
    business: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showAddEventPane: false,
      showEditEventPane: false,
      events: [],
      activeEventId: null,
      uploadImageData: null,
      isLoadingEvents: true,
      isErrorOn: false,
      errorMessage: null
    };
    this.toggleShowAddEventPane = this.toggleShowAddEventPane.bind(this);
    this.toggleShowEditEventPane = this.toggleShowEditEventPane.bind(this);
    this.getEventsReq = this.getEventsReq.bind(this);
    this.createEventReq = this.createEventReq.bind(this);
    this.updateEventReq = this.updateEventReq.bind(this);
    this.deleteEventReq = this.deleteEventReq.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSelectedEvent = this.handleSelectedEvent.bind(this);
  }

  componentDidMount() {
    this.getEventsReq();
  }

  getEventsReq() {
    const business_id = this.props.business.id;
    const token = this.props.authToken;
    IndexEvents({
      authToken: token,
      params: { business_id: `${business_id}` }
    })
      .then(response => {
        this.setState({
          events: response.events,
          isLoadingEvents: false,
          showAddEventPane: false,
          showEditEventPane: false,
          activeEventId: null,
          isErrorOn: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isErrorOn: true,
          isLoadingEvents: false,
          errorMessage: 'Something went wrong! try again'
        });
      });
  }

  createEventReq(
    business_id,
    token,
    startTime,
    endTime,
    description,
    reach,
    title,
    file,
    setSubmitting,
  ) {
    try {
      if (file && file.type && file.type.startsWith('image')) {
        let reader = new FileReader();
        reader.onloadend = () => {
          const event = {
            title: title,
            start_time: startTime.toISOString(),
            business_id: `${business_id}`,
            end_time: endTime.toISOString(),
            description: description,
            photo: reader.result,
            reach: reach
          };

          CreateEvent({
            event: event,
            authToken: token
          })
            .then(() => {
              setSubmitting(false);
              this.getEventsReq();
            })
            .catch(error => {
              setSubmitting(false);
              console.error(error);
              this.setState({
                isErrorOn: true,
                isLoadingEvents: false,
                errorMessage: 'Something went wrong! try again'
              });
            });
        };
        reader.readAsDataURL(file);
      } else {
        // eslint-disable-next-line
        throw 'invalid file type';
      }
    } catch (err) {
      console.error(err);
      this.setState({
        isErrorOn: true,
        isLoadingEvents: false,
        errorMessage: 'Something went wrong! try again'
      });
    }
  }

  deleteEventReq() {
    const token = this.props.authToken;
    DeleteEvent({
      authToken: token,
      event_id: this.state.activeEventId
    })
      .then(() => {
        this.getEventsReq();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isErrorOn: true,
          isLoadingEvents: false,
          errorMessage: 'Something went wrong! try again'
        });
      });
  }

  updateEventReq(
    business_id,
    token,
    startTime,
    endTime,
    description,
    reach,
    title,
    file,
    setSubmitting,
  ) {
    let event = {
      id: this.state.activeEventId,
      title: title,
      start_time: startTime.toISOString(),
      business_id: `${business_id}`,
      end_time: endTime.toISOString(),
      description: description,
      reach: reach
    };
    if (file && file.type && file.type.startsWith('image')) {
      try {
        let reader = new FileReader();
        reader.onloadend = () => {
          UpdateEvent({
            authToken: token,
            event_id: this.state.activeEventId,
            params: { business_id: `${business_id}` },
            body: { ...event, photo: reader.result }
          })
            .then(() => {
              setSubmitting(false);
              this.getEventsReq();
            })
            .catch(error => {
              setSubmitting(false);
              console.error(error);
              this.setState({
                isErrorOn: true,
                isLoadingEvents: false,
                errorMessage: 'Something went wrong! try again'
              });
            });
        };
        reader.readAsDataURL(file);
      } catch(err) {
        console.error(err);
        this.setState({
          isErrorOn: true,
          isLoadingEvents: false,
          errorMessage: 'Something went wrong! try again'
        });
      }
    } else {
      UpdateEvent({
        authToken: token,
        event_id: this.state.activeEventId,
        params: { business_id: `${business_id}` },
        body: event
      })
        .then(() => {
          this.getEventsReq();
        })
        .catch(error => {
          console.log(error);
          this.setState({
            isErrorOn: true,
            isLoadingEvents: false,
            errorMessage: 'Something went wrong! try again'
          });
        });
    }
  }

  handleDelete() {
    this.deleteEventReq();
  }

  handleSave(formProps, setSubmitting) {
    const { business, authToken } = this.props;
    const business_id = business.id;
    const timezone = business.timezone;
    const {
      isEditting,
      start_date,
      start_time,
      end_time,
      description,
      reach,
      title,
      file,
    } = formProps;
    const dateFormat = 'YYYY-MM-DD';
    const dateTimeFormat = 'YYYY-MM-DD HH:mm';
    const startTime = moment(
      `${moment(start_date).format(dateFormat)} ${start_time}`,
      dateTimeFormat
    );
    const endTime = moment(
      `${moment(start_date).format(dateFormat)} ${end_time}`,
      dateTimeFormat
    );
    if (endTime.isBefore(startTime)) {
      endTime.add(1, 'days');
    }
    if (isEditting) {
      this.updateEventReq(
        business_id,
        authToken,
        moment.tz(startTime, timezone),
        moment.tz(endTime, timezone),
        description,
        reach,
        title,
        file,
        setSubmitting,
      );
    } else {
      this.createEventReq(
        business_id,
        authToken,
        moment.tz(startTime, timezone),
        moment.tz(endTime, timezone),
        description,
        reach,
        title,
        file,
        setSubmitting,
      );
    }
  }

  handleCancel() {
    !this.state.showEditEventPane
      ? this.setState({
          showAddEventPane: false
        })
      : this.setState(prevState => ({
          showEditEventPane: !prevState.showEditEventPane,
          activeEventId: null
        }));
  }

  toggleShowEditEventPane() {
    this.setState(state => ({
      ...state,
      showAddEventPane: false,
      showEditEventPane: !state.showEditEventPane,
    }));
  }

  toggleShowAddEventPane() {
    this.setState(state => ({
      ...state,
      showEditEventPane: false,
      showAddEventPane: !state.showAddEventPane,
    }));
  }

  handleAddEvent() {
    this.setState(prevsState => ({
      showAddEventPane: !prevsState.showAddEventPane,
      showEditEventPane: false,
      activeEventId: null
    }));
  }

  handleSelectedEvent(id) {
    this.setState(prevsState => {
      if (prevsState.activeEventId !== id) {
        return {
          activeEventId: id,
          showEditEventPane: true,
          showAddEventPane: false
        };
      }
      return {
        activeEventId: id,
        showEditEventPane: !prevsState.showEditEventPane,
        showAddEventPane: false
      };
    });
  }

  renderCreateNewEventForm() {
    return (
      <RightPane title="Create New Event" onCloseButtonClick={this.toggleShowAddEventPane}>
        <EventForm
          isEditting={false}
          onCancel={this.handleCancel}
          onSave={this.handleSave}
        />
      </RightPane>
    );
  }

  renderUpdateEventForm() {
    const { activeEventId, events } = this.state;
    const activeEvent = events.find(item => item.id === activeEventId);

    return (
      <RightPane title="Edit Event" onCloseButtonClick={this.toggleShowEditEventPane}>
        <EventForm
          isEditting={true}
          title={activeEvent.title}
          description={activeEvent.description}
          reach={activeEvent.reach}
          start_date={moment(activeEvent.start_time).toDate()}
          start_time={moment(activeEvent.start_time).format('HH:mm')}
          end_time={moment(activeEvent.end_time).format('HH:mm')}
          onCancel={this.handleCancel}
          onDelete={this.handleDelete}
          onSave={this.handleSave}
        />
      </RightPane>
    );
  }

  renderEventRows() {
    const events = [...this.state.events].reverse();
    return (
      <Row justify="space-evenly" wrap="wrap">
      {events.map(event => (
        <EventCard
          key={event.id}
          businessTimeZone={this.props.business.timezone}
          event={event}
          onEventSelect={this.handleSelectedEvent}
          active={this.state.activeEventId === event.id}
        />
      ))}
      </Row>
    )
  }

  renderNoEventRowExist() {
    return (
      <Col>
        <GoCalendar size="200" color={Colors.ScrollBarThumb} />
        <LargeMessage>
          You do not have any Event Plan, feel free to create one by clicking the 'New' button above!
        </LargeMessage>
      </Col>
    );
  }

  renderErorMessage() {
    return (
      <Error>
        {this.state.errorMessage}
      </Error>
    );
  }

  render() {
    const {
      isLoadingEvents,
      events,
      isErrorOn,
      showAddEventPane,
      showEditEventPane,
    } = this.state;
    const { business } = this.props;

    const renderContent = () => {
      switch (true) {
        case isLoadingEvents:
          return <LoadingEvents />;
        case events.length > 0:
          return this.renderEventRows();
        case isErrorOn:
          return this.renderErorMessage();
        default:
          return this.renderNoEventRowExist();
      }
    };
    return (
      <React.Fragment>
        <Content.Primary>
          <Row justify="space-between" align="flex-start" margin="0 0 1.5em 0">
            <Title>{business.name}'s Events</Title>
            <Button onClick={this.handleAddEvent.bind(this)}>
              New
            </Button>
          </Row>
          <Scroll>
            {renderContent()}
          </Scroll>
        </Content.Primary>
        <Content.Secondary show={showAddEventPane || showEditEventPane}>
          {showAddEventPane && this.renderCreateNewEventForm()}
          {showEditEventPane && this.renderUpdateEventForm()}
        </Content.Secondary>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authToken: authTokenSelector(state),
  business: businessSelector(state),
});

export default connect(
  mapStateToProps,
  {}
)(SpecialEvents);
