import { withFormik } from 'formik';
import * as Yup from 'yup';

import { InviteForm } from '../../../components/Invites/InviteForm';
import { Schema }     from '../../../selectors/Schemas';

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues(props) {
    const hasInvite = !!props.invite.id;

    return {
      isEditing: true,
      code: hasInvite ? props.invite.code || '' : '',
      isActive: hasInvite ? props.invite.active || false : false,
      description: hasInvite ? props.invite.description || '' : '',
      ...props
    };
  },
  validationSchema(props) {
    return Yup.object().shape({
      code: Schema.code,
      active: Yup.boolean(),
      description: Yup.string().nullable(),
    });
  },
  handleSubmit(props, {setSubmitting, resetForm}) {
    !!props.invite.id ? props.onUpdate(props) : props.onSubmit(props);
    setSubmitting(false);
    // resetForm();
  }
})(InviteForm);
