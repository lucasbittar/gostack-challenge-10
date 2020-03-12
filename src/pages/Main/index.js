import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import OrdersStackView from '~/pages/OrdersStackView';
import Profile from '~/pages/Profile';

const Tab = createBottomTabNavigator();

const screenOptions = ({route}) => ({
  tabBarIcon: ({color, size}) => {
    let iconName;

    if (route.name === 'Orders') {
      iconName = 'list';
    } else if (route.name === 'Profile') {
      iconName = 'person';
    }

    return <Icon name={iconName} size={size} color={color} />;
  },
});

const tabOptions = {
  activeTintColor: '#7D40E7',
  inactiveTintColor: '#999',
  keyboardHidesTabBar: true,
};

export default function Main() {
  return (
    <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabOptions}>
      <Tab.Screen name="Orders" component={OrdersStackView} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
