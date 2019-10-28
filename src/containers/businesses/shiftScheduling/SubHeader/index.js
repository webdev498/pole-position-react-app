import React from 'react'
import PropTypes from 'prop-types'

import { CalendarViewConstants } from '@statics/Constants'
import * as S from './styled'

export class SubHeader extends React.PureComponent {
  static propTypes = {
    selectedDate: PropTypes.object.isRequired,
    viewLayout: PropTypes.string.isRequired,
    onViewLayoutChange: PropTypes.func.isRequired,
    onIncrementDate: PropTypes.func.isRequired,
    onDecrementDate: PropTypes.func.isRequired,
  }

  render() {
    const {
      selectedDate,
      viewLayout,
      onViewLayoutChange,
      onIncrementDate,
      onDecrementDate,
    } = this.props;
    return (
      <S.Grid>
        <S.DateArea>
          <S.Date>
            {selectedDate.format('dddd, MMMM D, YYYY')}
          </S.Date>
          <S.DateControls>
            <S.Arrow onClick={() => onDecrementDate(viewLayout)}>
              &#9664;
            </S.Arrow>
            <S.Arrow onClick={() => onIncrementDate(viewLayout)}>
              &#9654;
            </S.Arrow>
          </S.DateControls>
        </S.DateArea>
        <S.ViewLayoutArea>
          <S.Select
            onChange={(e) => onViewLayoutChange(e.target.value)}
            value={viewLayout}
          >
            <S.Option value={CalendarViewConstants.DAY}>Day</S.Option>
            <S.Option value={CalendarViewConstants.WEEK}>Week</S.Option>
            <S.Option value={CalendarViewConstants.MONTH}>Month</S.Option>
          </S.Select>
        </S.ViewLayoutArea>
      </S.Grid>
    )
  }
}