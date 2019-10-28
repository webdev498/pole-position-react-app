import React from 'react';
import PropTypes from 'prop-types';
import { Group } from './styled/Group';
import { GroupForm } from './GroupForm';
import { Name } from './Name';
import { FilterInput } from '@common/FilterInput';
import { Row } from '@common/styled/Flex';

const propTypes = {
  dancers: PropTypes.array,
  selectedDancers: PropTypes.array,
  groups: PropTypes.array,
  activeGroupId: PropTypes.number,
  changeActiveGroup: PropTypes.func.isRequired,
  toggleDancerModal: PropTypes.func.isRequired,
  isEditting: PropTypes.bool.isRequired,
  onCancelGroupClick: PropTypes.func.isRequired,
  onEditGroupClick: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onSaveGroup: PropTypes.func.isRequired,
  onDeleteGroup: PropTypes.func.isRequired,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
}

const GroupsPane = (props) => {
  const {
    groups,
    activeGroupId,
    changeActiveGroup,
    dancers,
    selectedDancers,
    toggleDancerModal,
    isEditting,
    onCancelGroupClick,
    onEditGroupClick,
    onSelectAllClick,
    onRemoveClick,
    onSaveGroup,
    onDeleteGroup,
    filter,
    onFilterChange,
  } = props;
  const activeGroup = activeGroupId
    ? groups.find(grp => grp.id === activeGroupId)
    : null;
  const filteredGroups = (activeGroup || !filter)
    ? groups
    : groups.filter(grp =>
        grp.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
  return (
    <Group.Container>
      <Group.List>
        {activeGroup ? (
          <GroupForm
            key={activeGroup.id}
            groupId={activeGroup.id}
            active={true}
            isEditting={isEditting}
            name={activeGroup.name}
            user_ids={isEditting ? selectedDancers : activeGroup.user_ids}
            onHeaderClick={() => changeActiveGroup(activeGroup.id)}
            onSelectAllClick={() => onSelectAllClick(activeGroup.user_ids)}
            onEditClick={() => onEditGroupClick(activeGroup.id, activeGroup.user_ids)}
            onCancelClick={onCancelGroupClick}
            onDeleteClick={onDeleteGroup}
            onSaveClick={onSaveGroup}
            onRemoveClick={onRemoveClick}
            dancers={dancers}
            toggleDancerModal={toggleDancerModal}
          />
        ) : (
          <>
            <Row>
              <FilterInput
                placeholder="Filter"
                value={filter}
                onChange={onFilterChange}
              />
            </Row>
            {filteredGroups.map(item => (
              <Group.Header
                key={item.id}
                onClick={() => changeActiveGroup(item.id)}
              >
                <Name
                  active={false}
                  isEditting={false}
                  value={item.name}
                />
              </Group.Header>
            ))}
          </>
        )}
      </Group.List>
    </Group.Container>
  )
}

GroupsPane.propTypes = propTypes;

export { GroupsPane };