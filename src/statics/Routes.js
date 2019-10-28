import React from 'react';
import * as Icons from 'react-icons/md';

import { Conversations }           from '@containers/businesses/conversations/Conversations';
import Courses                     from '@containers/businesses/courses/Courses';
import Dancers                     from '@containers/businesses/dancers';
import EmployeePageComponent       from '@containers/businesses/employee/employee-page-container';
import NewEmployeeFormContainer    from '@containers/businesses/employee/new-employee-form-container';
import UpdateEmployeeFormContainer from '@containers/businesses/employee/update-employee-form-container';
import { ManageGroups }            from '@containers/businesses/Groups/ManageGroups/index';
import { ViewGroup }               from '@containers/businesses/Groups/ViewGroup';
import ApplicationContainer        from '@containers/businesses/ManageBookings/ApplicationContainer';
import ManageBookingsContainer     from '@containers/businesses/ManageBookings/ManagerBookingsContainer';
import SpecialEvents               from '@containers/businesses/specialEvents/SpecialEvents';
import { ShiftScheduler }          from '@containers/businesses/shiftScheduling/ShiftScheduler';
import ViewEvent                   from '@containers/businesses/specialEvents/ViewEvent';
import AllClubPageContainer        from '@containers/pages/AllClubsPageContainer';
import NewClubPageContainer        from '@containers/pages/NewClubPageContainer';
import EditClubPageContainer       from '@containers/pages/EditClubPageContainer';
import Invites                     from '@containers/pages/InvitesPage';
import VerificationContainer       from '@containers/pages/VerificationContainer';
import AlertMessageContainer       from '@containers/Navbar/badges/MessagesBadge/MessageBadgeContainer';
import AlertApplicationsContainer  from '@containers/Navbar/badges/ApplicationsBadge/ApplicationsBadgeContainer';
import BadgeVerificationContainer  from '@containers/Navbar/badges/VerificationBadge/verificationBadgeContainer';
import UpdateUserFormContainer     from '@containers/user/user-edit-form-container';

export const Routes = {
  clubs: {
    path: '/clubs',
    icon: <Icons.MdLanguage size="20" />,
    text: 'Clubs',
    adminOnly: false,
    ownerOnly: false,
    component: AllClubPageContainer,
    navExtra: null
  },
  newClub: {
    path: '/clubs/new',
    icon: null,
    text: 'New Club',
    adminOnly: false,
    ownerOnly: false,
    component: NewClubPageContainer,
    navExtra: null
  },
  courses: {
    path: '/courses',
    icon: <Icons.MdPlayCircleFilled size="20" />,
    text: 'Courses',
    adminOnly: true,
    ownerOnly: true,
    component: Courses,
    navExtra: null
  },
  bookings: {
    path: '/calendar',
    icon: <Icons.MdDateRange size="20" />,
    text: 'Bookings Schedule',
    adminOnly: false,
    ownerOnly: false,
    component: ShiftScheduler,
    navExtra: null
  },
  applications: {
    path: '/applications',
    icon: <Icons.MdSupervisorAccount size="20" />,
    text: 'Pending Applications',
    adminOnly: false,
    ownerOnly: false,
    component: ApplicationContainer,
    navExtra: <AlertApplicationsContainer />
  },
  manageBookings: {
    path: '/bookings/:shift_id',
    createPath: id => `/bookings/${id}`,
    icon: null,
    text: 'Manage Bookings',
    adminOnly: false,
    ownerOnly: false,
    component: ManageBookingsContainer,
    navExtra: null
  },
  entertainers: {
    path: '/entertainers',
    icon: null,
    text: 'Find Dancers',
    adminOnly: false,
    ownerOnly: false,
    component: Dancers,
    navExtra: null
  },
  manageGroups: {
    path: '/entertainers/groups',
    icon: null,
    text: 'Manage Groups',
    adminOnly: false,
    ownerOnly: false,
    component: ManageGroups,
    navExtra: null
  },
  viewGroup: {
    path: '/entertainers/groups/:group_id',
    createPath: id => `/entertainers/groups/${id}`,
    icon: null,
    text: 'View Group',
    adminOnly: false,
    ownerOnly: false,
    component: ViewGroup,
    navExtra: null
  },
  conversations: {
    path: '/conversations',
    icon: <Icons.MdQuestionAnswer size="20" />,
    text: 'Conversations',
    adminOnly: false,
    ownerOnly: false,
    component: Conversations,
    navExtra: <AlertMessageContainer />
  },
  events: {
    path: '/events',
    icon: <Icons.MdGrade size="20" />,
    text: 'Special Events',
    adminOnly: false,
    ownerOnly: false,
    component: SpecialEvents,
    navExtra: null
  },
  viewEvent: {
    path: '/events/:event_id',
    createPath: id => `/events/${id}`,
    icon: <Icons.MdGrade size="20" />,
    text: 'View Event',
    adminOnly: false,
    ownerOnly: false,
    component: ViewEvent,
    navExtra: null
  },
  settings: {
    path: '/settings',
    icon: null,
    text: 'Club Settings',
    adminOnly: false,
    ownerOnly: false,
    component: EditClubPageContainer,
    navExtra: null
  },
  invites: {
    path: '/invites',
    icon: <Icons.MdLocalPlay size="20" />,
    text: 'Invite Codes',
    adminOnly: false,
    ownerOnly: true,
    component: Invites,
    navExtra: null
  },
  employees: {
    path: '/settings/employees',
    icon: null,
    text: 'Employees',
    adminOnly: false,
    ownerOnly: false,
    component: EmployeePageComponent,
    navExtra: null
  },
  newEmployeeForm: {
    path: '/settings/employees/new',
    icon: null,
    text: null,
    adminOnly: false,
    ownerOnly: true,
    component: NewEmployeeFormContainer,
    navExtra: null
  },
  employeeForm: {
    path: '/settings/employees/:employeeId',
    icon: null,
    text: null,
    adminOnly: false,
    ownerOnly: false,
    component: UpdateEmployeeFormContainer,
    navExtra: null
  },
  userForm: {
    path: '/users/:id/edit',
    icon: null,
    text: null,
    adminOnly: false,
    ownerOnly: false,
    component: UpdateUserFormContainer,
    navExtra: null
  },
  blockedEntertainers: {
    path: '/settings/blocked',
    icon: null,
    text: 'Blocked Entertainers',
    adminOnly: false,
    ownerOnly: false,
    component: EditClubPageContainer,
    navExtra: null
  },
  verifications: {
    path: '/verifications',
    icon: <Icons.MdRowing size="20" style={{ transform: 'rotate(45deg)' }} />,
    text: 'Verifications',
    adminOnly: true,
    ownerOnly: false,
    component: VerificationContainer,
    navExtra: <BadgeVerificationContainer />
  }
};

export const getPermissionedRoutes = (isAdmin, isOwner) => {
  return Object.values(Routes)
    .filter(route => isPermissioned(route, isAdmin, isOwner));
};

export const isPermissioned = (route, isAdmin, isOwner) => {
  if (isAdmin) return true;
  else if (route.adminOnly) return false;
  else if (route.ownerOnly) return isOwner;
  else return true;
};
