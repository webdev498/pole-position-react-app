import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, getIn, Form } from 'formik';
import { Redirect } from 'react-router-dom';

import { BottomBox } from './EmployeeFormStyled';
import { ImageForm } from '../../common/ImageForm';
import { Half, InputWrapper, Row } from '../../ClubSettings/layouts/styled/DetailsStyled';
import { FormikTextInput } from '../../common/Fields/TextInput/TextInput-presenter';
import { InvertedPurlple } from '../../common/FormikButtons/FormikButtonsStyled';
import { FormikCheckbox } from '../../common/Fields/Checkbox/FormikCheckbox';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import { Content } from '../../common/styled/Content';
import { FetchEmployees } from '../../../networking/UserCalls';

const EmployeeFormPresenter = connect(props => {
  if (props.redirectPath) return <Redirect to={props.redirectPath}/>;
  const FORMIK = getIn(props.formik);
  const [isLoading, setIsLoading] = useState(
    props.form === 'UPDATE_EMPLOYEE' && !props.employee
  );

  const [buttons, setButtons] = useState({});

  const onSubmit = useCallback(e => {
    e.preventDefault();
    FORMIK.handleSubmit();
  }, [FORMIK]);

  useEffect(() => {
    if (props.form === 'UPDATE_USER') {
      setButtons({ header: 'User Settings', submit: 'Update Settings' });
    } else if (props.form === 'NEW_EMPLOYEE') {
      setButtons({ header: 'New Employee', submit: 'Add Employee' });
    } else if (props.form === 'UPDATE_EMPLOYEE') {
      setButtons({ header: 'Edit Employee', submit: 'Update Employee' });
    }
  }, [props.form]);

  useEffect(() => {
    if (props.form === 'UPDATE_EMPLOYEE' && !props.employee) {
      const { authToken, business } = props;
      const params = { business_id: business.id };

      FetchEmployees({ authToken, params })
        .then(({ employees }) => props.setEmployeeStore(employees))
        .catch(() => FORMIK.setStatus('An error occurred while loading club employees'))
        .finally(() => setIsLoading(false));
    }
  }, [FORMIK, props]);

  return (
    <Content.Primary>
      <PageHeader title={buttons.header || ''}/>
      {
        isLoading
          ? <div/>
          : (
            <Form onSubmit={onSubmit}>
              <Row>
                <Half>
                  <InputWrapper>
                    <FormikTextInput
                      field="name"
                      label="Full Name"
                    />
                  </InputWrapper>

                  <InputWrapper>
                    <FormikTextInput
                      field="email"
                      label="Email Address"
                    />
                  </InputWrapper>

                  <InputWrapper>
                    <FormikTextInput
                      field="password"
                      type="password"
                      label="Password"
                    />
                  </InputWrapper>

                  <InputWrapper>
                    <FormikTextInput
                      field="confirm"
                      type="password"
                      label="Confirm Password"
                    />
                  </InputWrapper>

                </Half>
                <Half>
                  <ImageForm label="Profile Picture" alt="Profile Image"/>
                </Half>
              </Row>

              {
                props.isAdmin && (props.form !== 'UPDATE_USER') && (
                  <BottomBox>
                    <FormikCheckbox field="manager" label="Manager"/>
                  </BottomBox>
                )
              }

              <InvertedPurlple
                type="submit"
                disabled={FORMIK.isSubmitting}
              >{buttons.submit}</InvertedPurlple>
            </Form>
          )
      }

    </Content.Primary>
  );
});

EmployeeFormPresenter.displayName = EmployeeFormPresenter.name;

EmployeeFormPresenter.propTypes = {
  authToken: PropTypes.string.isRequired,
  business: PropTypes.object,
  employee: PropTypes.object,
  form: PropTypes.oneOf(['NEW_EMPLOYEE', 'UPDATE_USER', 'UPDATE_EMPLOYEE']),
  redirectPath: PropTypes.string,
  setEmployeeStore: PropTypes.func
};

EmployeeFormPresenter.defaultProps = {
  employee: null,
  redirectPath: null,
  setEmployeeStore: null,
  business: null
};

export default EmployeeFormPresenter;
