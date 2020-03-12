import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  ProfileHeader,
  ProfileInfo,
  ProfileWelcome,
  ProfileName,
  LogoutButton,
  OrdersFlatList,
  OrdersHeader,
  OrdersHeaderTitle,
  OrdersFilter,
  OrdersFilterButton,
  OrdersFilterButtonText,
} from './styles';

import OrderTile from '~/components/OrderTile';

import {logOut} from '~/store/modules/auth/actions';

import ProfileAvatar from '~/components/ProfileAvatar';

import {orderFetchAllRequest} from '~/store/modules/order/actions';

export default function OrdersList({navigation}) {
  const [page, setPage] = useState(1);
  const user = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.orders);

  useEffect(() => {
    async function fetchOrders() {
      const ordersParams = {
        page,
        deliveryman_id: user.id,
      };
      dispatch(orderFetchAllRequest(ordersParams));
    }
    fetchOrders();
  }, [page, dispatch]);

  function handleLogout() {
    dispatch(logOut());
  }

  function renderOrderTile({item}) {
    return <OrderTile order={item} navigation={navigation} />;
  }

  return (
    <Container>
      <ProfileHeader>
        <ProfileAvatar profile={user} />
        <ProfileInfo>
          <ProfileWelcome>Welcome back,</ProfileWelcome>
          <ProfileName>{user.name}</ProfileName>
        </ProfileInfo>
        <LogoutButton onPress={handleLogout}>
          <Icon name="exit-to-app" size={26} color="#E74040" />
        </LogoutButton>
      </ProfileHeader>
      <OrdersHeader>
        <OrdersHeaderTitle>Orders</OrdersHeaderTitle>
        <OrdersFilter>
          <OrdersFilterButton active>
            <OrdersFilterButtonText active>Pending</OrdersFilterButtonText>
          </OrdersFilterButton>
          <OrdersFilterButton>
            <OrdersFilterButtonText>Complete</OrdersFilterButtonText>
          </OrdersFilterButton>
        </OrdersFilter>
      </OrdersHeader>
      <OrdersFlatList
        vertical
        data={orders}
        extraData={this.props}
        keyExtractor={item => String(item.id)}
        renderItem={renderOrderTile}
      />
    </Container>
  );
}
