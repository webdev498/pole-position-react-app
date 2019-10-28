import React from 'react';
import PropTypes from 'prop-types';
import { Application } from './styled/Application';
import { DancerBox } from '@common/DancerList/DancerBox';
import { getDefaultThumbImage } from '@statics/Helpers';
import { Col, Row } from '@common/styled/Flex';
import { Colors } from '@statics/Colors';
import { MdCheck, MdClose, MdChat } from 'react-icons/md';

const ApplicationList = ({
  applications,
  onMessageClick,
  onAcceptClick,
  onCancelClick,
  toggleDancerModal,
}) => {
  return (
    <Application.List>
      {applications.map(app => (
        <Application.Item key={app.id}>
          <Row align="stretch">
            <DancerBox
              active={false}
              selectable={false}
              name={app.user.name}
              required_documents={app.user.required_documents}
              image={getDefaultThumbImage(app.user.images)}
              width="125px"
              onImageClick={() => toggleDancerModal(app.user)}
              onNameClick={() => toggleDancerModal(app.user)}
            />
            <Col justify="space-around" margin="6px 0 0 -6px">
              {onAcceptClick &&
                <Application.Button
                  hoverColor={Colors.IndyWorkGreen}
                  onClick={() => onAcceptClick(app)}
                >
                  <MdCheck color={Colors.IndyWorkLightPurple} size="22" />
                </Application.Button>}
              <Application.Button
                hoverColor={Colors.IndyWorkRed}
                onClick={() => onCancelClick(app)}
              >
                <MdClose color={Colors.IndyWorkLightPurple} size="22" />
              </Application.Button>
              <Application.Button
                hoverColor="white"
                onClick={() => onMessageClick(app.user)}
              >
                <MdChat color={Colors.IndyWorkLightPurple} size="22" />
              </Application.Button>
            </Col>
          </Row>
        </Application.Item>
      ))}
    </Application.List>
  );
};

ApplicationList.propTypes = {
  applications: PropTypes.array.isRequired,
  onMessageClick: PropTypes.func.isRequired,
  onAcceptClick: PropTypes.func,
  onCancelClick: PropTypes.func.isRequired,
  toggleDancerModal: PropTypes.func.isRequired,
};

export { ApplicationList };
