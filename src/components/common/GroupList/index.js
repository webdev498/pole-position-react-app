import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styled';
import { Scroll } from '../styled/Scroll';

export class GroupList extends React.Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    selectedGroupIds: PropTypes.array.isRequired,
    onGroupClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
    }
    this.onFilterTextChange = this.onFilterTextChange.bind(this);
  }

  onFilterTextChange(e) {
    const val = e.target.value;
    this.setState({
      filterText: val,
    });
  }

  render() {
    const {
      groups,
      selectedGroupIds,
      onGroupClick,
    } = this.props;
    const { filterText } = this.state;
    const filteredGroups = filterText
      ? groups.filter(group =>
        group.name.toLowerCase()
          .indexOf(filterText.toLowerCase()) >= 0)
      : groups;
    return (
      <>
        <S.Title>Notify Groups</S.Title>
        <S.Container>
          <S.FilterContainer>
            <S.Filter
              type="text"
              placeholder="Filter"
              value={filterText}
              onChange={this.onFilterTextChange}
            />
          </S.FilterContainer>
          <Scroll>
            <S.List>
              {filteredGroups.map(group =>
                <S.Group key={group.id} onClick={() => onGroupClick(group.id)}>
                  <S.Checkbox
                    type="checkbox"
                    checked={selectedGroupIds.includes(group.id)}
                    readOnly
                  />
                  <S.Name>{group.name}</S.Name>
                </S.Group>)}
            </S.List>
          </Scroll>
        </S.Container>
      </>
    );
  }
}