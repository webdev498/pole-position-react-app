import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { editSchema, defaultSchema } from './schema';
import { EnhancedForm } from './EnhancedForm';

export const EventForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues(props) {
    return {
      title: props.title || '',
      description: props.description || '',
      reach: props.reach || '125',
      start_date: props.start_date || new Date(),
      start_time: props.start_time || '',
      end_time: props.end_time || '',
      file: null,
      ...props
    };
  },
  validationSchema(props) {
    if (props.isEditting) {
      return editSchema;
    }
    return defaultSchema;
  },
  handleSubmit(props, { setSubmitting }) {
    props.onSave(props, setSubmitting);
  }
})(EnhancedForm);

EventForm.propTypes = {
  onSave: PropTypes.func.isRequired
};
