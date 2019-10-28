import React from 'react'
import PropTypes from 'prop-types'

import { Routes } from '@statics/Routes'
import { Scroll } from '@common/styled/Scroll'
import { Paginate } from '@components/common/Paginate'
import { getDefaultThumbImage } from '@statics/Helpers'
import * as defaultUserPhoto from '@assets/user-placeholder.png'
import * as S from './styled/index'

export class GroupList extends React.Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    pageSize: PropTypes.number,
    onViewClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    pageSize: 8
  }

  state = {
    visibleGroups: [],
  }

  render() {
    const {
      groups,
      pageSize,
      onViewClick,
    } = this.props;
    return (
      <>
        <S.PaginationContainer>
          <Paginate
            items={groups}
            onChangePage={this.onChangePage}
            pageSize={pageSize}
          />
        </S.PaginationContainer>
        <Scroll>
          <S.Container>
            {groups.map(group =>
              <S.Group key={group.id} onClick={() => onViewClick(group.id)}>
                <S.MembersArea>
                  <S.ImageList>
                    {group.dancers.length > 9 ? (
                      [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
                        const dancer = group.dancers[i].user;
                        return (
                          <S.ImgContainer key={dancer.id}>
                            <S.Img src={getDefaultThumbImage(dancer.images) || defaultUserPhoto} />
                            {i === 9 && <S.ImgOverlay>+{group.dancers.length - 9}</S.ImgOverlay>}
                          </S.ImgContainer>
                        )
                      })
                    ) : (
                      group.dancers.map(dancer => (
                        <S.ImgContainer key={dancer.user.id}>
                          <S.Img src={getDefaultThumbImage(dancer.user.images) || defaultUserPhoto} />
                        </S.ImgContainer>
                      ))
                    )}
                  </S.ImageList>
                </S.MembersArea>
                <S.NameArea>
                  <S.NameLink
                    to={Routes.viewGroup.createPath(group.id)}
                  >
                    {group.name}
                  </S.NameLink>
                </S.NameArea>
                <S.MoreArea>
                  Click to manage
                </S.MoreArea>
              </S.Group>)}
          </S.Container>
        </Scroll>
      </>
    )
  }

  onChangePage = (visibleGroups) => {
    this.setState({ visibleGroups })
  }
}
