import React from 'react';

import { SplashPage, Logo, Legal, LegalLink } from '@components/user/splashStyled';
import logo from '@assets/white_logo.png';

const SplashTemplate = ({children}) => {
  return (
    <SplashPage>
      <Logo src={logo} alt="Pole Position Logo" />

      {children}

      <Legal>
        <LegalLink to="#">Privacy Policy</LegalLink>
        <LegalLink to="#">FAQ</LegalLink>
        <LegalLink to="#">Terms and Conditions</LegalLink>
      </Legal>
    </SplashPage>
  );
};

SplashTemplate.displayName = SplashTemplate.name;


export { SplashTemplate };
