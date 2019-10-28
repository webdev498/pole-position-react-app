import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Colors } from '@statics/Colors';

const ShiftTab = ({ title, active, onClick }) => {
  const titleFontWeight = active ? 'bold' : 'normal';

  return (
    <View
      style={{
        flex: 1,
        borderBottomWidth: active ? 4 : null,
        borderColor: active ? Colors.IndyWorkLightPurple : null,
        //margin: 10,
        marginHorizontal: 10,
        marginTop: 10,
        padding: 10,
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          color: Colors.IndyWorkLightPurple,
          fontWeight: titleFontWeight
        }}
      >
        {title}
      </Text>
    </View>
  );
};

ShiftTab.propTypes = {
  active: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

const ShiftTabBar = ({ tabs, activeTab, tabClicked }) => (
  <View
    style={{
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: Colors.IndyWorkPaneDivider
    }}
  >
    {tabs.map((item, index) => (
      <ShiftTab
        key={index}
        active={index === activeTab}
        onClick={() => tabClicked(index)}
        title={item}
      />
    ))}
  </View>
);

ShiftTabBar.propTypes = {
  tabs: PropTypes.array.isRequired,
  activeTab: PropTypes.number.isRequired,
  tabClicked: PropTypes.func.isRequired
};

export { ShiftTabBar };

export { ShiftTab };
