import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { ClubProps }    from '../../../components/ClubSettings/default-props';
import { FormEditClub } from '../../../components/ClubSettings/layouts/FormEditClub';
import { Schema }       from '../../../selectors/Schemas';

export default connect()(withFormik({
  enableReinitialize: true,
  mapPropsToValues(props) {
    return {
      ...props,
      name: ClubProps.name,
      notes: ClubProps.notes,
      street1: ClubProps.street1,
      street2: ClubProps.street2,
      city: ClubProps.city,
      state: ClubProps.state,
      zip: ClubProps.zip,
      url: ClubProps.url,

      logo_file: null,
      logo_preview: null,
      phone_number: ClubProps.phone_number,
      square_footage: ClubProps.square_footage,
      hours_of_operation: ClubProps.hours_of_operation,
      required_documents: ClubProps.required_documents,
      profile_options: props.profile_options || ClubProps.profile_options,
      owners: props.owners,
      owner_id: ClubProps.owner_id,
      owner_name: ClubProps.owner_name,
      owner_email: ClubProps.owner_email,
      owner_password: ClubProps.owner_password,
      owner_password_confirmation: ClubProps.owner_password_confirmation,
      special_requirements: ClubProps.special_requirements,
      special_requirements_link: ClubProps.special_requirements_link,

      isEditing: true,
      isCreatingNewOwner: false,
    };
  },
  validationSchema(props) {
    return Yup.object().shape({
      name: Schema.name,
      notes: Schema.notes,
      street1: Schema.street1,
      street2: Schema.street2,
      city: Schema.city,
      state: Schema.state,
      zip: Schema.zip,
      phone_number: Schema.phone_number,
      hours_of_operation: Schema.hours_of_operation,
      square_footage: Schema.square_footage,
      owner_id: Schema.owner_id,
      owner_email: Schema.owner_email,
      owner_name: Schema.owner_name,
      owner_password: Schema.owner_password,
      owner_password_confirmation: Schema.owner_password_confirmation,
      url: Schema.url,
      special_requirements: Schema.special_requirements,
      special_requirements_link: Schema.special_requirements_link
    });
  },
  handleSubmit(props, { setSubmitting, onSubbmit}) {
    props.onSubmit(props);
    setSubmitting(false);
  }
})(() => <FormEditClub title="Add New Club" />));
