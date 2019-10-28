import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Content }           from '@common/styled/Content';
import { RightPane }         from '@common/RightPane';
import * as Calls            from '@networking/InviteCalls';
import InviteFormContainer   from '../../containers/businesses/invites/InviteFormContainer';

class InviteAside extends Component {
  static propTypes = {
    businessId: PropTypes.number.isRequired,
    authToken:  PropTypes.string.isRequired,
    invite:     PropTypes.object.isRequired,
    isOpen:     PropTypes.bool.isRequired,

    onInsert: PropTypes.func.isRequired,
    onClose:  PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    invite: { id: null, code: '', description: '', active: false }
  };

  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: true,
    };

    this.handleInsert  = this.handleInsert.bind(this);
    this.handleDelete  = this.handleDelete.bind(this);
    this.handleUpdate  = this.handleUpdate.bind(this);
  }

  handleInsert(info) {
    Calls.FetchInsertInvite({
      authToken: this.props.authToken,
      businessId: this.props.businessId,
      params: {
        registration_code: {
          code: info.code === '' ? null : info.code.trim(),
          description: info.description.trim(),
        }
      }
    })
      .then(({registration_code}) => {
        this.props.onClose();
        this.props.onInsert(registration_code);
        this.props.onSelect(registration_code);
      })
      .catch(err => {
        if (err.status === 442) console.log('Code is in use');
      })
  }

  handleDelete(inviteId) {
    Calls.DeleteInvite({
      authToken:  this.props.authToken,
      businessId: this.props.businessId,
      inviteId
    })
      .then(this.props.onDelete(inviteId));
  }

  handleUpdate(info) {
    console.log(info)
    Calls.UpdateInvite({
      authToken:  this.props.authToken,
      businessId: this.props.businessId,
      inviteId:   info.invite.id,
      params: {
        registration_code: {
          description: info.description.trim(),
          active: info.isActive,
        }
      }
    })
      .then(({registration_code}) => {
        this.props.onUpdate(registration_code);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Content.Secondary show={this.props.isOpen} >
        <RightPane
          title={`${this.props.invite.id ? 'Update' : 'New'} Code`}
          onCloseButtonClick={this.props.onClose}
        >
          <InviteFormContainer
            onSubmit={this.handleInsert}
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
            onClose={this.props.onClose}
            isSubmitting={this.state.isSubmitting}
            invite={this.props.invite}
          />
        </RightPane>
      </Content.Secondary>
    );
  }
}

export default InviteAside
