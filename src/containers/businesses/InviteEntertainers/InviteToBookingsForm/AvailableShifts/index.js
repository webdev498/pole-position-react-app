import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Loading } from '@common/Loading'
import { RadioButton } from '@common/RadioButton'
import { Scroll } from '@common/styled/Scroll'
import { NoItems } from '@common/NoItems'
import * as S from './styled'

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  shifts: PropTypes.array.isRequired,
  selectedShiftId: PropTypes.number,
  handleSelectShift: PropTypes.func.isRequired,
}

const AvailableShifts = ({
  isLoading,
  shifts,
  selectedShiftId,
  handleSelectShift,
}) => (
  <Scroll>
    {isLoading ? (
      <Loading />
    ) : (
      <S.ShiftList>
        {(Array.isArray(shifts) && shifts.length > 0) ? (
          shifts.map(shift =>
            <S.Shift
              key={shift.id}
              onClick={() => handleSelectShift(shift.id)}
            >
              <S.TimeArea>
                {moment(shift.start_time).format('h:mm a')}
                {' - '}
                {moment(shift.end_time).format('h:mm a')}
              </S.TimeArea>
              <S.SpotsLeftArea>
                {`${shift.slots - shift.accepted_shift_applications_count} spots left`}
              </S.SpotsLeftArea>
              <S.RadioArea>
                <RadioButton
                  name="shift"
                  disabled={false}
                  onClick={() => handleSelectShift(shift.id)}
                  checked={selectedShiftId === shift.id}
                />
              </S.RadioArea>
            </S.Shift>)
        ) : (
          <NoItems />
        )}
      </S.ShiftList>
    )}
  </Scroll>
)



AvailableShifts.propTypes = propTypes;

export { AvailableShifts }