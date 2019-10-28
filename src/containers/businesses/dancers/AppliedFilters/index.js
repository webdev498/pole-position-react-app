import React from 'react'
import PropTypes from 'prop-types'

import { FilterTypes } from '@statics/Constants'
import * as S from './styled'

const propTypes = {
  filters: PropTypes.array.isRequired,
  defaultLocationFilter: PropTypes.string.isRequired,
  defaultDistanceFilter: PropTypes.string.isRequired,
  onCancelFilterClick: PropTypes.func.isRequired,
}

const AppliedFilters = ({
  filters,
  defaultLocationFilter,
  defaultDistanceFilter,
  onCancelFilterClick
}) => {
  const locationFilter = filters.find(f => f.type === FilterTypes.LOCATION);
  const distanceFilter = filters.find(f => f.type === FilterTypes.DISTANCE);
  return (
    <S.Container>
      {!locationFilter &&
        <S.Filter>
          <S.CloseIcon disabled />
          <S.Text>{defaultLocationFilter}</S.Text>
        </S.Filter>}
      {!distanceFilter &&
        <S.Filter>
          <S.CloseIcon disabled />
          <S.Text>{defaultDistanceFilter}</S.Text>
        </S.Filter>}
      {filters.map((filter, i) => (
        <S.Filter key={(i+1)*17*13}>
          <S.CloseIcon onClick={() => onCancelFilterClick(filter)} />
          <S.Text>
            {filter.displayValue || filter.value}
          </S.Text>
        </S.Filter>
      ))}
    </S.Container>
  )
}

AppliedFilters.propTypes = propTypes;

export { AppliedFilters }