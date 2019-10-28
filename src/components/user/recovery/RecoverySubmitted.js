import React from 'react';

import { MainText, PageHeading, LinkAsButton } from '@components/user/submittedStyled';

const RecoverySubmitted = props => {
  return (
    <>
      <PageHeading>Email Sent</PageHeading>
      <MainText>Please check your email and follow the instructions.</MainText>
      <LinkAsButton to={'/'}>Back To Main Screen</LinkAsButton>
    </>
  );
};

RecoverySubmitted.displayName = RecoverySubmitted.name;

export { RecoverySubmitted };
