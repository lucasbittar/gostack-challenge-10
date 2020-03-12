import React from 'react';
import {format} from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  OrderTileContainer,
  OrderHeader,
  OrderHeaderTitle,
  OrderFooter,
  OrderFooterInfo,
  OrderFooterSmall,
  OrderFooterLarge,
  OrderFooterAction,
  OrderDetailsButton,
  OrderDetailsButtonText,
  OrderStatus,
  OrderStatusFlex,
  OrderStatusTextFlex,
  OrderStatusLine,
  OrderStatusIndicator,
  OrderStatusText,
} from './styles';

export default function OrderTile({order, navigation}) {
  return (
    <OrderTileContainer>
      <OrderHeader>
        <Icon name="local-shipping" color="#7d40e7" size={21} />
        <OrderHeaderTitle>Order #{order.id}</OrderHeaderTitle>
      </OrderHeader>
      <OrderStatus>
        <OrderStatusFlex>
          <OrderStatusLine />
          <OrderStatusIndicator active />
          <OrderStatusIndicator active={order.start_date !== null} />
          <OrderStatusIndicator active={order.end_date !== null} />
        </OrderStatusFlex>
        <OrderStatusTextFlex>
          <OrderStatusText>Waiting for pickup</OrderStatusText>
          <OrderStatusText>In Transit</OrderStatusText>
          <OrderStatusText>Delivered</OrderStatusText>
        </OrderStatusTextFlex>
      </OrderStatus>
      <OrderFooter>
        <OrderFooterInfo>
          <OrderFooterSmall>Date</OrderFooterSmall>
          <OrderFooterLarge>
            {order.start_date !== null
              ? format(new Date(order.start_date), 'MM/dd/yyyy')
              : 'Not started'}
          </OrderFooterLarge>
        </OrderFooterInfo>
        <OrderFooterInfo>
          <OrderFooterSmall>City</OrderFooterSmall>
          <OrderFooterLarge>{order.recipient.city}</OrderFooterLarge>
        </OrderFooterInfo>
        <OrderFooterAction>
          <OrderDetailsButton
            onPress={() => navigation.navigate('Order Details')}>
            <OrderDetailsButtonText>Details</OrderDetailsButtonText>
          </OrderDetailsButton>
        </OrderFooterAction>
      </OrderFooter>
    </OrderTileContainer>
  );
}
