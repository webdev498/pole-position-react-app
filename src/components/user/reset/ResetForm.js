import React     from 'react';
import { connect, getIn } from 'formik';

import * as S from '@components/user/splashStyled';
import { MainText, PageHeading } from '@components/user/submittedStyled';

const ResetForm = connect(props => {
  const FORMIK = getIn(props.formik);

  return (
    <S.UserForm>
      <PageHeading>Password Successfully Reset</PageHeading>
      <MainText>Enter your new password.</MainText>

      <S.InputLabel>Enter your new password</S.InputLabel>
      <S.TextInput
        id="password"
        type="password"
        value={FORMIK.values.password}
        onChange={FORMIK.handleChange}
        onBlur={FORMIK.handleBlur}
        className={
          FORMIK.errors.password && FORMIK.touched.password ? 'error' : ''
        }
      />

      {FORMIK.errors.password && FORMIK.touched.password && (
        <S.ErrorMsg>{FORMIK.errors.password}</S.ErrorMsg>
      )}

      <S.InputLabel>Confirm your new password</S.InputLabel>
      <S.TextInput
        id="password_confirmation"
        type="password"
        value={FORMIK.values.password_confirmation}
        onChange={FORMIK.handleChange}
        onBlur={FORMIK.handleBlur}
        className={
          FORMIK.errors.password_confirmation &&
          FORMIK.touched.password_confirmation
            ? 'error'
            : ''
        }
      />

      {FORMIK.errors.password_confirmation &&
        FORMIK.touched.password_confirmation && (
          <S.ErrorMsg>{FORMIK.errors.password_confirmation}</S.ErrorMsg>
        )}

      {FORMIK.status && <S.ErrorMsg>{FORMIK.status}</S.ErrorMsg>}

      <S.SubmitButton type="submit" disabled={FORMIK.isSubmitting}>
        Submit
      </S.SubmitButton>

      <S.ActiveLink to={'/'}>Back to Main Screen</S.ActiveLink>
    </S.UserForm>
  );
});

ResetForm.displayName = ResetForm.name;

export { ResetForm };
