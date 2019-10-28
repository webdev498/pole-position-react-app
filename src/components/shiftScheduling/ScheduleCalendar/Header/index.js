import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Legend } from '../Legend'
import { CalendarViewConstants } from '@statics/Constants'
import * as S from './styled'

export class Header extends React.PureComponent {
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
            {this.formatDate(selectedDate, viewLayout)}
          </S.Date>
        </S.DateArea>
        <S.LegendArea>
          <Legend />
        </S.LegendArea>
        <S.ViewLayoutArea>
          <S.DateControls>
            <S.Arrow onClick={onDecrementDate}>
              &#9664;
            </S.Arrow>
            <S.Arrow onClick={onIncrementDate}>
              &#9654;
            </S.Arrow>
          </S.DateControls>
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

  formatDate = (date, viewLayout) => {
    if (viewLayout === CalendarViewConstants.MONTH) {
      return date.format('MMMM YYYY');
    } else if (viewLayout === CalendarViewConstants.WEEK) {
      const startDate = moment(date).startOf('week');
      const endDate = moment(date).endOf('week');
      return `${startDate.format('MMM D')} - ${endDate.format('D, YYYY')}`;
    } else {
      return date.format('dddd, MMM D, YYYY');
    }
  }
}