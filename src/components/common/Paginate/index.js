import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

export class Paginate extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number,
  }

  static defaultProps = {
    initialPage: 1,
    pageSize: 10,
  }

  constructor(props) {
    super(props);
    this.state = {
      pager: {}
    };
  }

  componentDidMount() {
    const { items, initialPage } = this.props;
    if (items && items.length) {
      this.setPage(initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { items, initialPage } = this.props;
    if (items !== prevProps.items) {
      this.setPage(initialPage);
    }
  }

  setPage = (page) => {
    if (page < 1 || (page > this.state.pager.totalPages && this.state.pager.totalPages > 0)) {
      return;
    }

    const { items, pageSize, onChangePage } = this.props;
    let pager = this.getPager(items.length, page, pageSize);
    let visibleItems = items.slice(pager.startIndex, pager.endIndex + 1);

    this.setState({ pager });
    onChangePage(visibleItems);
  }

  getPager = (totalItems, currentPage, pageSize) => {
    currentPage = currentPage || 1;
    pageSize = pageSize || 10;

    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    let pages = [...Array((endPage+1) - startPage).keys()].map(i => startPage + i);
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }

  render() {
    const { pager } = this.state;
    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }
    const { currentPage, totalPages, pages } = pager;
    const isFirstPageSelected = currentPage === 1;
    const isLastPageSelected = currentPage === totalPages; 
    return (
      <S.PageList>
        <S.Page
          disabled={isFirstPageSelected}
          onClick={() => this.setPage(1)}
        >
          First
        </S.Page>
        <S.Page
          disabled={isFirstPageSelected}
          onClick={() => this.setPage(currentPage - 1)}
        >
          Prev
        </S.Page>
        {pages.map((page, index) =>
          <S.Page
            key={index}
            active={currentPage === page}
            onClick={() => this.setPage(page)}
          >
            {page}
          </S.Page>
        )}
        <S.Page
          disabled={isLastPageSelected}
          onClick={() => this.setPage(currentPage + 1)}
        >
          Next
        </S.Page>
        <S.Page
          disabled={isLastPageSelected}
          onClick={() => this.setPage(totalPages)}
        >
          Last
        </S.Page>
      </S.PageList>
    );
  }
}