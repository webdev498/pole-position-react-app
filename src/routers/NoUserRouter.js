import React             from 'react';
import { Switch, Route } from 'react-router-dom';

import { LoginPage }    from '@components/user/login/LoginPage';
import { RecoveryPage } from '@components/user/recovery/RecoveryPage';
import { ResetPage }    from '@components/user/reset/ResetPage';

export const NoUserRouter = () => {
  return (
    <Switch>
      <Route exact path="/recovery" component={RecoveryPage} />
      <Route path="/reset" component={ResetPage} />
      <Route path="/" component={LoginPage} />
    </Switch>
  );
};
