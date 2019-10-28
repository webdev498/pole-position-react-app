import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { getDefaultThumbImage } from '@statics/Helpers'
import * as defaultEventPhoto from '@assets/default_scene.jpg'

import { Scroll } from '@common/styled/Scroll'
import { Loading } from '@common/Loading'
import { RadioButton } from '@common/RadioButton'
import { NoItems } from '@common/NoItems'
import * as S from './styled'

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
  selectedEventId: PropTypes.number,
  handleSelectEvent: PropTypes.func.isRequired,
}

const EventList = ({
  isLoading,
  events,
  selectedEventId,
  handleSelectEvent,
}) => (
  <Scroll>
    {isLoading ? (
      <Loading />
    ) : (
      <S.EventList>
        {(Array.isArray(events) && events.length > 0) ? (
          events.map(e => {
            const startDate = moment(e.start_time).format('MMM D, YYYY');
            const startTime = moment(e.start_time).format('h:mm A');
            const endTime = moment(e.end_time).format('h:mm A');
            return (
              <S.Event
                key={e.id}
                onClick={() => handleSelectEvent(e.id)}
              >
                <S.PhotoArea>
                  <S.Img
                    src={getDefaultThumbImage(e.images) || defaultEventPhoto}
                  />
                </S.PhotoArea>
                <S.TitleArea>
                  {e.title}
                </S.TitleArea>
                <S.DateArea>
                  {`${startDate} / ${startTime} - ${endTime}`}
                </S.DateArea>
                <S.RadioArea>
                  <RadioButton
                    name="event"
                    disabled={false}
                    onClick={() => handleSelectEvent(e.id)}
                    checked={selectedEventId === e.id}
                  />
                </S.RadioArea>
              </S.Event>
            )
        })) : (
          <NoItems />
        )}
      </S.EventList>
    )}
  </Scroll>
)

EventList.propTypes = propTypes

export { EventList }