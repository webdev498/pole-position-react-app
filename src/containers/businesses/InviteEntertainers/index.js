import React from 'react'
import PropTypes from 'prop-types'

import { Content } from '@components/common/styled/Content'
import { Error } from '@components/common/styled/Error'
import { InviteTabs } from '@statics/Constants'
import { Header } from './Header'
import { Tabs } from './Tabs'
import { InviteToBookingsForm } from './InviteToBookingsForm'
import { InviteGeneralForm } from './InviteGeneralForm'
import { InviteToEventForm } from './InviteToEventForm'

export class InviteEntertainers extends React.Component {
  static propTypes = {
    selectedDancers: PropTypes.array.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func,
    toggleDancerModal: PropTypes.func.isRequired,
  }

  state = {
    activeTab: InviteTabs.GENERAL,
  }

  renderTabContent = () => {
    const { activeTab } = this.state;
    const {
      onCancelClick,
      selectedDancers,
      onRemoveClick,
      toggleDancerModal,
    } = this.props;
    switch (activeTab) {
      case InviteTabs.BOOKINGS:
        return (
          <InviteToBookingsForm
            selectedDancers={selectedDancers}
            onCancelClick={onCancelClick}
          />
        )
      case InviteTabs.EVENTS:
        return (
          <InviteToEventForm
            selectedDancers={selectedDancers}
            onCancelClick={onCancelClick}
          />
        )
      case InviteTabs.GENERAL:
      default:
        return (
          <InviteGeneralForm
            selectedDancers={selectedDancers}
            onCancelClick={onCancelClick}
            onRemoveClick={onRemoveClick}
            toggleDancerModal={toggleDancerModal}
          />
        )
    }
  }

  render() {
    const { activeTab } = this.state;
    const { errorMessage } = this.props;
    return (
      <React.Fragment>
        <Content.Primary>
          <Header />
          {errorMessage &&
            <Error>{errorMessage}</Error>}
          <Tabs
            activeTab={activeTab}
            onTabClick={this.handleTabClick}
          />
          {this.renderTabContent()}
        </Content.Primary>
      </React.Fragment>
    )
  }

  handleTabClick = activeTab => this.setState({ activeTab })
}