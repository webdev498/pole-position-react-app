import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, withFormik } from 'formik';

import { formSchema }           from './schemas';
import { Row }                  from '../styled/courseForm';
import { FormikField }          from '@common/styled/FormikField';
import { FieldErrorWrapper }    from '@common/FieldErrorWrapper';
import { Button, FilledButton } from '@common/styled/Button';

class CoursesForm extends PureComponent {
  static propTypes = {
    isSubmitting: PropTypes.bool.isRequired,
    course:       PropTypes.object.isRequired,
    values:       PropTypes.object.isRequired,
    errors:       PropTypes.object.isRequired,
    touched:      PropTypes.object.isRequired,

    onClose:  PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  render() {
    const {
      errors,
      touched,
      values
    } = this.props;

    const hasCourse = !!this.props.course.id;

    return (
      <Form>
        <Row margin="1.5em 0">
          <FieldErrorWrapper width="100%" touched={touched.title} error={errors.title} >
            <FormikField
              type="text"
              name="title"
              value={values.title}
              placeholder="Course title"
            />
          </FieldErrorWrapper>
        </Row>

        <Row margin="1.5em 0">
          <FieldErrorWrapper width="100%" touched={touched.url} error={errors.url}>
            <FormikField
              type="text"
              name="url"
              value={values.url}
              placeholder="Course URL"
            />
          </FieldErrorWrapper>
        </Row>

        <Row>
          <FieldErrorWrapper width="100%" touched={touched.description} error={errors.description}>
            <FormikField
              component="textarea"
              name="description"
              value={values.description}
              placeholder="Course description"
              rows="4"
            />
          </FieldErrorWrapper>
        </Row>

        <Row margin="1.5em 0" justify="space-between">
          <FilledButton type="submit" disabled={this.props.isSubmitting}>
            {hasCourse ? 'Update' : 'Upload'}
          </FilledButton>

          {
            hasCourse
              ? (
                <FilledButton
                  type="button"
                  disabled={this.props.isSubmitting}
                  onClick={this.props.onDelete.bind(null, this.props.course.id)}
                >
                  Delete
                </FilledButton>
              )
              : (
                <Button type="button" onClick={this.props.onClose}>
                  Cancel
                </Button>
              )
          }

        </Row>
      </Form>
    );
  }
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues(props) {
    const hasCourse = !!props.course.id;

    return {
      title: hasCourse ? props.course.title || '' : '',
      url: hasCourse ? props.course.youtube_url || '' : '',
      description: hasCourse ? props.course.description || '' : '',
      ...props
    };
  },
  validationSchema(props) {
    return formSchema;
  },
  handleSubmit(props, {setSubmitting, resetForm}) {
    !!props.course.id ? props.onUpdate(props) : props.onSubmit(props);
    setSubmitting(false);
    resetForm();
  }
})(CoursesForm);
