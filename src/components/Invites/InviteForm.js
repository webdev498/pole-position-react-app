import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';

import { FieldErrorWrapper } from '@common/FieldErrorWrapper';
import { Row, SetCode, ActiveWrapper, ActiveLabel }      from './styled/inviteForm';
import * as Btn              from '../../components/common/FormikButtons/FormikButtonsStyled';
import { FormikTextInput }   from '../../components/common/Fields/TextInput/TextInput-presenter';
import { FormikTextarea }    from '../../components/common/Fields/TextArea/Textarea-presenter';
import { FormikCheckbox }   from '@common/Fields/Checkbox/FormikCheckbox';


class InviteForm extends PureComponent {
  static propTypes = {
    isSubmitting: PropTypes.bool.isRequired,
    invite:       PropTypes.object.isRequired,
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

    const hasInvite = !!this.props.invite.id;

    return (
      <Form>
        { hasInvite && <SetCode>{this.props.invite.code}</SetCode>}
        {
          !hasInvite && (
            <FormikTextInput
              field="code"
              label="Invite Code"
              placeholder="Invite Code"
            />
          )
        }

        {
          hasInvite && (
            <FieldErrorWrapper width="100%" touched={touched.isActive} error={errors.isActive}>
              <ActiveLabel>
                Invite Code Active?
              </ActiveLabel>
              <ActiveWrapper>
                <FormikCheckbox
                  label="Active"
                  field="isActive"
                />
              </ActiveWrapper>
            </FieldErrorWrapper>
          )
        }

        <FormikTextarea
          field="description"
          placeholder="Invites description"
          label="Invites description"
        />

        <Row margin="1.5em 0" justify="space-between">
          <Btn.FilledBlue type="submit" disabled={this.props.isSubmitting}>
            {hasInvite ? 'Update' : 'Upload'}
          </Btn.FilledBlue>


          {
            hasInvite
              ? (
                <Btn.FilledBlue
                  type="button"
                  disabled={this.props.isSubmitting}
                  onClick={this.props.onDelete.bind(null, this.props.invite.id)}
                >
                  Delete
                </Btn.FilledBlue>
              )
              : (
                <Btn.InvertedPurlple
                  type="button"
                  onClick={this.props.onClose}
                >Cancel</Btn.InvertedPurlple>
              )
          }
        </Row>
      </Form>
    );
  }
}

export { InviteForm }
