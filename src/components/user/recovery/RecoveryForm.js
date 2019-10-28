import React              from 'react';
import { connect, getIn } from 'formik';

import * as S                    from '@components/user/splashStyled';
import { MainText, PageHeading } from '@components/user/submittedStyled';

const RecoveryForm = connect(props => {
  const FORMIK = getIn(props.formik);

  return (
    <S.UserForm>
      <PageHeading>Password Recovery</PageHeading>

      <MainText>
        Please enter your email in the box below. If it's registered with us,
        you'll get an email with instructions on how to reset your password.
      </MainText>

      <S.InputLabel>Email Address</S.InputLabel>

      <S.TextInput
        id="email"
        type="email"
        name="email"
        value={FORMIK.values.email}
        onChange={FORMIK.handleChange}
        onBlur={FORMIK.handleBlur}
        className={FORMIK.touched.email && FORMIK.errors.email ? 'error' : ''}
      />

      {FORMIK.errors.email && FORMIK.touched.email && (
        <S.ErrorMsg>{FORMIK.errors.email}</S.ErrorMsg>
      )}

      {FORMIK.status && <S.ErrorMsg>{FORMIK.status}</S.ErrorMsg>}

      <S.SubmitButton type="submit" disabled={FORMIK.isSubmitting}>
        Submit Request
      </S.SubmitButton>

      <S.ActiveLink to={'/'}>Back to Main Screen</S.ActiveLink>
    </S.UserForm>
  );
});

RecoveryForm.displayName = RecoveryForm.name;

export { RecoveryForm };
