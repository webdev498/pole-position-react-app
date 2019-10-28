import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { PageHeader }              from '@common/PageHeader/PageHeader';
import { Content }                 from '@common/styled/Content';
import ModalVerificationContainer  from '@components/Verifications/VerificationModal/VerificationModalContainer';
import { FetchVerifications }      from '@networking/VerificationCalls';
import VerificationListPresenter   from './VerificationList/VerificationList';


export const VerificationPage = props => {
  const {
    authToken,
    verifications,
    removeVerification,
    setVerifications
  } = props;
  const VERIFICATION_LENGTH = verifications.length;
  const [isLoading, setIsLoading] = useState(VERIFICATION_LENGTH === 0);
  const [selectedId, setSelectedId] = useState(null);
  const setID = useCallback((id = null) => setSelectedId(id), []);

  const handleSuccess = useCallback(
    id => {
      setSelectedId(null);
      removeVerification(id);
    },
    [removeVerification]
  );

  useEffect(() => {
    FetchVerifications({ authToken })
      .then(({ verification_checks }) => {
        setVerifications(verification_checks);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      });
  }, [authToken, setVerifications]);

  return (
    <Content.Primary>
      <PageHeader title="Pending Verifications" />
      <VerificationListPresenter
        handleClick={setID}
        verifications={verifications}
        isLoading={isLoading}
      />

      {selectedId && (
        <ModalVerificationContainer
          id={selectedId}
          handleClose={setID}
          onSuccess={handleSuccess}
        />
      )}
    </Content.Primary>
  );
};

VerificationPage.propTypes = {
  authToken: PropTypes.string.isRequired,
  verifications: PropTypes.array.isRequired,
  setVerifications: PropTypes.func.isRequired,
  removeVerification: PropTypes.func.isRequired
};
