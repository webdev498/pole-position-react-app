import React from 'react';
import PropTypes from 'prop-types';
import { RecruitableWorker } from './RecruitableWorker';
import { FlatList, Dimensions } from 'react-native';
import '../styles/ShiftDetailScroll.css';

const RecruitableWorkerList = ({
  users,
  messageUser,
  focusedApplication,
  handleWorkerFocusChange,
  updateSelectedItems,
  selectedItems
}) => {
  return (
    <FlatList
      className={'scroll-shift'}
      contentContainerStyle={{ height: Dimensions.get('window').height - 191 }}
      data={users}
      renderItem={({ item }) => (
        <RecruitableWorker
          key={item.id}
          user={item}
          messageUser={messageUser}
          focused={
            focusedApplication
              ? focusedApplication.user.name === item.name
              : false
          }
          handleWorkerFocusChange={handleWorkerFocusChange}
          updateSelectedItems={updateSelectedItems}
          selected={selectedItems.includes(item.id)}
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

RecruitableWorkerList.propTypes = {
  users: PropTypes.array.isRequired,
  messageUser: PropTypes.func.isRequired,
  focusedApplication: PropTypes.object,
  handleWorkerFocusChange: PropTypes.func.isRequired,
  updateSelectedItems: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired
};

export { RecruitableWorkerList };
