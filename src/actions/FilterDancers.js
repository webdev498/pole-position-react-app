import { SET_FILTERS, ADD_FILTER, REMOVE_FILTER } from '@actions/types'

export function setFilters(filters) {
  return {
    type: SET_FILTERS,
    payload: filters,
  }
}

export function addFilter(filter) {
  return {
    type: ADD_FILTER,
    payload: filter,
  }
}

export function removeFilter(filter) {
  return {
    type: REMOVE_FILTER,
    payload: filter,
  }
}