import React from 'react';

import { ActiveLink }      from '@components/user/splashStyled';
import { Terms }           from '@components/user/login/loginStyled';
import LoginFormContainer  from '@components/user/login/LoginFormContainer';
import { SplashTemplate }  from '@components/user/SplashTemplate';

const LoginPage = () => (
  <SplashTemplate>

    <LoginFormContainer />

    <ActiveLink to={'/recovery'} >Forgot your Password?</ActiveLink>

    <Terms>
      As a user, I will not disclose certain proprietary and confidential
      information (“Confidential Information”). “Confidential Information”
      shall include all information or material that I have received from
      Indy Work Corporation that has or could have commercial value or other
      utility in business, specifically the scheduling features of the app.
      I agree that I shall hold and maintain the Confidential Information in
      strictest confidence. I shall carefully restrict access of the
      Confidential Information to third parties. I shall not, without prior
      written approval of Indy Work Corporation, use for my own benefit,
      publish, copy, or otherwise disclose to others, or permit the use by
      others for their benefit or to the detriment of Indy Work Corporation,
      any Confidential Information. I shall return to Indy Work or delete
      upon request whether written or oral, any and all records, notes, and
      other written, printed, or tangible materials, including the app, in
      my possession pertaining to Confidential Information.
    </Terms>
  </SplashTemplate>
);

export { LoginPage };
