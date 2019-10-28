import React from 'react';
import PropTypes from 'prop-types';

import TabContainer             from './Tabs/TabContainer';
import { ActionsListHeading }   from './ActionsHeader/ApplicationListHeading';
import { LoadingUsers }         from '@common/LoadingUsers';
import { PageHeader }           from '@common/PageHeader/PageHeader';
import { Content }              from '@common/styled/Content';
import { Error }                from '@common/styled/Error';
import { SearchInput }          from '@common/searchInput/SearchInput';
import { ShiftApplicationList } from '@containers/businesses/ManageBookings/ApplicationList/ApplicationList';
import DancerModal              from '@containers/businesses/dancers/DancerModal';
import { BookingConstants }     from '@statics/Constants';
import { fetchApplicationsByBusinessId } from '@networking/ShiftApplicationCalls';
import { ApplicationSelectionHeading } from './ActionsHeader/ApplicationSelectionHeading';
import { TableHeader }                 from './ManageBookingsStyled';

class ManageBookings extends React.Component {
  static propTypes = {
    authToken:    PropTypes.string.isRequired,
    isLoading:    PropTypes.bool.isRequired,
    business:     PropTypes.object,
    shiftDetails: PropTypes.object,
    errorMessage: PropTypes.string,
    shiftId:      PropTypes.string,
    shiftList:    PropTypes.array,

    getShiftDetails:        PropTypes.func,
    setApplications:        PropTypes.func,
    undoShiftApplication:   PropTypes.func.isRequired,
    acceptShiftApplication: PropTypes.func.isRequired,
    rejectShiftApplication: PropTypes.func.isRequired
  };

  static defaultProps = {
    business: {},
    shiftDetails: {},
    errorMessage: null,
    shiftId: null,
    shiftList: []
  };

  state = {
    showDancerModal: false,
    dancerModalData: null,
    filterText: '',
    activeTab: BookingConstants.PENDING,
    selectedApplications: []
  };

  componentDidMount() {
    this.loadShiftDetails();
  }

  render() {
    const {
      isLoading,
      errorMessage,
    } = this.props;
    const {
      filterText,
      activeTab,
      selectedApplications,
      showDancerModal,
      dancerModalData
    } = this.state;

    const visibleApplications = this.getVisibleApplications();

    const Filters = (
      <SearchInput
        placeHolder="Search Booking(s)"
        value={filterText}
        onChange={this.handleFilterTextChange}
      />
    );

    return (
      <React.Fragment>
        <Content.Primary>
          <PageHeader
            css={{ maxWidth: '100%' }}
            title="Manage Bookings"
            RightSide={Filters}
          />
          {errorMessage && <Error>{errorMessage}</Error>}
          {isLoading
            ? <LoadingUsers />
            : (
              <>
                <TabContainer
                  activeTab={activeTab}
                  onTabClick={this.handleTabClick}
                />

                <TableHeader>
                  <ApplicationSelectionHeading
                    totalCount={visibleApplications.length}
                    selectedCount={selectedApplications.length}
                    onSelectAllClick={this.handleSelectAll}
                    onDeselectAllClick={this.handleDeselectAll}
                  />
                  {selectedApplications.length > 0 && (
                    <ActionsListHeading
                      selectedCount={selectedApplications.length}
                      applicationsType={activeTab}
                      onAcceptClick={this.handleAcceptMultipleApplications}
                      onRejectClick={this.handleRejectMultipleApplications}
                      onUndoClick={this.handleUndoMultipleApplications}
                    />
                  )}
                </TableHeader>

                <ShiftApplicationList
                  applicationsType={activeTab}
                  shiftApplications={visibleApplications}
                  selectedShiftApplications={selectedApplications}
                  onPhotoClick={this.handleSelectApplication}
                  onViewProfileClick={this.toggleDancerModal}
                  onAcceptClick={this.handleAcceptApplication}
                  onRejectClick={this.handleRejectApplication}
                  onCancelClick={this.handleUndoApplication}
                />

                <DancerModal
                  show={showDancerModal}
                  handleClose={this.toggleDancerModal}
                  dancer={dancerModalData}
                  onBlockClick={this.handleBlockClick}
                />
              </>
            )}
        </Content.Primary>
      </React.Fragment>
    );
  }

  handleBlockClick = () => {};

  toggleDancerModal = (user) => {
    const dancerModalData = user || null;
    this.setState(state => ({
      ...state,
      showDancerModal: !state.showDancerModal,
      dancerModalData
    }));
  };

  getVisibleApplications = () => {
    const LIST = this.props.shiftDetails && this.props.shiftDetails.shiftApplications
      ? this.props.shiftDetails.shiftApplications
      : this.props.shiftList || [];

    const ACTIVE_TAB = this.state.activeTab;
    let filter = null;
    let filteredList = [];

    if (this.props.shiftDetails && LIST) {
      if (ACTIVE_TAB === BookingConstants.ACCEPTED)      filter = true;
      else if (ACTIVE_TAB === BookingConstants.REJECTED) filter = false;

      filteredList = LIST.filter(app => app.accepted === filter);
    }

    return filteredList;
  };

  handleSelectApplication = id => {
    this.setState(state => {
      if (state.selectedApplications.includes(id)) {
        // Remove id from selected array
        return {
          ...state,
          selectedApplications: state.selectedApplications.filter(
            selectedId => selectedId !== id
          )
        };
      } else {
        // Add id to selected array
        return {
          ...state,
          selectedApplications: [...state.selectedApplications, id]
        };
      }
    });
  };

  handleSelectAll = () => {
    const visibleApplications = this.getVisibleApplications();
    this.setState({
      selectedApplications: visibleApplications.map(app => app.id)
    });
  };

  handleDeselectAll = () => {
    this.setState({ selectedApplications: [] });
  };

  handleFilterTextChange = (e) => {
    const val = e.target.value;
    this.setState({ filterText: val });
  };

  handleTabClick = (newTab) => {
    this.setState({
      activeTab: newTab,
      selectedApplications: []
    });
  };

  loadShiftDetails = () => {
    const { authToken, shiftId, getShiftDetails, business, setApplications } = this.props;
    if (shiftId) getShiftDetails(authToken, shiftId);
    else {
      fetchApplicationsByBusinessId({ authToken, params: {business_id: business.id} })
        .then(data => setApplications(data))
        .catch(err => console.log('error', err));
    }
  };

  handleAcceptMultipleApplications = () => {
    this.handleUpdateMultipleApplications(this.handleAcceptApplication);
  };

  handleRejectMultipleApplications = () => {
    this.handleUpdateMultipleApplications(this.handleRejectApplication);
  };

  handleUndoMultipleApplications = () => {
    this.handleUpdateMultipleApplications(this.handleUndoApplication);
  };

  handleUpdateMultipleApplications = updateFunc => {
    const { selectedApplications } = this.state;
    const { shiftDetails } = this.props;
    if (Array.isArray(selectedApplications) && shiftDetails && shiftDetails.shiftApplications) {
      shiftDetails.shiftApplications.forEach(app => {
        if (selectedApplications.includes(app.id)) {
          updateFunc(app);
        }
      });
    }
  };

  handleAcceptApplication = application => {
    const { authToken, acceptShiftApplication } = this.props;
    acceptShiftApplication(authToken, application, this.loadShiftDetails);
  };

  handleRejectApplication = application => {
    const { authToken, rejectShiftApplication } = this.props;
    rejectShiftApplication(authToken, application, this.loadShiftDetails);
  };

  handleUndoApplication = application => {
    const { authToken, undoShiftApplication } = this.props;
    undoShiftApplication(authToken, application, this.loadShiftDetails);
  };
}

export { ManageBookings };
