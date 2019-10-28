import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik'
import { Title } from './Title';
import { Row } from '@common/styled/Flex';
import { FilledButton, Button } from '@common/styled/Button';
import { Description } from './Description';
import { StartDate } from './StartDate';
import { TimePeriod } from './TimePeriod';
import { Colors } from '@statics/Colors';
import { Distance } from './Distance';
import { Image } from './Image';

export class EnhancedForm extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    reach: PropTypes.number,
    start_date: PropTypes.instanceOf(Date),
    start_time: PropTypes.string,
    end_time: PropTypes.string,
    isEditting: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false,
    };
    this.toggleCalendar = this.toggleCalendar.bind(this);
  }

  toggleCalendar() {
    this.setState(state => ({
      ...state,
      showCalendar: !state.showCalendar,
    }));
  }

  render() {
    const {
      onCancel,
      onDelete,
      isEditting,
      touched,
      errors,
      values,
      setFieldValue,
      isSubmitting
    } = this.props;
    const { showCalendar } = this.state;
    return (
      <Form>
        <Title
          disabled={isSubmitting}
          touched={touched.title}
          error={errors.title}
          value={values.title}
        />
        <Description
          disabled={isSubmitting}
          touched={touched.description}
          error={errors.description}
          value={values.description}
        />
        <StartDate
          disabled={isSubmitting}
          touched={touched.start_date}
          error={errors.start_date}
          value={values.start_date}
          onChange={val => setFieldValue('start_date', val)}
          showCalendar={showCalendar}
          toggleCalendar={this.toggleCalendar}
        />
        <TimePeriod
          disabled={isSubmitting}
          startTimeError={errors.start_time}
          startTimeTouched={touched.start_time}
          startTimeValue={values.start_time}
          onStartTimeChange={val => setFieldValue('start_time', val)}
          endTimeError={errors.end_time}
          endTimeTouched={touched.end_time}
          endTimeValue={values.end_time}
          onEndTimeChange={val => setFieldValue('end_time', val)}
        />
        <Distance
          disabled={isSubmitting}
          error={errors.reach}
          touched={touched.reach}
          value={values.reach}
          onChange={e => setFieldValue('reach', e.target.value)}
        />
        <Image
          disabled={isSubmitting}
          touched={touched.file}
          error={errors.file}
          value={values.file}
          onChange={e => setFieldValue('file', e.currentTarget.files[0])}
          onRemove={() => setFieldValue('file', null)}
        />
        <Row justify="space-evenly">
          <FilledButton type="submit" disabled={isSubmitting}>
            {isEditting ? 'Save' : 'Create'}
          </FilledButton>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
          {isEditting &&
            <FilledButton
              fill={Colors.IndyWorkRed}
              onClick={onDelete}
              disabled={isSubmitting}
            >
              Delete
            </FilledButton>}
        </Row>
      </Form>
    );
  }
}