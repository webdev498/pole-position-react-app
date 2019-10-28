import React from 'react';

import { MainText, PageHeading, LinkAsButton } from '@components/user/submittedStyled';


const ResetSubmitted = props => {
  return (
    <>
      <PageHeading>All Set!</PageHeading>
      <MainText>Your password has been successfully saved, please login with your new credentials.</MainText>
      <LinkAsButton to={'/'}>Back To Main Screen</LinkAsButton>
    </>
  );
};

ResetSubmitted.displayName = ResetSubmitted.name;

export { ResetSubmitted };
