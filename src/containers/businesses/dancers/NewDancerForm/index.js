import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@common/styled/Flex';
import { MdEmail, MdPerson, MdNote } from 'react-icons/md';
import { Colors } from '@statics/Colors';
import { FieldErrorWrapper } from '@common/FieldErrorWrapper';
import { FormikField } from '@common/styled/FormikField';
import { Button, FilledButton } from '@common/styled/Button';
import { Form, withFormik } from 'formik';
import { formSchema } from './schemas';
import emptyDancerPhoto from '@assets/user-placeholder-mask.png';
import { Img } from './styled/Img';
import { UploadPhotoButton } from './UploadPhotoButton';

class NewDancerForm extends React.Component {
  static propTypes = {
    onCreate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    onChangePhoto: PropTypes.func.isRequired,
    dancerPhotoPreview: PropTypes.string,
  };

  render() {
    const {
      onCancel,
      errors,
      touched,
      values,
      isSubmitting,
      onChangePhoto,
      dancerPhotoPreview,
    } = this.props;
    const nameInputRow = () => (
      <Row margin="1.5em 0">
        <MdPerson size="32" color={Colors.IndyWorkLightPurple} />
        <FieldErrorWrapper touched={touched.name} error={errors.name}>
          <FormikField
            type="text"
            name="name"
            value={values.name}
            placeholder="Full Name"
          />
        </FieldErrorWrapper>
      </Row>
    );
    const emailInputRow = () => (
      <Row margin="1.5em 0">
        <MdEmail size="32" color={Colors.IndyWorkLightPurple} />
        <FieldErrorWrapper touched={touched.email} error={errors.email}>
          <FormikField
            type="text"
            name="email"
            value={values.email}
            placeholder="E-mail Address"
          />
        </FieldErrorWrapper>
      </Row>
    );
    const photoInputRow = () => (
      <Row margin="0 1em">
        <Img
          src={dancerPhotoPreview || emptyDancerPhoto}
          alt="Dancer photo"
        />
        <UploadPhotoButton onChange={onChangePhoto} />
      </Row>
    );
    const bioInputRow = () => (
      <Row margin="1.5em 0">
        <MdNote size="32" color={Colors.IndyWorkLightPurple} />
        <FieldErrorWrapper touched={touched.bio} error={errors.bio}>
          <FormikField
            component="textarea"
            name="bio"
            value={values.bio}
            placeholder="Bio"
            rows="4"
          />
        </FieldErrorWrapper>
      </Row>
    );
    const formSubmitRow = () => (
      <Row margin="1.5em 0" justify="space-evenly">
        <FilledButton type="submit" disabled={isSubmitting}>
          Create
        </FilledButton>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </Row>
    );
    return (
      <Form>
        <Row justify="space-evenly" wrap="wrap">
          <Col margin="0 1em" align="stretch">
            {nameInputRow()}
            {emailInputRow()}
            {bioInputRow()}
          </Col>
          {photoInputRow()}
        </Row>
        {formSubmitRow()}
      </Form>
    );
  }
}

export const NewDancerFormWithFormik = withFormik({
  enableReinitialize: false,
  mapPropsToValues(props) {
    return {
      name: props.name || '',
      email: props.email || '',
      bio: props.bio || '',
      ...props
    };
  },
  validationSchema(props) {
    return formSchema;
  },
  handleSubmit(props, { setSubmitting, resetForm }) {
    props.onCreate(props);
    setSubmitting(false);
    resetForm();
  }
})(NewDancerForm);
