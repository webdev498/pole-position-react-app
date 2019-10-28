import React              from 'react';
import { connect, getIn } from 'formik';

import { InputLabelStyled } from '@common/Fields/styled/InputLabelStyled';
import { FormikTextInput } from '../TextInput/TextInput-presenter';
import * as S from './index.styled';
import * as L from '@components/ClubSettings/layouts/styled/Layout';
import { FormikDropDown } from '@common/Fields/DropDown/FormikDropdown';
import { RadioList } from '@common/Fields/RadioList/RadioList';

export const Owner = connect(props => {
  const FORMIK = getIn(props.formik);
  const IS_EDITING = FORMIK.values.isEditing;
  const OWNERS = FORMIK.values.owners.map(a => ({
    value: a.id,
    label: `${a.name} - (${a.email})`
  }));
  const IS_CREATING_NEW_OWNER = FORMIK.values.isCreatingNewOwner;

  return (
    <S.Wrapper>
      <InputLabelStyled isActive={IS_EDITING}>Owner</InputLabelStyled>
      {IS_EDITING &&
        <S.RadioButtonWrapper>
          <RadioList
            field="isCreatingNewOwner"
            name="is_new_owner"
            label="Owner"
            value={IS_CREATING_NEW_OWNER}
            list={[
              { value: false, label: 'Existing User' },
              { value: true,  label: 'New User' }
            ]}
          />
        </S.RadioButtonWrapper>}
      {IS_CREATING_NEW_OWNER ? (
        <>
          <L.OwnersArea>
            <L.Half>
              <FormikTextInput
                field="owner_name"
                label="Owner's Name"
              />
              <FormikTextInput
                field="owner_email"
                label="Owner's Email"
              />
            </L.Half>
          </L.OwnersArea>
          <L.OwnersArea>
            <L.Half>
              <FormikTextInput
                type="password"
                field="owner_password"
                label="Owner's Password"
              />
              <FormikTextInput
                type="password"
                field="owner_password_confirmation"
                label="Password Confirmation"
              />
            </L.Half>
          </L.OwnersArea>
        </>
      ) : (
        <FormikDropDown
          field="owner_id"
          defaultValue={{ value: '', label: 'Select an owner' }}
          collection={OWNERS}
          isObject
        />
      )}
    </S.Wrapper>
  );
});
