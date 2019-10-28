import React, { useState } from 'react';

import { SplashTemplate }  from '@components/user/SplashTemplate';
import ResetFormContainer  from '@components/user/reset/ResetFormContainer';
import { ResetSubmitted }  from '@components/user/reset/resetSubmitted';

const ResetPage = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  return (
    <SplashTemplate>
      {!hasSubmitted
        ? <ResetFormContainer onSuccess={setHasSubmitted} />
        : <ResetSubmitted />
      }
    </SplashTemplate>
  );
}

ResetPage.displayName = ResetPage.name;

export { ResetPage };
