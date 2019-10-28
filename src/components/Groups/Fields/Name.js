import React from 'react'
import PropTypes from 'prop-types'

import { FieldErrorWrapper } from '@common/FieldErrorWrapper'
import * as S from './styled'

export class Name extends React.Component {
  static propTypes = {
    touched: PropTypes.bool,
    error: PropTypes.string,
    value: PropTypes.string.isRequired,
    groups: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      options: this.createOptions(props.groups)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { groups } = this.props;
    if (groups !== prevProps.groups) {
      const newOptions = this.createOptions(groups);
      this.setState({
        options : [
          ...newOptions,
        ]
      })
    }
  }

  render() {
    const {
      touched,
      error,
      value,
    } = this.props;
    const { options } = this.state;
    return (
      <FieldErrorWrapper
        touched={touched}
        error={error}
        label="Group Name"
      >
        <S.Combobox
          options={options}
          placeholder="Create a new group or add to an existing one"
          search
          selection
          fluid
          allowAdditions
          value={value}
          onAddItem={this.handleAddItem}
          onChange={this.handleChange}
        />
      </FieldErrorWrapper>
    );
  }

  createOptions = (groups) => {
      return groups.map(grp => ({
        key: grp.id,
        text: grp.name,
        value: grp.name,
      }))
  }

  handleChange = (e, { value }) => {
    const { onChange } = this.props;
    onChange(value);
  }

  handleAddItem = (e, { value }) => {
    this.setState(state => ({
      options: [
        { text: value, value },
        ...state.options
      ]
    }))
  }
}