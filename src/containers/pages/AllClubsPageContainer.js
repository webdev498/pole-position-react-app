import { connect } from 'react-redux';

import { setBusinessInfo } from '@actions/Business';
import { GET_BUSINESSES, DELETE_BUSINESS } from '@actions/types';
import { createErrorSelector, createDataSelector, createLoadingSelector, createCacheTimeSelector } from '@selectors';
import { apiInvalidate } from '@actions/Api';
import { getBusinesses, deleteBusiness } from '@actions/ApiRequests/Business';
import { setClubsPageViewLayout } from '@actions/ViewLayout';
import { userSelector, authTokenSelector } from '@selectors/Auth';
import { businessSelector } from '@selectors/Business';
import { clubsPageViewLayoutSelector } from '@selectors/ViewLayout';
import ViewClubsPage from '../../components/ClubList/ClubListPage';

const errorTypes = [
  GET_BUSINESSES,
  DELETE_BUSINESS,
];

const businessesIsLoadingSelector = createLoadingSelector([GET_BUSINESSES]);
const businessesErrorSelector = createErrorSelector(errorTypes);
const businessesDataSelector = createDataSelector(GET_BUSINESSES);
const businessesCacheTimeSelector = createCacheTimeSelector(GET_BUSINESSES);

const mapStateToProps = state => ({
  authToken: authTokenSelector(state),
  selectedClub: businessSelector(state),
  user: userSelector(state),
  businessesIsLoading: businessesIsLoadingSelector(state),
  businessesError: businessesErrorSelector(state),
  businessesData: businessesDataSelector(state) || [],
  businessesCacheTime: businessesCacheTimeSelector(state),
  viewLayout: clubsPageViewLayoutSelector(state),
});

const mapDispatchToProps = {
  setBusinessInfo,
  getBusinesses,
  apiInvalidate,
  setClubsPageViewLayout,
  deleteBusiness
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewClubsPage);
