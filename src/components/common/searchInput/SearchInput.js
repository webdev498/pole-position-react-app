import React from 'react';
import PropTypes from 'prop-types';

import { SearchArea } from '@common/searchInput/SearchInputStyled';
import { MdSearch } from 'react-icons/md';

const SearchInput = ({ value, placeHolder, onChange }) => (
  <SearchArea>
    <input
      type="text"
      value={value}
      placeholder={placeHolder}
      onChange={onChange}
    />
    <MdSearch />
  </SearchArea>
);

SearchInput.displayName = SearchInput.name;

SearchInput.propTypes = {
  placeHolder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
  placeHolder: ''
};

export { SearchInput };
