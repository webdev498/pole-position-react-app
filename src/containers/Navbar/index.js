import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { ClubSection } from './ClubSection';
import { ClubNavLinks } from './ClubNavLinks';
import { Footer } from './Footer';
import { Logo } from './Logo';
import { ManageSection } from './ManageSection';
import { MobileToggleMenu } from './MobileToggleMenu';
import * as S from './styled';
import { default as UserSectionContainer } from './UserSection/UserSelectionContainer';
import { getDefaultThumbImage } from '@statics/Helpers';
import defaultClubPic from '@assets/default_scene.jpg';
import { FetchUnReadCount } from '@networking/ConversationCalls';
import { fetchApplicationsByBusinessId } from '@networking/ShiftApplicationCalls';
import { FetchVerifications } from '@networking/VerificationCalls';

let interval1;
let interval2;
let interval3;

const Navbar = props => {
  const {
    authToken,
    business,
    isLoading,
    showSideNav,
    toggleSideNav,
    setMessageCount,
    setApplications,
    setVerifications,
    user
  } = props;

  const getBadgeMsgs = useCallback(
    apiInfo => FetchUnReadCount(apiInfo)
      .then(({ unread_messages_count }) => setMessageCount(unread_messages_count))
      .catch(error => console.log(error)),
    [setMessageCount]
  );

  const getBadgeApps = useCallback(
    apiInfo => {
      fetchApplicationsByBusinessId(apiInfo)
        .then(data => setApplications(data))
        .catch(error => console.log(error));
    },
    [setApplications]
  );

  const getBadgeVerifications = useCallback(
    apiInfo => {
      if (!user.admin) return;
      FetchVerifications(apiInfo)
        .then(({ verification_checks }) => setVerifications(verification_checks))
        .catch(error => console.log(error));
    },
    [setVerifications, user.admin]
  );

  useEffect(() => {
    if (business && business.id) {
      const apiInfo = { authToken, params: { business_id: business.id } };

      getBadgeMsgs(apiInfo);
      getBadgeApps(apiInfo);
      getBadgeVerifications({ authToken });

      interval1 = setInterval(() => getBadgeMsgs(apiInfo), 20000);
      interval2 = setInterval(() => getBadgeApps(apiInfo), 60000);
      interval3 = setInterval(() => getBadgeApps(apiInfo), 600000);
    }

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, [business, authToken, getBadgeApps, getBadgeMsgs, getBadgeVerifications]);

  return (
    <>
      <MobileToggleMenu onMenuButtonClick={toggleSideNav}/>
      <S.Nav show={showSideNav}>
        <Logo
          isLoading={isLoading}
          onCloseButtonClick={toggleSideNav}
        />
        <UserSectionContainer />
        <ManageSection isAdmin={props.user.admin} />

        {business && (
          <>
            <S.Hr/>
            <ClubSection
              name={business.name}
              location={`${business.city}, ${business.state}`}
              thumbnail={
                getDefaultThumbImage(business.images) || defaultClubPic
              }
              onChangeClubClick={props.handleClubChange}
            />
            <ClubNavLinks/>
            <S.Hr/>
          </>
        )}

        <Footer/>
      </S.Nav>
    </>
  );
};

Navbar.propTypes = {
  user: PropTypes.object,
  business: PropTypes.object,
  authToken: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showSideNav: PropTypes.bool.isRequired,

  toggleSideNav: PropTypes.func.isRequired,
  handleClubChange: PropTypes.func.isRequired,
  setMessageCount: PropTypes.func.isRequired,
  setApplications: PropTypes.func.isRequired,
  setVerifications: PropTypes.func.isRequired
};

Navbar.defaultProps = {
  business: null
};

export { Navbar };
