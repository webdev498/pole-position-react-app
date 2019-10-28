import { connect } from 'react-redux';

import { CREATE_BUSINESS, GET_PROFILE_OPTIONS, GET_REQUIRED_DOCUMENTS, GET_OWNERS } from '@actions/types';
import { getProfileOptions } from '@actions/ApiRequests/ProfileOptions';
import { createBusiness } from '@actions/ApiRequests/Business';
import { getOwners } from '@actions/ApiRequests/Users';
import { userSelector, authTokenSelector } from '@selectors/Auth';
import { createLoadingSelector, createCacheTimeSelector, createDataSelector, createErrorSelector } from '@selectors/index';
import NewClubPage from '../../components/ClubSettings/NewClubPage';

const loadingAndErrorTypes = [
  GET_PROFILE_OPTIONS,
  GET_REQUIRED_DOCUMENTS,
  CREATE_BUSINESS,
  GET_OWNERS,
];

const pageIsLoadingSelector = createLoadingSelector(loadingAndErrorTypes);
const pageErrorSelector = createErrorSelector(loadingAndErrorTypes);
const profileOptionsDataSelector = createDataSelector(GET_PROFILE_OPTIONS);
const profileOptionsCacheTimeSelector = createCacheTimeSelector(GET_PROFILE_OPTIONS);
const requiredDocumentsDataSelector = createDataSelector(GET_REQUIRED_DOCUMENTS);
const requiredDocumentsCacheTimeSelector = createCacheTimeSelector(GET_REQUIRED_DOCUMENTS);
const ownersDataSelector = createDataSelector(GET_OWNERS);

const mapStateToProps = state => ({
  authToken: authTokenSelector(state),
  user: userSelector(state),
  pageIsLoading: pageIsLoadingSelector(state),
  pageErrorMessage: pageErrorSelector(state),
  profileOptionsData: profileOptionsDataSelector(state) || [],
  profileOptionsCacheTime: profileOptionsCacheTimeSelector(state),
  requiredDocumentsData: requiredDocumentsDataSelector(state) || [],
  requiredDocumentsCacheTime: requiredDocumentsCacheTimeSelector(state),
  owners: ownersDataSelector(state) || [],
});

const mapDispatchToProps = {
  getProfileOptions,
  createBusiness,
  getOwners,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewClubPage);
