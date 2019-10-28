import React from 'react';
import { Form, getIn, connect } from 'formik';
import PropTypes from 'prop-types';

import { Details }          from './Details';
import * as L               from './styled/Layout';
import { EditClubButton }   from '../EditClubButton';
import { HoursOfOperation } from '@common/Fields/HoursOfOperation';
import { ClubFeatures }     from '@common/Fields/ClubFeatures';
import { RequiredDocs }     from '@common/Fields/RequiredDocs';
import { FormikTextInput }  from '@common/Fields/TextInput/TextInput-presenter';
import { FormikTextarea }   from '@common/Fields/TextArea/Textarea-presenter';
import { FieldErrorMsg }    from '@common/Fields/Error/Error-presenter';
import { FormikButtons }    from '@common/FormikButtons/FormikButtons';
import { PageHeader }       from '@common/PageHeader/PageHeader';
import { FormikCheckbox }   from '@common/Fields/Checkbox/FormikCheckbox';
import { InputLabelStyled } from '@common/Fields/styled/InputLabelStyled';
import { Owner }            from '@common/Fields/Owner';

const FormEditClub = connect(props => {
  const FORMIK = getIn(props.formik);
  const IS_EDITING = FORMIK.values.isEditing;

  return (
    <Form>
      <PageHeader
        title={props.title}
        LeftSide={!IS_EDITING ? <EditClubButton /> : null}
      />

      <L.Wrapper>
        <Details />
        <HoursOfOperation />

        <L.Half>
          <ClubFeatures />
          <RequiredDocs />
        </L.Half>

        <L.Registration>
          <div>
            <InputLabelStyled isActive={IS_EDITING}>
              Special Registration
            </InputLabelStyled>
            <FormikCheckbox
              label="Special Registration"
              field="special_requirements"
            />
          </div>
          <FormikTextInput
            label="Special Registration Link"
            field="special_requirements_link"
          />
        </L.Registration>

        <Owner />

        <FormikTextarea field="notes" label="Notes" />

        {IS_EDITING && <FormikButtons />}
        <FieldErrorMsg isStatus />
      </L.Wrapper>
    </Form>
  );
});

FormEditClub.displayName = FormEditClub.name;

FormEditClub.propTypes = {
  title: PropTypes.string.isRequired
};

export { FormEditClub };
