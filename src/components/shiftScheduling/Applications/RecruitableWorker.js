import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Application } from './Application';
import { ApplicationButton } from './ApplicationButton';

const RecruitableWorker = ({
  user,
  messageUser,
  focused,
  handleWorkerFocusChange,
  updateSelectedItems,
  selected
}) => {
  const application = { user: user };

  return (
    <Application
      application={application}
      focused={focused}
      handleWorkerFocusChange={handleWorkerFocusChange}
    >
      <View style={{ flexDirection: 'row' }}>
        <ApplicationButton
          buttonFunc={() => messageUser(user)}
          buttonText="Send Message"
        />
        <ApplicationButton
          buttonFunc={() => updateSelectedItems(user)}
          buttonText="Select"
          isSelected={selected}
        />
      </View>
    </Application>
  );
};

RecruitableWorker.propTypes = {
  user: PropTypes.object.isRequired,
  messageUser: PropTypes.func.isRequired,
  focused: PropTypes.bool.isRequired,
  handleWorkerFocusChange: PropTypes.func.isRequired,
  updateSelectedItems: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
};

export { RecruitableWorker };
