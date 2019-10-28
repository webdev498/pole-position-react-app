import React from 'react'
import PropTypes from 'prop-types'

import { Warning } from '@common/styled/Warning'
import { Scroll } from '@common/styled/Scroll'
import { Paginate } from '@common/Paginate'
import { ViewLayoutConstants } from '@statics/Constants'
import { GridView } from './GridView'
import { ListView } from './ListView'
import * as S from './styled'

export class DancerList extends React.Component {
  static propTypes = {
    viewLayout: PropTypes.oneOf(Object.values(ViewLayoutConstants)),
    dancers: PropTypes.array,
    photoSizeInPx: PropTypes.number,
    isAdmin: PropTypes.bool.isRequired,

    isSelectable: PropTypes.bool.isRequired,
    selectedDancers: PropTypes.array,
    onDancerSelect: PropTypes.func,

    onViewProfileClick: PropTypes.func.isRequired,

    showMoreMenu: PropTypes.bool.isRequired,
    onInviteClick: PropTypes.func,
    onAddToGroupClick: PropTypes.func,
    onMessageClick: PropTypes.func,
    onBlockClick: PropTypes.func,
    onReportClick: PropTypes.func,
    onDeleteClick: PropTypes.func,

    onRemoveClick: PropTypes.func,
  }

  static defaultProps = {
    selectedDancers: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      visibleDancers: [],
    };
  }

  onChangePage = (visibleDancers) => {
    this.setState({ visibleDancers });
  }

  renderDancerList = () => {
    const {
      isAdmin,
      viewLayout,
      photoSizeInPx,
      isSelectable,
      selectedDancers,
      onDancerSelect,
      onViewProfileClick,
      showMoreMenu,
      onInviteClick,
      onAddToGroupClick,
      onMessageClick,
      onBlockClick,
      onReportClick,
      onDeleteClick,
      onRemoveClick,
    } = this.props;

    const {
      visibleDancers
    } = this.state;

    switch (viewLayout) {
      case ViewLayoutConstants.LIST:
        return (
          <ListView
            dancersData={visibleDancers}
            photoSizeInPx={photoSizeInPx}
            isSelectable={isSelectable}
            selectedDancers={selectedDancers}
            onPhotoClick={onDancerSelect}
            isAdmin={isAdmin}
            onViewProfileClick={onViewProfileClick}
            showMoreMenu={showMoreMenu}
            onInviteClick={onInviteClick}
            onAddToGroupClick={onAddToGroupClick}
            onMessageClick={onMessageClick}
            onBlockClick={onBlockClick}
            onReportClick={onReportClick}
            onDeleteClick={onDeleteClick}
            onRemoveClick={onRemoveClick}
          />
        );
      case ViewLayoutConstants.GRID:
      default:
        return (
          <GridView
            dancersData={visibleDancers}
            photoSizeInPx={photoSizeInPx}
            isSelectable={isSelectable}
            selectedDancers={selectedDancers}
            onPhotoClick={onDancerSelect}
            isAdmin={isAdmin}
            onViewProfileClick={onViewProfileClick}
            showMoreMenu={showMoreMenu}
            onInviteClick={onInviteClick}
            onAddToGroupClick={onAddToGroupClick}
            onMessageClick={onMessageClick}
            onBlockClick={onBlockClick}
            onReportClick={onReportClick}
            onDeleteClick={onDeleteClick}
            onRemoveClick={onRemoveClick}
          />
        );
    }
  }

  renderNoDancersToShow = () => {
    return <Warning>No Dancers Found</Warning>;
  }

  getPageSize = () => {
    const { viewLayout } = this.props;
    switch (viewLayout) {
      case ViewLayoutConstants.GRID:
        return 12;
      case ViewLayoutConstants.LIST:
        return 8;
      default:
        return 10;
    }
  }

  render() {
    const {
      dancers,
    } = this.props;

    const pageSize = this.props.pageSize || this.getPageSize();
    
    return (
      <>
        <S.PaginationContainer>
          <Paginate
            items={dancers}
            onChangePage={this.onChangePage}
            pageSize={pageSize}
          />
        </S.PaginationContainer>
        <Scroll>
          {dancers.length > 0
            ? this.renderDancerList()
            : this.renderNoDancersToShow()}
        </Scroll>
      </>
    );
  }
}
