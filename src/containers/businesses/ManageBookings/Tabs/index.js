import React from 'react';
import PropTypes from 'prop-types';

import { BookingConstants } from '@statics/Constants';
import * as S from '@common/styled/Tabs';

const Tabs = ({ activeTab, onTabClick, tabs }) => {
  return (
    <S.Container>
      {tabs.map(tab => (
        <S.Tab
          key={tab.key}
          active={activeTab === tab.key}
          onClick={() => onTabClick(tab.key)}
        >
          {tab.label} ({tab.count})
        </S.Tab>
      ))}
      <S.EmptyTab>&nbsp;</S.EmptyTab>
    </S.Container>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOf(Object.values(BookingConstants)),
      count: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired
    })
  )
};

export { Tabs };
