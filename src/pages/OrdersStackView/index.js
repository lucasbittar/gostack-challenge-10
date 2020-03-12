import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import OrdersList from '~/pages/OrdersList';
import OrderDetails from '~/pages/OrderDetails';

const OrdersStack = createStackNavigator();

const orderDetailsOptions = {
  headerStyle: {
    backgroundColor: '#7D40E7',
  },
  headerTintColor: '#fff',
};

export default function OrdersStackView() {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen
        name="Orders List"
        component={OrdersList}
        options={{headerShown: false}}
      />
      <OrdersStack.Screen
        name="Order Details"
        options={orderDetailsOptions}
        component={OrderDetails}
      />
    </OrdersStack.Navigator>
  );
}

