import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';

import { orderInvites, updateInviteList } from '../../containers/businesses/invites/inviteServices';
import InviteAside                        from '../../containers/businesses/invites/InviteAsideContainer';
import { PageHeader }                     from '../../components/common/PageHeader/PageHeader';
import { InvertedPurlple }                from '../../components/common/FormikButtons/FormikButtonsStyled';
import { Content }                        from '@common/styled/Content';
import { FetchGetInviteCodes }            from '@networking/InviteCalls';
import { Scroll }                         from '@common/styled/Scroll';
import {
  Invite,
  InviteList,
  Description,
  Active,
  Inactive,
  InviteCode,
  EmptyList,
  InviteTop
} from './styled/inviteList';


class Invites extends PureComponent {
  static propTypes = {
    authToken: PropTypes.string.isRequired,
    business:  PropTypes.object.isRequired,
    isAdmin:   PropTypes.bool.isRequired,
  };

  state = {
    asideIsOpen: false,
    invite: {},
    list: []
  };

  componentDidMount() {
    this.getInvites();
  }

  getInvites = () =>
    FetchGetInviteCodes({
      authToken: this.props.authToken,
      businessId: this.props.business.id,
    })
      .then(resp =>
        this.setState({
          list: orderInvites(resp.registration_codes)
        })
      );

  handleInsertInvite = ( invite = {} ) =>
    this.setState({
      list: orderInvites(this.state.list.concat(invite)),
      asideIsOpen: false
    });

  handleUpdateInvite = (invite={}) =>
    this.setState({
      list: updateInviteList(this.state.list, invite),
      asideIsOpen: false
    });

  handleDeleteInvite = id => {
    this.setState({
      list: this.state.list.filter(invite => invite.id !== id),
      invite: {},
      asideIsOpen: false
    });
  };

  handleAsideOpen = () => this.setState({ asideIsOpen: true });

  handleAsideClose = () => this.setState({ asideIsOpen: false });

  openNewInviteAside = () => this.setState({ asideIsOpen: true, invite: {} });

  handleSelectInvite = invite =>
    this.setState({
      invite,
      asideIsOpen: true
    });

  render() {
    const INVITE_BUTTON = (
      <InvertedPurlple
        onClick={this.openNewInviteAside.bind(null)}
      >New Code</InvertedPurlple>
    );

    return (
      <>
        <Content.Primary>
          <PageHeader
            title="Invite Codes"
            LeftSide={this.props.isAdmin ? INVITE_BUTTON : null}
          />

          <Scroll>
            <InviteList ScrollBar="#1D1F32">
              {
                this.state.list.length === 0 && (
                  <EmptyList>No Invite Codes Available</EmptyList>
                )
              }

              {
                this.state.list.length > 0 && (
                  <InviteList>
                    {
                      this.state.list.map(invite =>
                        <Invite key={`invite_${invite.id}`} onClick={this.handleSelectInvite.bind(null, invite)} >
                          <InviteTop>
                            <InviteCode>{invite.code}</InviteCode>
                            {invite.active ? <Active>Active</Active> : <Inactive>Inactive</Inactive>}
                          </InviteTop>
                          <Description>{invite.description ? invite.description : 'No Description'}</Description>
                        </Invite>
                      )
                    }
                  </InviteList>
                )
              }
            </InviteList>
          </Scroll>
        </Content.Primary>
        <InviteAside
          businessId={this.props.business.id}
          inviteId={this.state.invite.id}
          invite={this.state.invite}
          onUpdate={this.handleUpdateInvite}
          onDelete={this.handleDeleteInvite}
          onInsert={this.handleInsertInvite}
          onSelect={this.handleSelectInvite}
          isOpen={this.state.asideIsOpen}
          onClose={this.handleAsideClose}
        />
      </>
    );
  }
}

export default Invites;
