import React from 'react';
import PropTypes from 'prop-types';
import { connect, getIn } from 'formik';

import * as S from '@components/user/splashStyled';

const LoginForm = connect(props => {
  const FORMIK = getIn(props.formik);

  return (
    <S.UserForm>
      <S.InputLabel htmlFor="email">Email Address</S.InputLabel>
      <S.TextInput
        id="email"
        type="email"
        name="email"
        value={FORMIK.values.email}
        onFocus={FORMIK.handleFocus}
        onChange={FORMIK.handleChange}
        onBlur={FORMIK.handleBlur}
        className={FORMIK.touched.email && FORMIK.errors.email ? 'error' : ''}
      />

      {FORMIK.errors.email && FORMIK.touched.email && (
        <S.ErrorMsg>{props.errors.email}</S.ErrorMsg>
      )}

      <S.InputLabel htmlFor="password">Password</S.InputLabel>
      <S.TextInput
        id="password"
        type="password"
        name="password"
        value={FORMIK.values.password}
        onFocus={FORMIK.handleFocus}
        onChange={FORMIK.handleChange}
        onBlur={FORMIK.handleBlur}
        className={
          FORMIK.touched.password && FORMIK.errors.password ? 'error' : ''
        }
      />

      {FORMIK.errors.password && FORMIK.touched.password && (
        <S.ErrorMsg>{FORMIK.errors.password}</S.ErrorMsg>
      )}

      {FORMIK.status && <S.ErrorMsg>{FORMIK.status}</S.ErrorMsg>}

      <S.SubmitButton
        type="submit"
        disabled={FORMIK.isSubmitting}
      >
        Submit
      </S.SubmitButton>
    </S.UserForm>
  );
});

LoginForm.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  dirty: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func
};

export { LoginForm };
