import React, { useState } from 'react';

import { SplashTemplate }    from '@components/user/SplashTemplate';
import RecoveryFormContainer from '@components/user/recovery/RecoveryFormContainer';
import { RecoverySubmitted } from '@components/user/recovery/RecoverySubmitted';

const RecoveryPage = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  return (
    <SplashTemplate>
      {
        !hasSubmitted
          ? <RecoveryFormContainer onSuccess={setHasSubmitted} />
          : <RecoverySubmitted />
      }
    </SplashTemplate>
  );
};

RecoveryPage.displayName = RecoveryPage.name;

export { RecoveryPage };
